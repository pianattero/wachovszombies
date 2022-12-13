class Enemy {
    constructor(ctx, x, y, type) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.health = 100;
        this.maxHealth = 100;
        this.speed = 0;
        this.type = type || 'default';
        this.width = 45;
        this.damage = 5;
        this.bullets = [];
        this.isShooting = false;

        this.horizontalFrames = 10;
		this.verticalFrames = 1;
		this.xFrame = 0;
		this.yFrame = 0;

        this.img = new Image();
        this.img.src = `/images/enemy-${this.type}.png`;
        this.img.onload = () => {
			this.isReady = true;
			this.height = this.width * this.img.height / (this.img.width / this.horizontalFrames);
		};

        this.tick = 0;
        this.playerDirections = {
            right: false,
            left: false,
        };
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

        if (this.type === 'shooter') {
            this.bullets.forEach(bullet => bullet.draw());
        }

        // Health Bar
        if(this.healthPercent() !== undefined){
            this.ctx.save()
                this.ctx.fillStyle = '#921010'
                this.ctx.fillRect(this.x + 3, this.y - 10, this.width, 5)
            this.ctx.restore()
            this.ctx.save()
                this.ctx.fillStyle = '#DD1515'
                this.ctx.fillRect(this.x + 3, this.y - 10, this.healthPercent(), 5)
            this.ctx.restore()
            this.ctx.save()
                this.ctx.strokeStyle = '#000'
                this.ctx.strokeRect(this.x + 3, this.y - 10, this.width, 5)
            this.ctx.restore()
        }
	}

    move(bgSpeed) {
        this.speed = bgSpeed - 1;
        this.x += this.speed;

        if (this.type === 'runner') {
            this.speed = -7
            this.x += this.speed;
        };

        if (this.tick % 10 === 0) {
            this.xFrame++;

            if (this.xFrame >= this.horizontalFrames) {
                this.xFrame = 0;
            };

            if (this.type === 'shooter') {
                if (this.tick % 400 === 0) {
                    this.isShooting = true;
                    this.bullets.push(new Bullet(this.ctx, this.x - 35, this.y + 10, 50, 20, 9, 'zombieBullet'));
                    this.isShooting = false;
                }
            }
        }
        this.bullets.forEach(bullet => {bullet.move(bgSpeed)});
	}

    receiveDamage (damage) {
        this.health = this.health - damage
    }

    healthPercent(){
        let percent = (this.health * 100)/this.maxHealth
        return percent * this.width / 100
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