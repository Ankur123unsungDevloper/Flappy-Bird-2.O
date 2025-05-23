class Player {
  constructor (game) {
    this.game = game;
    this.x = 20;
    this.y;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.width;
    this.height;
    this.speedY;
    this.flapSpeed;
    this.collisionX;
    this.collisionY;
    this.collisionRadius;
    this.collided;
    this.energy = 30;
    this.maxEnergy = this.energy * 2;
    this.minEnergy = 15;
  }
  draw() {
    this.game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.game.ctx.beginPath();
    this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, 2 * Math.PI);
    this.game.ctx.stroke();
  }
  update() {
    this.handleEnergy();
    this.y += this.speedY;
    this.collisionY = this.y + this.height * 0.5;
    if (!this.isTouchingBottom()) {
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
    this.flapSpeed = 5 * this.game.ratio;
    this.collisionRadius = this.width * 0.5;
    this.collisionX = this.x + this.width * 0.5;
    this.collided = false;
  }
  startCharge() {
    this.game.speed = this.game.maxSpeed;
  }
  stopCharge() {
    this.game.speed = this.game.minSpeed;
  }
  isTouchingTop() {
    return this.y <= 0;
  }
  isTouchingBottom() {
    return this.y >= this.game.height - this.height;
  }
  handleEnergy() {
    if (this.energy < this.maxEnergy) {
      this.energy += 0.1;
    }
  }
  flap() {
    if (!this.isTouchingTop()) {
      this.speedY = -this.flapSpeed;
    }
  }
}