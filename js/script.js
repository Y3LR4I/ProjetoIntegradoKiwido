/* =========================
   CARROSSEL DO BANNER
========================= */

const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

const prevButton = document.querySelector(".carousel-button.prev");
const nextButton = document.querySelector(".carousel-button.next");

let currentSlide = 0;

function showSlide(index) {

    slides.forEach(slide => {
        slide.classList.remove("active");
    });

    indicators.forEach(indicator => {
        indicator.classList.remove("active");
    });

    slides[index].classList.add("active");
    indicators[index].classList.add("active");

    currentSlide = index;
}

function nextSlide() {

    let next = currentSlide + 1;

    if (next >= slides.length) {
        next = 0;
    }

    showSlide(next);
}

function prevSlide() {

    let previous = currentSlide - 1;

    if (previous < 0) {
        previous = slides.length - 1;
    }

    showSlide(previous);
}

nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

indicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {
        showSlide(index);
    });

});

setInterval(nextSlide, 5000);


/* =========================
   CARROSSEL DO NOSSO TIME
========================= */

const timeSlides = document.querySelectorAll(".time-slide");
const timeIndicators = document.querySelectorAll(".time-indicator");

const timePrevButton = document.querySelector(".time-carousel-button.prev");
const timeNextButton = document.querySelector(".time-carousel-button.next");

let currentTimeSlide = 0;

function showTimeSlide(index) {

    timeSlides.forEach(slide => {
        slide.classList.remove("active");
    });

    timeIndicators.forEach(indicator => {
        indicator.classList.remove("active");
    });

    timeSlides[index].classList.add("active");
    timeIndicators[index].classList.add("active");

    currentTimeSlide = index;
}

function nextTimeSlide() {

    let next = currentTimeSlide + 1;

    if (next >= timeSlides.length) {
        next = 0;
    }

    showTimeSlide(next);
}

function prevTimeSlide() {

    let previous = currentTimeSlide - 1;

    if (previous < 0) {
        previous = timeSlides.length - 1;
    }

    showTimeSlide(previous);
}

timeNextButton.addEventListener("click", nextTimeSlide);
timePrevButton.addEventListener("click", prevTimeSlide);

timeIndicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {
        showTimeSlide(index);
    });

});