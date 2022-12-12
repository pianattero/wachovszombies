class Messi {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = 40;
        this.speed = 7;
        this.tick = 0;

        this.horizontalFrames = 6;
		this.verticalFrames = 1;
		this.xFrame = 0;
		this.yFrame = 0;

        this.img = new Image();
        this.img.src = '/images/messi.png'
        this.img.onload = () => {
			this.isReady = true;
			this.height = this.width * this.img.height / (this.img.width / this.horizontalFrames);
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
    }

    move() {
        this.x += this.speed;

        if (this.tick % 10 === 0) {
            this.xFrame++;

            if (this.xFrame >= this.horizontalFrames) {
                this.xFrame = 0;
            };
        }
	}
}