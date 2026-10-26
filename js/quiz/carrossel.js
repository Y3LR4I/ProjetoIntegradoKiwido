const imagemAnimal = document.getElementById("imagem-animal")

const animaisCarrossel = [
    {
        src: "assets/images/animais/bigua.png",
        alt: "Biguá"
    },
    {
        src: "assets/images/animais/figuinha-Mangue.png",
        alt: "Figuinha Do Mangue"
    },
    {
        src: "assets/images/animais/garca-azul.png",
        alt: "Garça Azul"
    },
    {
        src: "assets/images/animais/garca-Branca-Grande.png",
        alt: "Garça branca grande"
    },
    {
        src: "assets/images/animais/macarico-Asa-Branca.png",
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