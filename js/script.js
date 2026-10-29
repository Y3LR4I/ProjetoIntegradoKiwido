/* =========================
   CARROSSEL AUTOMÁTICO DA HERO
========================= */

const heroSlides = document.querySelectorAll(".hero-slide");

let currentHeroSlide = 0;

if (heroSlides.length > 1) {
    setInterval(() => {
        heroSlides[currentHeroSlide].classList.remove("active");

        currentHeroSlide = (currentHeroSlide + 1) % heroSlides.length;

        heroSlides[currentHeroSlide].classList.add("active");
    }, 5000);
}

/* =========================
   TROCAR IMAGENS DA SESSÃO QUEM SOMOS
========================= */

const imagensQuemSomos = document.querySelector(".quem-somos-imagens");

if (imagensQuemSomos) {
    const imagemPrincipal = imagensQuemSomos.querySelector(
        ".quem-somos-imagem-principal"
    );

    const imagensSecundarias = imagensQuemSomos.querySelectorAll(
        ".quem-somos-imagens-secundarias img"
    );

    if (imagemPrincipal && imagensSecundarias.length === 2) {
        const imagens = [
            imagemPrincipal,
            imagensSecundarias[0],
            imagensSecundarias[1]
        ];

        setInterval(() => {
            imagens.forEach(imagem => imagem.classList.add("trocando"));

            setTimeout(() => {
                const primeiraImagem = imagens[0].getAttribute("src");
                const primeiroAlt = imagens[0].getAttribute("alt");

                imagens[0].src = imagens[1].src;
                imagens[0].alt = imagens[1].alt;

                imagens[1].src = imagens[2].src;
                imagens[1].alt = imagens[2].alt;

                imagens[2].src = primeiraImagem;
                imagens[2].alt = primeiroAlt;

                imagens.forEach(imagem => imagem.classList.remove("trocando"));
            }, 500);
        }, 4000);
    }
}


/* =========================
   CARROSSEL DO NOSSO TIME
========================= */

const timeSlides = document.querySelectorAll(".time-slide");
const timeIndicators = document.querySelectorAll(".time-indicator");

const timePrevButton = document.querySelector(".time-carousel-button.prev");
const timeNextButton = document.querySelector(".time-carousel-button.next");

let currentTimeSlide = 0;

function showTimeSlide(index) {
    timeSlides.forEach(slide => slide.classList.remove("active"));
    timeIndicators.forEach(indicator => indicator.classList.remove("active"));

    if (!timeSlides.length || !timeIndicators.length) return;

    timeSlides[index].classList.add("active");
    timeIndicators[index].classList.add("active");
    currentTimeSlide = index;
}

function nextTimeSlide() {
    if (!timeSlides.length || !timeIndicators.length) return;

    let next = currentTimeSlide + 1;

    if (next >= timeSlides.length) next = 0;

    showTimeSlide(next);
}

function prevTimeSlide() {
    if (!timeSlides.length || !timeIndicators.length) return;

    let previous = currentTimeSlide - 1;

    if (previous < 0) previous = timeSlides.length - 1;

    showTimeSlide(previous);
}

if (timeSlides.length && timeIndicators.length && timePrevButton && timeNextButton) {
    timeNextButton.addEventListener("click", nextTimeSlide);
    timePrevButton.addEventListener("click", prevTimeSlide);

    timeIndicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => showTimeSlide(index));
    });
}

/* CARROSSEL AUTOMÁTICO DAS AÇÕES EM DESTAQUE */

const destaqueAcoesSlides = document.querySelectorAll(
    ".acoes-destaque-slide"
);

let destaqueAcoesAtual = 0;

function mostrarDestaqueAcao(index) {
    if (!destaqueAcoesSlides.length) return;

    destaqueAcoesSlides.forEach(slide => {
        slide.classList.remove("active");
    });

    destaqueAcoesAtual = index;

    destaqueAcoesSlides[destaqueAcoesAtual].classList.add("active");
}

if (destaqueAcoesSlides.length > 1) {
    mostrarDestaqueAcao(0);

    setInterval(() => {
        destaqueAcoesAtual++;

        if (destaqueAcoesAtual >= destaqueAcoesSlides.length) {
            destaqueAcoesAtual = 0;
        }

        mostrarDestaqueAcao(destaqueAcoesAtual);
    }, 5000);
}