// Telas do jogo
const telaInicio = document.getElementById("tela-inicio");
const telaJogo = document.getElementById("tela-jogo");
const telaResultado = document.getElementById("tela-resultado");

// interacoes
const btnIniciar = document.getElementById("btn-iniciar");
const btnBestiario = document.getElementById("btn-bestiario");
const btnProximo = document.getElementById("btn-proximo");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnTelaInicial = document.getElementById("btn-telaInicial");
const containerPerguntas = document.getElementById("alternativas");

// interface
const barraProgresso = document.getElementById("progresso");
const imagemSilhueta = document.getElementById("imagem-silhueta");
const msgAjuda = document.getElementById("mensagem-ajuda");
const descricao = document.getElementById("texto-resultado");
const pontuacaoF = document.getElementById("pontuacao-final");
const elementoTempo = document.getElementById("tempo");

// Estados do jogo
const totalRounds = 5;
const limiteTempo = 10;

let indiceAtual = 0;
let pontuacao = 0;
let tempoRestante = limiteTempo;
let respondida = false;
let intervaloCronometro = null;
let embaralharPerguntas = [];
let jogoFinalizado = false;
let transicaoEmAndamento = false;

//sons
const somClique = new Audio("assets/images/sons/quiz/click.mp3");
const somselecao = new Audio("assets/images/sons/quiz/selecao.mp3");

somClique.volume = 0.4;
somselecao.volume = 0.4;

const animais = [
    {
        silhueta: "assets/images/animais/garca-azul.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/garca-azul.png",
        nome: "Garça Azul",
        descricao: "A garça-azul é uma ave de pernas longas e bico comprido, características que ajudam na captura de pequenos animais em ambientes aquáticos."
    },
    {
        silhueta: "assets/images/animais/bigua.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/.png",
        nome: "Biguá",
        descricao: "O biguá é uma ave aquática que mergulha para capturar peixes. É comum observá-lo em ambientes como rios, lagoas e regiões costeiras."
    },
    {
        silhueta: "assets/images/animais/figuinha-Mangue.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/.png",
        nome: "Figuinha Do Mangue",
        descricao: "A figuinha-do-mangue é uma pequena ave associada a ambientes costeiros e vegetados. Como outras aves, participa das relações ecológicas do ambiente em que vive."
    },
    {
        silhueta: "assets/images/animais/garca-Branca-Grande.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/.png",
        nome: "Garça Branca Grande",
        descricao: "A garça-branca-grande se destaca pela plumagem branca, pelo pescoço comprido e pelo bico longo. Costuma procurar alimento em águas rasas."
    },
    {
        silhueta: "assets/images/animais/macarico-Asa-Branca.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/.png",
        nome: "Maçarico De Asa Branca",
        descricao: "Os maçaricos são aves que frequentemente procuram pequenos invertebrados em áreas úmidas. Seus bicos e pernas ajudam na busca por alimento."
    },
    {
        silhueta: "assets/images/animais/pernilongo-Costas-Negras.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/.png",
        nome: "Pernilongo de Costas Negras",
        descricao: "O pernilongo-de-costas-negras é uma ave de pernas compridas, adaptadas para caminhar em águas rasas enquanto procura pequenos organismos para se alimentar."
    },
    {
        silhueta: "assets/images/animais/macarico-Pintado.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/.png",
        nome: "Maçarico Pintado",
        descricao: "O maçarico-pintado é uma ave limícola que procura alimento em margens e áreas úmidas. Sua alimentação pode incluir pequenos invertebrados."
    },
    {
        silhueta: "assets/images/animais/saracura-Mangue.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/.png",
        nome: "Saracura Do Mangue",
        descricao: "A saracura-do-mangue está associada a ambientes úmidos e vegetados. Costuma se movimentar entre a vegetação, onde encontra abrigo e alimento."
    },
    {
        silhueta: "assets/images/animais/macarico-bico-torto.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/.png",
        nome: "Maçarico De Bico Torto",
        descricao: "O maçarico-de-bico-torto tem como característica marcante o formato curvado do bico, que pode auxiliar na procura por alimento em substratos naturais."
    }
];

//Embaralhar Arrays
function embaralharArray(array) {
    const copia = [...array]; //... e um spread e uma referencia para o array servindo nesse caso como uma copia para a alteracao da lista, entao a copia recebe os elementos de array

    for (let i = copia.length - 1; i > 0; i--) { // metodo de Fisher–Yates
        const j = Math.floor(Math.random() * (i + 1)); //indice aleatório

        [copia[i], copia[j]] = [copia[j], copia[i]]; //sistema de troca sem uma 3 variavel
    }

    return copia;
}

// Selecionar uma silhueta aleatoria a cada round
function selecionarSilhuetaRounds() {
    return embaralharArray(animais).slice(0, totalRounds);
}

function telaVisivelAtual() {
    if (!telaInicio.hidden) {
        return telaInicio;
    }

    if (!telaJogo.hidden) {
        return telaJogo;
    }

    return telaResultado;
}

async function trocarTela(telaAtual, proximaTela, aoMostrar = null) {
    if (transicaoEmAndamento) {
        return;
    }

    transicaoEmAndamento = true;

    if (telaAtual === proximaTela) {
        telaAtual.classList.add("saindo");

        await new Promise(resolve => setTimeout(resolve, 400));

        telaAtual.hidden = true;
        telaAtual.classList.remove("saindo");
        telaAtual.hidden = false;
        telaAtual.classList.add("entrando");

        if (aoMostrar) {
            aoMostrar();
        }

        await new Promise(resolve => setTimeout(resolve, 400));

        telaAtual.classList.remove("entrando");
        transicaoEmAndamento = false;

        return;
    }

    telaAtual.classList.add("saindo");

    await new Promise(resolve => setTimeout(resolve, 400));

    telaAtual.hidden = true;
    telaAtual.classList.remove("saindo");

    proximaTela.hidden = false;
    proximaTela.classList.add("entrando");

    if (aoMostrar) {
        aoMostrar();
    }

    await new Promise(resolve => setTimeout(resolve, 400));

    proximaTela.classList.remove("entrando");

    transicaoEmAndamento = false;
}

function comecarJogo() {
    if (transicaoEmAndamento) {
        return;
    }

    pararCronometro();

    indiceAtual = 0;
    pontuacao = 0;
    tempoRestante = limiteTempo;

    respondida = false;
    jogoFinalizado = false;

    embaralharPerguntas = selecionarSilhuetaRounds();

    const telaAtual = telaVisivelAtual();

    trocarTela(telaAtual, telaJogo, mostrarPergunta);
}

function mostrarPergunta() {
    pararCronometro();

    if (indiceAtual >= totalRounds) {
        finalizarJogo();
        return;
    }

    respondida = false;

    const animalCorreto = embaralharPerguntas[indiceAtual];

    imagemSilhueta.onerror = () => {
        console.error(
            "não foi possível carregar a imagem: ",
            animalCorreto.silhueta
        );
    };

    imagemSilhueta.src = animalCorreto.silhueta;
    imagemSilhueta.alt = animalCorreto.descricao;

    const tituloPergunta = document.querySelector(".pergunta-titulo");

    if (tituloPergunta) {
        tituloPergunta.textContent = `Round ${indiceAtual + 1}: qual animal está representado?`;
    }

    containerPerguntas.innerHTML = "";
    btnProximo.hidden = true;

    msgAjuda.textContent = "Observe a silhueta e escolha a alternativa correta.";

    const progresso = (indiceAtual / totalRounds) * 100;

    barraProgresso.style.width = `${progresso}%`;

    const alternativas = gerarAlternativas(animalCorreto);

    alternativas.forEach((animal) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.classList.add("alternativa");
        botao.textContent = animal.nome;

        botao.addEventListener("mouseenter", () => {
            if (respondida || jogoFinalizado || transicaoEmAndamento || botao.disabled) {
                return;
            }

            tocarSomSelecao();
        });

        botao.addEventListener("click", () => {
            if (respondida || jogoFinalizado || transicaoEmAndamento) {
                return;
            }

            tocarSomClique();
            verificarResposta(animal, animalCorreto, botao);
        });

        containerPerguntas.appendChild(botao);
    });

    iniciarCronometro();
}

function gerarAlternativas(animalCorreto) {
    const outrosAnimais = animais.filter(
        (animal) => animal.nome !== animalCorreto.nome
    );

    const animaisErrados = embaralharArray(outrosAnimais).slice(0, 3);

    return embaralharArray([animalCorreto, ...animaisErrados]);
}

function exibirDescricao(animal) {
    const cartaoDescricao = document.createElement("div");
    cartaoDescricao.classList.add("descricao-animal");

    imagemSilhueta.src = animal.desenho;
    imagemSilhueta.alt = `Desenho de ${animal.nome}`;

    imagemSilhueta.onerror = () => {
        console.error("Não foi possível carregar a imagem:", imagemSilhueta.src);
    };

    const nomeAnimal = document.createElement("h2");
    nomeAnimal.textContent = animal.nome;

    const botoesImagem = document.createElement("div");
    botoesImagem.classList.add("botoes-imagem");

    const btnFotografia = document.createElement("button");
    btnFotografia.type = "button";
    btnFotografia.classList.add("botao-imagem");
    btnFotografia.textContent = "Ver animal real";

   btnFotografia.addEventListener("click", () => {
        imagemSilhueta.style.opacity = "0";

        setTimeout(() => {
            imagemSilhueta.onload = () => {
                imagemSilhueta.style.opacity = "1";
            };

            imagemSilhueta.onerror = () => {
                imagemSilhueta.style.opacity = "1";
                console.error("Não foi possível carregar a fotografia:", animal.fotografia);
            };

            imagemSilhueta.src = animal.fotografia;
            imagemSilhueta.alt = `Fotografia real de ${animal.nome}`;

            btnFotografia.hidden = true;

            if (imagemSilhueta.complete && imagemSilhueta.naturalWidth > 0) {
                imagemSilhueta.style.opacity = "1";
            }
        }, 200);
    });

    const textoDescricao = document.createElement("p");
    textoDescricao.textContent = animal.descricao;

    botoesImagem.appendChild(btnFotografia);

    cartaoDescricao.appendChild(nomeAnimal);
    cartaoDescricao.appendChild(botoesImagem);
    cartaoDescricao.appendChild(textoDescricao);

    containerPerguntas.innerHTML = "";
    containerPerguntas.appendChild(cartaoDescricao);
}

function verificarResposta(animalEscolhido, animalCorreto, botaoEscolhido) {
    if (respondida || jogoFinalizado || transicaoEmAndamento) {
        return;
    }

    respondida = true;

    pararCronometro();

    const botoes = containerPerguntas.querySelectorAll("button");

    botoes.forEach((botao) => {
        botao.disabled = true;
    });

    if (animalEscolhido.nome === animalCorreto.nome) {
        pontuacao++;

        botaoEscolhido.classList.add("correta");

        msgAjuda.textContent = "Muito bem! Você acertou!";
    } else {
        botaoEscolhido.classList.add("incorreta");

        destacarRespostaCerta(animalCorreto);

        msgAjuda.textContent = `Resposta incorreta! O animal era ${animalCorreto.nome}.`;
    }

    setTimeout(() => {
        exibirDescricao(animalCorreto);
        btnProximo.hidden = false;
        msgAjuda.hidden = true
    }, 1000);
}

function destacarRespostaCerta(animalCorreto) {
    const botoes = containerPerguntas.querySelectorAll("button");

    botoes.forEach((botao) => {
        if (botao.textContent === animalCorreto.nome) {
            botao.classList.add("correta");
        }
    });
}

// PARTE ENVOLVENDO O TEMPO

function iniciarCronometro() {
    pararCronometro();

    tempoRestante = limiteTempo;

    atualizarCronometro();

    intervaloCronometro = setInterval(() => {
        tempoRestante--;

        atualizarCronometro();

        if (tempoRestante <= 0) {
            tempoRestante = 0;

            atualizarCronometro();

            pararCronometro();

            tempoEsgotado();
        }
    }, 1000);
}

function atualizarCronometro() {
    elementoTempo.textContent = `Tempo: ${tempoRestante}s`;
}

function pararCronometro() {
    if (intervaloCronometro !== null) {
        clearInterval(intervaloCronometro);
        intervaloCronometro = null;
    }
}

function tempoEsgotado() {
    if (respondida || jogoFinalizado) {
        return;
    }

    respondida = true;

    const animalCorreto = embaralharPerguntas[indiceAtual];

    msgAjuda.textContent = `Tempo esgotado! O animal era ${animalCorreto.nome}.`;

    setTimeout(() => {
        exibirDescricao(animalCorreto);
        btnProximo.hidden = false;
    }, 2000);
}

function proximaPergunta() {
    if (!respondida || jogoFinalizado || transicaoEmAndamento) {
        return;
    }

    indiceAtual++;
    msgAjuda.hidden = false;

    mostrarPergunta();
}

function finalizarJogo() {
    pararCronometro();

    jogoFinalizado = true;

    trocarTela(telaJogo, telaResultado, () => {
        descricao.textContent = `Você acertou ${pontuacao} de ${totalRounds} animais.`;

        pontuacaoF.textContent = pontuacao === totalRounds
            ? "Perfeito, você realmente é um explorador do mangue nato!"
            : pontuacao >= 3
                ? "Muito bem! Você é definitivamente um entusiasta do mangue!"
                : "Continue explorando o manguezal, tenho certeza de que você vai se sair melhor!";

        barraProgresso.style.width = "100%";
    });
}

btnIniciar.addEventListener("click", comecarJogo);

btnReiniciar.addEventListener("click", comecarJogo);

btnProximo.addEventListener("click", proximaPergunta);

btnTelaInicial.addEventListener("click", () => {
    if (transicaoEmAndamento) {
        return;
    }

    pararCronometro();

    const telaAtual = telaVisivelAtual();

    indiceAtual = 0;
    pontuacao = 0;
    tempoRestante = limiteTempo;

    respondida = false;
    jogoFinalizado = false;

    trocarTela(telaAtual, telaInicio);
});

function tocarSomClique() {
    somClique.currentTime = 0;
    somClique.play().catch(() => {});
}

function tocarSomSelecao() {
    somselecao.currentTime = 0;
    somselecao.play().catch(() => {});
}
