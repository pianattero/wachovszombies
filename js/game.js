class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.intervalidId = null;
        this.bg = new Background(this.ctx);
        this.player = new Player(this.ctx, 100, 100);
    }

    preStart() {
		setTimeout(() => {
			this.bg.draw();
		}, 1000)
	}

    start() {
        this.intervalidId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
        }, 1000 / 60)
    }

    draw() {
        this.bg.draw();
        this.player.draw();
    }

    move() {
        this.bg.move();
        this.player.move();

    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    onKeyDown(event) {
		this.bg.onKeyEvent(event);
        this.player.onKeyDown(event);
	}

	onKeyUp(event) {
		this.bg.onKeyEvent(event);
        this.player.onKeyUp(event);

	}
}