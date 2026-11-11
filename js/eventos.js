
document.addEventListener('DOMContentLoaded', async () => {

    // =========================================
    // ELEMENTOS DA PÁGINA
    // =========================================

    const destaqueImagem = document.querySelector('#destaque-imagem');
    const destaqueTitulo = document.querySelector('#destaque-titulo');
    const destaqueDescricao = document.querySelector('#destaque-descricao');
    const destaqueData = document.querySelector('#destaque-data');
    const destaqueHorario = document.querySelector('#destaque-horario');
    const destaqueLocal = document.querySelector('#destaque-local');
    const destaqueVagas = document.querySelector('#destaque-vagas');
    const destaqueInscrever = document.querySelector('#destaque-inscrever');

    const gradeEventos = document.querySelector('#eventos-grid');
    const botoesFiltros = document.querySelectorAll('.eventos-filtro');

    // Elementos da seção de inscrição.
    const secaoInscricao = document.querySelector('#inscricao');

    const inscricaoPlaceholder = document.querySelector('#inscricao-placeholder');
    const inscricaoEventoDados = document.querySelector('#inscricao-evento-dados');

    const inscricaoEventoTitulo = document.querySelector('#inscricao-evento-titulo');
    const inscricaoEventoData = document.querySelector('#inscricao-evento-data');
    const inscricaoEventoHorario = document.querySelector('#inscricao-evento-horario');
    const inscricaoEventoLocal = document.querySelector('#inscricao-evento-local');
    const inscricaoEventoVagas = document.querySelector('#inscricao-evento-vagas');

    const formularioPlaceholder = document.querySelector('#formulario-placeholder');
    const formularioGoogle = document.querySelector('#formulario-google');
    const formularioLinkExterno = document.querySelector('#formulario-link-externo');


    // =========================================
    // BUSCAR DADOS DO JSON
    // =========================================

    try {

        const resposta = await fetch('../data/eventos.json');

        if (!resposta.ok) {
            throw new Error('Não foi possível carregar o arquivo eventos.json.');
        }

        const dados = await resposta.json();

        const eventos = dados.eventos;


        // =========================================
        // IDENTIFICAR EVENTO EM DESTAQUE
        // =========================================

        const eventoDestaque = eventos.find(evento => {
            return evento.id === dados.destaque;
        });

        if (!eventoDestaque) {
            throw new Error('Evento em destaque não encontrado no JSON.');
        }


        // =========================================
        // PREENCHER EVENTO EM DESTAQUE
        // =========================================

        destaqueImagem.src = eventoDestaque.imagem;
        destaqueImagem.alt = eventoDestaque.titulo;

        destaqueTitulo.textContent = eventoDestaque.titulo;
        destaqueDescricao.textContent = eventoDestaque.subtitulo;

        destaqueData.textContent = eventoDestaque.data;
        destaqueHorario.textContent = eventoDestaque.horario;
        destaqueLocal.textContent = eventoDestaque.local;
        destaqueVagas.textContent = `${eventoDestaque.vagas} vagas`;

        destaqueInscrever.dataset.eventoId = eventoDestaque.id;

        // Só permite inscrição em eventos próximos.
        destaqueInscrever.hidden = eventoDestaque.status !== 'proximo';


        // =========================================
        // SELECIONAR EVENTO PARA INSCRIÇÃO
        // =========================================

        function selecionarEvento(evento) {

            // Não permite inscrição em eventos realizados.
            if (!evento || evento.status !== 'proximo') {
                return;
            }

            // Atualiza as informações do evento selecionado.
            inscricaoEventoTitulo.textContent = evento.titulo;
            inscricaoEventoData.textContent = evento.data;
            inscricaoEventoHorario.textContent = evento.horario;
            inscricaoEventoLocal.textContent = evento.local;
            inscricaoEventoVagas.textContent = `${evento.vagas} vagas disponíveis`;

            // Esconde a mensagem inicial e mostra os dados.
            inscricaoPlaceholder.hidden = true;
            inscricaoEventoDados.hidden = false;


            // =========================================
            // CARREGAR FORMULÁRIO DO EVENTO
            // =========================================

            const linkFormulario = evento.linkFormulario;
            const linkFormularioExterno =
                evento.linkFormularioExterno || evento.linkFormulario;

            // Verifica se o evento possui formulário cadastrado.
            if (linkFormulario || linkFormularioExterno) {

                // Prepara o endereço de incorporação.
                const urlFormulario = new URL(
                    linkFormulario || linkFormularioExterno
                );

                // Ativa o modo de incorporação do Google Forms.
                urlFormulario.searchParams.set('embedded', 'true');

                // Carrega o formulário.
                formularioGoogle.src = urlFormulario.toString();

                formularioGoogle.hidden = false;
                formularioPlaceholder.hidden = true;

                // Atualiza o link para abrir em outra aba.
                const urlExterna = new URL(linkFormularioExterno);

                urlExterna.searchParams.delete('embedded');

                formularioLinkExterno.href = urlExterna.toString();
                formularioLinkExterno.hidden = false;

            } else {

                // Caso o evento ainda não tenha formulário.
                formularioGoogle.removeAttribute('src');
                formularioGoogle.hidden = true;

                formularioPlaceholder.hidden = false;

                formularioPlaceholder.querySelector('p').textContent =
                    'O formulário de inscrição deste evento ainda não está disponível.';

                formularioLinkExterno.hidden = true;
                formularioLinkExterno.removeAttribute('href');

            }


            // =========================================
            // MOSTRAR SEÇÃO DE INSCRIÇÃO
            // =========================================

            secaoInscricao.hidden = false;


            // =========================================
            // ROLAR ATÉ A SEÇÃO DE INSCRIÇÃO
            // =========================================

            secaoInscricao.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        }


        // =========================================
        // RENDERIZAR CARDS DOS EVENTOS
        // =========================================

        function renderizarEventos(status) {

            // Filtra pelo status e remove o evento principal.
            const eventosFiltrados = eventos.filter(evento => {
                return evento.status === status &&
                    evento.id !== dados.destaque;
            });

            // Limpa os cards anteriores.
            gradeEventos.innerHTML = '';

            // Verifica se existem eventos para exibir.
            if (eventosFiltrados.length === 0) {

                const mensagem = document.createElement('p');

                mensagem.textContent = 'Nenhum evento encontrado.';
                gradeEventos.appendChild(mensagem);

                return;
            }

            // Cria um card para cada evento.
            eventosFiltrados.forEach(evento => {

                const card = document.createElement('article');

                card.classList.add('evento-card');

                card.innerHTML = `

                    <div class="evento-card-imagem">

                        <img
                            src="${evento.imagem}"
                            alt="${evento.titulo}">

                    </div>

                    <div class="evento-card-conteudo">

                        <h3>${evento.titulo}</h3>

                        <p class="evento-card-descricao">
                            ${evento.subtitulo}
                        </p>

                        <div class="evento-card-informacoes">

                            <div class="evento-card-informacao">

                                <span class="material-symbols-outlined">
                                    calendar_month
                                </span>

                                <span>${evento.data}</span>

                            </div>

                            <div class="evento-card-informacao">

                                <span class="material-symbols-outlined">
                                    schedule
                                </span>

                                <span>${evento.horario}</span>

                            </div>

                            <div class="evento-card-informacao">

                                <span class="material-symbols-outlined">
                                    location_on
                                </span>

                                <span>${evento.local}</span>

                            </div>

                            <div class="evento-card-informacao">

                                <span class="material-symbols-outlined">
                                    groups
                                </span>

                                <span>${evento.vagas} vagas</span>

                            </div>

                        </div>

                        ${status === 'proximo'
                        ? `
                                    <button
                                        type="button"
                                        class="evento-card-botao"
                                        data-evento-id="${evento.id}">

                                        Inscrever-se

                                    </button>
                                `
                        : `
                                    <span class="evento-card-encerrado">
                                        ENCERRADO
                                    </span>
                                `
                    }

                    </div>

                `;

                gradeEventos.appendChild(card);

            });


            // =========================================
            // BOTÕES DE INSCRIÇÃO DOS CARDS
            // =========================================

            const botoesInscricao = gradeEventos.querySelectorAll(
                '.evento-card-botao'
            );

            botoesInscricao.forEach(botao => {

                botao.addEventListener('click', () => {

                    const idEvento = botao.dataset.eventoId;

                    const eventoSelecionado = eventos.find(evento => {
                        return evento.id === idEvento;
                    });

                    selecionarEvento(eventoSelecionado);

                });

            });

        }


        // =========================================
        // BOTÃO DE INSCRIÇÃO DO EVENTO EM DESTAQUE
        // =========================================

        destaqueInscrever.addEventListener('click', () => {
            selecionarEvento(eventoDestaque);
        });


        // =========================================
        // FILTROS: PRÓXIMOS E REALIZADOS
        // =========================================

        botoesFiltros.forEach(botao => {

            botao.addEventListener('click', () => {

                const status = botao.dataset.filtro;

                // Atualiza o botão selecionado.
                botoesFiltros.forEach(filtro => {
                    filtro.classList.remove('ativo');
                });

                botao.classList.add('ativo');

                // Atualiza os cards.
                renderizarEventos(status);

            });

        });


        // =========================================
        // EXIBIÇÃO INICIAL
        // =========================================

        renderizarEventos('proximo');


    } catch (erro) {

        console.error('Erro ao carregar eventos:', erro);

        gradeEventos.innerHTML = `
            <p>Não foi possível carregar os eventos no momento.</p>
        `;

        destaqueTitulo.textContent =
            'Não foi possível carregar o evento em destaque.';

    }

});
