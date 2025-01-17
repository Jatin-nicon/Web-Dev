let btnStart = document.querySelector('#start');
let btnRestart = document.querySelector('#restart');
let body = document.querySelector("body");
let h3 = document.querySelector('h3');
let allBtns = document.querySelectorAll('.inb');
let level = 0;
let btns = ['green', 'red', 'yellow', 'blue'];
let gameSeq = [];
let userSeq = [];

const clickSound = new Audio();
clickSound.src = 'Audio/click.mp3';

const gameOverSound = new Audio();
gameOverSound.src = 'Audio/gameOver.mp3';

const gameStartSound = new Audio();
gameStartSound.src = 'Audio/gameStart.mp3'

const newClick = new Audio();
newClick.src = 'Audio/newClick.mp3'



function arrayMatch(smallArray, largeArray) {
    if (smallArray.length <= largeArray.length) {
        
        for (let i=0; i<smallArray.length; i++) {
            
            if (smallArray[i] !== largeArray[i]) {
                return false;
            };
        };

        return true;
    };
    
    return false;
};

function btnFlash(btn) {
    btn.classList.add('flash');
    newClick.play();
    setTimeout(function () {
        btn.classList.remove('flash');
    }, 300);
};

function levelUp() {
    level++;
    h3.innerText = `Level ${level}`;

    let randomIndex = Math.floor(Math.random()*4);
    let randomColor = btns[randomIndex];
    let randomBtn = document.querySelector(`.${randomColor}`);
    btnFlash(randomBtn);
    gameSeq.push(randomColor) // adding to gameSeq
};

function gameOver() {
    body.classList.add('gameOver')
    gameOverSound.play()
    setTimeout(function () {
        body.classList.remove('gameOver');
    }, 500);
    h3.innerText = `Game Over! Your Score is ${level-1}`;
    level = 0;
    gameSeq = [];
    userSeq = [];
    for (let btn of allBtns) {
        btn.removeEventListener('click', buttonPress)
    }
}

function buttonPress() {
    let btn = this
    btn.classList.add('userFlash');
    setTimeout(function () {
        btn.classList.remove('userFlash');
    }, 300);
    
    userSeq.push(this.classList[1]);
    let isContinue = arrayMatch(userSeq, gameSeq);
    if (!isContinue) {
        gameOver();
    }
    
    clickSound.play()
    if (userSeq.length === gameSeq.length && isContinue) {
        userSeq = [];
        setTimeout(levelUp, 700);
    }
};

function restartGame() {
    gameStartSound.play();
    
    setTimeout(() => {
        level = 0;
        gameSeq = [];
        userSeq = [];
        h3.innerText = `Level ${level}`;
        levelUp();
    }, 1000);
    
    for (let btn of allBtns) {
        btn.addEventListener('click', buttonPress);
    }
};

function startGame() {
    gameStartSound.play();
    setTimeout(() => {
        userSeq = [];
        levelUp();
        btnStart.classList.add('hide');
        btnRestart.classList.remove('hide');
    }, 1000)
    
    
    for (let btn of allBtns) {
        btn.addEventListener('click', buttonPress)
    }
};

btnStart.addEventListener('click', startGame);
btnRestart.addEventListener('click', restartGame);