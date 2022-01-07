let order = [];
let clickedOrder = [];
let score = 0;

// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const yellow = document.querySelector('.yellow');
const green = document.querySelector('.green');


// Remove interacao ao fazer hover nos botoes coloridos do jogo
const removeButtonInteractions = () => {
    const buttons = document.querySelectorAll('.game-button');

    buttons.forEach(button => {
        button.classList.remove('game-button');
    });
};

// Adiciona interacao ao fazer hover nos botoes coloridos do jogo
const addButtonInteractions = () => {
    const buttons =  Array.from(document.querySelector('.genius').children);

    buttons.forEach(button => {
        button.classList.add('game-button');
    });
};

// Repete ordem atual das cores
const repeatShuffle = () => {

    removeButtonInteractions();

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

// Cria ordem aleatoria de cores
const shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    removeButtonInteractions();

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
};

// Acende a proxima cor
// Se for a ultima da ordem, adiciona hover novamente nos botoes coloridos
const lightColor = (element, number) => {
    setTimeout(() => {
        element.classList.add('selected');
        setTimeout(() => {
            element.classList.remove('selected'); 

            if(number == order.length){
                addButtonInteractions();
            }
          }, 250);
    }, (number * 500) - 250);
}

// Checa se os botoes clicados soa os mesmos da ordem gerada no jogo
const checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]){
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length){
        alert(`Pontuação ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
};

// Funcao para o clique do usuario nos botoes coloridos
const click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

// Funcao que retorna a cor dado um numero
const createColorElement = (color) => {
  if(color == 0)
    return green;

  if(color == 1)
    return red;

  if(color == 2)
    return yellow;

  if(color == 3)
    return blue;
};

// Funcao para iniciar proximo nivel do jogo
const nextLevel = () => {
    score++;
    shuffleOrder();
};

// Funcao para chamar game over
const gameOver = () => {
    alert(`Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo!\n`);
    order = [];
    clickedOrder = [];

    playGame();
};

// Funcao de inicio do jogo
const playGame = () => {
    score = 0;
    order = [];
    clickedOrder = [];

    nextLevel();
};

// Eventos de clique para as cores
green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);
