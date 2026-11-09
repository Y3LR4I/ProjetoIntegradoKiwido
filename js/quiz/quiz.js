
// Dados dos animais utilizados no quiz e no bestiário, existem 2 categorias principais no mostruario, "Pássaros", "Mamíferos" e a classificação "Todas" que
// Comporta todas as outras categorias e a "Outras" que são animais que não se encaixam nas 2 principais.
// Para a declaracao de uma categoria tem que estar escritas do mesmo jeito descrito acima.
// Caso veja alguma ave ou mamifero em outro provavelmente e por que a categoria foi escrita errada.
const animais = [
    {
        nome: "Garça Azul",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/garca-Azul.png",
        fotografia: "../assets/images/quiz/animais/garca-Azul.png",
        desenho: "../assets/images/quiz/animais/garca-AzulDesenho.png",
        descricao: `A Garça Azul é uma ave encontrada em regiões costeiras, manguezais, lagoas e outros ambientes alagados. Sua plumagem apresenta tons azulados e acinzentados, enquanto suas pernas e seu bico longos facilitam a movimentação em águas rasas.

                    É uma caçadora paciente, que costuma permanecer imóvel ou caminhar lentamente à procura de alimento. Sua alimentação inclui peixes, pequenos crustáceos, insetos e outros animais aquáticos.`,
        curiosidade: "A Garça Azul pode permanecer imóvel por bastante tempo enquanto espera o momento certo para capturar uma presa."
    },
    {
        nome: "Biguá",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/bigua.png",
        fotografia: "../assets/images/quiz/animais/bigua.png",
        desenho: "../assets/images/quiz/animais/biguaDesenho.png",
        descricao: `O Biguá é uma ave aquática encontrada em rios, lagoas, estuários e manguezais. Possui plumagem predominantemente escura, bico comprido e levemente curvado, além de um corpo adaptado para mergulhar e nadar com facilidade.

                    Sua principal estratégia de alimentação é mergulhar em busca de peixes. Após nadar, é comum vê-lo com as asas abertas, pois suas penas absorvem mais água do que as de outras aves aquáticas, ajudando-o a secar ao sol.`,
        curiosidade: "Diferentemente de muitas aves aquáticas, as penas do Biguá não são completamente impermeáveis, o que facilita seus mergulhos."
    },
    {
        nome: "Figuinha do Mangue",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/figuinha-Mangue.png",
        fotografia: "../assets/images/quiz/animais/figuinha-Mangue.png",
        desenho: "../assets/images/quiz/animais/figuinha-MangueDesenho.png",
        descricao: `A Figuinha do Mangue é uma pequena ave que habita áreas costeiras e regiões com vegetação densa. Por seu tamanho reduzido, consegue se movimentar com facilidade entre galhos e folhas, onde encontra abrigo e alimento.

                    Costuma procurar pequenos insetos e outros alimentos entre a vegetação. Sua presença contribui para o equilíbrio do ecossistema, fazendo parte das relações naturais que mantêm o manguezal vivo.`,
        curiosidade: "Por ser pequena e discreta, a Figuinha do Mangue pode passar despercebida entre as folhas e os galhos."
    },
    {
        nome: "Garça Branca Grande",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/garca-Branca-Grande.png",
        fotografia: "../assets/images/quiz/animais/garca-Branca-Grande.png",
        desenho: "../assets/images/quiz/animais/garca-Branca-GrandeDesenho.png",
        descricao: `A Garça Branca Grande é uma ave de grande porte, facilmente reconhecida por sua plumagem inteiramente branca, pernas compridas e bico longo e amarelado. Pode ser encontrada em manguezais, lagoas, rios e outros ambientes próximos à água.

                    Alimenta-se principalmente de peixes, mas também captura anfíbios, pequenos répteis, insetos e outros animais. Para caçar, costuma caminhar lentamente pela água ou permanecer parada, aguardando o momento ideal para atacar.`,
        curiosidade: "Apesar do tamanho, a Garça Branca Grande é uma caçadora silenciosa e consegue capturar suas presas com movimentos muito rápidos."
    },
    {
        nome: "Maçarico de Asa Branca",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/macarico-Asa-Branca.png",
        fotografia: "../assets/images/quiz/animais/macarico-Asa-Branca.png",
        desenho: "../assets/images/quiz/animais/macarico-Asa-BrancaDesenho.png",
        descricao: `O Maçarico de Asa Branca é uma ave encontrada em regiões costeiras, praias, manguezais e áreas alagadas. Seu corpo é adaptado para caminhar em terrenos úmidos, explorando a lama e as margens em busca de alimento.

                    Utiliza seu bico para procurar pequenos invertebrados escondidos no sedimento, como vermes, crustáceos e insetos. Dessa forma, participa da dinâmica alimentar dos ambientes costeiros.`,
        curiosidade: "Os maçaricos são conhecidos por explorar cuidadosamente a lama e a areia com seus bicos em busca de pequenos animais."
    },
    {
        nome: "Pernilongo de Costas Negras",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/pernilongo-Costas-Negras.png",
        fotografia: "../assets/images/quiz/animais/pernilongo-Costas-Negras.png",
        desenho: "../assets/images/quiz/animais/pernilongo-Costas-NegrasDesenho.png",
        descricao: `O Pernilongo de Costas Negras é uma ave de pernas muito longas, corpo esguio e plumagem que combina áreas claras e escuras. Habita principalmente regiões alagadas, lagoas, margens de rios e áreas costeiras.

                    Suas pernas compridas permitem caminhar em águas rasas enquanto procura pequenos invertebrados, insetos e outros organismos aquáticos. Seu bico fino ajuda a capturar esses alimentos na superfície ou dentro da água.`,
        curiosidade: "Suas pernas longas permitem que caminhe por águas relativamente profundas sem precisar molhar grande parte do corpo."
    },
    {
        nome: "Maçarico Pintado",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/macarico-Pintado.png",
        fotografia: "../assets/images/quiz/animais/macarico-Pintado.png",
        desenho: "../assets/images/quiz/animais/macarico-PintadoDesenho.png",
        descricao: `O Maçarico Pintado é uma ave que frequenta margens de rios, lagoas, brejos e regiões costeiras. Sua plumagem apresenta padrões que ajudam a se camuflar entre a lama, a areia e a vegetação dos ambientes úmidos.

                    Costuma caminhar pelas margens enquanto procura alimento no solo e na água. Sua dieta inclui pequenos invertebrados, como insetos, vermes e crustáceos, que encontra explorando o sedimento com o bico.`,
        curiosidade: "A plumagem do Maçarico Pintado ajuda a disfarçá-lo no ambiente, dificultando sua identificação entre a vegetação e a lama."
    },
    {
        nome: "Saracura do Mangue",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/saracura-Mangue.png",
        fotografia: "../assets/images/quiz/animais/saracura-Mangue.png",
        desenho: "../assets/images/quiz/animais/saracura-MangueDesenho.png",
        descricao: `A Saracura do Mangue é uma ave que vive em ambientes úmidos, especialmente em áreas com vegetação densa, como manguezais e margens de rios. Possui corpo adaptado para se movimentar entre raízes, folhas e outros obstáculos naturais.

                    É uma ave discreta, que costuma permanecer escondida na vegetação. Alimenta-se de pequenos invertebrados, insetos e outros organismos encontrados no solo úmido, contribuindo para o equilíbrio do ecossistema.`,
        curiosidade: "A Saracura do Mangue costuma ser mais ouvida do que vista, pois permanece escondida entre a vegetação."
    },
    {
        nome: "Maçarico de Bico Torto",
        categoria: "Pássaros",
        silhueta: "../assets/images/animais/macarico-Bico-Torto.png",
        fotografia: "../assets/images/quiz/animais/macarico-Bico-Torto.png",
        desenho: "../assets/images/quiz/animais/macarico-Bico-TortoDesenho.png",
        descricao: `O Maçarico de Bico Torto é uma ave limícola encontrada em áreas úmidas, regiões costeiras e manguezais. Sua característica mais marcante é o bico curvado, que possui um formato especializado para procurar alimento no sedimento.

                    Com esse bico, consegue explorar a lama e os terrenos alagados em busca de pequenos invertebrados, como vermes e crustáceos. Essa adaptação permite aproveitar recursos alimentares que outras aves podem ter dificuldade para alcançar.`,
        curiosidade: "O formato curvado de seu bico é uma adaptação que facilita a busca por pequenos animais escondidos na lama."
    }
];

// Da a categoria de "outros" caso o animal nao seja nem mamifero nem um passaro
animais.forEach(animal => {
    if (animal.categoria === "Pássaros" || animal.categoria === "Mamíferos") {
        return;
    }

    animal.categoria = "Outros";
});


// Referências às telas e aos elementos da interface.
const telaInicio = document.getElementById("tela-inicio");
const telaJogo = document.getElementById("tela-jogo");
const telaResultado = document.getElementById("tela-resultado");
const telaBestiario = document.getElementById("tela-bestiario");
const telaDetalhes = document.getElementById("tela-detalhes-animal");

const btnIniciar = document.getElementById("btn-iniciar");
const btnBestiario = document.getElementById("btn-bestiario");
const btnProximo = document.getElementById("btn-proximo");
const btnReiniciar = document.getElementById("btn-reiniciar");
const btnTelaInicial = document.getElementById("btn-telaInicial");
const btnFecharBestiario = document.getElementById("btn-fechar-bestiario");
const btnVoltarBestiario = document.getElementById("btn-voltar-bestiario");
const btnAlternarImagem = document.getElementById("btn-alternar-imagem");

const imagemSilhueta = document.getElementById("imagem-silhueta");
const containerAlternativas = document.getElementById("alternativas");
const elementoTempo = document.getElementById("tempo");
elementoTempo.classList.add("cronometro-pizza");
const opcaoCronometro = document.getElementById("usar-cronometro");

const etiquetaPontuacao = document.getElementById("etiqueta-pontuacao");
const nomeInsignia = document.getElementById("nome-insignia");
const imagemInsignia = document.getElementById("imagem-insignia");
const pontuacaoFinal = document.getElementById("pontuacao-final");
const textoResultado = document.getElementById("texto-resultado");

const listaAnimais = document.getElementById("lista-animais");
const pesquisaEspecies = document.getElementById("pesquisa-especies");
const nenhumAnimal = document.getElementById("nenhum-animal");

const imagemDetalhes = document.getElementById("imagem-detalhes-animal");
const nomeDetalhes = document.getElementById("nome-detalhes-animal");
const descricaoDetalhes = document.getElementById("descricao-detalhes-animal");
const curiosidadeDetalhes = document.getElementById("curiosidade-detalhes-animal");

// Configurações e variáveis de controle do jogo.
const totalRounds = 5;
const limiteTempo = 10;

let indiceAtual = 0;
let pontuacao = 0;
let tempoRestante = limiteTempo;
let respondida = false;
let intervaloCronometro = null;
let perguntasSelecionadas = [];
let transicaoEmAndamento = false;
let categoriaAtual = "Todas";
let animalSelecionado = null;
let mostrandoDesenho = false;
let jogoFinalizado = false;
let temporizadorLiberarProximo = null;

// Sons utilizados nas interações e transições.
const somClique = new Audio("../assets/images/quiz/sons/click.mp3");
const somSelecao = new Audio("../assets/images/quiz/sons/selecao.mp3");
const somCronometro = new Audio("../assets/images/quiz/sons/cronometro.mp3");
const somTranscicao = new Audio("../assets/images/quiz/sons/transicao.mp3")
const somConquista = new Audio("../assets/images/quiz/sons/conquista.mp3")

somTranscicao.volume = 0.05
somClique.volume = 0.4;
somSelecao.volume = 0.2;
somCronometro.volume = 0.4;
somConquista.volume = 0.4

somClique.preload = "auto"; //faz com que o som ja esteja carregado antecipadamente
somSelecao.preload = "auto";
somCronometro.preload = "auto";
somCronometro.preload =" auto";
somConquista.preload = "auto";

// Mantem o botão de próxima pergunta oculto até a revelação da fotografia.
btnProximo.hidden = false;
btnProximo.style.setProperty("visibility", "hidden", "important");
btnProximo.style.setProperty("opacity", "0", "important");
btnProximo.style.setProperty("animation", "none", "important");
btnProximo.disabled = true;

// Embaralha os elementos sem modificar o array original.
function embaralharArray(array) {
    const copia = [...array];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

// Identifica qual tela está visivel para realizar a próxima transição.
function telaVisivelAtual() {
    return [
        telaInicio,
        telaJogo,
        telaResultado,
        telaBestiario,
        telaDetalhes
    ].find(tela => !tela.hidden) || telaInicio;
}

// Controla as animações de saída e entrada entre as telas.
async function trocarTela(telaAtual, proximaTela, aoMostrar = null) {
    if (transicaoEmAndamento) {
        return;
    }
    tocarSomTransicao();
    transicaoEmAndamento = true;

    telaAtual.classList.add("saindo");

    await new Promise(resolve => setTimeout(resolve, 350));

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

// ==============================
// REPRODUCAO DOS EFEITOS SONOROS
// ==============================

function tocarSomClique() {
    somClique.pause();
    somClique.currentTime = 0;
    somClique.play().catch(() => { });
}

function tocarSomSelecao() {
    somSelecao.pause();
    somSelecao.currentTime = 0;
    somSelecao.play().catch(() => { });
}

function tocarSomCronometro() {
    somCronometro.pause();
    somCronometro.currentTime = 0;
    somCronometro.play().catch(() => { });
}

function tocarSomTransicao(){
    somTranscicao.pause()
    somTranscicao.currentTime = 0;
    somTranscicao.play().catch(() => {});
}

function tocarSomConquista(){
    somConquista.pause();
    somConquista.currentTime = 0;
    somConquista.play().catch(() => {})
}

// Cancela o temporizador que libera o botão de próxima pergunta.
function cancelarRevelacaoPendente() {
    if (temporizadorLiberarProximo !== null) {
        clearTimeout(temporizadorLiberarProximo);
        temporizadorLiberarProximo = null;
    }
}

// Reinicia as variáveis e seleciona cinco animais aleatórios para a partida.
function comecarJogo() {
    if (transicaoEmAndamento) {
        return;
    }

    pararCronometro();
    cancelarRevelacaoPendente();

    indiceAtual = 0;
    pontuacao = 0;
    tempoRestante = limiteTempo;
    respondida = false;
    jogoFinalizado = false;

    btnProximo.style.setProperty("visibility", "hidden", "important");
    btnProximo.style.setProperty("opacity", "0", "important");
    btnProximo.disabled = true;

    perguntasSelecionadas = embaralharArray(animais).slice(0, totalRounds);

    trocarTela(telaVisivelAtual(), telaJogo, mostrarPergunta);
}

// Atualiza a pergunta, a silhueta, o número do round e as alternativas
function mostrarPergunta() {
    pararCronometro();
    cancelarRevelacaoPendente();

    imagemSilhueta.getAnimations().forEach(animacao => animacao.cancel());
    imagemSilhueta.style.opacity = "1";

    if (indiceAtual >= totalRounds) {
        finalizarJogo();
        return;
    }

    respondida = false;

    const animalCorreto = perguntasSelecionadas[indiceAtual];

    imagemSilhueta.src = animalCorreto.silhueta;
    imagemSilhueta.alt = `Silhueta de ${animalCorreto.nome}`;

    document.querySelector(".pergunta-titulo").textContent =
        "Que bicho do Mangue é esse?";

    document.getElementById("round-atual").textContent =
        `Round ${String(indiceAtual + 1).padStart(2, "0")}`;

    containerAlternativas.innerHTML = "";
    btnProximo.style.setProperty("visibility", "hidden", "important");
    btnProximo.style.setProperty("opacity", "0", "important");
    btnProximo.disabled = true;

    gerarAlternativas(animalCorreto);

    if (opcaoCronometro.checked) {
        elementoTempo.hidden = false;
        iniciarCronometro();
    } else {
        elementoTempo.hidden = true;
    }
}

// Cria quatro alternativas, sendo uma correta e três escolhidas aleatoriamente
function gerarAlternativas(animalCorreto) {
    const animaisErrados = embaralharArray(
        animais.filter(animal => animal.nome !== animalCorreto.nome)
    ).slice(0, 3);

    const alternativas = embaralharArray([
        animalCorreto,
        ...animaisErrados
    ]);

    alternativas.forEach(animal => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "alternativa";
        botao.textContent = animal.nome;

        botao.addEventListener("mouseenter", () => {
            if (!respondida && !botao.disabled) {
                tocarSomSelecao();
            }
        });

        botao.addEventListener("click", () => {
            if (respondida || transicaoEmAndamento) {
                return;
            }

            tocarSomClique();
            verificarResposta(animal, animalCorreto, botao);
        });

        containerAlternativas.appendChild(botao);
    });
}

// Verifica a resposta, atualiza a pontuação e revela a fotografia do animal.
function verificarResposta(animalEscolhido, animalCorreto, botaoEscolhido) {
    if (respondida || jogoFinalizado) {
        return;
    }

    respondida = true;
    pararCronometro();

    containerAlternativas.querySelectorAll("button").forEach(botao => {
        botao.disabled = true;
    });

    if (animalEscolhido.nome === animalCorreto.nome) {
        pontuacao++;
        botaoEscolhido.classList.add("correta");
    } else {
        botaoEscolhido.classList.add("incorreta");
        destacarRespostaCerta(animalCorreto);
    }

    revelarFotografia(animalCorreto);
}

// Destaca a alternativa correta quando o jogador erra ou o tempo acaba
function destacarRespostaCerta(animalCorreto) {
    containerAlternativas.querySelectorAll("button").forEach(botao => {
        if (botao.textContent === animalCorreto.nome) {
            botao.classList.add("correta");
        }
    });
}

// Substitui a silhueta pela fotografia usando uma transição de opacidade
function revelarFotografia(animalCorreto) {
    btnProximo.style.setProperty("visibility", "hidden", "important");
    btnProximo.style.setProperty("opacity", "0", "important");
    btnProximo.disabled = true;
    cancelarRevelacaoPendente();

    imagemSilhueta.getAnimations().forEach(animacao => animacao.cancel());

    //uma animacao leve feita pelo js utilizando uma formacao de css
    const animacaoSaida = imagemSilhueta.animate(
        [
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 180,
            easing: "ease-in-out",
            fill: "forwards"
        }
    );

    animacaoSaida.onfinish = () => {
        imagemSilhueta.src = animalCorreto.fotografia;
        imagemSilhueta.alt = `Fotografia de ${animalCorreto.nome}`;

        imagemSilhueta.animate(
            [
                { opacity: 0 },
                { opacity: 1 }
            ],
            {
                duration: 180,
                easing: "ease-in-out",
                fill: "forwards"
            }
        );
    };

    temporizadorLiberarProximo = setTimeout(() => {
        btnProximo.style.setProperty("visibility", "visible", "important");
        btnProximo.style.setProperty("opacity", "1", "important");
        btnProximo.disabled = false;
        temporizadorLiberarProximo = null;
    }, 500);
}

// Inicia a contagem regressiva e atualiza o cronômetro a cada segundo
function iniciarCronometro() {
    pararCronometro();

    tempoRestante = limiteTempo;

    elementoTempo.style.setProperty(
        "--duracao-cronometro",
        `${limiteTempo}s`
    );

    elementoTempo.classList.remove("cronometro-ativo", "cronometro-pausado");

    void elementoTempo.offsetWidth;

    elementoTempo.classList.add("cronometro-ativo");

    intervaloCronometro = setInterval(() => {
        tempoRestante--;

        tocarSomCronometro();

        if (tempoRestante <= 0) {
            pararCronometro();
            tempoEsgotado();
        }
    }, 1000);
}

// Interrompe a contagem e mantém o estado visual do cronômetro
function pararCronometro() {
    if (intervaloCronometro !== null) {
        clearInterval(intervaloCronometro);
        intervaloCronometro = null;
    }

    if (elementoTempo.classList.contains("cronometro-ativo")) {
        elementoTempo.classList.add("cronometro-pausado");
    }
}

// Encerra a rodada quando o tempo chega a zero
function tempoEsgotado() {
    if (respondida || jogoFinalizado) {
        return;
    }

    respondida = true;
    pararCronometro();

    const animalCorreto = perguntasSelecionadas[indiceAtual];

    containerAlternativas.querySelectorAll("button").forEach(botao => {
        botao.disabled = true;
    });

    destacarRespostaCerta(animalCorreto);

    revelarFotografia(animalCorreto);
}

// Avança para a próxima rodada após a revelação da resposta
function proximaPergunta() {
    if (!respondida || jogoFinalizado || transicaoEmAndamento || btnProximo.disabled) {
        return;
    }

    cancelarRevelacaoPendente();

    indiceAtual++;
    mostrarPergunta();
}

// Exibe a pontuação final e define a insígnia conforme o desempenho
function finalizarJogo() {
    tocarSomConquista()
    pararCronometro();
    cancelarRevelacaoPendente();
    jogoFinalizado = true;

    trocarTela(telaJogo, telaResultado, () => {
        etiquetaPontuacao.textContent = `${pontuacao}/${totalRounds}`;

        textoResultado.textContent =
            `Você acertou ${pontuacao} de ${totalRounds} animais!`;

        nomeInsignia.classList.remove(
            "insignia-semeador",
            "insignia-explorador",
            "insignia-guardiao"
        );

        if (pontuacao === totalRounds) {
            nomeInsignia.textContent = "Guardião do mangue";
            nomeInsignia.classList.add("insignia-guardiao");

            pontuacaoFinal.textContent =
                "Parabéns, você já faz parte desse ecossistema e cabe a você protege-lo!!!";

            imagemInsignia.src =
                "../assets/images/quiz/insignias/insignia_guardiao_do_mangue.svg";

            imagemInsignia.alt = "Insígnia do guardião do mangue";

        } else if (pontuacao >= 3) {
            nomeInsignia.textContent = "Explorador";
            nomeInsignia.classList.add("insignia-explorador");

            pontuacaoFinal.textContent =
                "Continue explorando o Manguezal, tenho certeza de que você vai se sair ainda melhor! Confio em você!!!";

            imagemInsignia.src =
                "../assets/images/quiz/insignias/insignia_explorador.svg";

            imagemInsignia.alt = "Insígnia Explorador";

        } else {
            nomeInsignia.textContent = "Semeador";
            nomeInsignia.classList.add("insignia-semeador");

            pontuacaoFinal.textContent =
                "continue aprendendo sobre os animais do mangue e tente novamente! Eu sei que você consegue!!!";

            imagemInsignia.src =
                "../assets/images/quiz/insignias/insignia_semeador.svg";

            imagemInsignia.alt = "Insígnia do Semeador";
        }
    });
}

// Abre o bestiário com os filtros e a pesquisa redefinidos
function abrirBestiario() {
    if (transicaoEmAndamento) {
        return;
    }

    categoriaAtual = "Todas";
    pesquisaEspecies.value = "";

    document.querySelectorAll(".categoria-animal").forEach(botao => {
        botao.classList.toggle("ativa", botao.dataset.categoria === "Todas");
    });

    atualizarListaAnimais();

    trocarTela(telaVisivelAtual(), telaBestiario);
}

// Filtra os animais pela categoria selecionada e pelo nome pesquisado
function atualizarListaAnimais() {
    const termo = pesquisaEspecies.value.trim().toLowerCase();

    const filtrados = animais.filter(animal => {
        const correspondeCategoria =
            categoriaAtual === "Todas" || animal.categoria === categoriaAtual;

        const correspondePesquisa =
            animal.nome.toLowerCase().includes(termo);

        return correspondeCategoria && correspondePesquisa;
    });

    listaAnimais.innerHTML = "";

    filtrados.forEach(animal => {
        const cartao = document.createElement("button");
        cartao.type = "button";
        cartao.className = "cartao-animal";

        const imagem = document.createElement("img");
        imagem.src = animal.fotografia;
        imagem.alt = animal.nome;

        // Usa a silhueta como alternativa caso a fotografia não seja encontrada.
        imagem.onerror = () => {
            imagem.onerror = null;
            imagem.src = animal.silhueta;
        };

        const informacoes = document.createElement("div");
        informacoes.className = "cartao-animal-info";

        const titulo = document.createElement("h2");
        titulo.textContent = animal.nome;

        const descricaoAnimal = document.createElement("p");
        descricaoAnimal.textContent = animal.descricao;

        informacoes.append(titulo, descricaoAnimal);

        const seta = document.createElement("img");
        seta.className = "cartao-animal-seta";
        seta.src = "../assets/icones/icone_seta.svg";
        seta.alt = ""; // Imagem decorativa: não precisa de descrição para leitores de tela.

        cartao.append(imagem, informacoes, seta);

        cartao.addEventListener("click", () => {
            abrirDetalhesAnimal(animal);
        });

        listaAnimais.appendChild(cartao);
    });

    nenhumAnimal.hidden = filtrados.length > 0;
}

// Preenche a tela de detalhes com as informações do animal selecionado.
function abrirDetalhesAnimal(animal) {
    animalSelecionado = animal;
    mostrandoDesenho = false;

    nomeDetalhes.textContent = animal.nome;
    descricaoDetalhes.textContent = animal.descricao;
    curiosidadeDetalhes.textContent = animal.curiosidade;

    atualizarImagemDetalhes();

    trocarTela(telaBestiario, telaDetalhes);
}

// Atualiza a imagem exibida conforme a opção de fotografia ou desenho.
function atualizarImagemDetalhes() {
    if (!animalSelecionado) {
        return;
    }

    const imagemAtual = mostrandoDesenho
        ? animalSelecionado.desenho
        : animalSelecionado.fotografia;

    // Usa a silhueta como alternativa caso a imagem selecionada não seja encontrada.
    imagemDetalhes.onerror = () => {
        imagemDetalhes.onerror = null;
        imagemDetalhes.src = animalSelecionado.silhueta;
    };

    imagemDetalhes.src = imagemAtual;

    imagemDetalhes.alt = mostrandoDesenho
        ? `Desenho de ${animalSelecionado.nome}`
        : `Fotografia de ${animalSelecionado.nome}`;
}

// Retorna à lista de animais do bestiário.
function voltarParaBestiario() {
    if (transicaoEmAndamento) {
        return;
    }

    trocarTela(telaDetalhes, telaBestiario);
}

// Retorna à tela inicial e limpa o estado da partida.
function voltarParaInicio() {
    if (transicaoEmAndamento) {
        return;
    }

    pararCronometro();
    cancelarRevelacaoPendente();

    indiceAtual = 0;
    pontuacao = 0;
    respondida = false;
    jogoFinalizado = false;

    btnProximo.style.setProperty("visibility", "hidden", "important");
    btnProximo.style.setProperty("opacity", "0", "important");
    btnProximo.disabled = true;

    trocarTela(telaVisivelAtual(), telaInicio);
}

// Eventos dos botões de navegação e controle do jogo.
btnIniciar.addEventListener("click", comecarJogo);
btnReiniciar.addEventListener("click", comecarJogo);
btnProximo.addEventListener("click", proximaPergunta);
btnBestiario.addEventListener("click", abrirBestiario);
btnFecharBestiario.addEventListener("click", voltarParaInicio);
btnVoltarBestiario.addEventListener("click", voltarParaBestiario);
btnTelaInicial.addEventListener("click", voltarParaInicio);

// Alterna entre a fotografia e o desenho do animal selecionado.
btnAlternarImagem.addEventListener("click", () => {
    if (!animalSelecionado) {
        return;
    }

    mostrandoDesenho = !mostrandoDesenho;
    atualizarImagemDetalhes();
});

// Atualiza a lista conforme o usuário digita na pesquisa.
pesquisaEspecies.addEventListener("input", atualizarListaAnimais);

// Controla a seleção de categorias do bestiário.
document.querySelectorAll(".categoria-animal").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelector(".categoria-animal.ativa")?.classList.remove("ativa");

        botao.classList.add("ativa");
        categoriaAtual = botao.dataset.categoria;

        atualizarListaAnimais();
    });
});

// Ativa ou desativa o cronômetro durante a partida.
opcaoCronometro.addEventListener("change", () => {
    if (telaJogo.hidden || respondida) {
        return;
    }

    if (opcaoCronometro.checked) {
        elementoTempo.hidden = false;
        iniciarCronometro();
    } else {
        pararCronometro();
        elementoTempo.hidden = true;
    }
});

// Reproduz o som de clique nos botões, exceto nas alternativas do quiz.
document.addEventListener("click", evento => {
    const botao = evento.target.closest("button");

    if (!botao || botao.disabled || botao.classList.contains("alternativa")) {
        return;
    }

    tocarSomClique();
});
