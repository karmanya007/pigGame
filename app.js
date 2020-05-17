/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, gamePlaying;
var diceDOM = document.querySelector('.dice');

reset();
// console.log(dice);

// document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

// var x = document.querySelector('#score-' + activePlayer).textContent;
// console.log(x);

//Event Listner for onClick on roll-button

document.querySelector('.btn-roll').addEventListener('click', function () {
	if (gamePlaying) {
		//Random number from 0 to 6
		var dice = Math.floor(Math.random() * 6) + 1;
		//Displaying the dice image according to the random number
		diceDOM.style.display = 'block';
		diceDOM.src = '/img/dice-' + dice + '.png';

		// Checking the number if it = 1

		if (dice !== 1) {
			// Round Score update
			roundScore += dice;
			// Displaying the round score
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
		} else {
			// document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

			// Switching the next player
			nextPlayer();

			// document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
		}
	}
});

// Event Listner for inClick on hold-button

document.querySelector('.btn-hold').addEventListener('click', function () {
	if (gamePlaying) {
		// Global Score update
		scores[activePlayer] += roundScore;
		// Displaying the Global Score
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		// Checking if the current player has won
		if (scores[activePlayer] >= 10) {
			document.querySelector('#name-' + activePlayer).textContent = 'Winner';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;
		} else {
			// Switching the next player
			nextPlayer();
		}
	}
});

// Event Listner for inClick on new-button
document.querySelector('.btn-new').addEventListener('click', reset);

function nextPlayer () {
	roundScore = 0;
	document.querySelector('#current-' + activePlayer).textContent = '0';

	activePlayer ? (activePlayer = 0) : (activePlayer = 1);
	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');
	diceDOM.style.display = 'none';
}
function reset () {
	roundScore = 0;
	scores = [
		0,
		0
	];
	gamePlaying = true;
	activePlayer = 0;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.querySelector('#name-0').textContent = 'Player 1';
	document.querySelector('#name-1').textContent = 'Player 2';
}
