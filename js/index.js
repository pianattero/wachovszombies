const game = new Game('canvas');
startBtn = document.querySelector('.start-btn');

game.preStart()

startBtn.addEventListener('click', () => {
	game.start();
    startBtn.classList.add('hidden');
});

document.addEventListener('keydown', function(event) {
	game.onKeyDown(event);
})

document.addEventListener('keyup', function(event) {
	game.onKeyUp(event);
})