
let player1 = [];
let player2 = [];
const bucket = []; // the bucket is a temporary array that the players "throw" their cards in so their values can be compared
let winner;

// below are my DOM elements
const boardEl = document.querySelector('#board'); 
const player1El = document.querySelector('#player1Pile'); 
const player2El = document.querySelector('#player2Pile');
const p1ScoreEl = document.querySelector('#player1 .score'); 
const p2ScoreEl = document.querySelector('#player2 .score');
const messageEl = document.querySelector('#msg');

// below are my event listeners
document.querySelector("#war").addEventListener("click", playRound);
document.querySelector("#reset").addEventListener("click", init);


init();


function init() {
    winner= false;
    player1 = [];
    player2 = [];
    player1El.classList = '';
    player2El.classList = '';
    p1ScoreEl.innerHTML = `Total Cards: 26`;
    p2ScoreEl.innerHTML = `Total Cards: 26`;
    messageEl.innerHTML = '';
    dealCards(shuffleCards(deck));
}

// shuffled using the Fisher Yates algorithm
function shuffleCards(arr) { 
    for(let i = 0; i < arr.length; i++){
        const newPos = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[newPos];
        arr[newPos] = temp;
    }
    return arr;
}

// dealt by odd and even indices
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
    if(!winner){
        new Audio('sounds/flip.wav').play();
        const card1 = player1.shift();
        const card2 = player2.shift();
        player1El.classList = card1.name;
        player2El.classList = card2.name;
        bucket.push(card1, card2);
        getWinner(card1, card2);
        p1ScoreEl.innerHTML = `Total Cards: ${player1.length}`;
        p2ScoreEl.innerHTML = `Total Cards: ${player2.length}`;
    }
}


function getWinner(card1, card2) {
    if(card1.value > card2.value) {
        messageEl.innerHTML = 'Humans Win This Round!'
        player1.push(...bucket);
        bucket.length = 0;
    } else if(card2.value > card1.value) {
        messageEl.innerHTML = 'Robots Win This Round!'
        player2.push(...bucket);
        bucket.length = 0;
    } else if(card1.value === card2.value) {
        checkCards();
    } //the code below checks for a deck that hits '0' and declares the other player the winner
    if(player1.length === 0) {
        new Audio('sounds/boo.wav').play();
        messageEl.innerHTML = 'THE ROBOTS HAVE WON THE WAR!';
        winner = true;
    } if (player2.length === 0) {
        new Audio('sounds/cheer.wav').play();
        messageEl.innerHTML = 'THE HUMANS HAVE WON THE WAR!';
        winner = true;
    } 
}

// this function checks to make sure that each player has enough cards to enter 'War'
// if not, it declares the other player the winner
function checkCards() {
    if(player1.length < 4) {
        new Audio('sounds/boo.wav').play();
        messageEl.innerHTML = 'THE ROBOTS HAVE WON THE WAR!';
        winner = true;
    } else if(player2.length < 4){
        new Audio('sounds/cheer.wav').play();
        messageEl.innerHTML = 'THE HUMANS HAVE WON THE WAR!';
        winner = true;
    } else {
        messageEl.innerHTML = `It's a tie. This means WAR!`;
        warMode();
    }
}
   
// war mode adds 3 more cards to the bucket from each players array and then calls playRound
// to play the 4th card
function warMode() {
    bucket.push(...player1.splice(0, 3), ...player2.splice(0, 3));
    setTimeout(function(){
        playRound()
    }, 2000)
}


