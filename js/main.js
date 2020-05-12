/*----- constants -----*/



/*----- app's state (variables) -----*/


const player1 = []; //initalize our 2 players to empty arrays
const player2 = [];
const bucket = [];
let gameOver = false //initialize out gameOver to false
let winner;

/*----- cached element references -----*/

//const scoreEls = ;
//const resultEls = ;
const boardEl = document.querySelector('#board'); //grab the board
const player1El = document.querySelector('#player1Pile'); //grab the virtual "card pile of p1 and p2"
const player2El = document.querySelector('#player2Pile');
const p1ScoreEl = document.querySelector('#player1 .score'); //grab the scores
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
        p1ScoreEl.innerHTML = `Total Cards: ${player1.length}`;
        p2ScoreEl.innerHTML = `Total Cards: ${player2.length}`;
        const card1 = player1.shift(); //can't use pop
        const card2 = player2.shift();
        bucket.push(card1, card2);
        player1El.classList = card1.name;
        player2El.classList = card2.name;
        getWinner(card1, card2);
    }
}

function getWinner(card1, card2) {
    if((player1.length === 0) || (player2.length === 0)){
        console.log('game over');
        gameOver = true;
        return;
    } 
    if(card1.value > card2.value) {
        console.log('Player 1 wins!') //call function here to display winner
        player1.push(...bucket);
        bucket.length = 0;
    } else if(card2.value > card1.value) {
        console.log('Player 2 wins!'); //call function here to display winner
        player2.push(...bucket);
        bucket.length = 0;
    } else if(card1.value === card2.value) {
        console.log('THERES A TIE');
        warMode(bucket);
    }
    //  console.log(player1);
    // console.log(player2);
    console.log(bucket);
    //       //tie logic// call function
    } 
   
function warMode() {
    bucket.push(...player1.splice(0, 3), ...player2.splice(0, 3));
    console.log(bucket);
    playRound()
    }


