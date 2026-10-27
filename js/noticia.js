/* =========================
   ELEMENTOS DA PÁGINA
========================= */

const conteudoNoticia = document.querySelector("#conteudo-noticia");
const corpoNoticia = document.querySelector("#corpo-noticia");
const botaoCompartilhar = document.querySelector("#botao-compartilhar");
const mensagemCompartilhar = document.querySelector("#mensagem-compartilhar");


/* =========================
   ÍCONES SVG
========================= */

function criarIcone(tipo) {
    const icones = {
        calendario: "calendar_month",
        relogio: "schedule"
    };

    const elemento = document.createElement("span");

    elemento.className = "material-symbols-outlined";
    elemento.textContent = icones[tipo] || "";
    elemento.setAttribute("aria-hidden", "true");

    return elemento;
}


/* =========================
   CRIAR ELEMENTO COM TEXTO
========================= */

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}


/* =========================
   FORMATAR DATA
========================= */

function formatarData(data) {
    const partes = data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    const [ano, mes, dia] = partes;
    const dataLocal = new Date(
        Number(ano),
        Number(mes) - 1,
        Number(dia)
    );

    return dataLocal.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}


/* =========================
   CALCULAR TEMPO DE LEITURA
========================= */

function calcularTempoLeitura(conteudo) {
    const textoCompleto = conteudo
        .map(item => item.texto || "")
        .join(" ");

    const quantidadePalavras = textoCompleto
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .length;

    const minutos = Math.max(
        1,
        Math.ceil(quantidadePalavras / 200)
    );

    return `${minutos} min de leitura`;
}


/* =========================
   MONTAR CABEÇALHO
========================= */

function renderizarCabecalho(noticia) {
    conteudoNoticia.replaceChildren();

    const metadados = criarElemento("div", "noticia-metadados");

    const categoria = criarElemento(
        "span",
        "noticia-categoria",
        noticia.categoria
    );

    const data = criarElemento("time", "noticia-data");
    data.dateTime = noticia.data;
    data.appendChild(criarIcone("calendario"));
    data.appendChild(
        criarElemento("span", "", formatarData(noticia.data))
    );

    metadados.append(categoria, data);

    const titulo = criarElemento(
        "h1",
        "noticia-titulo",
        noticia.titulo
    );

    const sinopse = criarElemento(
        "p",
        "noticia-sinopse",
        noticia.sinopse
    );

    const informacoesAutor = criarElemento(
        "div",
        "noticia-informacoes-autor"
    );

    const autor = criarElemento("div", "noticia-autor");

    const nomeAutor = noticia.autor || "Equipe Mangue Vivo";
    const fotoAutor = noticia.fotoAutor;

    if (fotoAutor) {
        const imagemAutor = criarElemento("img", "noticia-autor-foto");
        imagemAutor.src = fotoAutor;
        imagemAutor.alt = `Foto de ${nomeAutor}`;
        imagemAutor.loading = "lazy";

        imagemAutor.addEventListener("error", () => {
            const iniciais = criarElemento(
                "div",
                "noticia-autor-foto noticia-autor-iniciais",
                nomeAutor
                    .split(/\s+/)
                    .slice(0, 2)
                    .map(nome => nome[0])
                    .join("")
                    .toUpperCase()
            );

            iniciais.setAttribute("aria-label", nomeAutor);
            imagemAutor.replaceWith(iniciais);
        }, { once: true });

        autor.appendChild(imagemAutor);
    } else {
        const iniciais = criarElemento(
            "div",
            "noticia-autor-foto noticia-autor-iniciais",
            nomeAutor
                .split(/\s+/)
                .slice(0, 2)
                .map(nome => nome[0])
                .join("")
                .toUpperCase()
        );

        iniciais.setAttribute("aria-label", nomeAutor);
        autor.appendChild(iniciais);
    }

    const dadosAutor = criarElemento("div", "");

    const textoAutor = criarElemento("p", "noticia-autor-nome");

    textoAutor.appendChild(
        document.createTextNode("Por ")
    );

    textoAutor.appendChild(
        criarElemento("strong", "", nomeAutor)
    );

    dadosAutor.appendChild(textoAutor);

    autor.appendChild(dadosAutor);

    const tempoLeitura = criarElemento(
        "div",
        "noticia-tempo-leitura"
    );

    tempoLeitura.appendChild(criarIcone("relogio"));

    tempoLeitura.appendChild(
        criarElemento(
            "span",
            "",
            calcularTempoLeitura(noticia.conteudo || [])
        )
    );

    informacoesAutor.append(autor, tempoLeitura);

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

function renderizarCorpo(noticia) {
    corpoNoticia.replaceChildren();

    const imagem = criarElemento("img", "noticia-imagem-destaque");

    imagem.src = noticia.imagem;
    imagem.alt = noticia.titulo;
    imagem.loading = "eager";
    imagem.decoding = "async";

    imagem.addEventListener("error", () => {
        imagem.remove();
    }, { once: true });

    corpoNoticia.appendChild(imagem);

    const conteudo = Array.isArray(noticia.conteudo)
        ? noticia.conteudo
        : [];

    conteudo.forEach(item => {
        let elemento;

        if (item.tipo === "subtitulo") {
            elemento = criarElemento(
                "h2",
                "noticia-subtitulo",
                item.texto
            );
        } else {
            elemento = criarElemento(
                "p",
                "noticia-paragrafo",
                item.texto
            );
        }

        corpoNoticia.appendChild(elemento);
    });

    if (conteudo.length === 0 && noticia.texto) {
        noticia.texto
            .split(/\n\s*\n/)
            .filter(paragrafo => paragrafo.trim())
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

async function compartilharNoticia() {
    const titulo = document.querySelector(".noticia-titulo");

    if (!titulo) {
        return;
    }

    const dadosCompartilhamento = {
        title: document.title,
        text: titulo.textContent,
        url: window.location.href
    };

    mensagemCompartilhar.textContent = "";

    if (navigator.share) {
        try {
            await navigator.share(dadosCompartilhamento);
        } catch (erro) {
            if (erro.name !== "AbortError") {
                mensagemCompartilhar.textContent =
                    "Não foi possível abrir o compartilhamento.";
            }
        }

        return;
    }

    try {
        await navigator.clipboard.writeText(window.location.href);

        mensagemCompartilhar.textContent =
            "Link da notícia copiado!";
    } catch (erro) {
        mensagemCompartilhar.textContent =
            "Não foi possível copiar automaticamente. Copie o endereço do navegador.";
    }
}

botaoCompartilhar.addEventListener("click", compartilharNoticia);

/* =========================
   NAVEGAÇÃO ENTRE NOTÍCIAS
========================= */

function renderizarNavegacaoNoticias(noticias, noticiaAtual) {
    const navegacao = document.querySelector("#navegacao-noticias");

    if (!navegacao) {
        return;
    }

    navegacao.replaceChildren();

    // Ordena da notícia mais recente para a mais antiga.
    const noticiasOrdenadas = [...noticias].sort((a, b) => {
        const comparacaoData = String(b.data || "")
            .localeCompare(String(a.data || ""));

        if (comparacaoData !== 0) {
            return comparacaoData;
        }

        // Desempate para notícias publicadas na mesma data.
        return Number(b.id) - Number(a.id);
    });

    const indiceAtual = noticiasOrdenadas.findIndex(
        noticia => String(noticia.id) === String(noticiaAtual.id)
    );

    if (indiceAtual === -1) {
        return;
    }

    // Como a lista está em ordem decrescente:
    // índice + 1 = notícia anterior, mais antiga.
    // índice - 1 = próxima notícia, mais recente.
    const noticiaAnterior = noticiasOrdenadas[indiceAtual + 1];
    const proximaNoticia = noticiasOrdenadas[indiceAtual - 1];

    function criarCard(noticia, tipo) {
        if (!noticia) {
            return null;
        }

        const link = criarElemento(
            "a",
            `card-navegacao-noticia card-${tipo}`
        );

        link.href = `noticia.html?id=${encodeURIComponent(noticia.id)}`;

        const indicador = criarElemento(
            "span",
            "card-navegacao-indicador"
        );

        const icone = criarElemento(
            "span",
            "material-symbols-outlined",
            tipo === "anterior" ? "chevron_left" : "chevron_right"
        );

        icone.setAttribute("aria-hidden", "true");

        const textoIndicador = criarElemento(
            "span",
            "",
            tipo === "anterior" ? "Notícia anterior" : "Próxima notícia"
        );

        if (tipo === "anterior") {
            indicador.append(icone, textoIndicador);
        } else {
            indicador.append(textoIndicador, icone);
        }

        const titulo = criarElemento(
            "span",
            "card-navegacao-titulo",
            noticia.titulo
        );

        link.append(indicador, titulo);

        return link;
    }

    const cardAnterior = criarCard(noticiaAnterior, "anterior");
    const cardProxima = criarCard(proximaNoticia, "proxima");

    if (cardAnterior) {
        navegacao.appendChild(cardAnterior);
    }

    if (cardProxima) {
        navegacao.appendChild(cardProxima);
    }

    // Não exibe o espaço de navegação se só houver uma notícia.
    navegacao.hidden = navegacao.childElementCount === 0;
}

/* =========================
   CARREGAR NOTÍCIA
========================= */

async function carregarNoticia() {
    const parametros = new URLSearchParams(window.location.search);
    const id = parametros.get("id");

    if (!id) {
        exibirErro("Nenhuma notícia foi selecionada.");
        return;
    }

    try {
        const resposta = await fetch("../data/noticias.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar as notícias.");
        }

        const noticias = await resposta.json();

        const noticia = noticias.find(
            item => String(item.id) === id
        );

        if (!noticia) {
            exibirErro("A notícia solicitada não foi encontrada.");
            return;
        }

        renderizarCabecalho(noticia);
        renderizarCorpo(noticia);
        renderizarNavegacaoNoticias(noticias, noticia);

        document.title = `${noticia.titulo} | Mangue Vivo`;
    } catch (erro) {
        console.error("Erro ao carregar notícia:", erro);
        exibirErro(
            "Não foi possível carregar a notícia. Verifique se o arquivo JSON está acessível."
        );
    }
}


/* =========================
   EXIBIR ERRO
========================= */

function exibirErro(mensagem) {
    conteudoNoticia.replaceChildren();

    const erro = criarElemento("p", "noticia-erro", mensagem);
    conteudoNoticia.appendChild(erro);
}


/* =========================
   INICIAR
========================= */

carregarNoticia();