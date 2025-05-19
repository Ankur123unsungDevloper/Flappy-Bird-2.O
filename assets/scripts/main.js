class Game {
  constructor(canvas, context) {
    this.canvas = canvas;
    this.ctx = context;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.baseHeight = 720;
    this.ratio = this.height / this.baseHeight;
    this.background = new Background(this);
    this.player = new Player(this);
    this.obstacles = [];
    this.numberofObstacles = 10;
    this.gravity;
    this.speed;

    this.resize(window.innerWidth, window.innerHeight);

    window.addEventListener('resize', e => {
      this.resize(e.currentTarget.innerWidth, e.currentTarget.innerHeight);
    });
    // mouse controls
    this.canvas.addEventListener('mousedown', e => {
      this.player.flap();
    });
    // keyboard controls
    this.canvas.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Enter') {
        this.player.flap();
      }
    });
    // touch controls
    this.canvas.addEventListener('touchstart', e => {
      this.player.flap();
    });
  }

  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.fillStyle = 'red';
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ratio = this.height / this.baseHeight;

    this.gravity = 0.15 * this.ratio;
    this.speed = 2 * this.ratio;
    this.background.resize();
    this.player.resize();
    this.createObstacles();
    this.obstacles.forEach(obstacles => {
      obstacles.resize();
    });
  }

  render() {
    this.background.update();
    this.background.draw();
    this.player.update();
    this.player.draw();
    this.obstacles.forEach(obstacles => {
      obstacles.update();
      obstacles.draw();
    });
  }
  createObstacles() {
    this.obstacles = [];
    const firstX = 100;
    const obstaclesSpacing = 100;
    for (let i = 0; i < this.numberofObstacles; i++) {
      this.obstacles.push(new Obstacle(this, firstX + i * obstaclesSpacing));
    }
  }
}

window.addEventListener('load', function () {
  const canvas = document.getElementById('canvas1');
  const ctx = canvas.getContext('2d');
  canvas.width = 720;
  canvas.height = 720;

  const game = new Game(canvas, ctx);

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.render();
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
});
