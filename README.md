# Site do projeto Mangue Vivo - UFC

<h4>

Sumário:

<a href="#sobre">Sobre</a> • <a href="#membros">Membros</a> • <a href="#requisitos">Requisitos</a> • <a href="#tecnologias">Tecnologias</a> • <a href="#estrutura-de-pastas">Estrutura de pastas</a> • <a href="#documento">Relatório e Apresentação</a>

</h4>

<a name="sobre"></a>

## Sobre

O Mangue Vivo é um projeto do departamento de Engenharia de Pesca da UFC voltado à valorização e conscientização sobre a importância dos manguezais. A ideia do site surgiu da necessidade de aproximar as pessoas desse ecossistema e apresentar suas informações de forma acessível, atrativa e centralizada.

O principal objetivo do projeto Mangue Vivo é conscientizar os usuários sobre a importância da preservação dos manguezais. Desenvolvido a partir de princípios de Interação Humano-Computador (IHC) e Experiência do Usuário (UX), o site utiliza a tecnologia como uma ferramenta de informação, educação e aproximação com a causa ambiental, buscando proporcionar uma experiência digital clara e envolvente.

<a name="membros"></a>

## Membros

| NOME                                  | FUNÇÃO                           |
| ------------------------------------- | -------------------------------- |
| **Antônio Crisontoni Lopes Neto**     | Design                           |
| **Gabriel de Souza Albrecht**         | Gestão, Documentação e Avaliação |
| **Iarley Alves de Sousa**             | Codificação                      |
| **Kesia Rocha Araujo**                | Design                           |
| **Larissa do Nascimento de Oliveira** | Design                           |
| **Richarlyson Nascimento da Silva**   | Codificação                      |

<a name="requisitos"></a>

## Requisitos

| ID | Title | Description | Priority | Status | Arquivo / Implementação |
| -- | ----- | ----------- | -------- | ------ | ----------------------- |
| RF01 | Apresentar o propósito do projeto | COMO visitante QUERO ver o propósito do Mangue Vivo assim que entro no site PARA entender rapidamente do que se trata. | Essencial |  Concluído | |
| RF02 | Exibir a seção Quem Somos | COMO visitante QUERO conhecer quem é o Mangue Vivo PARA entender seu vínculo institucional. | Essencial | Concluído | |
| RF03 | Exibir missão e objetivos | COMO visitante QUERO saber a missão e os objetivos do projeto PARA entender seus propósitos. | Essencial |  Concluído | |
| RF04 | Exibir a equipe do projeto | COMO visitante QUERO ver a equipe do projeto PARA saber quem está por trás das ações do Mangue Vivo. | Importante |  Concluído | |
| RF05 | Exibir a história do projeto | COMO visitante QUERO conhecer a história do projeto por uma linha do tempo PARA entender sua trajetória. | Importante |  Pendente | |
| RF06 | Listar as ações desenvolvidas | COMO visitante QUERO ver quais ações o projeto já desenvolveu PARA conhecer seu impacto prático. | Essencial |  Concluído |
| RF07 | Navegar pela galeria de fotos | COMO visitante QUERO ver e navegar pelas fotos das atividades PARA visualizar o projeto na prática. | Importante |  Pendente |
| RF08 | Disponibilizar material de apoio para campo | COMO integrante do projeto QUERO usar o site como apoio em apresentações de trilhas e escolas PARA ter conteúdo organizado à mão em campo. | Desejável |  Pendente | |
| RF09 | Exibir vídeos de tour virtual | COMO visitante QUERO assistir a um tour virtual dos locais do projeto PARA conhecer os espaços antes de visitar pessoalmente. | Desejável |  Pendente | |
| RF10 | Acessar o jornal digital | COMO visitante QUERO acessar as edições do jornal digital PARA ler o conteúdo publicado. | Importante |  Pendente | |
| RF11 | Listar eventos com status | COMO visitante QUERO ver os próximos eventos, com data e indicação se já encerraram, PARA saber quando e como participar. | Importante |  Pendente | |
| RF12 | Inscrever-se em um evento | COMO visitante QUERO me inscrever em um evento pelo site PARA participar sem precisar sair da página. | Importante |  Pendente |
| RF13 | Jogar o quiz educativo | COMO visitante QUERO jogar um quiz de adivinhar o animal do mangue, com opção de baixar o jogo completo, PARA aprender de forma divertida sobre a fauna local. | Desejável |  Pendente | |
| RF14 | Exibir ranking de exploradores | COMO jogador QUERO ver um ranking baseado no meu desempenho no quiz PARA acompanhar meu progresso e me sentir motivado. | Desejável |  Pendente | |
| RF15 | Exibir localização e redes sociais | COMO visitante QUERO ver o endereço físico e as redes sociais do projeto PARA me situar e acompanhá-lo em outros canais. | Essencial |  Pendente | |
| RF16 | Enviar mensagem de contato | COMO visitante QUERO preencher e enviar um formulário de contato, sendo avisado se algo estiver errado ou se o envio for concluído, PARA tirar dúvidas com segurança de que fui atendido. | | Essencial | Pendente | |
| RF17 | Navegar com menu fixo e atalho ao topo | COMO visitante QUERO acessar qualquer seção do site rapidamente enquanto navego, e voltar ao topo com um clique, PARA me deslocar pela página com agilidade. | Importante |  Pendente | |
| RF18 | Consultar perguntas frequentes | COMO visitante QUERO encontrar respostas para dúvidas comuns PARA resolver questões simples sem precisar entrar em contato. | Desejável |  Pendente | |


<a name="tecnologias"></a>

## Tecnologias

* **HTML5** — Estrutura e organização das páginas do site.
* **CSS3** — Estilização, layout, responsividade e identidade visual.
* **JavaScript** — Implementação de interações e funcionalidades do site, como o carrossel de banners.
* **Git** — Controle de versão do código-fonte.
* **GitHub** — Hospedagem do repositório e gerenciamento do código.
* **Figma** — Prototipação e desenvolvimento da interface visual do projeto.
* **Laragon** — Ambiente de desenvolvimento local para execução do projeto.

<a name="estrutura-de-pastas"></a>

## Estrutura de Pastas

```text
projeto-mangue-vivo/
│
├── assets/
│   └── images/
│       ├── logo.png
│       ├── img_hero_section01.png
│       ├── img_hero_section02.png
│       ├── img_hero_section03.png
│       └── img_qm_somos.png
│
├── css/
│   ├── style.css
│   └── home.css
│
├── js/
│   └── script.js
│
├── pages/
│   ├── acoes.html
│   ├── conteudos.html
│   └── contato.html
│
├── index.html
└── README.md
```

### Descrição

* **assets/images/** — Armazena as imagens utilizadas no site, como logo, banners e imagens das seções.
* **css/** — Contém os arquivos responsáveis pela estilização das páginas.
* **js/** — Contém os scripts JavaScript responsáveis pelas funcionalidades e interações.
* **pages/** — Armazena as páginas secundárias do site.
* **index.html** — Página inicial do projeto.
* **README.md** — Documentação e informações sobre o projeto

<a name="documento"></a>

## Relatório e Apresentação do projeto
