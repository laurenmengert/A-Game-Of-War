/*----- constants -----*/



/*----- app's state (variables) -----*/


const player1 = [];
const player2 = [];
let gameOver = false
let winner;

/*----- cached element references -----*/

//const scoreEls = ;
//const resultEls = ;
const boardEl = document.querySelector('#board');
const player1El = document.querySelector('#player1Pile');
const player2El = document.querySelector('#player2Pile');
const p1ScoreEl = document.querySelector('#player1 .score');
const p2ScoreEl = document.querySelector('#player2 .score');


/*----- event listeners -----*/

document.querySelector("#war").addEventListener("click", playRound);
document.querySelector("#reset").addEventListener("click", init);

/*----- functions -----*/
init();

function init() {
    dealCards(shuffleCards(deck));
}

//pass "deck" through when you want to call this function
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

function playRound() { 
    if(!gameOver){
        const card1 = player1.shift();
        const card2 = player2.shift();
        const bucket = [card1, card2];
        player1El.classList = card1.name;
        player2El.classList = card2.name;
        p1ScoreEl.innerHTML = `Total Cards: ${player1.length}`;
        p2ScoreEl.innerHTML = `Total Cards: ${player2.length}`;
        getWinner(card1, card2, bucket);
    }
}

function getWinner(card1, card2, bucket) {
    if((player1.length === 0) || (player2.length === 0)){
        console.log('game over');
        gameOver = true;
        return;
    } 
    if(card1.value > card2.value) {
        console.log('Player 1 wins!') //call function here to display winner
        player1.push(...bucket);
    } else if(card2.value > card1.value) {
        console.log('Player 2 wins!'); //call function here to display winner
        player2.push(...bucket);
    // } else if(card1.value === card2.value) {
    //     warMode(bucket);
    }
    //       //tie logic// call function
    } console.log(player1);
    console.log(player2);
   
function warMode(bucket) {
    let card1, card2;

// }
