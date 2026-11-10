
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

        // Guarda o ID para a futura funcionalidade de inscrição.
        destaqueInscrever.dataset.eventoId = eventoDestaque.id;

        // Só permite inscrição em eventos próximos.
        destaqueInscrever.hidden = eventoDestaque.status !== 'proximo';


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

                        ${
                            status === 'proximo'
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

        }


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

        destaqueTitulo.textContent = 'Não foi possível carregar o evento em destaque.';

    }

});
