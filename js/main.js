
let player1 = [];
let player2 = [];
const bucket = [];
let winner;


const boardEl = document.querySelector('#board'); //grab the board
const player1El = document.querySelector('#player1Pile'); //grab the virtual "card pile of p1 and p2"
const player2El = document.querySelector('#player2Pile');
const p1ScoreEl = document.querySelector('#player1 .score'); //grab the scores
const p2ScoreEl = document.querySelector('#player2 .score');
const messageEl = document.querySelector('#msg');


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
    dealCards(shuffleCards(smallDeck));
}


function shuffleCards(arr) { 
    for(let i = 0; i < arr.length; i++){
        const newPos = Math.floor(Math.random() * (i + 1));
        const temp = arr[i];
        arr[i] = arr[newPos];
        arr[newPos] = temp;
    }
    return arr;
}


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
    }  
    if(player1.length === 0) {
        messageEl.innerHTML = 'THE ROBOTS HAVE WON THE WAR!';
        winner = true;
    } if (player2.length === 0) {
        messageEl.innerHTML = 'THE HUMANS HAVE WON THE WAR!';
        winner = true;
    } 
}


function checkCards() {
    if(player1.length < 4) {
        messageEl.innerHTML = 'THE ROBOTS HAVE WON THE WAR!';
        winner = true;
    } else if(player2.length < 4){
        messageEl.innerHTML = 'THE HUMANS HAVE WON THE WAR!';
        winner = true;
    } else {
        messageEl.innerHTML = `It's a tie. This means WAR!`;
        warMode();
    }
}
   

function warMode() {
    bucket.push(...player1.splice(0, 3), ...player2.splice(0, 3));
    setTimeout(function(){
        playRound()
    }, 2000)
}


