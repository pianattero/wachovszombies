class Enemy {
    constructor(ctx, x, y, health, type) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.health = health;
        this.type = type || 'default';
        this.width = 45;
        this.isVisible = true;
        this.bullets = [];
        this.isShooting = false;

        this.horizontalFrames = 10;
		this.verticalFrames = 1;
		this.xFrame = 0;
		this.yFrame = 0;

        this.img = new Image();
        this.img.src = '/images/enemy.png';
        this.img.onload = () => {
			this.isReady = true;
			this.height = this.width * this.img.height / (this.img.width / this.horizontalFrames);
		};

        this.speed = -5;
        this.tick = 0;
        this.playerDirections = {
            right: false,
            left: false,
        };
    }

    draw() {
		if (this.isReady &&  this.isVisible) {
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

        if (this.type === 'shooter') {
            this.bullets.forEach(bullet => bullet.draw());
        }
	}

    move({ right, left }) {
        if (this.tick % 10 === 0) {
            const newSpeed = right ? -12 : -3;
            const playerIsMoving = right || left;

            this.x += !playerIsMoving ? this.speed : newSpeed;
            this.xFrame++;

            if (this.xFrame >= this.horizontalFrames) {
                this.xFrame = 0;
            };

            if (this.type === 'shooter') {
                if (this.tick % 500 === 0) {
                    this.isShooting = true;
                    this.bullets.push(new Bullet(this.ctx, this.x - 35, this.y + 10, 50, 20, 3, 'zombieBullet'));
                    this.isShooting = false;
                }
            }

        }
        this.bullets.forEach(bullet => bullet.move());

	}

    receiveDamage (bulletStrength) {
        this.health = this.health - bulletStrength
    }

    collideWith(obstacle) {
        return (
            this.x < obstacle.x + obstacle.width
			&& this.x + this.width > obstacle.x 
			&& this.y  < obstacle.y + obstacle.height
			&& this.y + this.height > obstacle.y 
        )
    }

}