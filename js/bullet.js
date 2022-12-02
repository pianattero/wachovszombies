class Bullet {
    constructor(ctx, x, y, width, strength, speed, type) {
        this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.width = width;
        this.strength = strength;
        this.speed = speed;
        this.isVisible = true;
        this.img = new Image();
        this.type = type || 'default'
        this.img.src = `/images/${this.type}.png`
        this.img.onload = () => {
            this.isReady = true;
            this.height = this.width * this.img.height / this.img.width
        };
    }

    draw() {
        if (this.isReady && this.isVisible) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
    }

	move() {
        if (this.type === 'default' || this.type === 'chori' || this.type === 'ddl') {
            this.x += this.speed;
        } else if (this.type === 'zombieBullet') {
            this.x -= this.speed;
        }
	}
}