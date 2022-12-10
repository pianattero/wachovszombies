class Player {
    constructor(ctx, x, y, health) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.lastY = 0;
        this.health = health;
        this.maxHealth = health
        this.width = 40;
        this.state = undefined;
        this.bullets = [];
		this.isInvincible = false;

        this.horizontalFrames = 5;
        this.verticalFrames = 4;
        this.xFrame = 2;
        this.yFrame = 1;

        this.img = new Image();
        this.img.src = "/images/player-sprite.png";
        this.img.onload = () => {
            this.isReady = true;
            this.height =
                (this.width * (this.img.height / this.verticalFrames)) /
                (this.img.width / this.horizontalFrames);
        };
        this.vy = 5;
        this.vx = 0;
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
		this.canShoot = false;
        this.tick = 0;
    }

    draw() {
        if (this.isReady) {
            this.ctx.drawImage(
                this.img,
                (this.img.width / this.horizontalFrames) * this.xFrame,
                (this.img.height / this.verticalFrames) * this.yFrame,
                this.img.width / this.horizontalFrames,
                this.img.height / this.verticalFrames,
                this.x,
                this.y,
                this.width,
                this.height
            );
            this.tick++;
        }

        this.bullets.forEach((bullet) => bullet.draw());
    }

    move(bgSpeed) {
        this.x += this.vx;
        this.lastY = this.y;
        this.y += this.vy;
        this.vy += this.gravity;

        if (this.directions.left) {
            if (this.tick % 8 === 0) {
                this.yFrame = 2;
                this.xFrame++;
                if (this.xFrame >= this.horizontalFrames - 2) {
                    this.xFrame = 0;
                }
            }
        } else if (this.directions.right) {
            if (this.tick % 8 === 0) {
                this.yFrame = 0;
                this.xFrame++;
                if (this.xFrame >= this.horizontalFrames - 2) {
                    this.xFrame = 0;
                }
            }
        } else {
            this.xFrame = 2;
            this.yFrame = this.lastDirection.left ? 3 : 1;
        }

        if (this.isJumping) {
            this.xFrame = 0;
            if (this.directions.left) {
                this.yFrame = 3;
            } else if (this.directions.right) {
                this.yFrame = 1;
            } else {
                this.yFrame = this.lastDirection.left ? 3 : 1;
            }
        }

        if (this.y + this.height > this.ctx.canvas.height - 20) {
            this.y = this.ctx.canvas.height - this.height - 20;
            this.isJumping = false;
        }

		this.bullets.forEach((bullet) => bullet.move(bgSpeed));
    }

    receiveDamage(damage) {
        this.health = this.health - damage;
    }

    collideWith(obstacle) {
        if (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y &&
            this.lastY > obstacle.y + obstacle.height
        ) {
            return "collideFromDown";
        } else if (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y &&
            this.lastY + this.height <= obstacle.y
        ) {
            return "collideFromUp";
        } else if (
            this.x < obstacle.x + obstacle.width &&
            this.x + this.width > obstacle.x &&
            this.y < obstacle.y + obstacle.height &&
            this.y + this.height > obstacle.y
        ) {
            return "collide";
        } else {
            return false;
        }
    }

    onKeyDown(event) {
        if (event.keyCode === 37) {
            this.directions.left = true;
            this.lastDirection.left = true;
            this.lastDirection.right = false;
        } else if (event.keyCode === 39) {
            this.directions.right = true;
            this.lastDirection.left = false;
            this.lastDirection.right = true;
        }

        if (event.keyCode === 38 && !this.isJumping) {
            this.isJumping = true;
            this.vy = -12;
        }

        if (event.keyCode === 32 && !this.isShooting && this.canShoot) {
            this.isShooting = true;
            const bulletSpeed = this.lastDirection.right ? 6 : -6;
            const xPosition = this.lastDirection.right ? this.x + 30 : this.x - 30;

            this.bullets.push(
                new Bullet(this.ctx, xPosition, this.y + 25, this.state.width, this.state.strength, bulletSpeed, this.state.type)
            );
            setTimeout(() => {
                this.isShooting = false;
            }, 100);
        }
    }

    onKeyUp(event) {
        if (event.keyCode === 37) {
            this.directions.left = false;
            this.xFrame = 2;
            this.yFrame = 3;
        }
        if (event.keyCode === 39) {
            this.directions.right = false;
            this.xFrame = 2;
            this.yFrame = 1;
        }
    }
}
