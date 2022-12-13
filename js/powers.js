class Powers {
    constructor(ctx, x, y, width, type) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.type = type;
        this.width = width;
        this.isVisible = true;
        this.img = new Image();
        this.img.src = `/images/power-${this.type}.png`
        this.img.onload = () => {
            this.isReady = true;
            this.height = this.width * this.img.height / this.img.width;
        };
        this.intervalId = null;

        this.directions = {
			left: false,
			right: false
		};

        this.vx = 0;
        this.vy = 0;
        this.maxY = y;
        this.gravity = 0.04;
    }

    draw() {
        if (this.isReady && this.isVisible) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
    }

    move() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;

        if (this.directions.left) {
			this.vx = 5;
		} else if (this.directions.right) {
			this.vx = -5;
		} else {
			this.vx = 0;
		}

        if (this.y >= this.maxY) {
            this.vy = - 1;
            this.y = this.maxY - 1;
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