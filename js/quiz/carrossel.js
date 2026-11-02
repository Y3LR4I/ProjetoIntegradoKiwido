const imagemAnimal = document.getElementById("imagem-animal")

const animaisCarrossel = [

    {
        src: "../assets/images/quiz/animais/bigua.png",
        alt: "Biguá"
    },

    {
        src: "../assets/images/quiz/animais/figuinha-Mangue.png",
        alt: "Figuinha Do Mangue"
    },

    {
        src: "../assets/images/quiz/animais/garca-azul.png",
        alt: "Garça Azul"
    },

    {
        src: "../assets/images/quiz/animais/garca-Branca-Grande.png",
        alt: "Garça branca grande"
    },

    {
        src: "../assets/images/quiz/animais/macarico-Asa-Branca.png",
        alt: "Macariço De Asa Branca"
    },

];

let indiceCarrossel = 0;

function trocarImagemAnimal() {

    if (!imagemAnimal || animaisCarrossel.length < 2) {
        return;
    }

    indiceCarrossel = (indiceCarrossel + 1) % animaisCarrossel.length;

    imagemAnimal.classList.add("trocando");

    setTimeout(() => {

        const animal = animaisCarrossel[indiceCarrossel];

        imagemAnimal.src = animal.src;
        imagemAnimal.alt = animal.alt;

        imagemAnimal.onload = () => {
            imagemAnimal.classList.remove("trocando");
        }

        imagemAnimal.onerror = () => {
            imagemAnimal.classList.remove("trocando");
            console.error("Não foi possivel carregar a imagem", animal.src);
        }

    }, 400);

}

setInterval(trocarImagemAnimal, 3000)