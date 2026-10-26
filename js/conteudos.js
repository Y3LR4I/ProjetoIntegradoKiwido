/* =========================
   CONFIGURAÇÕES
========================= */

const CAMINHO_NOTICIAS = "../data/noticias.json";
const NOTICIAS_POR_PAGINA = 9;

const listaNoticias = document.querySelector("#lista-noticias");
const botoesCategorias = document.querySelectorAll(".categoria-btn");
const campoBusca = document.querySelector("#busca-noticias");
const paginacao = document.querySelector("#paginacao-noticias");
const navegacao = document.querySelector("#navegacao-noticias");
const mensagemVazia = document.querySelector("#mensagem-vazia");

let todasNoticias = [];
let categoriaSelecionada = "Todas";
let termoBusca = "";
let paginaAtual = 1;


/* =========================
   CARREGAR O JSON
========================= */

async function carregarNoticias() {
    try {
        const resposta = await fetch(CAMINHO_NOTICIAS);

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o arquivo JSON.");
        }

        const dados = await resposta.json();

        if (!Array.isArray(dados)) {
            throw new Error("O arquivo JSON precisa conter uma lista de notícias.");
        }

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

        renderizarNoticias();

    } catch (erro) {
        console.error("Erro ao carregar notícias:", erro);

        listaNoticias.replaceChildren();

        mensagemVazia.hidden = false;
        mensagemVazia.textContent =
            "Não foi possível carregar as notícias. Verifique o arquivo JSON.";

        navegacao.hidden = true;
    }
}


/* =========================
   CRIAR UM ELEMENTO HTML
========================= */

function criarElemento(tag, classe, texto = "") {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    elemento.textContent = texto;

    return elemento;
}


/* =========================
   FORMATAR A DATA
========================= */

function formatarData(data) {
    const dataValida = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data);

    if (!dataValida) {
        return "Data não informada";
    }

    const ano = Number(dataValida[1]);
    const mes = Number(dataValida[2]);
    const dia = Number(dataValida[3]);

    const dataObjeto = new Date(ano, mes - 1, dia);

    if (
        dataObjeto.getFullYear() !== ano ||
        dataObjeto.getMonth() !== mes - 1 ||
        dataObjeto.getDate() !== dia
    ) {
        return "Data não informada";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(dataObjeto);
}


/* =========================
   ÍCONE DE CALENDÁRIO
========================= */
function criarIconeCalendario() {
    const icone = document.createElement("span");

    icone.className = "material-symbols-outlined";
    icone.textContent = "calendar_month";
    icone.setAttribute("aria-hidden", "true");

    return icone;
}


/* =========================
   MONTAR UM CARD
========================= */

function criarCard(noticia) {
    const coluna = criarElemento(
        "div",
        "col-12 col-md-6 col-lg-4"
    );

    const card = criarElemento("article", "card-noticia");

    const imagem = criarElemento(
        "img",
        "card-noticia-imagem"
    );

    imagem.src = noticia.imagem;
    imagem.alt = noticia.titulo;
    imagem.loading = "lazy";
    imagem.decoding = "async";

    imagem.addEventListener("error", () => {
        imagem.alt = "Imagem da notícia indisponível";
        imagem.classList.add("imagem-indisponivel");
    }, { once: true });

    const corpo = criarElemento("div", "card-noticia-corpo");

    const categoria = criarElemento(
        "span",
        "card-noticia-categoria",
        noticia.categoria
    );

    const titulo = criarElemento(
        "h2",
        "card-noticia-titulo",
        noticia.titulo
    );

    const data = criarElemento("div", "card-noticia-data");

    data.appendChild(criarIconeCalendario());
    data.appendChild(
        criarElemento("time", "", formatarData(noticia.data))
    );

    const sinopse = criarElemento(
        "p",
        "card-noticia-sinopse",
        noticia.sinopse
    );

    const rodape = criarElemento("div", "card-noticia-rodape");

    const link = criarElemento(
        "a",
        "card-noticia-link",
        "Ler mais →"
    );

    link.href = `noticia.html?id=${encodeURIComponent(noticia.id)}`;
    link.setAttribute(
        "aria-label",
        `Ler a notícia: ${noticia.titulo}`
    );

    rodape.appendChild(link);

    corpo.append(
        categoria,
        titulo,
        data,
        sinopse,
        rodape
    );

    card.append(imagem, corpo);
    coluna.appendChild(card);

    return coluna;
}


/* =========================
   FILTRAR AS NOTÍCIAS
========================= */

function obterNoticiasFiltradas() {
    return todasNoticias
        .filter(noticia => {
            const correspondeCategoria =
                categoriaSelecionada === "Todas" ||
                noticia.categoria.toLocaleLowerCase("pt-BR") ===
                categoriaSelecionada.toLocaleLowerCase("pt-BR");

            const titulo = (noticia.titulo || "")
                .toLocaleLowerCase("pt-BR");

            const correspondeBusca = titulo.includes(termoBusca);

            return correspondeCategoria && correspondeBusca;
        })
        .sort((a, b) => {
            // Mais recente primeiro
            const comparacaoData = b.data.localeCompare(a.data);

            // Em caso de empate, maior ID primeiro
            return comparacaoData || Number(b.id) - Number(a.id);
        });
}


/* =========================
   CRIAR BOTÃO DE PAGINAÇÃO
========================= */

function criarBotaoPagina(texto, pagina, opcoes = {}) {
    const item = document.createElement("li");

    item.className = "page-item";

    if (opcoes.ativo) {
        item.classList.add("active");
    }

    if (opcoes.desabilitado) {
        item.classList.add("disabled");
    }

    const botao = criarElemento("button", "page-link", texto);

    botao.type = "button";

    if (opcoes.ativo) {
        botao.setAttribute("aria-current", "page");
    }

    if (opcoes.desabilitado) {
        botao.disabled = true;
    } else {
        botao.addEventListener("click", () => {
            paginaAtual = pagina;
            renderizarNoticias();

            listaNoticias.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    item.appendChild(botao);

    return item;
}


/* =========================
   RENDERIZAR PAGINAÇÃO
========================= */

function renderizarPaginacao(totalPaginas) {
    paginacao.replaceChildren();

    if (totalPaginas <= 1) {
        navegacao.hidden = true;
        return;
    }

    navegacao.hidden = false;

    paginacao.appendChild(
        criarBotaoPagina(
            "<",
            paginaAtual - 1,
            { desabilitado: paginaAtual === 1 }
        )
    );

    let inicio = Math.max(1, paginaAtual - 1);
    let fim = Math.min(totalPaginas, inicio + 2);

    inicio = Math.max(1, fim - 2);

    for (let pagina = inicio; pagina <= fim; pagina++) {
        paginacao.appendChild(
            criarBotaoPagina(
                String(pagina),
                pagina,
                { ativo: pagina === paginaAtual }
            )
        );
    }

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

function renderizarNoticias() {
    const noticiasFiltradas = obterNoticiasFiltradas();

    const totalPaginas = Math.ceil(
        noticiasFiltradas.length / NOTICIAS_POR_PAGINA
    );

    if (totalPaginas > 0 && paginaAtual > totalPaginas) {
        paginaAtual = totalPaginas;
    }

    if (totalPaginas === 0) {
        paginaAtual = 1;
    }

    const inicio = (paginaAtual - 1) * NOTICIAS_POR_PAGINA;

    const noticiasPagina = noticiasFiltradas.slice(
        inicio,
        inicio + NOTICIAS_POR_PAGINA
    );

    listaNoticias.replaceChildren();

    noticiasPagina.forEach(noticia => {
        listaNoticias.appendChild(criarCard(noticia));
    });

    mensagemVazia.hidden = noticiasFiltradas.length > 0;

    renderizarPaginacao(totalPaginas);
}


/* =========================
   EVENTOS DOS FILTROS
========================= */

botoesCategorias.forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaSelecionada = botao.dataset.categoria;
        paginaAtual = 1;

        botoesCategorias.forEach(item => {
            item.classList.toggle("ativo", item === botao);
        });

        renderizarNoticias();
    });
});


/* =========================
   EVENTO DA BUSCA
========================= */

campoBusca.addEventListener("input", () => {
    termoBusca = campoBusca.value.trim().toLocaleLowerCase("pt-BR");
    paginaAtual = 1;

    renderizarNoticias();
});


/* =========================
   INICIALIZAR
========================= */

carregarNoticias();