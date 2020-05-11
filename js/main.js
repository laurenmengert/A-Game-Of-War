/*----- constants -----*/



/*----- app's state (variables) -----*/


let player1 = [];
let player2 = [];
let gameOver = false
let winner;

/*----- cached element references -----*/

//const scoreEls = ;
//const resultEls = ;
const boardEl = document.querySelector('#board');
const player1El = document.querySelector('#player1Pile');
const player2El = document.querySelector('#player2Pile');
const p1score = document.querySelector('#player1 .score');
const p2score = document.querySelector('#player2 .score');


/*----- event listeners -----*/

document.querySelector("#war").addEventListener("click", playRound);
document.querySelector("#reset").addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
    

    shuffleCards(deck);
    dealCards(deck);
    renderBoard();
}

//pass "deck" through when you want to call this function?
function shuffleCards(arr) { 
    for(let i = arr.length -1; i > 0; i--) {
        let newPos = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[newPos];
        arr[newPos] = temp;
    }
    return arr;
}

 //pushes items into player1 and player 2 arrays that I created at the top of this file
function dealCards(arr) { 
    for(let i = 0; i < arr.length; i++) {
        if(i % 2 === 0){
            player1.push(arr[i]);
        } else {
            player2.push(arr[i]);
        }
    }
}

function renderBoard () {
   
}

function playRound() { 
    if(!gameOver){
        const card1 = player1.shift();
        const card2 = player2.shift();
        const bucket = [card1, card2];
        player1El.classList = card1.name;
        player2El.classList = card2.name;
        p1score.innerHTML = `Total Cards: ${player1.length}`;
        p2score.innerHTML = `Total Cards: ${player2.length}`;
        getWinner(card1, card2, bucket);
    }
   
    //const newCard = document.createElement("div");
    //player1El.appendChild(newCard);
    
}

function getWinner(card1, card2, bucket) {
    if((player1.length === 0) || (player2.length === 0)){
        console.log('game over');
        gameOver = true;
        return;
    } if(card1.value > card2.value) {
        console.log('Player 1 wins!')
        player1 += bucket; //will this work?
    } else if(card2.value > card1.value) {
        console.log('Player 2 wins!');
        player2 += bucket;
    }
}