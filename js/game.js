class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.argWarning = document.querySelector(".argetinian-warning");

        this.intervalId = null;
        this.tick = 0;
        this.score = 0;
        this.bg = new Background(this.ctx);
        this.player = new Player(this.ctx, 190, 295);
        this.argentinians = [];
        this.messiPower = [];
        this.enemies = [];
        this.platforms = platforms;
        this.powers = powers;
        this.powerBullets = powerBullets;
        this.powerTimer = 0;

        this.messiSound = new Audio("../sounds/messi.mp3");
        this.mateSound = new Audio("../sounds/mate.mp3");
        this.gainSound = new Audio("../sounds/gain-power.wav");
        this.gameOverSound = new Audio("../sounds/game-over.mp3");
        this.gameSound = new Audio("../sounds/game-song.mp3");
    }

    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.move();
            this.checkCollisions();
            this.drawScore();
            this.tick++;

            switch (true) {
                case this.score < 10:
                    if (this.tick % 100 === 0) {
                        this.addEnemy();
                    }
                    break;
                case this.score >= 10 && this.score < 25:
                    if (this.tick % 300 === 0) {
                        this.addEnemy();
                    }
                    if (this.tick % 450 === 0) {
                        this.addEnemyShooter();
                    }
                    break;
                case this.score >= 25 && this.score < 50:
                    if (this.tick % 300 === 0) {
                        this.addEnemy();
                    }
                    if (this.tick % 350 === 0) {
                        this.addEnemyShooter();
                    }
                    if (this.tick % 450 === 0) {
                        this.addEnemyRunner();
                    }
                    break;
                case this.score > 50:
                    if (this.tick % 200 === 0) {
                        this.addEnemy();
                    }
                    if (this.tick % 275 === 0) {
                        this.addEnemyShooter();
                    }
                    if (this.tick % 350 === 0) {
                        this.addEnemyRunner();
                    }
                    break;
            }

            if (this.tick % 500 === 0) {
                this.pause();
                this.argWarning.classList.remove("hidden");
                this.argWarning.classList.add("flex");

                setTimeout(() => {
                    this.start();
                    this.argWarning.classList.add("hidden");
                    this.argWarning.classList.remove("flex");
                    setTimeout(() => {
                        this.addArgentinians();
                    }, 2000);
                }, 1000);
            }

            if (this.tick % 60 === 0 && this.powerTimer > 0) {
                this.powerTimer--;
            }
            if (this.score >= 100) {
                this.winPage();
            }
            if (this.player.health <= 0) {
                this.gameOver();
            }
        }, 1000 / 60);
    }

    draw() {
        this.bg.draw();
        this.player.draw();
        this.argentinians.forEach((argentinian) => {
            argentinian.draw();
        });
        this.messiPower.forEach((messi) => {
            messi.draw();
        });
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
        }
    }

    move() {
        this.bg.move();
        this.player.move(this.bg.speed);
        this.argentinians.forEach((argentinian) => {
            argentinian.move();
        });
        this.messiPower.forEach((messi) => {
            messi.move();
        });
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

    addArgentinians() {
        const argentinian = new Argentinians(this.ctx, -100, 268);
        this.argentinians.push(argentinian);
    }

    addMessi() {
        const messi = new Messi(this.ctx, 0, 315);
        this.messiPower.push(messi);
    }

    addEnemy(x = 0) {
        const enemyDefault = new Enemy(
            this.ctx,
            this.canvas.width + x,
            310,
            "default"
        );
        this.enemies.push(enemyDefault);
    }

    addEnemyShooter(x = 0) {
        const enemyShooter = new Enemy(
            this.ctx,
            this.canvas.width + x,
            310,
            "shooter"
        );
        this.enemies.push(enemyShooter);
    }

    addEnemyRunner(x = 0) {
        const enemyRunner = new Enemy(
            this.ctx,
            this.canvas.width + x,
            310,
            "runner"
        );
        this.enemies.push(enemyRunner);
    }

    checkCollisions() {
        // Enemies collides with player bullets
        this.enemies.some((enemy) => {
            this.player.bullets.some((bullet) => {
                if (enemy.collideWith(bullet)) {
                    bullet.isVisible = false;
                    enemy.receiveDamage(bullet.strength);

                    if (enemy.health <= 0) {
                        this.score += 1;
                    }
                }
            });
        });

        // Enemies collides with messi
        this.enemies.some((enemy) => {
            this.messiPower.some((messi) => {
                if (enemy.collideWith(messi)) {
                    enemy.health = 0;

                    if (enemy.health <= 0) {
                        this.score += 1;
                    }
                }
            });
        });

        // Enemies collides with argentinians
        this.enemies.some((enemy) => {
            this.argentinians.some((argentinian) => {
                if (
                    enemy.collideWith(argentinian) &&
                    enemy.receiveArgDamage === true
                ) {
                    enemy.damageTimer();
                    enemy.receiveDamage(argentinian.damage);
                }
            });
        });

        // Player collides with argentinians
        this.argentinians.some((argentinian) => {
            const collision = this.player.collideWith(argentinian);

            if (collision) {
                if (collision === "collide") {
                    if (!this.player.isInvincible) {
                        this.player.receiveDamage(argentinian.damage);
                        this.xFrame = 1;
                    }
                }
            }
        });

        // Player collides with zombie Bullets
        this.enemies.some((enemy) => {
            enemy.bullets.some((bullet) => {
                const collision = this.player.collideWith(bullet);
                if (collision) {
                    if (collision === "collide") {
                        bullet.isVisible = false;
                        this.player.receiveDamage(bullet.strength);

                        this.bg.speed = 5;
                        this.enemies.forEach((enemy) => {
                            enemy.x += 5;
                            enemy.bullets.forEach((bullet) => {
                                bullet.x += 5;
                            });
                        });
                    }
                }
            });
        });

        // Player collides with zombies
        this.enemies.some((enemy) => {
            const collision = this.player.collideWith(enemy);
            if (collision) {
                if (collision === "collide") {
                    if (!this.player.isInvincible) {
                        this.player.receiveDamage(enemy.damage);
                        this.xFrame = 1;
                    }

                    setTimeout(() => {
                        this.bg.speed = 10;
                        this.enemies.forEach((enemy) => {
                            enemy.x += 10;
                            enemy.bullets.forEach((bullet) => {
                                bullet.x += 10;
                            });
                        });
                    }, 200);
                }
            }
        });

        // Player collides with powers
        this.powers.some((power) => {
            const collision = this.player.collideWith(power);

            if (collision) {
                if (collision === "collide") {
                    power.isVisible = false;
                    if (power.type === "bulletsIcon") {
                        this.gainSound.currentTime = 0;
                        this.gainSound.volume = 0.4;
                        this.gainSound.play();
                        setTimeout(() => {
                            this.player.canShoot = true;
                            this.player.state = this.powerBullets[0];
                            this.powerTimer = 10;
                        }, 500);
                    }
                    if (power.type === "alfajor") {
                        this.gainSound.currentTime = 0;
                        this.gainSound.volume = 0.4;
                        this.gainSound.play();
                        setTimeout(() => {
                            this.player.canShoot = true;
                            this.player.state = this.powerBullets[1];
                            this.powerTimer = 5;

                            this.addEnemy(0);
                            this.addEnemyRunner(10);
                            this.addEnemy(100);
                            this.addEnemyShooter(200);
                            this.addEnemy(300);
                        }, 500);
                    }
                    if (power.type === "ddl") {
                        this.gainSound.currentTime = 0;
                        this.gainSound.volume = 0.4;
                        this.gainSound.play();
                        setTimeout(() => {
                            this.player.canShoot = true;
                            this.player.state = this.powerBullets[2];
                            this.powerTimer = 5;

                            this.addEnemy(0);
                            this.addEnemyRunner(10);
                            this.addEnemy(100);
                            this.addEnemyShooter(200);
                            this.addEnemy(300);
                        }, 500);
                    }
                    if (power.type === "chori") {
                        this.gainSound.currentTime = 0;
                        this.gainSound.volume = 0.4;
                        this.gainSound.play();
                        setTimeout(() => {
                            this.player.canShoot = true;
                            this.player.state = this.powerBullets[3];
                            this.powerTimer = 5;

                            this.addEnemy(0);
                            this.addEnemyRunner(10);
                            this.addEnemy(100);
                            this.addEnemyRunner(150);
                            this.addEnemy(200);
                            this.addEnemyShooter(300);
                            this.addEnemy(400);
                        }, 500);
                    }

                    if (power.type === "mate") {
                        this.mateSound.currentTime = 0;
                        this.mateSound.play();

                        if (this.player.health <= 80) {
                            this.player.health += 20;
                        } else if (this.player.health > 80) {
                            this.player.health = 100;
                        } else if (this.player.health === 100) {
                            this.player.health = 100;
                        }
                    }

                    if (power.type === "messi") {
                        this.addMessi();
                        this.messiSound.currentTime = 0;
                        this.messiSound.play();
                    }
                }
            }
        });

        // Player collides with platforms
        this.platforms.some((platform) => {
            const collision = this.player.collideWith(platform);
            if (collision) {
                if (collision === "collideFromDown") {
                    this.player.vy = 0;
                } else if (collision === "collideFromUp") {
                    this.player.vy = 0;
                    this.player.isJumping = false;
                    this.player.y = platform.y - this.player.height;
                }
            }
        });
    }

    clear() {
        this.enemies = this.enemies.filter((enemy) => enemy.health > 0);
        this.messiPower = this.messiPower.filter(
            (messi) => messi.x < this.canvas.width
        );
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
        this.ctx.fillStyle = "#ffffff";
        this.ctx.font = "16px Zen Dots";
        this.ctx.fillText("Kills: " + this.score, 20, 30);
    }

    pause() {
        clearInterval(this.intervalId);
    }

    gameOver() {
        clearInterval(this.intervalId);
        this.gameSound.pause();
        this.gameOverSound.currentTime = 0;
        this.gameOverSound.play();
        this.gameOverSound.volume = 0.3;

        const finalKills = document.querySelector("#total-score-lose");
        finalKills.textContent = this.score;

        setTimeout(() => {
            const gameOverPage = document.querySelector(".game-over");
            const gamePage = document.querySelector(".canvas-div");

            gamePage.classList.remove("flex");
            gamePage.classList.remove("instructions");
            gamePage.classList.add("hidden");
            gameOverPage.classList.remove("hidden");
            gameOverPage.classList.add("flex");
            gameOverPage.classList.add("instructions");
        }, 1000);
    }

    winPage() {
        clearInterval(this.intervalId);
        this.gameSound.pause();

        setTimeout(() => {
            const gameWonPage = document.querySelector(".game-won");
            const gamePage = document.querySelector(".canvas-div");

            gamePage.classList.remove("flex");
            gamePage.classList.remove("instructions");
            gamePage.classList.add("hidden");
            gameWonPage.classList.remove("hidden");
            gameWonPage.classList.add("flex");
            gameWonPage.classList.add("instructions");
        }, 1000);
    }

    printSeconds() {
        this.ctx.fillStyle = "red";
        this.ctx.font = "20px Zen Dots";
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
