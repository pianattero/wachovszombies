class Player {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 100;
        this.state = undefined;
        this.bullets = [];

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

        this.directions = {
            left: false,
            right: false,
        };
        this.lastDirection = {
            left: false,
            right: false,
        };
		this.isJumping = false;
        this.isShooting = false;
        this.tick = 0;
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

        this.bullets.forEach(bullet => bullet.draw())
	}

	move() {
		this.speed += this.gravity;
		this.y += this.speed;

        if (this.directions.left) {
			if (this.tick % 10 === 0) {
                this.yFrame = 2;
				this.xFrame++;
                if (this.xFrame >= this.horizontalFrames) {
                    this.xFrame = 0;
                }
            }
		} else if (this.directions.right) {
			if (this.tick % 8 === 0) {
                this.yFrame = 0;
				this.xFrame++;
                if (this.xFrame >= this.horizontalFrames) {
                    this.xFrame = 0;
                }
            }
		} else {
            this.xFrame = 3
            this.yFrame = this.lastDirection.left ? 3 : 1
        };

		if (this.isJumping) {
            this.xFrame = 2;
            if (this.directions.left) {
                this.yFrame = 3;
            } else if (this.directions.right) {
                this.yFrame = 1;
            } else {
                this.yFrame = this.lastDirection.left ? 3 : 1
            }
			
		};

		if (this.y + this.height > this.ctx.canvas.height - 100) {
            this.y = this.ctx.canvas.height - this.height - 100;
		    this.isJumping = false;
		};

        if (!this.state) {
            this.bullets.forEach(bullet => bullet.type = 'default');
            this.bullets.forEach(bullet => bullet.move());
        }
	}

	onKeyDown(event) {
		if (event.keyCode === 37) {
			this.directions.left = true;
            this.lastDirection.left = true
            this.lastDirection.right = false
		} else if (event.keyCode === 39) {
			this.directions.right = true;
            this.lastDirection.left = false
            this.lastDirection.right = true
		};
        
		if (event.keyCode === 38 && !this.isJumping) {
			this.isJumping = true;
			this.speed = -10;
		}

        if (event.keyCode === 32 && !this.isShooting) {
            this.isShooting = true;
			this.bullets.push(new Bullet(this.ctx, this.x + 70, this.y + 45, 10));
            setTimeout(() => {
                this.isShooting = false;
            }, 100)
		}
	}

	onKeyUp(event) {
		if (event.keyCode === 37) {
			this.directions.left = false;
            this.xFrame = 3;
			this.yFrame = 3;
		}
        if (event.keyCode === 39) {
            this.directions.right = false;
            this.xFrame = 3;
			this.yFrame = 1;
		}
	}
}