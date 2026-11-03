/* =========================
   CONFIGURAÇÕES
========================= */

// Caminho do arquivo JSON que contém os dados das notícias.
const CAMINHO_NOTICIAS = "../data/noticias.json";

// Quantidade máxima de notícias exibidas por página.
const NOTICIAS_POR_PAGINA = 9;


// Seleciona o elemento onde os cards das notícias serão inseridos.
const listaNoticias = document.querySelector("#lista-noticias");

// Seleciona os botões utilizados para filtrar as notícias por categoria.
const botoesCategorias = document.querySelectorAll(".categoria-btn");

// Seleciona o campo de pesquisa de notícias.
const campoBusca = document.querySelector("#busca-noticias");

// Seleciona o elemento que receberá os botões de paginação.
const paginacao = document.querySelector("#paginacao-noticias");

// Seleciona o elemento que envolve a navegação entre as páginas.
const navegacao = document.querySelector("#navegacao-noticias");

// Seleciona o elemento responsável por exibir uma mensagem quando não houver notícias.
const mensagemVazia = document.querySelector("#mensagem-vazia");


// Armazena todas as notícias carregadas do arquivo JSON.
let todasNoticias = [];

// Armazena a categoria selecionada pelo usuário.
let categoriaSelecionada = "Todas";

// Armazena o texto digitado no campo de busca.
let termoBusca = "";

// Controla o número da página atualmente exibida.
let paginaAtual = 1;


/* =========================
   CARREGAR O JSON
========================= */

// Busca os dados das notícias no arquivo JSON e prepara a listagem.
async function carregarNoticias() {
    try {
        // Solicita o arquivo JSON no caminho definido nas configurações.
        const resposta = await fetch(CAMINHO_NOTICIAS);

        // Verifica se a solicitação foi realizada corretamente.
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o arquivo JSON.");
        }

        // Converte a resposta recebida para o formato JavaScript.
        const dados = await resposta.json();

        // Verifica se os dados recebidos estão organizados em uma lista.
        if (!Array.isArray(dados)) {
            throw new Error("O arquivo JSON precisa conter uma lista de notícias.");
        }

        // Mantém apenas as notícias que possuem os campos obrigatórios
        // e os tipos de dados esperados pelo sistema.
        todasNoticias = dados.filter(noticia =>
            noticia &&
            Number.isFinite(Number(noticia.id)) &&
            typeof noticia.titulo === "string" &&
            typeof noticia.categoria === "string" &&
            typeof noticia.data === "string" &&
            typeof noticia.sinopse === "string" &&
            (
                typeof noticia.texto === "string" ||
                Array.isArray(noticia.conteudo)
            ) &&
            typeof noticia.imagem === "string" &&
            typeof noticia.autor === "string"
        );

        // Exibe as notícias após o carregamento e a validação dos dados.
        renderizarNoticias();

    } catch (erro) {
        // Exibe no console qualquer erro ocorrido durante o carregamento.
        console.error("Erro ao carregar notícias:", erro);

        // Remove os cards existentes da listagem.
        listaNoticias.replaceChildren();

        // Exibe uma mensagem informando que não foi possível carregar as notícias.
        mensagemVazia.hidden = false;
        mensagemVazia.textContent =
            "Não foi possível carregar as notícias. Verifique o arquivo JSON.";

        // Oculta a navegação da paginação.
        navegacao.hidden = true;
    }
}


/* =========================
   CRIAR UM ELEMENTO HTML
========================= */

// Cria um elemento HTML com uma tag, uma classe e um texto opcionais.
function criarElemento(tag, classe, texto = "") {

    // Cria o elemento HTML utilizando a tag informada.
    const elemento = document.createElement(tag);

    // Define a classe CSS quando uma classe é fornecida.
    if (classe) {
        elemento.className = classe;
    }

    // Define o conteúdo textual do elemento.
    elemento.textContent = texto;

    // Retorna o elemento criado para ser utilizado em outras funções.
    return elemento;
}


/* =========================
   FORMATAR A DATA
========================= */

// Valida e transforma uma data do formato AAAA-MM-DD em uma data legível.
function formatarData(data) {

    // Verifica se a data possui o formato esperado.
    const dataValida = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data);

    // Retorna uma mensagem caso a data não esteja no formato correto.
    if (!dataValida) {
        return "Data não informada";
    }

    // Separa o ano, o mês e o dia da data recebida.
    const ano = Number(dataValida[1]);
    const mes = Number(dataValida[2]);
    const dia = Number(dataValida[3]);

    // Cria um objeto de data utilizando os valores separados.
    const dataObjeto = new Date(ano, mes - 1, dia);

    // Confere se a data realmente existe no calendário.
    if (
        dataObjeto.getFullYear() !== ano ||
        dataObjeto.getMonth() !== mes - 1 ||
        dataObjeto.getDate() !== dia
    ) {
        return "Data não informada";
    }

    // Formata a data para o padrão brasileiro, exibindo dia, mês por extenso e ano.
    return new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(dataObjeto);
}


/* =========================
   ÍCONE DE CALENDÁRIO
========================= */

// Cria o elemento responsável por exibir o ícone de calendário nos cards.
function criarIconeCalendario() {

    // Cria um elemento span para receber o ícone.
    const icone = document.createElement("span");

    // Define a classe utilizada pela biblioteca Google Material Symbols.
    icone.className = "material-symbols-outlined";

    // Define o nome do ícone que será exibido.
    icone.textContent = "calendar_month";

    // Impede que leitores de tela interpretem o ícone como conteúdo textual.
    icone.setAttribute("aria-hidden", "true");

    // Retorna o ícone criado.
    return icone;
}


/* =========================
   MONTAR UM CARD
========================= */

// Cria e organiza os elementos HTML que compõem o card de uma notícia.
function criarCard(noticia) {

    // Cria a coluna que define a posição e a largura do card no grid do Bootstrap.
    const coluna = criarElemento(
        "div",
        "col-12 col-md-6 col-lg-4"
    );

    // Cria o elemento principal que representa o card da notícia.
    const card = criarElemento("article", "card-noticia");

    // Cria o elemento de imagem do card.
    const imagem = criarElemento(
        "img",
        "card-noticia-imagem"
    );

    // Define o endereço da imagem utilizando os dados da notícia.
    imagem.src = noticia.imagem;

    // Utiliza o título da notícia como descrição alternativa da imagem.
    imagem.alt = noticia.titulo;

    // Carrega a imagem somente quando ela estiver próxima de aparecer na tela.
    imagem.loading = "lazy";

    // Permite que o navegador decodifique a imagem de forma assíncrona.
    imagem.decoding = "async";

    // Define o comportamento caso a imagem não seja carregada corretamente.
    imagem.addEventListener("error", () => {

        // Altera a descrição alternativa para informar que a imagem está indisponível.
        imagem.alt = "Imagem da notícia indisponível";

        // Adiciona uma classe CSS que permite estilizar imagens indisponíveis.
        imagem.classList.add("imagem-indisponivel");

    }, { once: true });

    // Cria o container que agrupa as informações textuais do card.
    const corpo = criarElemento("div", "card-noticia-corpo");

    // Cria o elemento que apresenta a categoria da notícia.
    const categoria = criarElemento(
        "span",
        "card-noticia-categoria",
        noticia.categoria
    );

    // Cria o título da notícia utilizando um elemento h2.
    const titulo = criarElemento(
        "h2",
        "card-noticia-titulo",
        noticia.titulo
    );

    // Cria o container responsável por apresentar a data da notícia.
    const data = criarElemento("div", "card-noticia-data");

    // Insere o ícone de calendário no container da data.
    data.appendChild(criarIconeCalendario());

    // Insere a data formatada utilizando um elemento time.
    data.appendChild(
        criarElemento("time", "", formatarData(noticia.data))
    );

    // Cria o parágrafo que apresenta a sinopse da notícia.
    const sinopse = criarElemento(
        "p",
        "card-noticia-sinopse",
        noticia.sinopse
    );

    // Cria o container destinado ao link de acesso à notícia completa.
    const rodape = criarElemento("div", "card-noticia-rodape");

    // Cria o link que permite acessar a notícia completa.
    const link = criarElemento(
        "a",
        "card-noticia-link",
        "Ler mais →"
    );

    // Define o endereço da notícia, enviando seu ID como parâmetro na URL.
    link.href = `noticia.html?id=${encodeURIComponent(noticia.id)}`;

    // Define uma descrição acessível para o link, incluindo o título da notícia.
    link.setAttribute(
        "aria-label",
        `Ler a notícia: ${noticia.titulo}`
    );

    // Insere o link dentro do rodapé do card.
    rodape.appendChild(link);

    // Organiza os elementos textuais dentro do corpo do card.
    corpo.append(
        categoria,
        titulo,
        data,
        sinopse,
        rodape
    );

    // Insere a imagem e o corpo textual dentro do card.
    card.append(imagem, corpo);

    // Insere o card dentro da coluna do Bootstrap.
    coluna.appendChild(card);

    // Retorna a coluna completa para ser inserida na listagem.
    return coluna;
}


/* =========================
   FILTRAR AS NOTÍCIAS
========================= */

// Retorna as notícias que correspondem à categoria e ao termo de busca selecionados.
function obterNoticiasFiltradas() {
    return todasNoticias

        // Filtra as notícias de acordo com a categoria e o título pesquisado.
        .filter(noticia => {

            // Verifica se a notícia pertence à categoria selecionada.
            // A opção "Todas" permite exibir notícias de qualquer categoria.
            const correspondeCategoria =
                categoriaSelecionada === "Todas" ||
                noticia.categoria.toLocaleLowerCase("pt-BR") ===
                categoriaSelecionada.toLocaleLowerCase("pt-BR");

            // Converte o título para letras minúsculas para facilitar a comparação.
            const titulo = (noticia.titulo || "")
                .toLocaleLowerCase("pt-BR");

            // Verifica se o título contém o termo digitado na busca.
            const correspondeBusca = titulo.includes(termoBusca);

            // Mantém somente as notícias que atendem aos dois critérios.
            return correspondeCategoria && correspondeBusca;
        })

        // Organiza as notícias por data, das mais recentes para as mais antigas.
        .sort((a, b) => {

            // Compara as datas das notícias.
            const comparacaoData = b.data.localeCompare(a.data);

            // Em caso de datas iguais, utiliza o ID para definir a ordem decrescente.
            return comparacaoData || Number(b.id) - Number(a.id);
        });
}


/* =========================
   CRIAR BOTÃO DE PAGINAÇÃO
========================= */

// Cria um botão de navegação para uma página específica da listagem.
function criarBotaoPagina(texto, pagina, opcoes = {}) {

    // Cria um item de lista que envolverá o botão.
    const item = document.createElement("li");

    // Define a classe padrão utilizada pelo Bootstrap na paginação.
    item.className = "page-item";

    // Adiciona a classe de página ativa quando essa opção estiver habilitada.
    if (opcoes.ativo) {
        item.classList.add("active");
    }

    // Adiciona a classe de página desabilitada quando essa opção estiver habilitada.
    if (opcoes.desabilitado) {
        item.classList.add("disabled");
    }

    // Cria o botão com a classe visual de link de paginação do Bootstrap.
    const botao = criarElemento("button", "page-link", texto);

    // Define o tipo do botão para evitar o envio acidental de formulários.
    botao.type = "button";

    // Informa aos recursos de acessibilidade quando o botão representa a página atual.
    if (opcoes.ativo) {
        botao.setAttribute("aria-current", "page");
    }

    // Desabilita o botão quando a navegação não estiver disponível.
    if (opcoes.desabilitado) {
        botao.disabled = true;
    } else {

        // Define o comportamento ao clicar em um botão de página habilitado.
        botao.addEventListener("click", () => {

            // Atualiza o número da página selecionada.
            paginaAtual = pagina;

            // Atualiza a listagem de notícias com a nova página.
            renderizarNoticias();

            // Desloca a tela suavemente até o início da listagem de notícias.
            listaNoticias.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    // Insere o botão dentro do item de lista.
    item.appendChild(botao);

    // Retorna o item completo para ser inserido na paginação.
    return item;
}


/* =========================
   RENDERIZAR PAGINAÇÃO
========================= */

// Cria e atualiza os botões de navegação de acordo com a quantidade de páginas.
function renderizarPaginacao(totalPaginas) {

    // Remove os botões de paginação existentes.
    paginacao.replaceChildren();

    // Oculta a navegação quando existe apenas uma página ou nenhuma notícia.
    if (totalPaginas <= 1) {
        navegacao.hidden = true;
        return;
    }

    // Exibe a navegação quando existem várias páginas.
    navegacao.hidden = false;

    // Cria o botão para voltar à página anterior.
    // Ele fica desabilitado quando o usuário está na primeira página.
    paginacao.appendChild(
        criarBotaoPagina(
            "<",
            paginaAtual - 1,
            { desabilitado: paginaAtual === 1 }
        )
    );

    // Define o intervalo inicial e final de páginas que serão exibidas.
    // O sistema apresenta até três números de páginas por vez.
    let inicio = Math.max(1, paginaAtual - 1);
    let fim = Math.min(totalPaginas, inicio + 2);

    // Ajusta o início para manter até três páginas visíveis quando possível.
    inicio = Math.max(1, fim - 2);

    // Percorre o intervalo definido e cria os botões numéricos.
    for (let pagina = inicio; pagina <= fim; pagina++) {
        paginacao.appendChild(
            criarBotaoPagina(
                String(pagina),
                pagina,
                { ativo: pagina === paginaAtual }
            )
        );
    }

    // Cria o botão para avançar à próxima página.
    // Ele fica desabilitado quando o usuário está na última página.
    paginacao.appendChild(
        criarBotaoPagina(
            ">",
            paginaAtual + 1,
            { desabilitado: paginaAtual === totalPaginas }
        )
    );
}


/* =========================
   RENDERIZAR NOTÍCIAS
========================= */

// Atualiza os cards exibidos de acordo com os filtros e a página selecionada.
function renderizarNoticias() {

    // Obtém a lista de notícias após aplicar os filtros e a ordenação.
    const noticiasFiltradas = obterNoticiasFiltradas();

    // Calcula quantas páginas são necessárias para exibir todas as notícias filtradas.
    const totalPaginas = Math.ceil(
        noticiasFiltradas.length / NOTICIAS_POR_PAGINA
    );

    // Garante que a página atual não ultrapasse a quantidade de páginas disponíveis.
    if (totalPaginas > 0 && paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }

    // Retorna à primeira página quando não existem notícias para exibir.
    if (totalPaginas === 0) {
        paginaAtual = 1;
    }

    // Calcula a posição inicial da notícia que será exibida na página atual.
    const inicio = (paginaAtual - 1) * NOTICIAS_POR_PAGINA;

    // Separa somente as notícias correspondentes à página selecionada.
    const noticiasPagina = noticiasFiltradas.slice(
        inicio,
        inicio + NOTICIAS_POR_PAGINA
    );

    // Remove os cards que estavam sendo exibidos anteriormente.
    listaNoticias.replaceChildren();

    // Percorre as notícias da página e cria um card para cada uma.
    noticiasPagina.forEach(noticia => {
        listaNoticias.appendChild(criarCard(noticia));
    });

    // Exibe a mensagem de lista vazia somente quando não existem notícias filtradas.
    mensagemVazia.hidden = noticiasFiltradas.length > 0;

    // Atualiza os botões de paginação de acordo com a quantidade de páginas.
    renderizarPaginacao(totalPaginas);
}


/* =========================
   EVENTOS DOS FILTROS
========================= */

// Adiciona um evento de clique para cada botão de categoria.
botoesCategorias.forEach(botao => {
    botao.addEventListener("click", () => {

        // Atualiza a categoria selecionada com o valor do atributo data-categoria.
        categoriaSelecionada = botao.dataset.categoria;

        // Retorna à primeira página ao alterar o filtro.
        paginaAtual = 1;

        // Atualiza o destaque visual dos botões de categoria.
        botoesCategorias.forEach(item => {
            item.classList.toggle("ativo", item === botao);
        });

        // Atualiza a listagem de acordo com a nova categoria selecionada.
        renderizarNoticias();
    });
});


/* =========================
   EVENTO DA BUSCA
========================= */

// Monitora a digitação no campo de pesquisa de notícias.
campoBusca.addEventListener("input", () => {

    // Atualiza o termo de busca, removendo espaços extras
    // e convertendo o texto para letras minúsculas.
    termoBusca = campoBusca.value.trim().toLocaleLowerCase("pt-BR");

    // Retorna à primeira página ao realizar uma nova pesquisa.
    paginaAtual = 1;

    // Atualiza a listagem com base no termo digitado.
    renderizarNoticias();
});


/* =========================
   INICIALIZAR
========================= */

// Inicia o carregamento das notícias assim que o script é executado.
carregarNoticias();