class Argentinians {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.damage = 50;
        this.speed = 0;
        this.width = 200;
        this.img = new Image();
        this.img.src = "/images/argentinians.png";
        this.img.onload = () => {
            this.isReady = true;
            this.height = (this.width * this.img.height) / this.img.width;
        };
    }

    draw() {
        if (this.isReady) {
            this.ctx.drawImage(
                this.img,
                this.x,
                this.y,
                this.width,
                this.height
            );
        }
    }

    move(bgSpeed) {
        this.speed = bgSpeed + 7;
        this.x += this.speed;    }
}
