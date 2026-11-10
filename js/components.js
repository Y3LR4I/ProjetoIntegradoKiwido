/* =========================
   AJUSTE DE CAMINHOS
========================= */

// Identifica se o site está sendo executado localmente no Laragon.
function ajustarCaminho(caminho) {

    const caminhoLocal = '/projeto-mangue-vivo';

    // Mantém as âncoras na página atual, sem adicionar prefixos.
    if (caminho.startsWith('#')) {
        return caminho;
    }

    const estaNoLaragon =
        window.location.pathname === caminhoLocal ||
        window.location.pathname.startsWith(`${caminhoLocal}/`);

    // Adiciona o prefixo apenas quando estiver no ambiente local.
    return estaNoLaragon
        ? `${caminhoLocal}${caminho}`
        : caminho;
}

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

        // Ajusta os caminhos dos links conforme o ambiente.
        container.querySelectorAll('[data-link]').forEach(link => {
            link.setAttribute(
                'href',
                ajustarCaminho(link.dataset.link)
            );
        });

        // Identifica a página atual e aplica o destaque no menu correspondente.
        marcarPaginaAtual(container);

        // Atualiza o destaque quando a âncora da URL mudar.
        if (seletor === '#header-container') {
            window.addEventListener('hashchange', () => {
                marcarPaginaAtual(container);
            });

            // Seleciona a seção de contato da página.
            const secaoContato = document.querySelector('#contato');

            // Observa a entrada e a saída da seção de contato na tela.
            if (secaoContato) {
                const observadorContato = new IntersectionObserver((entradas) => {
                    entradas.forEach(entrada => {
                        marcarPaginaAtual(container, entrada.isIntersecting);
                    });
                }, {
                    threshold: 0.15,
                    rootMargin: '-120px 0px 0px 0px'
                });

                observadorContato.observe(secaoContato);
            }
        }

    } catch (erro) {
        // Exibe no console qualquer erro ocorrido durante o carregamento.
        console.error('Erro ao carregar componente:', erro);
    }
}


/* =========================
   DESTAQUE DA PÁGINA ATUAL NO MENU
========================= */

// Identifica a página atual e destaca o item correspondente no menu de navegação.
function marcarPaginaAtual(container, contatoVisivel = null) {

    // Obtém o caminho da página atualmente aberta.
    const paginaAtual = window.location.pathname;

    // Obtém a âncora da URL, caso exista.
    const secaoAtual = window.location.hash;

    // A página individual de notícia pertence à seção Conteúdos.
    const paginaParaComparacao = paginaAtual.endsWith('/pages/noticia.html')
        ? paginaAtual.replace('/noticia.html', '/conteudos.html')
        : paginaAtual;

    // Verifica se a página atual é a página inicial.
    const ehPaginaInicial =
        paginaAtual.endsWith('/index.html') ||
        paginaAtual.endsWith('/') ||
        paginaAtual === '/projeto-mangue-vivo';

    // Verifica se a seção de contato está visível na tela.
    // Se não houver uma informação do observador, utiliza a âncora da URL.
    const estaNoContato =
        ehPaginaInicial && (contatoVisivel ?? secaoAtual === '#contato');

    // Seleciona todos os links do menu de navegação.
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
        const ehPaginaInicialComparacao =
            paginaParaComparacao.endsWith('/index.html') ||
            paginaParaComparacao.endsWith('/') ||
            paginaParaComparacao === '/projeto-mangue-vivo';

        // Verifica se o link corresponde à seção de contato.
        const ehLinkContato = urlLink.hash === '#contato';

        // Compara o endereço do link com o caminho da página atual.
        const corresponde = ehLinkContato
            ? estaNoContato
            : (
                (ehHome && ehPaginaInicialComparacao && !estaNoContato) ||
                (caminhoLink === paginaParaComparacao && !ehHome)
            );

        // Adiciona ou remove a classe responsável pelo destaque visual.
        link.classList.toggle('ativo', corresponde);

        // Define a página atual para recursos de acessibilidade.
        if (corresponde) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    // Seleciona os itens principais que possuem submenu.
    const itensMenu = container.querySelectorAll('.menu-item');

    // Percorre os itens para identificar se algum submenu está ativo.
    itensMenu.forEach(item => {

        // Seleciona os links existentes dentro do submenu.
        const linksSubmenu = item.querySelectorAll('.submenu a');

        // Verifica se algum link do submenu corresponde à página atual.
        const submenuAtivo = Array.from(linksSubmenu).some(link => {
            const urlLink = new URL(link.getAttribute('href'), document.baseURI);
            return urlLink.pathname === paginaParaComparacao;
        });

        // Seleciona o botão principal do submenu.
        const botaoPrincipal = item.querySelector('.menu-link');

        // Destaca o botão principal quando algum link do submenu está ativo.
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