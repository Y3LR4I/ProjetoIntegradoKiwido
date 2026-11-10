
document.addEventListener('DOMContentLoaded', async () => {

    // Categorias utilizadas na galeria.
    const categorias = [
        'eventos',
        'trilhas',
        'oficinas',
        'acoes',
        'fauna-flora'
    ];

    // Seleciona os botões dos filtros.
    const botoesFiltros = document.querySelectorAll(
        '.galeria-categorias .categoria-btn'
    );

    // Seleciona todas as seções da galeria.
    const secoesGaleria = document.querySelectorAll(
        '.galeria-secao'
    );

    // Carrega os dados das imagens.
    async function carregarGaleria() {

        try {

            const resposta = await fetch('../data/galeria.json');

            if (!resposta.ok) {
                throw new Error('Não foi possível carregar a galeria.');
            }

            const galeria = await resposta.json();

            // Atualiza os contadores dos filtros.
            atualizarContadores(galeria);

            // Preenche as imagens de cada categoria.
            preencherGaleria(galeria);

        } catch (erro) {

            console.error('Erro ao carregar a galeria:', erro);

        }

    }

    // Calcula e atualiza a quantidade de imagens.
    function atualizarContadores(galeria) {

        let totalImagens = 0;

        categorias.forEach(categoria => {

            const quantidade = Array.isArray(galeria[categoria])
                ? galeria[categoria].length
                : 0;

            totalImagens += quantidade;

            const botao = document.querySelector(
                `.categoria-btn[data-categoria="${categoria}"]`
            );

            if (botao) {

                const contador = botao.querySelector(
                    '.categoria-contagem'
                );

                contador.textContent = quantidade;

            }

        });

        // Atualiza o contador de Todos.
        const botaoTodos = document.querySelector(
            '.categoria-btn[data-categoria="todos"]'
        );

        if (botaoTodos) {

            const contadorTodos = botaoTodos.querySelector(
                '.categoria-contagem'
            );

            contadorTodos.textContent = totalImagens;

        }

    }

    // Insere as imagens nas prévias de cada categoria.
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
            // caso todos os seus espaços estejam vazios.
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

    // Controla os filtros da galeria.
    botoesFiltros.forEach(botao => {

        botao.addEventListener('click', () => {

            const categoriaSelecionada = botao.dataset.categoria;

            // Atualiza o botão ativo.
            botoesFiltros.forEach(filtro => {
                filtro.classList.remove('ativo');
            });

            botao.classList.add('ativo');

            // Exibe somente a categoria selecionada.
            secoesGaleria.forEach(secao => {

                const categoriaSecao = secao.dataset.categoria;

                const exibir =
                    categoriaSelecionada === 'todos' ||
                    categoriaSelecionada === categoriaSecao;

                secao.hidden = !exibir;

            });

        });

    });

    // Inicializa a galeria.
    await carregarGaleria();

});
