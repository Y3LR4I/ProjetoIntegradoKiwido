
document.addEventListener('DOMContentLoaded', async () => {

    // =========================================
    // CONFIGURAÇÕES
    // =========================================

    const botoesFiltros = document.querySelectorAll(
        '.galeria-categorias .categoria-btn'
    );

    const secoesGaleria = document.querySelectorAll(
        '.galeria-secao'
    );

    let dadosGaleria = {};

    let indiceImagemAtual = 0;
    let imagensAlbumAtual = [];


    // =========================================
    // CARREGAR DADOS DA GALERIA
    // =========================================

    async function carregarGaleria() {

        try {

            const resposta = await fetch('../data/galeria.json');

            if (!resposta.ok) {
                throw new Error('Não foi possível carregar a galeria.');
            }

            dadosGaleria = await resposta.json();

            preencherGaleria(dadosGaleria);

        } catch (erro) {

            console.error('Erro ao carregar a galeria:', erro);

        }

    }


    // =========================================
    // PREENCHER PRÉVIAS DOS ÁLBUNS
    // =========================================

    function preencherGaleria(galeria) {

        secoesGaleria.forEach(secao => {

            const categoria = secao.dataset.categoria;

            const imagens = Array.isArray(galeria[categoria])
                ? galeria[categoria]
                : [];

            const espacosImagens = secao.querySelectorAll(
                '.galeria-imagem'
            );

            espacosImagens.forEach((espaco, indice) => {

                const imagem = imagens[indice];

                if (!imagem) {

                    espaco.replaceChildren();
                    espaco.hidden = true;

                    return;

                }

                const img = document.createElement('img');

                img.src = imagem.src;
                img.alt = imagem.alt || 'Imagem da galeria do Mangue Vivo';
                img.loading = 'lazy';

                espaco.replaceChildren(img);
                espaco.hidden = false;

            });


            // Oculta a coluna de imagens empilhadas
            // caso todos os espaços estejam vazios.

            const imagensEmpilhadas = secao.querySelector(
                '.galeria-imagens-empilhadas'
            );

            if (imagensEmpilhadas) {

                const possuiImagens = Array.from(
                    imagensEmpilhadas.querySelectorAll('.galeria-imagem')
                ).some(espaco => !espaco.hidden);

                imagensEmpilhadas.hidden = !possuiImagens;

            }

        });

    }


    // =========================================
    // CRIAR MODAL DO ÁLBUM
    // =========================================

    function criarModalAlbum() {

        if (document.querySelector('#modal-galeria')) {
            return;
        }

        document.body.insertAdjacentHTML('beforeend', `

            <div
                class="modal fade"
                id="modal-galeria"
                tabindex="-1"
                aria-labelledby="modal-galeria-titulo"
                aria-hidden="true">

                <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">

                    <div class="modal-content galeria-modal-content">

                        <!-- Cabeçalho verde -->

                        <div class="galeria-modal-header">

                            <h5
                                class="galeria-modal-titulo"
                                id="modal-galeria-titulo">
                                Álbum
                            </h5>

                            <button
                                type="button"
                                class="galeria-modal-fechar"
                                data-bs-dismiss="modal"
                                aria-label="Fechar álbum">

                                <span class="material-symbols-outlined">
                                    close
                                </span>

                            </button>

                        </div>


                        <!-- Conteúdo do álbum -->

                        <div class="modal-body galeria-modal-body">

                            <!-- Imagem principal -->

                            <div class="galeria-modal-imagem-principal">

                                <img
                                    id="galeria-imagem-atual"
                                    src=""
                                    alt="">

                            </div>


                            <!-- Miniaturas -->

                            <div
                                class="galeria-modal-miniaturas"
                                id="galeria-miniaturas">
                            </div>


                            <!-- Navegação e contador -->

                            <div class="galeria-modal-navegacao">

                                <button
                                    type="button"
                                    class="galeria-modal-seta"
                                    id="galeria-voltar"
                                    aria-label="Imagem anterior">

                                    <span class="material-symbols-outlined">
                                        chevron_left
                                    </span>

                                </button>

                                <span
                                    class="galeria-modal-contador"
                                    id="galeria-contador">
                                    1 / 1
                                </span>

                                <button
                                    type="button"
                                    class="galeria-modal-seta"
                                    id="galeria-avancar"
                                    aria-label="Próxima imagem">

                                    <span class="material-symbols-outlined">
                                        chevron_right
                                    </span>

                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        `);

        // Eventos dos botões de navegação.

        document.querySelector('#galeria-voltar')
            .addEventListener('click', imagemAnterior);

        document.querySelector('#galeria-avancar')
            .addEventListener('click', proximaImagem);

    }


    // =========================================
    // ABRIR ÁLBUM
    // =========================================

    function abrirAlbum(categoria) {

        const imagens = dadosGaleria[categoria];

        if (!Array.isArray(imagens) || imagens.length === 0) {
            console.warn('Este álbum não possui imagens:', categoria);
            return;
        }

        imagensAlbumAtual = imagens;
        indiceImagemAtual = 0;

        criarModalAlbum();

        const secao = document.querySelector(
            `.galeria-secao[data-categoria="${categoria}"]`
        );

        const titulo = secao.querySelector('h2').textContent;

        document.querySelector('#modal-galeria-titulo').textContent = titulo;

        renderizarImagemAtual();

        renderizarMiniaturas();

        const elementoModal = document.querySelector('#modal-galeria');

        const modal = bootstrap.Modal.getOrCreateInstance(elementoModal);

        modal.show();

    }


    // =========================================
    // RENDERIZAR IMAGEM ATUAL
    // =========================================

    function renderizarImagemAtual() {

        const imagem = imagensAlbumAtual[indiceImagemAtual];

        if (!imagem) {
            return;
        }

        const imagemPrincipal = document.querySelector(
            '#galeria-imagem-atual'
        );

        const contador = document.querySelector(
            '#galeria-contador'
        );

        const botaoVoltar = document.querySelector(
            '#galeria-voltar'
        );

        const botaoAvancar = document.querySelector(
            '#galeria-avancar'
        );

        const miniaturas = document.querySelector(
            '#galeria-miniaturas'
        );


        // Atualiza a imagem principal.

        imagemPrincipal.src = imagem.src;

        imagemPrincipal.alt = imagem.alt ||
            'Imagem da galeria do Mangue Vivo';


        // Atualiza o contador.

        contador.textContent =
            `${indiceImagemAtual + 1} / ${imagensAlbumAtual.length}`;


        // Controla os limites da navegação.

        botaoVoltar.disabled = indiceImagemAtual === 0;

        botaoAvancar.disabled =
            indiceImagemAtual === imagensAlbumAtual.length - 1;


        // Atualiza a miniatura selecionada.

        miniaturas.querySelectorAll('.galeria-miniatura')
            .forEach((miniatura, indice) => {

                const selecionada = indice === indiceImagemAtual;

                miniatura.classList.toggle('ativo', selecionada);

                if (selecionada) {
                    miniatura.setAttribute('aria-current', 'true');
                } else {
                    miniatura.removeAttribute('aria-current');
                }

            });

    }


    // =========================================
    // GERAR MINIATURAS
    // =========================================

    function renderizarMiniaturas() {

        const container = document.querySelector(
            '#galeria-miniaturas'
        );

        container.replaceChildren();

        imagensAlbumAtual.forEach((imagem, indice) => {

            const botao = document.createElement('button');

            botao.type = 'button';

            botao.className = 'galeria-miniatura';

            botao.setAttribute(
                'aria-label',
                `Visualizar imagem ${indice + 1}`
            );

            const img = document.createElement('img');

            img.src = imagem.src;

            img.alt = '';

            img.loading = 'lazy';

            botao.appendChild(img);

            botao.addEventListener('click', () => {

                indiceImagemAtual = indice;

                renderizarImagemAtual();

            });

            container.appendChild(botao);

        });

    }


    // =========================================
    // NAVEGAÇÃO DO ÁLBUM
    // =========================================

    function imagemAnterior() {

        if (indiceImagemAtual <= 0) {
            return;
        }

        indiceImagemAtual--;

        renderizarImagemAtual();

    }


    function proximaImagem() {

        if (indiceImagemAtual >= imagensAlbumAtual.length - 1) {
            return;
        }

        indiceImagemAtual++;

        renderizarImagemAtual();

    }


    // =========================================
    // EVENTOS DOS FILTROS
    // =========================================

    botoesFiltros.forEach(botao => {

        botao.addEventListener('click', () => {

            const categoriaSelecionada = botao.dataset.categoria;

            botoesFiltros.forEach(filtro => {
                filtro.classList.remove('ativo');
            });

            botao.classList.add('ativo');

            secoesGaleria.forEach(secao => {

                const categoriaSecao = secao.dataset.categoria;

                const exibir =
                    categoriaSelecionada === 'todos' ||
                    categoriaSelecionada === categoriaSecao;

                secao.hidden = !exibir;

            });

        });

    });


    // =========================================
    // EVENTOS DOS BOTÕES ABRIR ÁLBUM
    // =========================================

    document.querySelectorAll('.galeria-abrir-album')
        .forEach(botao => {

            botao.addEventListener('click', () => {

                const categoria = botao.dataset.album;

                abrirAlbum(categoria);

            });

        });


    // =========================================
    // INICIALIZAÇÃO
    // =========================================

    await carregarGaleria();

});
