const slides = document.querySelectorAll(".slide");
const indicators = document.querySelectorAll(".indicator");

const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

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