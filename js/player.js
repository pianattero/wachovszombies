class Player {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 100;

        this.horizontalFrames = 5;
		this.verticalFrames = 4;
		this.xFrame = 3;
		this.yFrame = 1;

		this.img = new Image();
		this.img.src = "/images/player-sprite.png";
		this.isReady = false;
		this.img.onload = () => {
			this.isReady = true;
			this.height = this.width * this.img.height / this.img.width;
		};

		this.speed = 5;
		this.gravity = 0.5;
		this.tick = 0;

		this.isMoving = false;
		this.isJumping = false;
    }

    draw() {
		if (this.isReady) {
			this.ctx.drawImage(
				this.img,
				this.img.width / this.horizontalFrames * this.xFrame,
				this.img.height / this.verticalFrames * this.yFrame,
				this.img.width / this.horizontalFrames,
				this.img.height / this.verticalFrames,
				this.x,
				this.y,
				this.width,
				this.height
			);
			this.tick++;
		}
	}

	move() {
		this.speed += this.gravity;
		this.y += this.speed;

		if (this.isMoving) {
			if (this.tick % 10 === 0) {
				this.xFrame++;
                if (this.xFrame >= this.horizontalFrames) {
                    this.xFrame = 0;
                }
            }
        }

		if (this.isJumping) {
			this.xFrame = 2;
            this.yFrame = 1;
		}

		if (this.y + this.height > this.ctx.canvas.height - 100) {
			this.y = this.ctx.canvas.height - this.height - 100;
			this.isJumping = false;
		}
	}

	onKeyDown(event) {
		if (event.keyCode === 37 || event.keyCode === 39) {
			this.isMoving = true;
		}
		if (event.keyCode === 32 && !this.isJumping) {
			this.isJumping = true;
			this.speed = -10;
			this.yFrame = 0;
		}
	}

	onKeyUp(event) {
		if (event.keyCode === 37 || event.keyCode === 39) {
			this.isMoving = false;
            this.xFrame = 3;
			this.yFrame = 1;
		}
	}
}