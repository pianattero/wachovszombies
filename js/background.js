class Background {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 0;
        this.y = 0;
        this.width = this.ctx.canvas.width;
        this.height = this.ctx.canvas.height;
        this.img = new Image();
        this.img.src = '/images/bg.jpeg';
        this.img.onload = () => {
            this.isReady = true;
        }
        this.directions = {
			left: false,
			right: false
		};
        this.speed = 0;
    }

    draw() {
		if (this.isReady) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
            this.ctx.drawImage(this.img, this.x + this.width, this.y, this.width, this.height);
			this.ctx.drawImage(this.img, this.x - this.width, this.y, this.width, this.height)
		}
    }

    move() {
        this.x += this.speed;

        if (this.directions.left) {
			this.speed = 5;
		} else if (this.directions.right) {
			this.speed = -5;
		} else {
			this.speed = 0;
		}

        if (this.x + this.width <= 0 || this.x > this.width) {
			this.x = 0;
		}
    }

    onKeyEvent(event) {
		if (event.keyCode === 37) {
			this.directions.left = event.type === "keydown";
		} else if (event.keyCode === 39) {
			this.directions.right = event.type === "keydown";
		}
	}

}