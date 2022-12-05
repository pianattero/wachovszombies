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
    }

    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.checkCollisions();
            this.tick++;
            if (this.tick % 1300 === 0) {
                this.addEnemy();
            }
            if (this.tick % 1100 === 0) {
                this.addEnemyShooter();
            }
            if (this.tick % 1110 === 0) {
                this.addEnemyRunner();
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
    }

    move() {
        this.bg.move();
        this.player.move();
        this.enemies.forEach((enemy) => {
            enemy.move(this.bg.speed);
        });
        this.platforms.forEach((platform) => {
            platform.move();
        });
        this.powers.forEach((power) => {
            power.move();
        });
    }

    addEnemy() {
        const enemyDefault = new Enemy(
            this.ctx,
            this.canvas.width,
            310,
            100,
            -5,
            "default"
        );
        this.enemies.push(enemyDefault);
    }

    addEnemyShooter() {
        const enemyShooter = new Enemy(
            this.ctx,
            this.canvas.width,
            310,
            100,
            -5,
            "shooter"
        );
        this.enemies.push(enemyShooter);
    }

    addEnemyRunner() {
        const enemyRunner = new Enemy(
            this.ctx,
            this.canvas.width,
            310,
            100,
            -5,
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

                        setTimeout(() => {
                            this.bg.speed = 5;
                            this.enemies.forEach((enemy) => {
                                enemy.x += 5;
                                enemy.bullets.forEach((bullet) => {
                                    bullet.x += 5;
                                })
                            });
                        }, 200)
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
                        this.bg.speed = 10;
                        this.enemies.forEach((enemy) => {
                            enemy.x += 10;
                            enemy.bullets.forEach((bullet) => {
                                bullet.x += 10;
                            })
                        });
                        this.player.isInvincible = false;
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
                        this.player.state = this.powerBullets[0]
                    } 
                    
                    if(power.type === 'ddl') {
                        this.player.canShoot = true;
                        this.player.state = this.powerBullets[1]
                    }
                    
                    if(power.type === 'chori') {
                        this.player.canShoot = true;
                        this.player.state = this.powerBullets[2]
                    };
                    setTimeout(() => {
                        this.player.canShoot = false;
                    }, 10_000)
                    
                    if(power.type === 'mate') {
                        this.player.health += 20
                        if(this.player.health === 100) {
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

    gameOver() {
        clearInterval(this.intervalId);
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
