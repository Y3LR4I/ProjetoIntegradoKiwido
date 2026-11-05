// Seleciona o formulário de contato.
const formularioContato = document.getElementById('form-contato');

// Seleciona o botão de envio do formulário.
const botaoEnvio = formularioContato.querySelector(
    'button[type="submit"], input[type="submit"]'
);

// Seleciona a área de mensagens do formulário.
const feedbackContato = document.getElementById('contato-feedback');

// Exibe uma mensagem de retorno ao usuário.
function exibirFeedback(mensagem, tipo) {
    feedbackContato.textContent = mensagem;
    feedbackContato.className = `contato-feedback ${tipo}`;
}

// Identifica o envio do formulário.
formularioContato.addEventListener('submit', async (evento) => {

    // Impede o comportamento padrão do formulário.
    evento.preventDefault();

    feedbackContato.className = 'contato-feedback';
    feedbackContato.textContent = '';

    // Impede novos envios enquanto a mensagem está sendo processada.
    if (botaoEnvio?.disabled) {
        return;
    }

    // Captura os valores preenchidos pelo usuário.
    const nome = document.getElementById('contato-nome').value;
    const email = document.getElementById('contato-email').value;
    const mensagem = document.getElementById('contato-mensagem').value;

    // Captura o token gerado pelo Cloudflare Turnstile.
    const turnstileToken = document.querySelector(
        '[name="cf-turnstile-response"]'
    )?.value;

    // Captura o campo Honeypot.
    const site = document.getElementById('site').value;

    // Verifica se o Turnstile gerou um token.
    if (!turnstileToken) {
        exibirFeedback(
            'A verificação de segurança não foi concluída. Tente novamente.',
            'erro'
        );

        if (window.turnstile) {
            window.turnstile.reset();
        }

        return;
    }

    // Desabilita o botão durante o envio.
    if (botaoEnvio) {
        botaoEnvio.disabled = true;
    }

    // Organiza os dados em um objeto.
    const dadosContato = {
        nome: nome,
        email: email,
        mensagem: mensagem,
        site: site,
        turnstileToken: turnstileToken
    };

    try {

        // Envia os dados para o servidor Node.js.
        const resposta = await fetch('http://localhost:3000/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosContato)
        });

        // Converte a resposta do servidor para JSON.
        const resultado = await resposta.json();

        // Verifica se o servidor recusou a mensagem.
        if (!resposta.ok) {
            exibirFeedback(resultado.mensagem, 'erro');
            return;
        }

        // Exibe a confirmação de recebimento.
        exibirFeedback(resultado.mensagem, 'sucesso');

        // Limpa os campos após o envio bem-sucedido.
        formularioContato.reset();

    } catch (erro) {

        // Informa caso não seja possível acessar o servidor.
        console.error('Erro ao enviar mensagem:', erro);

        exibirFeedback(
            'Não foi possível enviar sua mensagem. Tente novamente.',
            'erro'
        );

    } finally {

        // Reinicia o Turnstile para gerar um novo token.
        if (window.turnstile) {
            window.turnstile.reset();
        }

        // Libera novamente o botão de envio.
        if (botaoEnvio) {
            botaoEnvio.disabled = false;
        }

    }

});