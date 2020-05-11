/*----- constants -----*/
const suits = ['spades', 'hearts', 'clubs', 'diamonds'];
const cardFace = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];


/*----- app's state (variables) -----*/

let shuffledDeck;
let players = [[],[]];
let gameOver = false

/*----- cached element references -----*/

//const scoreEls = ;
//const resultEls = ;


/*----- event listeners -----*/

document.querySelector("#war").addEventListener("click", playRound);
document.querySelector("#reset").addEventListener("click", init);

/*----- functions -----*/

function init() {
    
};

//pass "deck" through when you want to call this function
function shuffleCards(arr) { 
    for(let i = arr.length -1; i > 0; i--) {
        let x = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[x];
        arr[x] = temp;
        console.log(temp);
    }
    return arr;
}

function playRound() {
    
};