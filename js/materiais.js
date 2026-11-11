
document.addEventListener('DOMContentLoaded', async () => {

    // =========================================
    // CONFIGURAÇÕES
    // =========================================

    const MATERIAIS_POR_PAGINA = 9;

    const listaMateriais = document.querySelector('#lista-materiais');
    const buscaMateriais = document.querySelector('#busca-materiais');
    const mensagemVazia = document.querySelector('#mensagem-vazia');
    const paginacao = document.querySelector('#paginacao-materiais');
    const navegacao = document.querySelector('#navegacao-materiais');
    const botoesCategoria = document.querySelectorAll('.categoria-btn');

    let materiais = [];
    let materiaisFiltrados = [];
    let categoriaAtual = 'Todas';
    let paginaAtual = 1;

    // Configuração do PDF.js
    if (window.pdfjsLib) {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }


    // =========================================
    // CARREGAR MATERIAIS DO JSON
    // =========================================

    async function carregarMateriais() {

        try {

            const resposta = await fetch('../data/materiais.json');

            if (!resposta.ok) {
                throw new Error('Não foi possível carregar os materiais.');
            }

            materiais = await resposta.json();

            materiaisFiltrados = [...materiais];

            renderizarMateriais();

        } catch (erro) {

            console.error('Erro ao carregar materiais:', erro);

            listaMateriais.innerHTML = `
                <div class="col-12 text-center">
                    <p>Não foi possível carregar os materiais.</p>
                </div>
            `;

        }

    }


    // =========================================
    // PROTEGER TEXTOS INSERIDOS NO HTML
    // =========================================

    function escaparHTML(texto) {

        return String(texto ?? '').replace(/[&<>"']/g, caractere => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        })[caractere]);

    }


    // =========================================
    // GERAR PRÉVIA DO PDF
    // =========================================

    async function renderizarPreviaPDF(canvas, caminhoPDF) {

        try {

            if (!window.pdfjsLib) {
                throw new Error('PDF.js não foi carregado.');
            }

            const documento = await pdfjsLib.getDocument(caminhoPDF).promise;

            const pagina = await documento.getPage(1);

            const larguraDesejada = 600;

            const viewportOriginal = pagina.getViewport({ scale: 1 });

            const escala = larguraDesejada / viewportOriginal.width;

            const viewport = pagina.getViewport({ scale: escala });

            const contexto = canvas.getContext('2d');

            canvas.width = viewport.width;
            canvas.height = viewport.height;

            await pagina.render({
                canvasContext: contexto,
                viewport: viewport
            }).promise;

        } catch (erro) {

            console.error('Erro ao gerar prévia do PDF:', erro);

            canvas.closest('.material-preview').innerHTML = `
                <div class="material-preview-erro">
                    <span class="material-symbols-outlined">picture_as_pdf</span>
                    <p>Prévia indisponível</p>
                </div>
            `;

        }

    }


    // =========================================
    // GERAR PRÉVIA DO MATERIAL
    // =========================================


    function gerarPrevia(material) {

        // =========================================
        // VÍDEOS
        // =========================================

        if (material.tipoArquivo === 'video') {

            if (!material.youtubeId) {
                return `
                <div class="material-preview-erro">
                    <span class="material-symbols-outlined">play_circle</span>
                    <p>Vídeo indisponível</p>
                </div>
            `;
            }

            const videoId = escaparHTML(material.youtubeId);

            return `
            <div class="material-preview material-preview-video">

                <iframe
                    src="https://www.youtube-nocookie.com/embed/${videoId}?controls=0"
                    title="${escaparHTML(material.titulo)}"
                    loading="lazy"
                    tabindex="-1"
                    aria-hidden="true">
                </iframe>

                <a
                    class="material-video-link"
                    href="https://www.youtube.com/watch?v=${encodeURIComponent(material.youtubeId)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Assistir ${escaparHTML(material.titulo)} no YouTube">
                </a>

                <span class="material-video-icone material-symbols-outlined">
                    play_circle
                </span>

            </div>
        `;
        }


        // =========================================
        // PDF E PPTX
        // =========================================

        if (
            material.tipoArquivo === 'pdf' ||
            material.tipoArquivo === 'pptx'
        ) {

            if (!material.arquivoVisualizacao) {
                return `
                <div class="material-preview-erro">
                    <span class="material-symbols-outlined">description</span>
                    <p>Prévia indisponível</p>
                </div>
            `;
            }

            return `
            <div class="material-preview">

                <canvas
                    class="material-pdf-preview"
                    data-pdf="${escaparHTML(material.arquivoVisualizacao)}">
                </canvas>

            </div>
        `;
        }


        // =========================================
        // FORMATO NÃO RECONHECIDO
        // =========================================

        return `
        <div class="material-preview-erro">
            <span class="material-symbols-outlined">description</span>
            <p>Prévia indisponível</p>
        </div>
        `;
    }


    // =========================================
    // GERAR BOTÃO DE DOWNLOAD
    // =========================================

    function gerarBotaoDownload(material) {

        if (material.arquivoDownload) {

            return `
                <a
                    class="material-download ativo"
                    href="${escaparHTML(material.arquivoDownload)}"
                    download
                    aria-label="Baixar ${escaparHTML(material.titulo)}"
                    title="Baixar material">

                    <span class="material-symbols-outlined">
                        download
                    </span>

                </a>
            `;

        }

        return `
            <button
                class="material-download inativo"
                type="button"
                disabled
                aria-label="Download indisponível"
                title="Download indisponível">

                <span class="material-symbols-outlined">
                    download
                </span>

            </button>
        `;

    }


    // =========================================
    // GERAR CARDS
    // =========================================

    function gerarCard(material) {

        const categoria = material.categoria === 'Videos'
            ? 'Vídeos'
            : material.categoria;

        return `

            <div class="col-12 col-md-6 col-lg-4">

                <article class="material-card">

                    <div class="material-card-imagem">

                        ${gerarPrevia(material)}

                        ${gerarBotaoDownload(material)}

                    </div>

                    <div class="material-card-conteudo">

                        <span class="material-card-categoria">
                            ${escaparHTML(categoria)}
                        </span>

                        <h3>
                            ${escaparHTML(material.titulo)}
                        </h3>

                        <p>
                            ${escaparHTML(material.subtitulo)}
                        </p>

                        <div class="material-card-acao">

                            <button
                                type="button"
                                class="material-card-abrir"
                                data-material-id="${material.id}">

                                Abrir
                                <span class="material-symbols-outlined">
                                    arrow_forward
                                </span>

                            </button>

                        </div>

                    </div>

                </article>

            </div>

        `;

    }


    // =========================================
    // RENDERIZAR MATERIAIS
    // =========================================

    function renderizarMateriais() {

        const inicio = (paginaAtual - 1) * MATERIAIS_POR_PAGINA;

        const fim = inicio + MATERIAIS_POR_PAGINA;

        const materiaisPagina = materiaisFiltrados.slice(inicio, fim);

        listaMateriais.innerHTML = materiaisPagina
            .map(material => gerarCard(material))
            .join('');

        mensagemVazia.hidden = materiaisFiltrados.length > 0;

        navegacao.hidden = materiaisFiltrados.length <= MATERIAIS_POR_PAGINA;

        renderizarPaginacao();

        // Gerar prévias dos PDFs presentes na página
        listaMateriais
            .querySelectorAll('.material-pdf-preview')
            .forEach(canvas => {

                renderizarPreviaPDF(
                    canvas,
                    canvas.dataset.pdf
                );

            });

    }


    // =========================================
    // PAGINAÇÃO
    // =========================================

    function renderizarPaginacao() {

        const totalPaginas = Math.ceil(
            materiaisFiltrados.length / MATERIAIS_POR_PAGINA
        );

        paginacao.innerHTML = '';

        if (totalPaginas <= 1) {
            return;
        }

        // Botão anterior
        paginacao.innerHTML += `
            <li class="page-item ${paginaAtual === 1 ? 'disabled' : ''}">

                <button class="page-link" type="button" data-pagina="${paginaAtual - 1}">
                    &laquo;
                </button>

            </li>
        `;

        // Números das páginas
        for (let pagina = 1; pagina <= totalPaginas; pagina++) {

            paginacao.innerHTML += `
                <li class="page-item ${pagina === paginaAtual ? 'active' : ''}">

                    <button class="page-link" type="button" data-pagina="${pagina}">
                        ${pagina}
                    </button>

                </li>
            `;

        }

        // Botão próximo
        paginacao.innerHTML += `
            <li class="page-item ${paginaAtual === totalPaginas ? 'disabled' : ''}">

                <button class="page-link" type="button" data-pagina="${paginaAtual + 1}">
                    &raquo;
                </button>

            </li>
        `;

    }


    // =========================================
    // FILTRAR MATERIAIS
    // =========================================

    function filtrarMateriais() {

        const termo = buscaMateriais.value
            .trim()
            .toLowerCase();

        materiaisFiltrados = materiais.filter(material => {

            const correspondeCategoria =
                categoriaAtual === 'Todas' ||
                material.categoria === categoriaAtual;

            const correspondeBusca =
                material.titulo.toLowerCase().includes(termo) ||
                material.subtitulo.toLowerCase().includes(termo);

            return correspondeCategoria && correspondeBusca;

        });

        paginaAtual = 1;

        renderizarMateriais();

    }


    // =========================================
    // MODAL DE VISUALIZAÇÃO
    // =========================================

    function criarModal() {

        if (document.querySelector('#modal-material')) {
            return;
        }

        document.body.insertAdjacentHTML('beforeend', `

            <div class="modal fade" id="modal-material" tabindex="-1"
                aria-labelledby="modal-material-titulo" aria-hidden="true">

                <div class="modal-dialog modal-xl modal-dialog-centered">

                    <div class="modal-content">

                        <div class="modal-header">

                            <h5 class="modal-title" id="modal-material-titulo">
                                Visualização do material
                            </h5>

                            <button type="button" class="btn-close"
                                data-bs-dismiss="modal" aria-label="Fechar">
                            </button>

                        </div>

                        <div class="modal-body p-0">

                            <iframe
                                id="modal-material-iframe"
                                title="Visualização do material"
                                width="100%"
                                height="750"
                                style="border: none;"
                                src="about:blank">
                            </iframe>

                        </div>

                    </div>

                </div>

            </div>

        `);

    }



    function abrirMaterial(material) {

        // =========================================
        // VÍDEOS
        // =========================================

        if (material.tipoArquivo === 'video') {

            if (!material.youtubeId) {
                return;
            }

            const urlVideo =
                `https://www.youtube.com/watch?v=${encodeURIComponent(material.youtubeId)}`;

            window.open(urlVideo, '_blank', 'noopener,noreferrer');

            return;
        }


        // =========================================
        // PDF E PPTX
        // =========================================

        if (
            material.tipoArquivo === 'pdf' ||
            material.tipoArquivo === 'pptx'
        ) {

            if (!material.arquivoVisualizacao) {
                console.error('Arquivo de visualização não encontrado:', material.titulo);
                return;
            }

            criarModal();

            const modalElemento = document.querySelector('#modal-material');

            const tituloModal = document.querySelector('#modal-material-titulo');

            const iframeModal = document.querySelector('#modal-material-iframe');

            tituloModal.textContent = material.titulo;

            iframeModal.src = material.arquivoVisualizacao;

            const modal = bootstrap.Modal.getOrCreateInstance(modalElemento);

            modal.show();
        }

    }



    // Limpar iframe ao fechar modal
    document.addEventListener('hidden.bs.modal', evento => {

        if (evento.target.id === 'modal-material') {

            document.querySelector('#modal-material-iframe').src = 'about:blank';

        }

    });


    // =========================================
    // EVENTOS DOS FILTROS
    // =========================================

    botoesCategoria.forEach(botao => {

        botao.addEventListener('click', () => {

            botoesCategoria.forEach(item => {
                item.classList.remove('ativo');
            });

            botao.classList.add('ativo');

            categoriaAtual = botao.dataset.categoria;

            filtrarMateriais();

        });

    });


    // =========================================
    // EVENTO DA BUSCA
    // =========================================

    buscaMateriais.addEventListener('input', filtrarMateriais);


    // =========================================
    // EVENTO DA PAGINAÇÃO
    // =========================================

    paginacao.addEventListener('click', evento => {

        const botao = evento.target.closest('[data-pagina]');

        if (!botao) {
            return;
        }

        const novaPagina = Number(botao.dataset.pagina);

        const totalPaginas = Math.ceil(
            materiaisFiltrados.length / MATERIAIS_POR_PAGINA
        );

        if (novaPagina < 1 || novaPagina > totalPaginas) {
            return;
        }

        paginaAtual = novaPagina;

        renderizarMateriais();

        listaMateriais.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });


    // =========================================
    // EVENTO DO BOTÃO ABRIR
    // =========================================

    listaMateriais.addEventListener('click', evento => {

        const botao = evento.target.closest('.material-card-abrir');

        if (!botao) {
            return;
        }

        const id = Number(botao.dataset.materialId);

        const material = materiais.find(item => item.id === id);

        if (material) {
            abrirMaterial(material);
        }

    });


    // =========================================
    // INICIALIZAÇÃO
    // =========================================

    await carregarMateriais();

});
