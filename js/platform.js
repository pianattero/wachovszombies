class Platform {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.img = new Image();
        this.img.src = '/images/platform.png'
        this.img.onload = () => {
			this.isReady = true;
			this.height = this.width * this.img.height / this.img.width;
		};

        this.directions = {
			left: false,
			right: false
		};
        this.speed = 0;
    }
    
    draw() {
		if (this.isReady) {
			this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
    }

    onKeyEvent(event) {
		if (event.keyCode === 37) {
			this.directions.left = event.type === "keydown";
		} else if (event.keyCode === 39) {
			this.directions.right = event.type === "keydown";
		}
	}
}