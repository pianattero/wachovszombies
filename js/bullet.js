class Bullet {
    constructor(ctx, x, y, width, type) {
        this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.width = width;
        this.speed = 6;
        this.img = new Image();
        this.type = type || 'default'
        this.img.src = `/images/${this.type}.png`
        this.img.onload = () => {
            this.isReady = true;
            this.height = this.width * this.img.height / this.img.width
        };
    }

    draw() {
        if (this.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
		}
    }


	move() {
		this.x += this.speed;
	}
}