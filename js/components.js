/* =========================
   CARREGAMENTO DE COMPONENTES
========================= */

// Carrega um componente HTML externo e insere seu conteúdo no elemento indicado.
async function carregarComponente(seletor, caminho) {

    // Localiza o elemento que receberá o componente.
    const container = document.querySelector(seletor);

    // Interrompe a execução caso o elemento não exista na página.
    if (!container) return;

    try {
        // Solicita o arquivo HTML do componente.
        const resposta = await fetch(caminho);

        // Verifica se a solicitação foi realizada corretamente.
        if (!resposta.ok) {
            throw new Error(`Erro ao carregar ${caminho}`);
        }

        // Insere o conteúdo HTML recebido dentro do elemento.
        container.innerHTML = await resposta.text();

        // Identifica a página atual e aplica o destaque no menu correspondente.
        marcarPaginaAtual(container);

    } catch (erro) {
        // Exibe no console qualquer erro ocorrido durante o carregamento.
        console.error('Erro ao carregar componente:', erro);
    }
}


/* =========================
   DESTAQUE DA PÁGINA ATUAL NO MENU
========================= */

// Identifica a página atual e destaca o item correspondente no menu de navegação.
function marcarPaginaAtual(container) {

    // Obtém o caminho da página atualmente aberta.
    const paginaAtual = window.location.pathname;

    // A página individual de notícia pertence à seção Conteúdos.
    const paginaParaComparacao = paginaAtual.endsWith('/pages/noticia.html')
        ? paginaAtual.replace('/noticia.html', '/conteudos.html')
        : paginaAtual;

    // Seleciona todos os links do menu principal.
    const links = container.querySelectorAll('.menu a');

    // Percorre os links para identificar qual corresponde à página atual.
    links.forEach(link => {

        // Obtém o endereço completo do link.
        const urlLink = new URL(link.getAttribute('href'), document.baseURI);
        const caminhoLink = urlLink.pathname;

        // Verifica se o link corresponde à página inicial.
        const ehHome =
            caminhoLink.endsWith('/index.html') ||
            caminhoLink.endsWith('/');

        // Verifica se a página atual também é a página inicial.
        const ehPaginaInicial =
            paginaParaComparacao.endsWith('/index.html') ||
            paginaParaComparacao.endsWith('/');

        // Compara o endereço do link com o caminho da página atual.
        const corresponde =
            caminhoLink === paginaParaComparacao ||
            (ehHome && ehPaginaInicial);

        // Adiciona ou remove a classe responsável pelo destaque visual.
        link.classList.toggle('ativo', corresponde);

        // Define a página atual para recursos de acessibilidade.
        if (corresponde) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    // Seleciona os itens do menu que possuem submenus.
    const itensMenu = container.querySelectorAll('.menu-item');

    // Percorre cada item para verificar se alguma página do submenu está aberta.
    itensMenu.forEach(item => {

        // Seleciona os links existentes dentro do submenu.
        const linksSubmenu = item.querySelectorAll('.submenu a');

        // Verifica se algum link do submenu corresponde à página atual.
        const submenuAtivo = Array.from(linksSubmenu).some(link => {
            const urlLink = new URL(link.getAttribute('href'), document.baseURI);
            return urlLink.pathname === paginaParaComparacao;
        });

        // Localiza o botão principal responsável por abrir o submenu.
        const botaoPrincipal = item.querySelector('.menu-link');

        // Aplica o destaque ao botão quando uma página do submenu está aberta.
        if (botaoPrincipal) {
            botaoPrincipal.classList.toggle('ativo', submenuAtivo);
        }
    });
}


/* =========================
   CARREGAMENTO DO HEADER
========================= */

// Carrega o arquivo header.html dentro do elemento #header-container.
carregarComponente(
    '#header-container',
    new URL('../components/header.html', document.currentScript.src).href
);


/* =========================
   CARREGAMENTO DO FOOTER
========================= */

// Obtém o caminho da pasta onde estão armazenados os componentes.
const urlComponents = new URL('../components/', document.currentScript.src);

// Carrega o arquivo footer.html dentro do elemento #footer-container.
carregarComponente(
    '#footer-container',
    new URL('footer.html', urlComponents).href
);