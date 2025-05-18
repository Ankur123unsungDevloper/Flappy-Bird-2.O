class Player {
  constructor (game) {
    this.game = game;
    this.x = 20;
    this.y = 0;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.width;
    this.height;
    this.speedY;
  }
  draw() {
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.y += this.speedY;
    if (this.y < this.game.height - this.height) {
      this.speedY += this.game.gravity;
    }
    // bottom boundry
    if (this.isTouchingBottom()) {
      this.y = this.game.height - this.height;
    }
  }
  resize() {
    this.width = this.spriteWidth * this.game.ratio;
    this.height = this.spriteHeight * this.game.ratio;
    this.y = this.game.height * 0.5 - this.height * 0.5;
    this.speedY = -4 * this.game.ratio;
  }
  isTouchingBottom() {
    return this.y + this.height >= this.game.height - this.height;
  }
  flap() {
    this.speedY = -5;
  }
}