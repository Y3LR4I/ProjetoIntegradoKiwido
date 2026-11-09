
const modalTutorial = document.getElementById("modal-tutorial");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao");

const btnFecharModal = document.getElementById("fechar-modal");
const btnEntendi = document.getElementById("btn-entendi");

const containerJogos = document.getElementById("cards-container");

let ultimoBotaoTutorial = null;

// Pega os arquivos.json e traduz em objetos
async function carregarJogos() {
    try {
        const resposta = await fetch("../data/jogos.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar os jogos.");
        }

        const jogos = await resposta.json();

        containerJogos.innerHTML = "";

        jogos.forEach(jogo => { criarCard(jogo); });

    } catch (erro) {
        console.error("Erro ao carregar os jogos:", erro);

        containerJogos.textContent = "Não foi possível carregar os jogos no momento.";
    }
}

// Comeca a criacao dos cards, desde a organizacao ate a intansiacao de conteudos
function criarCard(jogo) {
    const card = document.createElement("article");
    card.classList.add("card-jogo");

    const banner = document.createElement("div");
    banner.classList.add("banner-jogo");
    banner.style.backgroundImage = `url("${jogo.imagem}")`;

    const conteudo = document.createElement("div");
    conteudo.classList.add("conteudo-card");

    const titulo = document.createElement("h2");
    titulo.textContent = jogo.titulo;

    const descricao = document.createElement("p");
    descricao.textContent = jogo.descricao;

    const botoes = document.createElement("div");
    botoes.classList.add("container-botoes");

    const btnJogar = document.createElement("a");
    btnJogar.classList.add("btn-jogar");
    btnJogar.href = jogo.link;

    const iconePlay = document.createElement("span");
    iconePlay.classList.add("icone-play");

    btnJogar.appendChild(iconePlay);
    btnJogar.append(document.createTextNode(jogo.botao || "Jogar"));

    botoes.appendChild(btnJogar);

    // Aqui é pegando os elementos do tutorial modular
    if (jogo.tutorial) {
        const btnTutorial = document.createElement("button");

        btnTutorial.type = "button";
        btnTutorial.classList.add("btn-tutorial");
        btnTutorial.dataset.titulo = jogo.tutorial.titulo;
        btnTutorial.dataset.descricao = jogo.tutorial.descricao;
        btnTutorial.textContent = "Como jogar";

        botoes.appendChild(btnTutorial);
    }

    conteudo.appendChild(titulo);
    conteudo.appendChild(descricao);
    conteudo.appendChild(botoes);

    card.appendChild(banner);
    card.appendChild(conteudo);

    containerJogos.appendChild(card);
}

function abrirModal(botao) {
    const titulo = botao.dataset.titulo;
    const descricao = botao.dataset.descricao;

    ultimoBotaoTutorial = botao;

    modalTitulo.textContent = titulo;
    modalDescricao.textContent = descricao;

    modalTutorial.classList.add("aberto");
    modalTutorial.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    btnFecharModal.focus();
}

function fecharModal() {
    modalTutorial.classList.remove("aberto");
    modalTutorial.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    if (ultimoBotaoTutorial) {
        ultimoBotaoTutorial.focus();
    }
}

document.addEventListener("click", (evento) => {
    const botaoTutorial = evento.target.closest(".btn-tutorial");

    if (botaoTutorial) {
        abrirModal(botaoTutorial);
    }
});

btnFecharModal.addEventListener("click", fecharModal);

btnEntendi.addEventListener("click", fecharModal);

modalTutorial.addEventListener("click", (evento) => {
    if (evento.target === modalTutorial) {
        fecharModal();
    }
});

document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && modalTutorial.classList.contains("aberto")) {
        fecharModal();
    }
});

carregarJogos();
