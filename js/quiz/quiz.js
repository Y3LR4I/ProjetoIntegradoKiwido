// Telas do jogo
const telaInicio = document.getElementById("tela-inicio");
const telaJogo = document.getElementById("tela-jogo");
const telaResultado = document.getElementById("tela-resultado");
const telaBestiario = document.getElementById("tela-bestiario");
const telaDetalhesAnimal = document.getElementById("tela-detalhes-animal");

// interacoes
const btnIniciar = document.getElementById("btn-iniciar");
const btnBestiario = document.getElementById("btn-bestiario");
const btnProximo = document.getElementById("btn-proximo");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnTelaInicial = document.getElementById("btn-telaInicial");
const btnFecharBestiario = document.getElementById("btn-fechar-bestiario");
const btnVoltarBestiario = document.getElementById("btn-voltar-bestiario");
const containerPerguntas = document.getElementById("alternativas");
const listaAnimais = document.getElementById("lista-animais");

// interface
const barraProgresso = document.getElementById("progresso");
const imagemSilhueta = document.getElementById("imagem-silhueta");
const msgAjuda = document.getElementById("mensagem-ajuda");
const descricao = document.getElementById("texto-resultado");
const pontuacaoF = document.getElementById("pontuacao-final");
const elementoTempo = document.getElementById("tempo");
const opcaoCronometro = document.getElementById("usar-cronometro");
const imagemDetalhesAnimal = document.getElementById("imagem-detalhes-animal");
const nomeDetalhesAnimal = document.getElementById("nome-detalhes-animal");
const descricaoDetalhesAnimal = document.getElementById("descricao-detalhes-animal");

elementoTempo.classList.add("cronometro-pizza");

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
let usarCronometro = true;

let telaAnteriorBestiario = null;

//sons
const somClique = new Audio("assets/images/sons/quiz/click.mp3");
const somselecao = new Audio("assets/images/sons/quiz/selecao.mp3");
const somCronometro = new Audio("assets/images/sons/quiz/cronometro.mp3");
const somTransicao = new Audio("assets/images/sons/quiz/transicao.mp3");

somClique.volume = 0.4;
somselecao.volume = 0.2;
somCronometro.volume = 0.2;
somTransicao.volume = 0.01;

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
        fotografia: "assets/images/animais/bigua.png",
        nome: "Biguá",
        descricao: "O biguá é uma ave aquática que mergulha para capturar peixes. É comum observá-lo em ambientes como rios, lagoas e regiões costeiras."
    },
    {
        silhueta: "assets/images/animais/figuinha-Mangue.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/figuinha-Mangue.png",
        nome: "Figuinha Do Mangue",
        descricao: "A figuinha-do-mangue é uma pequena ave associada a ambientes costeiros e vegetados. Como outras aves, participa das relações ecológicas do ambiente em que vive."
    },
    {
        silhueta: "assets/images/animais/garca-Branca-Grande.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/garca-Branca-Grande.png",
        nome: "Garça Branca Grande",
        descricao: "A garça-branca-grande se destaca pela plumagem branca, pelo pescoço comprido e pelo bico longo. Costuma procurar alimento em águas rasas."
    },
    {
        silhueta: "assets/images/animais/macarico-Asa-Branca.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/macarico-Asa-Branca.png",
        nome: "Maçarico De Asa Branca",
        descricao: "Os maçaricos são aves que frequentemente procuram pequenos invertebrados em áreas úmidas. Seus bicos e pernas ajudam na busca por alimento."
    },
    {
        silhueta: "assets/images/animais/pernilongo-Costas-Negras.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/pernilongo-Costas-Negras.png",
        nome: "Pernilongo de Costas Negras",
        descricao: "O pernilongo-de-costas-negras é uma ave de pernas compridas, adaptadas para caminhar em águas rasas enquanto procura pequenos organismos para se alimentar."
    },
    {
        silhueta: "assets/images/animais/macarico-Pintado.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/macarico-Pintado.png",
        nome: "Maçarico Pintado",
        descricao: "O maçarico-pintado é uma ave limícola que procura alimento em margens e áreas úmidas. Sua alimentação pode incluir pequenos invertebrados."
    },
    {
        silhueta: "assets/images/animais/saracura-Mangue.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/saracura-Mangue.png",
        nome: "Saracura Do Mangue",
        descricao: "A saracura-do-mangue está associada a ambientes úmidos e vegetados. Costuma se movimentar entre a vegetação, onde encontra abrigo e alimento."
    },
    {
        silhueta: "assets/images/animais/macarico-bico-torto.png",
        desenho: "assets/images/animais/nomeAnimalDesenho.png",
        fotografia: "assets/images/animais/macarico-bico-torto.png",
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
    if (telaInicio && !telaInicio.hidden) {
        return telaInicio;
    }

    if (telaJogo && !telaJogo.hidden) {
        return telaJogo;
    }

    if (telaResultado && !telaResultado.hidden) {
        return telaResultado;
    }

    if (telaDetalhesAnimal && !telaDetalhesAnimal.hidden) {
        return telaDetalhesAnimal;
    }

    if (telaBestiario && !telaBestiario.hidden) {
        return telaBestiario;
    }

    return telaInicio;
}

async function trocarTela(telaAtual, proximaTela, aoMostrar = null) {
    if (transicaoEmAndamento || !telaAtual || !proximaTela) {
        return;
    }

    transicaoEmAndamento = true;
    tocarSomTransicao();

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

    usarCronometro = opcaoCronometro ? opcaoCronometro.checked : true;

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
    imagemSilhueta.alt = `Silhueta do animal do round ${indiceAtual + 1}`;

    const tituloPergunta = document.querySelector(".pergunta-titulo");

    if (tituloPergunta) {
        tituloPergunta.textContent = `Round ${indiceAtual + 1}: qual animal está representado?`;
    }

    containerPerguntas.innerHTML = "";
    btnProximo.hidden = true;

    msgAjuda.hidden = false;
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

    if (usarCronometro) {
        elementoTempo.style.display = "";
        iniciarCronometro();
    } else {
        pararCronometro();
        elementoTempo.style.display = "none";
    }
}

function gerarAlternativas(animalCorreto) {
    const outrosAnimais = animais.filter(
        (animal) => animal.nome !== animalCorreto.nome
    );

    const animaisErrados = embaralharArray(outrosAnimais).slice(0, 3);

    return embaralharArray([animalCorreto, ...animaisErrados]);
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

    btnProximo.hidden = false;
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

    if (!usarCronometro) {
        elementoTempo.style.display = "none";
        return;
    }

    elementoTempo.style.display = "";
    tempoRestante = limiteTempo;

    atualizarCronometro();

    intervaloCronometro = setInterval(() => {
        tempoRestante--;
        atualizarCronometro();
        tocarSomCronometro();

        if (tempoRestante <= 0) {
            tempoRestante = 0;

            atualizarCronometro();

            pararCronometro();

            tempoEsgotado();
        }
    }, 1000);
}

function atualizarCronometro() {
    const progressoTempo = (tempoRestante / limiteTempo) * 100;

    elementoTempo.style.setProperty("--progresso-tempo", `${progressoTempo}%`);
    elementoTempo.setAttribute("aria-label", `Tempo restante: ${tempoRestante} segundos`);
}

function pararCronometro() {
    if (intervaloCronometro !== null) {
        clearInterval(intervaloCronometro);
        intervaloCronometro = null;
    }
}

function tempoEsgotado() {
    if (!usarCronometro || respondida || jogoFinalizado) {
        return;
    }

    respondida = true;

    const animalCorreto = embaralharPerguntas[indiceAtual];
    const botoes = containerPerguntas.querySelectorAll(".alternativa");

    pararCronometro();

    botoes.forEach((botao) => {
        botao.disabled = true;

        if (botao.textContent === animalCorreto.nome) {
            botao.classList.add("correta");
        }
    });

    msgAjuda.textContent = `Tempo esgotado! O animal era ${animalCorreto.nome}.`;
    btnProximo.hidden = false;
}

function proximaPergunta() {
    if (!respondida || jogoFinalizado || transicaoEmAndamento) {
        return;
    }

    indiceAtual++;
    mostrarPergunta();
}

function finalizarJogo() {
    pararCronometro();
    barraProgresso.style.width = "100%";
    jogoFinalizado = true;

    trocarTela(telaJogo, telaResultado, () => {
        descricao.textContent = `Você acertou ${pontuacao} de ${totalRounds} animais.`;

        pontuacaoF.textContent = pontuacao === totalRounds
            ? "Perfeito, você realmente é um explorador do mangue nato!"
            : pontuacao >= 3
                ? "Muito bem! Você é definitivamente um entusiasta do mangue!"
                : "Continue explorando o manguezal, tenho certeza de que você vai se sair melhor!";
    });
}

function abrirBestiario() {
    if (transicaoEmAndamento) {
        return;
    }

    pararCronometro();

    telaAnteriorBestiario = telaVisivelAtual();

    if (telaAnteriorBestiario === telaBestiario || telaAnteriorBestiario === telaDetalhesAnimal) {
        telaAnteriorBestiario = telaInicio;
    }

    if (!listaAnimais) {
        console.error("Não foi encontrado o elemento lista-animais no HTML.");
        return;
    }

    listaAnimais.innerHTML = "";
    
    animais.forEach((animal, indice) => {
        const botaoAnimal = document.createElement("button");
        botaoAnimal.type = "button";
        botaoAnimal.classList.add("cartao-animal");

        const imagemAnimal = document.createElement("img");
        imagemAnimal.src = animal.fotografia;
        imagemAnimal.alt = animal.nome;

        const nomeAnimal = document.createElement("span");
        nomeAnimal.textContent = animal.nome;

        botaoAnimal.appendChild(imagemAnimal);
        botaoAnimal.appendChild(nomeAnimal);

        botaoAnimal.addEventListener("click", () => {
            abrirDetalhesAnimal(indice);
        });

        listaAnimais.appendChild(botaoAnimal);
    });

    const telaAtual = telaVisivelAtual();

    trocarTela(telaAtual, telaBestiario);
}

function abrirDetalhesAnimal(indice) {
    if (transicaoEmAndamento) {
        return;
    }

    const animal = animais[indice];

    if (!animal) {
        return;
    }

    imagemDetalhesAnimal.src = animal.fotografia;
    imagemDetalhesAnimal.alt = `Fotografia de ${animal.nome}`;

    imagemDetalhesAnimal.onerror = () => {
        imagemDetalhesAnimal.onerror = null;
        imagemDetalhesAnimal.src = animal.silhueta;
    };

    nomeDetalhesAnimal.textContent = animal.nome;
    descricaoDetalhesAnimal.textContent = animal.descricao;

    trocarTela(telaBestiario, telaDetalhesAnimal);
}

function voltarAoBestiario() {
    if (transicaoEmAndamento) {
        return;
    }

    trocarTela(telaDetalhesAnimal, telaBestiario);
}

function fecharBestiario() {
    if (transicaoEmAndamento) {
        return;
    }

    const telaAtual = telaVisivelAtual();
    const destino = telaAnteriorBestiario || telaInicio;

    trocarTela(telaAtual, destino);
}

btnIniciar.addEventListener("click", comecarJogo);

btnReiniciar.addEventListener("click", comecarJogo);

btnProximo.addEventListener("click", proximaPergunta);

btnBestiario.addEventListener("click", abrirBestiario);

if (btnFecharBestiario) {
    btnFecharBestiario.addEventListener("click", fecharBestiario);
}

if (btnVoltarBestiario) {
    btnVoltarBestiario.addEventListener("click", voltarAoBestiario);
}

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
    somClique.play().catch(() => { });
}

function tocarSomSelecao() {
    somselecao.currentTime = 0;
    somselecao.play().catch(() => { });
}

function tocarSomCronometro() {
    somCronometro.currentTime = 0;
    somCronometro.play().catch(() => { });
}

function tocarSomTransicao() {
    somTransicao.currentTime = 0;
    somTransicao.play().catch(() => { });
}