// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

// Importa o Express
const express = require('express');

// Importa o CORS
const cors = require('cors');

// Importa o Rate Limiting
const { rateLimit } = require('express-rate-limit');

// Importa o Nodemailer para envio de e-mails.
const nodemailer = require('nodemailer');

// Configura o limite de envios do formulário de contato
const contatoLimiter = rateLimit({

    // Período de contagem: 15 minutos
    windowMs: 15 * 60 * 1000,

    // Máximo de 5 requisições por IP nesse período
    limit: 5,

    // Envia informações do limite nos cabeçalhos HTTP
    standardHeaders: true,

    // Desativa os cabeçalhos antigos
    legacyHeaders: false,

    // Resposta quando o limite é ultrapassado
    message: {
        sucesso: false,
        mensagem: 'Você atingiu o limite de envios. Tente novamente em 15 minutos.'
    }

});

// Cria a aplicação
const app = express();

// Captura a Secret Key do Turnstile
const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY;

//TEMPORÁRIO
console.log('E-mail configurado:', process.env.EMAIL_USER);
console.log(
    'Senha de app carregada:',
    Boolean(process.env.EMAIL_APP_PASSWORD)
);
console.log(
    'Quantidade de caracteres:',
    process.env.EMAIL_APP_PASSWORD?.length
);

// Configura o serviço de envio de e-mails pelo Gmail.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

// Permite a comunicação com o frontend do Laragon.
app.use(cors({
    origin: 'http://localhost'
}));

// Define a porta do servidor
const PORT = 3000;

// Verifica o token do Cloudflare Turnstile.
async function verificarTurnstile(token) {

    try {

        const resposta = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    secret: turnstileSecretKey,
                    response: token
                })
            }
        );

        const resultado = await resposta.json();

        return resultado.success === true;

    } catch (erro) {

        console.error('Erro ao verificar Turnstile:', erro);

        return false;

    }

}

// Permite receber dados no formato JSON
app.use(express.json());

// Rota inicial para verificar se o servidor está funcionando
app.get('/', (req, res) => {
    res.send('Servidor do Mangue Vivo funcionando!');
});

// Rota para receber mensagens do formulário
app.post('/contato', contatoLimiter, async (req, res) => {

    // Captura os dados enviados pelo formulário
    const { nome, email, mensagem, site, turnstileToken } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome || !email || !mensagem) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Preencha todos os campos obrigatórios.'
        });
    }

    // Verifica se o campo Honeypot foi preenchido.
    if (site) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Não foi possível processar sua mensagem.'
        });
    }

    // Verifica se o token do Turnstile foi enviado.
    if (!turnstileToken) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Verificação de segurança não encontrada.'
        });
    }

    // Consulta a Cloudflare para validar o token.
    const turnstileValido = await verificarTurnstile(turnstileToken);

    // Impede o envio caso a verificação falhe.
    if (!turnstileValido) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Não foi possível validar a verificação de segurança.'
        });
    }

    // Remove espaços desnecessários no início e no final
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();
    const mensagemLimpa = mensagem.trim();

    // Verifica se os campos não estão vazios após remover os espaços
    if (!nomeLimpo || !emailLimpo || !mensagemLimpa) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Os campos não podem conter apenas espaços.'
        });
    }

    // Verifica o tamanho máximo dos campos
    if (nomeLimpo.length > 100 || mensagemLimpa.length > 2000) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Um ou mais campos ultrapassaram o limite permitido.'
        });
    }

    // Verifica se o e-mail possui um formato válido básico
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formatoEmail.test(emailLimpo)) {
        return res.status(400).json({
            sucesso: false,
            mensagem: 'Informe um endereço de e-mail válido.'
        });
    }

    // Configura o conteúdo do e-mail.
    const opcoesEmail = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: emailLimpo,
        subject: 'Nova mensagem - Formulário Mangue Vivo',

        text: `
        Nova mensagem recebida pelo site Mangue Vivo!

        Nome: ${nomeLimpo}

        E-mail: ${emailLimpo}

        Mensagem:
        ${mensagemLimpa}
            `
    };

    try {

        // Envia o e-mail pelo Gmail.
        await transporter.sendMail(opcoesEmail);

        console.log('E-mail enviado com sucesso!');

        // Confirma o recebimento ao frontend.
        res.status(200).json({
            sucesso: true,
            mensagem: 'Mensagem enviada com sucesso!'
        });

    } catch (erro) {

        // Registra o erro no terminal.
        console.error('Erro ao enviar e-mail:', erro);

        // Informa que houve uma falha no envio.
        res.status(500).json({
            sucesso: false,
            mensagem: 'Não foi possível enviar sua mensagem. Tente novamente mais tarde.'
        });

    }

});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}`);
});