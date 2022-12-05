const game = new Game('canvas');

canvasDiv = document.querySelector('.canvas-div');
startBtn = document.querySelector('.menu-btns .start-btn');
howToPlayBtn = document.querySelector('.menu-btns .how-to-play-btn');
nextBtn = document.querySelector('.next-btn');
previousBtn = document.querySelector('.previous-btn');
homeBtn = document.querySelector('.home-btn');
homeDiv = document.querySelector('.home-page');
howToPlayDiv1 = document.querySelector('.how-to-play-page1');
howToPlayDiv2 = document.querySelector('.how-to-play-page2');


startBtn.addEventListener('click', () => {
	game.start();
	canvasDiv.classList.remove('hidden');
    startBtn.classList.add('hidden');
	howToPlayBtn.classList.add('hidden');
	homeDiv.classList.remove('flex');
	homeDiv.classList.add('hidden');
	howToPlayDiv1.classList.remove('flex');
	howToPlayDiv1.classList.add('hidden');
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

previousBtn.addEventListener('click', () => {
	howToPlayDiv2.classList.remove('flex');
	howToPlayDiv2.classList.add('hidden');
	howToPlayDiv1.classList.remove('hidden');
	howToPlayDiv1.classList.add('flex');
});

homeBtn.addEventListener('click', () => {
	homeDiv.classList.remove('hidden');
	homeDiv.classList.add('flex');
	howToPlayDiv2.classList.remove('flex');
	howToPlayDiv2.classList.add('hidden');
});

document.addEventListener('keydown', function(event) {
	game.onKeyDown(event);
});

document.addEventListener('keyup', function(event) {
	game.onKeyUp(event);
});