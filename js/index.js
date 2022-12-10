const game = new Game('canvas');

canvasDiv = document.querySelector('.canvas-div');
startBtn = document.querySelector('.menu-btns .start-btn');
howToPlayBtn = document.querySelector('.menu-btns .how-to-play-btn');
nextBtn = document.querySelector('.next-btn');
nextBtn2 = document.querySelector('.next-btn2');
previousBtn = document.querySelector('.previous-btn');
previousBtn2 = document.querySelector('.previous-btn2');
homeBtn = document.querySelector('.home-btn');
playAgainBtn = document.querySelector('.playAgain-btn');
playAgainBtn2 = document.querySelector('.playAgain-btn2');
homeDiv = document.querySelector('.home-page');
howToPlayDiv1 = document.querySelector('.how-to-play-page1');
howToPlayDiv2 = document.querySelector('.how-to-play-page2');
howToPlayDiv3 = document.querySelector('.how-to-play-page3');
gameOverDiv = document.querySelector('.game-over');
gameWonDiv = document.querySelector('.game-won');

startBtn.addEventListener('click', () => {
	game.start();
	canvasDiv.classList.remove('hidden');
	canvasDiv.classList.add('flex');
	homeDiv.classList.remove('flex');
	homeDiv.classList.add('hidden');
	
});

howToPlayBtn.addEventListener('click', () => {
	howToPlayDiv1.classList.add('flex');
	howToPlayDiv1.classList.remove('hidden');
	homeDiv.classList.add('hidden');
	homeDiv.classList.remove('flex');
});

nextBtn.addEventListener('click', () => {
	howToPlayDiv1.classList.remove('flex');
	howToPlayDiv1.classList.add('hidden');
	howToPlayDiv2.classList.remove('hidden');
	howToPlayDiv2.classList.add('flex');
});

nextBtn2.addEventListener('click', () => {
	howToPlayDiv2.classList.remove('flex');
	howToPlayDiv2.classList.add('hidden');
	howToPlayDiv3.classList.remove('hidden');
	howToPlayDiv3.classList.add('flex');
});

previousBtn.addEventListener('click', () => {
	howToPlayDiv2.classList.remove('flex');
	howToPlayDiv2.classList.add('hidden');
	howToPlayDiv1.classList.remove('hidden');
	howToPlayDiv1.classList.add('flex');
});

previousBtn2.addEventListener('click', () => {
	howToPlayDiv3.classList.remove('flex');
	howToPlayDiv3.classList.add('hidden');
	howToPlayDiv2.classList.remove('hidden');
	howToPlayDiv2.classList.add('flex');
});

homeBtn.addEventListener('click', () => {
	homeDiv.classList.remove('hidden');
	homeDiv.classList.add('flex');
	howToPlayDiv3.classList.remove('flex');
	howToPlayDiv3.classList.add('hidden');
});

playAgainBtn.addEventListener('click', () => {
	homeDiv.classList.remove('hidden');
	homeDiv.classList.add('flex');
	gameOverDiv.classList.remove('flex');
	gameOverDiv.classList.add('hidden');
});

playAgainBtn2.addEventListener('click', () => {
	homeDiv.classList.remove('hidden');
	homeDiv.classList.add('flex');
	gameWonDiv.classList.remove('flex');
	gameWonDiv.classList.add('hidden');
});

document.addEventListener('keydown', function(event) {
	game.onKeyDown(event);
});

document.addEventListener('keyup', function(event) {
	game.onKeyUp(event);
});