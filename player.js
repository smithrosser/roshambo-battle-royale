// some constants
const TYPE_ROCK = 0;
const TYPE_PAPER = 1;
const TYPE_SCISSORS = 2;
const PLAYER_RADIUS = 15;
const PLAYER_TYPES = [TYPE_ROCK, TYPE_PAPER, TYPE_SCISSORS];
const PLAYER_VELOCITIES = [-1, 1];

// helper func: returns a random position vector
function getRandomPosition() {
  return createVector(
    random(PLAYER_RADIUS, windowWidth - PLAYER_RADIUS),
    random(PLAYER_RADIUS, windowHeight - PLAYER_RADIUS)
  );
}

// the main Player object
function Player() {
  let p = {
    type: null,
    pos: getRandomPosition(),
    vel: createVector(
      PLAYER_VELOCITIES[int(random(0, 2))],
      PLAYER_VELOCITIES[int(random(0, 2))]
    ),

    setType(newType) {
      let prevType = this.type;

      this.type = newType;
      if (prevType != null) {
        scores[prevType]--;
      }
      scores[this.type]++;
    },

    init() {
      this.setType(int(random(3)));
    },

    intersects(player) {
      return (
        dist(this.pos.x, this.pos.y, player.pos.x, player.pos.y) <=
        PLAYER_RADIUS * 2
      );
    },

    step() {
      if (this.pos.x <= PLAYER_RADIUS) {
        this.vel.x = -this.vel.x;
        this.pos.x = PLAYER_RADIUS;
      }
      if (this.pos.x >= windowWidth - PLAYER_RADIUS) {
        this.vel.x = -this.vel.x;
        this.pos.x = windowWidth - PLAYER_RADIUS;
      }

      if (this.pos.y <= PLAYER_RADIUS) {
        this.vel.y = -this.vel.y;
        this.pos.y = PLAYER_RADIUS;
      }
      if (this.pos.y >= windowHeight - PLAYER_RADIUS) {
        this.vel.y = -this.vel.y;
        this.pos.y = windowHeight - PLAYER_RADIUS;
      }

      this.pos.x += this.vel.x;
      this.pos.y += this.vel.y;
    },

    render() {
      let string;
      switch (this.type) {
        case TYPE_ROCK:
          string = "🪨";
          break;
        case TYPE_PAPER:
          string = "📜";
          break;
        case TYPE_SCISSORS:
          string = "✂️";
          break;
      }

      textSize(PLAYER_RADIUS * 1.5);
      textAlign(CENTER);
      text(`${string}`, this.pos.x, this.pos.y);
    },
  };

  p.init();

  return p;
}
