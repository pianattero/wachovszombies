class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.intervalId = null;
        this.tick = 0;
        this.score = 0;
        this.bg = new Background(this.ctx);
        this.player = new Player(this.ctx, 190, 295, 100);
        this.enemies = [];
        this.platforms = platforms;
        this.powers = powers;
        this.powerBullets = powerBullets;
        this.powerTimer = 0;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.checkCollisions();
            this.drawScore();
            this.drawPlayerHealth();
            this.tick++;

            switch (true) {
                case this.score < 10:
                    if (this.tick % 400 === 0) {
                        this.addEnemy();
                    }
                    break;
                case this.score >= 10 && this.score < 25:
                    if (this.tick % 300 === 0) {
                        this.addEnemy();
                    }
                    if (this.tick % 550 === 0) {
                        this.addEnemyShooter();
                    }
                    break;
                case this.score >= 25 && this.score < 50:
                    if (this.tick % 300 === 0) {
                        this.addEnemy();
                    }
                    if (this.tick % 100 === 0) {
                        this.addEnemyShooter();
                    }
                    if (this.tick % 100 === 0) {
                        this.addEnemyRunner();
                    }
                    break;
                case this.score > 50:
                    if (this.tick % 300 === 0) {
                        this.addEnemy();
                    }
                    if (this.tick % 100 === 0) {
                        this.addEnemyShooter();
                    }
                    if (this.tick % 100 === 0) {
                        this.addEnemyRunner();
                    }
                    break;
            }
            
            if (this.tick % 60 === 0 && this.powerTimer > 0) {
                this.powerTimer--;
            }
        }, 1000 / 60);
    }

    draw() {
        this.bg.draw();
        this.player.draw();
        this.enemies.forEach((enemy) => {
            enemy.draw();
        });
        this.platforms.forEach((platform) => {
            platform.draw();
        });
        this.powers.forEach((power) => {
            power.draw();
        });
        if (this.powerTimer > 0) {
            this.printSeconds();
        };
    }

    move() {
        this.bg.move();
        this.player.move(this.bg.speed);
        this.enemies.forEach((enemy) => {
            enemy.move(this.bg.speed);
        });
        this.platforms.forEach((platform) => {
            platform.move();
        });
        this.powers.forEach((power) => {
            power.move();
        });
        if (this.powerTimer === 0) {
            this.player.canShoot = false;
        }
    }

    addEnemy(x = 0) {
        const enemyDefault = new Enemy(
            this.ctx,
            this.canvas.width + x,
            310,
            100,
            "default"
        );
        this.enemies.push(enemyDefault);
    }

    addEnemyShooter(x = 0) {
        const enemyShooter = new Enemy(
            this.ctx,
            this.canvas.width + x,
            310,
            100,
            "shooter"
        );
        this.enemies.push(enemyShooter);
    }

    addEnemyRunner(x = 0) {
        const enemyRunner = new Enemy(
            this.ctx,
            this.canvas.width + x,
            310,
            100,
            "runner"
        );
        this.enemies.push(enemyRunner);
    }

    checkCollisions() {
        // Player bullets collides with enemies
        this.enemies.some((enemy) => {
            this.player.bullets.some((bullet) => {
                if (enemy.collideWith(bullet)) {
                    bullet.isVisible = false;
                    enemy.receiveDamage(bullet.strength);

                    if (enemy.health <= 0) {
                        this.score += 1;
                    }

                    if (this.score >= 100) {
                        this.winPage();
                    }
                }
            });
        });

        // Player collides with zombie Bullets
        this.enemies.some((enemy) => {
            enemy.bullets.some((bullet) => {
                const collision = this.player.collideWith(bullet);
                if (collision) {
                    if (collision === 'collide') {
                        this.player.receiveDamage(bullet.strength);
                        bullet.isVisible = false;

                        this.player.xFrame = 1;
                        if (this.player.lastDirection.left) {
                            this.player.yFrame = 3;
                        } else if (this.player.lastDirection.right) {
                            this.player.yFrame = 1;
                        }

                        this.bg.speed = 5;
                        this.enemies.forEach((enemy) => {
                            enemy.x += 5;
                            enemy.bullets.forEach((bullet) => {
                                bullet.x += 5;
                            })
                        });
                    }
                }
            });
        });

        // Player collides with zombies
        this.enemies.some((enemy) => {
            const collision = this.player.collideWith(enemy);
            if (collision) {
                if (collision === 'collide') {
                    if (!this.player.isInvincible) {
                        this.player.receiveDamage(enemy.damage);
                        this.player.isInvincible = true;
                    }
                    this.player.xFrame = 1;
                    if (this.player.lastDirection.left) {
                        this.player.yFrame = 3;
                    } else if (this.player.lastDirection.right) {
                        this.player.yFrame = 1;
                    }

                    setTimeout(() => {
                        this.player.isInvincible = false;
                    }, 1000)

                    setTimeout(() => {
                        this.bg.speed = 10;
                        this.enemies.forEach((enemy) => {
                            enemy.x += 10;
                            enemy.bullets.forEach((bullet) => {
                                bullet.x += 10;
                            })
                        });
                    }, 200)
                }
            }
        });

        // Player collides with powers
        this.powers.some((power) => {
            const collision = this.player.collideWith(power);

            if (collision) {
                if (collision === 'collide') {
                    power.isVisible = false;
                    if(power.type === 'bulletsIcon') {
                        this.player.canShoot = true;
                        this.player.state = this.powerBullets[0];
                        this.powerTimer = 10;
                    }
                    if(power.type === 'ddl') {
                        this.player.canShoot = true;
                        this.player.state = this.powerBullets[1];
                        this.powerTimer = 5;

                        this.addEnemy(0)
                        this.addEnemy(100)
                        this.addEnemy(200)
                        this.addEnemy(300)
                        this.addEnemy(400)
                        this.addEnemyRunner(10)

                    }
                    if(power.type === 'chori') {
                        this.player.canShoot = true;
                        this.player.state = this.powerBullets[2];
                        this.powerTimer = 5;

                        this.addEnemy(0)
                        this.addEnemy(100)
                        this.addEnemy(200)
                        this.addEnemy(300)
                        this.addEnemyShooter(400)
                        this.addEnemy(450)
                        this.addEnemyRunner(10)
                        this.addEnemyRunner(150)

                    };
                    
                    if(power.type === 'mate') {
                        if (this.player.health <= 80) {
                            this.player.health += 20
                        } else if (this.player.health > 80) {
                            this.player.health = 100;
                        } else if (this.player.health === 100) {
                            this.player.health = 100;
                        }
                    }
                }
            }
        });

        // Player collides with platforms
        this.platforms.some((platform) => {
            const collision = this.player.collideWith(platform);
            if (collision) {
                if (collision === 'collideFromDown') {
                    this.player.vy = 0;
                } else if (collision === 'collideFromUp') {
                    this.player.vy = 0;
                    this.player.isJumping = false;
                    this.player.y = platform.y - this.player.height;
                }
            }
        });

        if (this.player.health <= 0) {
            this.gameOver();
        }
    }

    clear() {
        this.enemies = this.enemies.filter((enemy) => enemy.health > 0);
        this.enemies.forEach((enemy) => {
            enemy.bullets = enemy.bullets.filter((bullet) => bullet.isVisible);
        });
        this.player.bullets = this.player.bullets.filter(
            (bullet) =>
                bullet.isVisible || bullet.x > this.canvas.width || bullet.x < 0
        );
        this.powers = this.powers.filter((power) => power.isVisible);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawScore() {
		this.ctx.fillStyle = '#ffffff';
		this.ctx.font = '16px Courier New';
		this.ctx.fillText("Kills: " + this.score, 1090, 30);
	}

    drawPlayerHealth() {
        this.ctx.fillStyle = '#ffffff';
		this.ctx.font = '16px Courier New';
		this.ctx.fillText("Wacho's Health: " + this.player.health, 10, 30);
    }

    gameOver() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        const finalKills = document.querySelector('#total-score-lose');
        finalKills.textContent = this.score;

        setTimeout(() => {
            const gameOverPage = document.querySelector('.game-over')
            const gamePage = document.querySelector('.canvas-div')
            
            gamePage.classList.remove('flex');
            gamePage.classList.add('hidden');
            gameOverPage.classList.remove('hidden');
	        gameOverPage.classList.add('flex');
        }, 1000)
    }

    winPage() {
        clearInterval(this.intervalId);
        this.intervalId = null;
        const finalKills = document.querySelector('#total-score-won');
        finalKills.textContent = this.score;

        setTimeout(() => {
            const gameWonPage = document.querySelector('.game-won')
            const gamePage = document.querySelector('.canvas-div')
            
            gamePage.classList.remove('flex');
            gamePage.classList.add('hidden');
            gameWonPage.classList.remove('hidden');
            gameWonPage.classList.add('flex');
        }, 1000)
    }

    printSeconds() {
        this.ctx.fillStyle = 'red';
		this.ctx.font = '20px Courier New';
		this.ctx.fillText("SHOOTING TIME: " + this.powerTimer, 500, 50);
    }

    onKeyDown(event) {
        this.bg.onKeyEvent(event);
        this.player.onKeyDown(event);
        this.platforms.forEach((platform) => {
            platform.onKeyEvent(event);
        });
        this.powers.forEach((power) => {
            power.onKeyEvent(event);
        });
    }

    onKeyUp(event) {
        this.bg.onKeyEvent(event);
        this.player.onKeyUp(event);
        this.platforms.forEach((platform) => {
            platform.onKeyEvent(event);
        });
        this.powers.forEach((power) => {
            power.onKeyEvent(event);
        });
    }
}
