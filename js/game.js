class Game {
    constructor(canvasId){
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.intervalidId = null;
        this.tick = 0;
        this.score = 0;
        this.levelIndex = 0;
        this.levels = [];
        this.bg = new Background(this.ctx);
        this.player = new Player(this.ctx, 100, 295, 100);
        this.enemies = [];
        this.platforms = platforms;
        this.powers = powers;
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
            this.checkCollisions();
            this.tick++;
            if (this.tick % 500 === 0) {
                this.addEnemy();
                this.tick = 0
			}
            
        }, 1000 / 60)
    }

    draw() {
        this.bg.draw();
        this.player.draw();
        this.enemies.forEach(enemy => {
            enemy.draw();
        });
        this.platforms.forEach(platform => {
            platform.draw();
        });
        this.powers.forEach(power => {
            power.draw();
        });
    }

    move() {
        this.bg.move();
        this.player.move();
        this.enemies.forEach(enemy => {
            enemy.move(this.player.directions);
        });
        this.platforms.forEach(platform => {
            platform.move();
        });
        this.powers.forEach(power => {
            power.move();
        });
    }

    addEnemy() {
        const enemyShooter = new Enemy(this.ctx, this.canvas.width, 310, 100, 'shooter');
        const enemyDefault = new Enemy(this.ctx, this.canvas.width, 310, 100, 'default');

        //this.enemies.push(enemyDefault);
        this.enemies.push(enemyShooter);
    }

    checkCollisions() {
        // Player bullets collides with enemies
        this.enemies.some(enemy => {
            this.player.bullets.some(bullet => {
                if (enemy.collideWith(bullet)) {
                    bullet.isVisible = false;
                    enemy.receiveDamage(bullet.strength)
                }
            })
        });

        // Player collides with zombie Bullets
        this.enemies.some(enemy => {
            enemy.bullets.some(bullet => {
                if (this.player.collideWith(bullet)) {
                    bullet.isVisible = false;
                    this.player.receiveDamage(bullet.strength);
                    console.log('entro', this.player.health)
                }
            })
        });

        // Player collides with powers
        this.powers.some(power => {
            const collision = this.player.collideWith(power)
            if (collision) {
                if (collision === 'case3') {
                    power.isVisible = false;
                }
            }
        });
        
        // Player collides with platforms
        this.platforms.some(platform => {
            const collision = this.player.collideWith(platform)
            if (collision) {
                if(collision === 'case1') {
                    this.player.vy = 0;
                } else if (collision === 'case2') {
                    this.player.vy = 0
                    this.player.isJumping = false
                    this.player.y = platform.y - this.player.height;
                }
            }
        });
    }

    clear() {
        this.enemies = this.enemies.filter(enemy => enemy.health > 0);
        this.enemies.forEach(enemy => {
            enemy.bullets.filter(bullet => bullet.isVisible);
        });
        this.player.bullets = this.player.bullets.filter(bullet => bullet.isVisible || bullet.x > this.canvas.width || bullet.x < 0);
        this.powers = this.powers.filter(power => power.isVisible);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    onKeyDown(event) {
		this.bg.onKeyEvent(event);
        this.player.onKeyDown(event);
        this.platforms.forEach(platform => {
            platform.onKeyEvent(event);
        });
        this.powers.forEach(power => {
            power.onKeyEvent(event);
        });
	}

	onKeyUp(event) {
		this.bg.onKeyEvent(event);
        this.player.onKeyUp(event);
        this.platforms.forEach(platform => {
            platform.onKeyEvent(event);
        });
        this.powers.forEach(power => {
            power.onKeyEvent(event);
        });
	}
}