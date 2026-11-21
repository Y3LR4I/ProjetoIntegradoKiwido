/* =========================
   CARROSSEL AUTOMÁTICO DA HERO
========================= */

// Seleciona todos os slides do carrossel principal da seção Hero.
const heroSlides = document.querySelectorAll(".hero-slide");

// Define o índice do slide que está sendo exibido atualmente.
let currentHeroSlide = 0;

// Inicia a troca automática somente se houver mais de um slide.
if (heroSlides.length > 1) {
    // Executa a troca dos slides a cada 5 segundos.
    setInterval(() => {
        // Remove a classe "active" do slide atual, ocultando-o.
        heroSlides[currentHeroSlide].classList.remove("active");

        // Avança para o próximo slide e retorna ao primeiro ao chegar ao final.
        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;

        // Adiciona a classe "active" ao próximo slide, exibindo-o.
        heroSlides[currentHeroSlide].classList.add("active");
    }, 5000);
}

/* =========================
   TROCAR IMAGENS DA SESSÃO QUEM SOMOS
========================= */

// Seleciona o contêiner que agrupa as imagens da seção Quem Somos.
const imagensQuemSomos = document.querySelector(".quem-somos-imagens");

if (imagensQuemSomos) {
    // Seleciona a imagem principal da seção.
    const imagemPrincipal = imagensQuemSomos.querySelector(
        ".quem-somos-imagem-principal"
    );

    // Seleciona as duas imagens secundárias.
    const imagensSecundarias = imagensQuemSomos.querySelectorAll(
        ".quem-somos-imagens-secundarias img"
    );

    // Continua somente se a imagem principal e as duas secundárias existirem.
    if (imagemPrincipal && imagensSecundarias.length === 2) {
        // Agrupa as três imagens em uma lista para facilitar a troca de posições.
        const imagens = [
            imagemPrincipal,
            imagensSecundarias[0],
            imagensSecundarias[1]
        ];

        // Executa a troca das imagens a cada 4 segundos.
        setInterval(() => {
            // Adiciona a classe "trocando" para aplicar o efeito visual de transição.
            imagens.forEach(imagem => imagem.classList.add("trocando"));

            // Aguarda 500 milissegundos antes de alterar as imagens.
            setTimeout(() => {
                // Guarda o endereço e o texto alternativo da primeira imagem.
                const primeiraImagem = imagens[0].getAttribute("src");
                const primeiroAlt = imagens[0].getAttribute("alt");

                // Move a imagem secundária 1 para a posição principal.
                imagens[0].src = imagens[1].src;
                imagens[0].alt = imagens[1].alt;

                // Move a imagem secundária 2 para a primeira posição secundária.
                imagens[1].src = imagens[2].src;
                imagens[1].alt = imagens[2].alt;

                // Move a imagem que estava na posição principal para a última posição.
                imagens[2].src = primeiraImagem;
                imagens[2].alt = primeiroAlt;

                // Remove a classe "trocando" após a alteração das imagens.
                imagens.forEach(imagem => imagem.classList.remove("trocando"));
            }, 500);
        }, 4000);
    }
}


/* =========================
   CARROSSEL DO NOSSO TIME
========================= */

// Seleciona todos os slides e indicadores do carrossel da equipe.
const timeSlides = document.querySelectorAll(".time-slide");
const timeIndicators = document.querySelectorAll(".time-indicator");

// Seleciona os botões de navegação para avançar e voltar os slides.
const timePrevButton = document.querySelector(".time-carousel-button.prev");
const timeNextButton = document.querySelector(".time-carousel-button.next");

// Armazena o índice do slide atualmente exibido.
let currentTimeSlide = 0;

// Exibe o slide e o indicador correspondentes ao índice recebido.
function showTimeSlide(index) {
    // Remove a classe "active" de todos os slides e indicadores.
    timeSlides.forEach(slide => slide.classList.remove("active"));
    timeIndicators.forEach(indicator => indicator.classList.remove("active"));

    // Interrompe a função caso não existam slides ou indicadores.
    if (!timeSlides.length || !timeIndicators.length) return;

    // Ativa o slide e o indicador selecionados.
    timeSlides[index].classList.add("active");
    timeIndicators[index].classList.add("active");

    // Atualiza o índice do slide atualmente exibido.
    currentTimeSlide = index;
}

// Controla a abertura e o fechamento do menu hambúrguer.
document.addEventListener('click', function (event) {

    const botao = event.target.closest('.menu-hamburguer');
    const menu = document.querySelector('.menu');

    if (!menu) return;

    // Abre ou fecha o menu ao clicar no hambúrguer.
    if (botao) {
        const aberto = menu.classList.toggle('aberto');

        botao.setAttribute('aria-expanded', aberto);
        botao.setAttribute(
            'aria-label',
            aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
        );

        return;
    }

    // Fecha o menu ao selecionar um link de navegação.
    if (event.target.closest('.menu a')) {
        menu.classList.remove('aberto');

        const hamburguer = document.querySelector('.menu-hamburguer');

        if (hamburguer) {
            hamburguer.setAttribute('aria-expanded', 'false');
            hamburguer.setAttribute('aria-label', 'Abrir menu de navegação');
        }

        return;
    }

    // Fecha o menu ao clicar fora do cabeçalho.
    if (!event.target.closest('.header')) {
        menu.classList.remove('aberto');

        const hamburguer = document.querySelector('.menu-hamburguer');

        if (hamburguer) {
            hamburguer.setAttribute('aria-expanded', 'false');
            hamburguer.setAttribute('aria-label', 'Abrir menu de navegação');
        }
    }
});

// Avança para o próximo slide do carrossel.
function nextTimeSlide() {
    // Interrompe a função caso não existam slides ou indicadores.
    if (!timeSlides.length || !timeIndicators.length) return;

    // Calcula o índice do próximo slide.
    let next = currentTimeSlide + 1;

    // Retorna ao primeiro slide quando chega ao final do carrossel.
    if (next >= timeSlides.length) next = 0;

    // Exibe o slide calculado.
    showTimeSlide(next);
}

// Retorna para o slide anterior do carrossel.
function prevTimeSlide() {
    // Interrompe a função caso não existam slides ou indicadores.
    if (!timeSlides.length || !timeIndicators.length) return;

    // Calcula o índice do slide anterior.
    let previous = currentTimeSlide - 1;

    // Vai para o último slide quando está no primeiro.
    if (previous < 0) previous = timeSlides.length - 1;

    // Exibe o slide calculado.
    showTimeSlide(previous);
}

// Configura os eventos de navegação somente se todos os elementos necessários existirem.
if (timeSlides.length && timeIndicators.length && timePrevButton && timeNextButton) {
    // Avança o carrossel ao clicar no botão de próximo.
    timeNextButton.addEventListener("click", nextTimeSlide);

    // Retorna o carrossel ao clicar no botão de anterior.
    timePrevButton.addEventListener("click", prevTimeSlide);

    // Permite selecionar diretamente um slide ao clicar em seu indicador.
    timeIndicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => showTimeSlide(index));
    });
}

/* =========================
   CARROSSEL AUTOMÁTICO DAS AÇÕES EM DESTAQUE
========================= */

// Seleciona todos os slides da seção de ações em destaque.
const destaqueAcoesSlides = document.querySelectorAll(
    ".acoes-destaque-slide"
);

// Armazena o índice do slide de ação atualmente exibido.
let destaqueAcoesAtual = 0;

// Exibe o slide de ação correspondente ao índice recebido.
function mostrarDestaqueAcao(index) {
    // Interrompe a função caso não existam slides.
    if (!destaqueAcoesSlides.length) return;

    // Remove a classe "active" de todos os slides.
    destaqueAcoesSlides.forEach(slide => {
        slide.classList.remove("active");
    });

    // Atualiza o índice do slide que será exibido.
    destaqueAcoesAtual = index;

    // Adiciona a classe "active" ao slide selecionado.
    destaqueAcoesSlides[destaqueAcoesAtual].classList.add("active");
}

// Inicia a troca automática somente se houver mais de um slide.
if (destaqueAcoesSlides.length > 1) {
    // Garante que o primeiro slide seja exibido inicialmente.
    mostrarDestaqueAcao(0);

    // Executa a troca automática dos slides a cada 5 segundos.
    setInterval(() => {
        // Avança para o próximo slide.
        destaqueAcoesAtual++;

        // Retorna ao primeiro slide quando chega ao final.
        if (destaqueAcoesAtual >= destaqueAcoesSlides.length) {
            destaqueAcoesAtual = 0;
        }

        // Exibe o slide atualizado.
        mostrarDestaqueAcao(destaqueAcoesAtual);
    }, 5000);
}
/* =========================
   NOSSA HISTÓRIA MOBILE // CARD LATERAL
========================= */

const historiaMarcos = document.querySelectorAll(".historia-marco");
const historiaCardCompartilhado = document.querySelector("#historia-card-compartilhado");

if (historiaMarcos.length && historiaCardCompartilhado) {
    const dataCompartilhada = historiaCardCompartilhado.querySelector(".historia-card-data");
    const tituloCompartilhado = historiaCardCompartilhado.querySelector("h3");
    const textoCompartilhado = historiaCardCompartilhado.querySelector("p");

    historiaMarcos.forEach((marco, indice) => {
        const botao = marco.querySelector(".historia-ano");
        const cardOriginal = marco.querySelector(".historia-card");

        botao.addEventListener("click", () => {
            historiaMarcos.forEach((outroMarco) => {
                outroMarco.classList.remove("ativo");

                const outroBotao = outroMarco.querySelector(".historia-ano");
                outroBotao.setAttribute("aria-expanded", "false");
            });

            marco.classList.add("ativo");
            botao.setAttribute("aria-expanded", "true");

            dataCompartilhada.textContent = botao.textContent.trim();
            tituloCompartilhado.textContent = cardOriginal.querySelector("h3").textContent;
            textoCompartilhado.textContent = cardOriginal.querySelector("p").textContent;
        });

        if (indice === 0) {
            marco.classList.add("ativo");
        }
    });
}
