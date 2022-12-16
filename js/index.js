const game = new Game("canvas");
const introSound = new Audio("../sounds/they-are-coming.mp3");
const homeSound = new Audio("../sounds/mano-de-dios.mp3");

canvasDiv = document.querySelector(".canvas-div");
areYouReadyBtn = document.querySelector(".are-you-ready-btn");
startBtn = document.querySelector(".menu-btns .start-btn");
pauseBtn = document.querySelector(".pause-btn");
resumeBtn = document.querySelector(".resume-btn");
howToPlayBtn = document.querySelector(".menu-btns .how-to-play-btn");
nextBtn = document.querySelector(".next-btn");
nextBtn2 = document.querySelector(".next-btn2");
nextBtn3 = document.querySelector(".next-btn3");
previousBtn = document.querySelector(".previous-btn");
previousBtn2 = document.querySelector(".previous-btn2");
previousBtn3 = document.querySelector(".previous-btn3");
menuBtn = document.querySelector(".home-btn");
playAgainBtn = document.querySelector(".playAgain-btn");
playAgainBtn2 = document.querySelector(".playAgain-btn2");
homeDiv = document.querySelector(".home-page");
menuDiv = document.querySelector(".menu-page");
pauseDiv = document.querySelector(".pause-page");
howToPlayDiv1 = document.querySelector(".how-to-play-page1");
howToPlayDiv2 = document.querySelector(".how-to-play-page2");
howToPlayDiv3 = document.querySelector(".how-to-play-page3");
howToPlayDiv4 = document.querySelector(".how-to-play-page4");
gameOverDiv = document.querySelector(".game-over");
gameWonDiv = document.querySelector(".game-won");

areYouReadyBtn.addEventListener("click", () => {
    homeSound.loop = true;
    homeSound.play();
    homeSound.volume = 0.3;
    homeDiv.classList.remove("flex");
    homeDiv.classList.remove("instructions");
    homeDiv.classList.add("hidden");
    menuDiv.classList.add("flex");
    menuDiv.classList.add("instructions");
    menuDiv.classList.remove("hidden");
});

startBtn.addEventListener("click", () => {
    game.start();
    game.gameSound.play();
    game.gameSound.volume = 0.15;
    homeSound.pause();
    setTimeout(() => {
        introSound.play();
        introSound.volume = 0.3;
    }, 1500);
    canvasDiv.classList.remove("hidden");
    canvasDiv.classList.add("flex");
    menuDiv.classList.remove("flex");
    menuDiv.classList.remove("instructions");
    menuDiv.classList.add("hidden");
});

pauseBtn.addEventListener("click", () => {
    game.pause();
    pauseBtn.classList.add("hidden");
    pauseDiv.classList.remove("hidden");
    pauseDiv.classList.add("flex");
});

resumeBtn.addEventListener("click", () => {
    game.start();
    pauseBtn.classList.remove("hidden");
    pauseDiv.classList.add("hidden");
    pauseDiv.classList.remove("flex");
});

howToPlayBtn.addEventListener("click", () => {
    howToPlayDiv1.classList.add("flex");
    howToPlayDiv1.classList.add("instructions");
    howToPlayDiv1.classList.remove("hidden");
    menuDiv.classList.add("hidden");
    menuDiv.classList.remove("flex");
    menuDiv.classList.remove("instructions");
});

nextBtn.addEventListener("click", () => {
    howToPlayDiv1.classList.remove("flex");
    howToPlayDiv1.classList.remove("instructions");
    howToPlayDiv1.classList.add("hidden");
    howToPlayDiv2.classList.remove("hidden");
    howToPlayDiv2.classList.add("flex");
    howToPlayDiv2.classList.add("instructions");
});

nextBtn2.addEventListener("click", () => {
    howToPlayDiv2.classList.remove("flex");
    howToPlayDiv2.classList.remove("instructions");
    howToPlayDiv2.classList.add("hidden");
    howToPlayDiv3.classList.remove("hidden");
    howToPlayDiv3.classList.add("flex");
    howToPlayDiv3.classList.add("instructions");
});

nextBtn3.addEventListener("click", () => {
    howToPlayDiv3.classList.remove("flex");
    howToPlayDiv3.classList.remove("instructions");
    howToPlayDiv3.classList.add("hidden");
    howToPlayDiv4.classList.remove("hidden");
    howToPlayDiv4.classList.add("flex");
    howToPlayDiv4.classList.add("instructions");
});

previousBtn.addEventListener("click", () => {
    howToPlayDiv2.classList.remove("flex");
    howToPlayDiv2.classList.remove("instructions");
    howToPlayDiv2.classList.add("hidden");
    howToPlayDiv1.classList.remove("hidden");
    howToPlayDiv1.classList.add("flex");
    howToPlayDiv1.classList.add("instructions");
});

previousBtn2.addEventListener("click", () => {
    howToPlayDiv3.classList.remove("flex");
    howToPlayDiv3.classList.remove("instructions");
    howToPlayDiv3.classList.add("hidden");
    howToPlayDiv2.classList.remove("hidden");
    howToPlayDiv2.classList.add("flex");
    howToPlayDiv2.classList.add("instructions");
});

previousBtn3.addEventListener("click", () => {
    howToPlayDiv4.classList.remove("flex");
    howToPlayDiv4.classList.remove("instructions");
    howToPlayDiv4.classList.add("hidden");
    howToPlayDiv3.classList.remove("hidden");
    howToPlayDiv3.classList.add("flex");
    howToPlayDiv3.classList.add("instructions");
});

menuBtn.addEventListener("click", () => {
    menuDiv.classList.remove("hidden");
    menuDiv.classList.add("flex");
    menuDiv.classList.add("instructions");
    howToPlayDiv4.classList.remove("flex");
    howToPlayDiv4.classList.remove("instructions");
    howToPlayDiv4.classList.add("hidden");
});

playAgainBtn.addEventListener("click", () => {
    homeDiv.classList.remove("hidden");
    homeDiv.classList.add("flex");
    homeDiv.classList.add("instructions");
    gameOverDiv.classList.remove("flex");
    gameOverDiv.classList.remove("instructions");
    gameOverDiv.classList.add("hidden");
});

playAgainBtn2.addEventListener("click", () => {
    homeDiv.classList.remove("hidden");
    homeDiv.classList.add("flex");
    homeDiv.classList.add("instructions");
    gameWonDiv.classList.remove("flex");
    gameWonDiv.classList.remove("instructions");
    gameWonDiv.classList.add("hidden");
});

document.addEventListener("keydown", function (event) {
    game.onKeyDown(event);
});

document.addEventListener("keyup", function (event) {
    game.onKeyUp(event);
});
