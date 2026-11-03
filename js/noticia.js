/* =========================
   ELEMENTOS DA PÁGINA
========================= */

// Seleciona o elemento que receberá o cabeçalho e os metadados da notícia.
const conteudoNoticia = document.querySelector("#conteudo-noticia");

// Seleciona o elemento que receberá o conteúdo completo da notícia.
const corpoNoticia = document.querySelector("#corpo-noticia");

// Seleciona o botão utilizado para compartilhar a notícia.
const botaoCompartilhar = document.querySelector("#botao-compartilhar");

// Seleciona o elemento que exibirá mensagens relacionadas ao compartilhamento.
const mensagemCompartilhar = document.querySelector("#mensagem-compartilhar");


/* =========================
   ÍCONES SVG
========================= */

// Cria os ícones utilizados nas informações da notícia.
function criarIcone(tipo) {

    // Define os nomes dos ícones disponíveis na biblioteca Material Symbols.
    const icones = {
        calendario: "calendar_month",
        relogio: "schedule"
    };

    // Cria o elemento que receberá o ícone.
    const elemento = document.createElement("span");

    // Aplica a classe responsável pela exibição dos ícones.
    elemento.className = "material-symbols-outlined";

    // Define o ícone de acordo com o tipo informado.
    const textoIcone = icones[tipo] || "";
    elemento.textContent = textoIcone;

    // Impede que leitores de tela interpretem o ícone como conteúdo textual.
    elemento.setAttribute("aria-hidden", "true");

    // Retorna o elemento criado.
    return elemento;
}


/* =========================
   CRIAR ELEMENTO COM TEXTO
========================= */

// Cria um elemento HTML com uma tag, uma classe e um texto opcionais.
function criarElemento(tag, classe, texto) {

    // Cria o elemento utilizando a tag informada.
    const elemento = document.createElement(tag);

    // Define a classe CSS quando uma classe é fornecida.
    if (classe) {
        elemento.className = classe;
    }

    // Define o conteúdo textual quando um texto é informado.
    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    // Retorna o elemento criado.
    return elemento;
}


/* =========================
   FORMATAR DATA
========================= */

// Converte uma data do formato AAAA-MM-DD para o formato brasileiro.
function formatarData(data) {

    // Separa o ano, o mês e o dia utilizando o hífen como separador.
    const partes = data.split("-");

    // Retorna a data original caso ela não possua três partes.
    if (partes.length !== 3) {
        return data;
    }

    // Armazena separadamente o ano, o mês e o dia.
    const [ano, mes, dia] = partes;

    // Cria um objeto de data utilizando os valores recebidos.
    // O mês recebe -1 porque o JavaScript considera janeiro como mês zero.
    const dataLocal = new Date(
        Number(ano),
        Number(mes) - 1,
        Number(dia)
    );

    // Formata a data no padrão brasileiro, com dia, mês por extenso e ano.
    return dataLocal.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}


/* =========================
   CALCULAR TEMPO DE LEITURA
========================= */

// Estima o tempo necessário para ler o conteúdo da notícia.
function calcularTempoLeitura(conteudo) {

    // Reúne os textos de todos os elementos do conteúdo em uma única string.
    const textoCompleto = conteudo
        .map(item => item.texto || "")
        .join(" ");

    // Conta a quantidade de palavras presentes no texto completo.
    const quantidadePalavras = textoCompleto
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

    // Calcula o tempo de leitura considerando uma média de 200 palavras por minuto.
    // Garante que o resultado seja de pelo menos um minuto.
    const minutos = Math.max(
        1,
        Math.ceil(quantidadePalavras / 200)
    );

    // Retorna o tempo estimado de leitura acompanhado da unidade.
    return `${minutos} min de leitura`;
}


/* =========================
   MONTAR CABEÇALHO
========================= */

// Cria e organiza as informações principais exibidas no cabeçalho da notícia.
function renderizarCabecalho(noticia) {

    // Remove os elementos anteriores para preparar o cabeçalho da notícia selecionada.
    conteudoNoticia.replaceChildren();

    // Cria o container que agrupa a categoria e a data da notícia.
    const metadados = criarElemento("div", "noticia-metadados");

    // Cria o elemento responsável por exibir a categoria da notícia.
    const categoria = criarElemento(
        "span",
        "noticia-categoria",
        noticia.categoria
    );

    // Cria o elemento time para apresentar a data de publicação.
    const data = criarElemento("time", "noticia-data");

    // Define a data no atributo datetime para melhorar a semântica do elemento.
    data.dateTime = noticia.data;

    // Adiciona o ícone de calendário ao elemento da data.
    data.appendChild(criarIcone("calendario"));

    // Adiciona a data formatada para exibição.
    data.appendChild(
        criarElemento("span", "", formatarData(noticia.data))
    );

    // Agrupa a categoria e a data dentro dos metadados.
    metadados.append(categoria, data);

    // Cria o título principal da notícia.
    const titulo = criarElemento(
        "h1",
        "noticia-titulo",
        noticia.titulo
    );

    // Cria o parágrafo que apresenta a sinopse da notícia.
    const sinopse = criarElemento(
        "p",
        "noticia-sinopse",
        noticia.sinopse
    );

    // Cria o container que agrupa as informações do autor e o tempo de leitura.
    const informacoesAutor = criarElemento(
        "div",
        "noticia-informacoes-autor"
    );

    // Cria o container destinado à identificação do autor.
    const autor = criarElemento("div", "noticia-autor");

    // Define o nome do autor, utilizando um nome padrão caso ele não esteja informado.
    const nomeAutor = noticia.autor || "Equipe Mangue Vivo";

    // Obtém o endereço da foto do autor, caso esteja disponível.
    const fotoAutor = noticia.fotoAutor;

    // Verifica se a notícia possui uma foto cadastrada para o autor.
    if (fotoAutor) {

        // Cria o elemento de imagem do autor.
        const imagemAutor = criarElemento("img", "noticia-autor-foto");

        // Define o endereço e o texto alternativo da imagem.
        imagemAutor.src = fotoAutor;
        imagemAutor.alt = `Foto de ${nomeAutor}`;

        // Permite que a imagem seja carregada de forma tardia.
        imagemAutor.loading = "lazy";

        // Define o comportamento caso a imagem do autor não seja carregada.
        imagemAutor.addEventListener("error", () => {

            // Cria um elemento alternativo que apresenta as iniciais do autor.
            const iniciais = criarElemento(
                "div",
                "noticia-autor-foto noticia-autor-iniciais",

                // Obtém as iniciais a partir das duas primeiras palavras do nome.
                nomeAutor
                    .split(/\s+/)
                    .slice(0, 2)
                    .map(nome => nome[0])
                    .join("")
                    .toUpperCase()
            );

            // Define uma descrição acessível com o nome do autor.
            iniciais.setAttribute("aria-label", nomeAutor);

            // Substitui a imagem que apresentou erro pelo elemento com as iniciais.
            imagemAutor.replaceWith(iniciais);

        }, { once: true });

        // Insere a imagem do autor no seu container.
        autor.appendChild(imagemAutor);

    } else {

        // Cria diretamente o elemento com as iniciais quando não existe foto cadastrada.
        const iniciais = criarElemento(
            "div",
            "noticia-autor-foto noticia-autor-iniciais",

            // Obtém as iniciais a partir das duas primeiras palavras do nome.
            nomeAutor
                .split(/\s+/)
                .slice(0, 2)
                .map(nome => nome[0])
                .join("")
                .toUpperCase()
        );

        // Define uma descrição acessível com o nome do autor.
        iniciais.setAttribute("aria-label", nomeAutor);

        // Insere as iniciais no container do autor.
        autor.appendChild(iniciais);
    }

    // Cria o container que agrupa as informações textuais do autor.
    const dadosAutor = criarElemento("div", "");

    // Cria o parágrafo destinado à identificação do autor.
    const textoAutor = criarElemento("p", "noticia-autor-nome");

    // Insere o texto que antecede o nome do autor.
    textoAutor.appendChild(
        document.createTextNode("Por ")
    );

    // Insere o nome do autor em destaque utilizando a tag strong.
    textoAutor.appendChild(
        criarElemento("strong", "", nomeAutor)
    );

    // Insere a identificação do autor no seu container.
    dadosAutor.appendChild(textoAutor);

    // Insere as informações textuais dentro do container do autor.
    autor.appendChild(dadosAutor);

    // Cria o container responsável por apresentar o tempo estimado de leitura.
    const tempoLeitura = criarElemento(
        "div",
        "noticia-tempo-leitura"
    );

    // Adiciona o ícone de relógio ao indicador de leitura.
    tempoLeitura.appendChild(criarIcone("relogio"));

    // Calcula e apresenta o tempo estimado de leitura da notícia.
    tempoLeitura.appendChild(
        criarElemento(
            "span",
            "",
            calcularTempoLeitura(noticia.conteudo || [])
        )
    );

    // Agrupa as informações do autor e o tempo de leitura.
    informacoesAutor.append(autor, tempoLeitura);

    // Insere todos os elementos do cabeçalho no container principal da notícia.
    conteudoNoticia.append(
        metadados,
        titulo,
        sinopse,
        informacoesAutor
    );
}


/* =========================
   MONTAR CORPO DA NOTÍCIA
========================= */

// Cria e organiza a imagem e os textos que compõem o corpo da notícia.
function renderizarCorpo(noticia) {

    // Remove o conteúdo anterior para preparar o corpo da notícia selecionada.
    corpoNoticia.replaceChildren();

    // Cria a imagem principal da notícia.
    const imagem = criarElemento("img", "noticia-imagem-destaque");

    // Define o endereço e o texto alternativo da imagem.
    imagem.src = noticia.imagem;
    imagem.alt = noticia.titulo;

    // Carrega a imagem imediatamente, por ser o destaque da notícia.
    imagem.loading = "eager";

    // Permite que o navegador decodifique a imagem de forma assíncrona.
    imagem.decoding = "async";

    // Remove a imagem caso ela não seja carregada corretamente.
    imagem.addEventListener("error", () => {
        imagem.remove();
    }, { once: true });

    // Insere a imagem principal no corpo da notícia.
    corpoNoticia.appendChild(imagem);

    // Verifica se o conteúdo recebido é uma lista.
    // Caso contrário, utiliza uma lista vazia.
    const conteudo = Array.isArray(noticia.conteudo)
        ? noticia.conteudo
        : [];

    // Percorre os elementos do conteúdo para criar os parágrafos e subtítulos.
    conteudo.forEach(item => {
        let elemento;

        // Verifica se o elemento atual deve ser apresentado como subtítulo.
        if (item.tipo === "subtitulo") {

            // Cria um título de segundo nível para o subtítulo.
            elemento = criarElemento(
                "h2",
                "noticia-subtitulo",
                item.texto
            );

        } else {

            // Cria um parágrafo para os demais elementos do conteúdo.
            elemento = criarElemento(
                "p",
                "noticia-paragrafo",
                item.texto
            );
        }

        // Insere o elemento criado no corpo da notícia.
        corpoNoticia.appendChild(elemento);
    });

    // Verifica se não existe conteúdo estruturado, mas há um texto simples cadastrado.
    if (conteudo.length === 0 && noticia.texto) {

        // Divide o texto em parágrafos utilizando as quebras de linha como separadores.
        noticia.texto
            .split(/\n\s*\n/)

            // Remove os parágrafos vazios.
            .filter(paragrafo => paragrafo.trim())

            // Cria e insere cada parágrafo no corpo da notícia.
            .forEach(paragrafo => {
                corpoNoticia.appendChild(
                    criarElemento(
                        "p",
                        "noticia-paragrafo",
                        paragrafo.trim()
                    )
                );
            });
    }
}


/* =========================
   COMPARTILHAR NOTÍCIA
========================= */

// Compartilha a notícia utilizando os recursos disponíveis no navegador.
async function compartilharNoticia() {

    // Localiza o título da notícia atualmente exibida.
    const titulo = document.querySelector(".noticia-titulo");

    // Interrompe a função caso não exista um título disponível.
    if (!titulo) {
        return;
    }

    // Organiza as informações que serão utilizadas no compartilhamento.
    const dadosCompartilhamento = {
        title: document.title,
        text: titulo.textContent,
        url: window.location.href
    };

    // Limpa mensagens anteriores antes de iniciar uma nova tentativa.
    mensagemCompartilhar.textContent = "";

    // Verifica se o navegador oferece suporte ao compartilhamento nativo.
    if (navigator.share) {
        try {

            // Abre a ferramenta nativa de compartilhamento do dispositivo.
            await navigator.share(dadosCompartilhamento);

        } catch (erro) {

            // Exibe uma mensagem somente quando ocorre um erro diferente do cancelamento.
            if (erro.name !== "AbortError") {
                mensagemCompartilhar.textContent =
                    "Não foi possível abrir o compartilhamento.";
            }
        }

        // Encerra a função após utilizar o compartilhamento nativo.
        return;
    }

    // Caso o compartilhamento nativo não esteja disponível, tenta copiar o link.
    try {

        // Copia o endereço atual da notícia para a área de transferência.
        await navigator.clipboard.writeText(window.location.href);

        // Informa que o link foi copiado com sucesso.
        mensagemCompartilhar.textContent =
            "Link da notícia copiado!";

    } catch (erro) {

        // Informa que a cópia automática não foi possível.
        mensagemCompartilhar.textContent =
            "Não foi possível copiar automaticamente. Copie o endereço do navegador.";
    }
}

// Adiciona ao botão o evento responsável por executar o compartilhamento.
botaoCompartilhar.addEventListener("click", compartilharNoticia);


/* =========================
   NAVEGAÇÃO ENTRE NOTÍCIAS
========================= */

// Cria os links para acessar a notícia anterior e a próxima notícia.
function renderizarNavegacaoNoticias(noticias, noticiaAtual) {

    // Seleciona o container que receberá os cards de navegação.
    const navegacao = document.querySelector("#navegacao-noticias");

    // Interrompe a função caso o container não exista na página.
    if (!navegacao) {
        return;
    }

    // Remove os links de navegação anteriores.
    navegacao.replaceChildren();

    // Ordena da notícia mais recente para a mais antiga.
    const noticiasOrdenadas = [...noticias].sort((a, b) => {
        const comparacaoData = String(b.data || "")
            .localeCompare(String(a.data || ""));

        // Utiliza a data como critério principal de ordenação.
        if (comparacaoData !== 0) {
            return comparacaoData;
        }

        // Desempate para notícias publicadas na mesma data.
        return Number(b.id) - Number(a.id);
    });

    // Localiza a posição da notícia atual dentro da lista ordenada.
    const indiceAtual = noticiasOrdenadas.findIndex(
        noticia => String(noticia.id) === String(noticiaAtual.id)
    );

    // Interrompe a função caso a notícia atual não seja encontrada na lista.
    if (indiceAtual === -1) {
        return;
    }

    // Como a lista está em ordem decrescente:
    // índice + 1 = notícia anterior, mais antiga.
    // índice - 1 = próxima notícia, mais recente.
    const noticiaAnterior = noticiasOrdenadas[indiceAtual + 1];
    const proximaNoticia = noticiasOrdenadas[indiceAtual - 1];

    // Cria um card de navegação para uma notícia específica.
    function criarCard(noticia, tipo) {

        // Não cria o card caso não exista uma notícia correspondente.
        if (!noticia) {
            return null;
        }

        // Cria o link que permitirá acessar a notícia selecionada.
        const link = criarElemento(
            "a",
            `card-navegacao-noticia card-${tipo}`
        );

        // Define o endereço da notícia utilizando seu ID como parâmetro.
        link.href = `noticia.html?id=${encodeURIComponent(noticia.id)}`;

        // Cria o container que agrupa o ícone e a identificação da navegação.
        const indicador = criarElemento(
            "span",
            "card-navegacao-indicador"
        );

        // Cria o ícone de navegação correspondente ao tipo do card.
        const icone = criarElemento(
            "span",
            "material-symbols-outlined",
            tipo === "anterior" ? "chevron_left" : "chevron_right"
        );

        // Impede que leitores de tela interpretem o ícone como conteúdo textual.
        icone.setAttribute("aria-hidden", "true");

        // Define o texto que identifica o tipo de navegação.
        const textoIndicador = criarElemento(
            "span",
            "",
            tipo === "anterior" ? "Notícia anterior" : "Próxima notícia"
        );

        // Organiza o ícone e o texto de acordo com a direção da navegação.
        if (tipo === "anterior") {
            indicador.append(icone, textoIndicador);
        } else {
            indicador.append(textoIndicador, icone);
        }

        // Cria o elemento que apresenta o título da notícia de destino.
        const titulo = criarElemento(
            "span",
            "card-navegacao-titulo",
            noticia.titulo
        );

        // Insere o indicador e o título dentro do link.
        link.append(indicador, titulo);

        // Retorna o card completo.
        return link;
    }

    // Cria os cards correspondentes à notícia anterior e à próxima notícia.
    const cardAnterior = criarCard(noticiaAnterior, "anterior");
    const cardProxima = criarCard(proximaNoticia, "proxima");

    // Insere o card da notícia anterior, caso exista.
    if (cardAnterior) {
        navegacao.appendChild(cardAnterior);
    }

    // Insere o card da próxima notícia, caso exista.
    if (cardProxima) {
        navegacao.appendChild(cardProxima);
    }

    // Não exibe o espaço de navegação se só houver uma notícia.
    navegacao.hidden = navegacao.childElementCount === 0;
}


/* =========================
   CARREGAR NOTÍCIA
========================= */

// Identifica a notícia selecionada na URL, carrega os dados e monta sua página.
async function carregarNoticia() {

    // Obtém os parâmetros presentes no endereço da página.
    const parametros = new URLSearchParams(window.location.search);

    // Recupera o ID da notícia informado na URL.
    const id = parametros.get("id");

    // Verifica se existe um ID para identificar a notícia.
    if (!id) {
        exibirErro("Nenhuma notícia foi selecionada.");
        return;
    }

    try {
        // Solicita o arquivo JSON que contém todas as notícias cadastradas.
        const resposta = await fetch("../data/noticias.json");

        // Verifica se o arquivo foi carregado corretamente.
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as notícias.");
        }

        // Converte os dados recebidos para o formato JavaScript.
        const noticias = await resposta.json();

        // Procura na lista a notícia cujo ID corresponde ao parâmetro da URL.
        const noticia = noticias.find(
            item => String(item.id) === id
        );

        // Exibe uma mensagem caso a notícia solicitada não seja encontrada.
        if (!noticia) {
            exibirErro("A notícia solicitada não foi encontrada.");
            return;
        }

        // Monta o cabeçalho com as informações principais da notícia.
        renderizarCabecalho(noticia);

        // Monta o corpo com a imagem e os textos da notícia.
        renderizarCorpo(noticia);

        // Monta os links para navegar entre as notícias.
        renderizarNavegacaoNoticias(noticias, noticia);

        // Atualiza o título da aba do navegador com o título da notícia e o nome do projeto.
        document.title = `${noticia.titulo} | Mangue Vivo`;

    } catch (erro) {

        // Exibe no console qualquer erro ocorrido durante o carregamento.
        console.error("Erro ao carregar notícia:", erro);

        // Informa ao usuário que não foi possível carregar os dados da notícia.
        exibirErro(
            "Não foi possível carregar a notícia. Verifique se o arquivo JSON está acessível."
        );
    }
}


/* =========================
   EXIBIR ERRO
========================= */

// Exibe uma mensagem de erro no espaço destinado às informações da notícia.
function exibirErro(mensagem) {

    // Remove os elementos anteriores do cabeçalho da notícia.
    conteudoNoticia.replaceChildren();

    // Cria o elemento que apresentará a mensagem de erro.
    const erro = criarElemento("p", "noticia-erro", mensagem);

    // Insere a mensagem no container principal da notícia.
    conteudoNoticia.appendChild(erro);
}


/* =========================
   INICIAR
========================= */

// Inicia o carregamento da notícia assim que o script é executado.
carregarNoticia();