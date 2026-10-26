async function carregarComponente(seletor, caminho) {
    const container = document.querySelector(seletor);

    if (!container) return;

    try {
        const resposta = await fetch(caminho);

        if (!resposta.ok) {
            throw new Error(`Erro ao carregar ${caminho}`);
        }

        container.innerHTML = await resposta.text();

        marcarPaginaAtual(container);

    } catch (erro) {
        console.error('Erro ao carregar componente:', erro);
    }
}


function marcarPaginaAtual(container) {
    const paginaAtual = window.location.pathname;
    const links = container.querySelectorAll('.menu a');

    // A página individual de notícia pertence à seção Conteúdos.
    const paginaParaComparacao = paginaAtual.endsWith('/pages/noticia.html')
        ? paginaAtual.replace('/noticia.html', '/conteudos.html')
        : paginaAtual;

    links.forEach(link => {
        const urlLink = new URL(link.getAttribute('href'), document.baseURI);
        const caminhoLink = urlLink.pathname;

        const ehHome =
            caminhoLink.endsWith('/index.html') ||
            caminhoLink.endsWith('/');

        const ehPaginaInicial =
            paginaParaComparacao.endsWith('/index.html') ||
            paginaParaComparacao.endsWith('/');

        const corresponde =
            caminhoLink === paginaParaComparacao ||
            (ehHome && ehPaginaInicial);

        link.classList.toggle('ativo', corresponde);

        if (corresponde) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}


carregarComponente(
    '#header-container',
    new URL('../components/header.html', document.currentScript.src).href
);

const urlComponents = new URL('../components/', document.currentScript.src);

carregarComponente(
    '#footer-container',
    new URL('footer.html', urlComponents).href
);