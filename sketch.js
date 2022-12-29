// Roshambo Battle Royale

const PLAYER_COUNT = 120;
let players = [];
let scores = [0, 0, 0];

// determines whether a collision event has occurred
function checkCollision() {
  for (let i = 0; i < PLAYER_COUNT - 1; i++) {
    for (let j = i + 1; j < PLAYER_COUNT; j++) {
      if (players[i].intersects(players[j])) {
        handleCollision(players[i], players[j]);
      }
    }
  }
}

// resolves a collision event
function handleCollision(p1, p2) {
  // 1. calculate each particle's new velocity
  let d = Math.sqrt(
    Math.pow(p1.pos.x - p2.pos.x, 2) + Math.pow(p1.pos.y - p2.pos.y, 2)
  );
  let nx = (p2.pos.x - p1.pos.x) / d;
  let ny = (p2.pos.y - p1.pos.y) / d;
  let p =
    (2 * (p1.vel.x * nx + p1.vel.y * ny - p2.vel.x * nx - p2.vel.y * ny)) / 2;

  p1.vel.x -= p * nx;
  p1.vel.y -= p * ny;
  p2.vel.x += p * nx;
  p2.vel.y += p * ny;

  // 2. move particles away from each other if overlapping
  let mpX = (p1.pos.x + p2.pos.x) / 2;
  let mpY = (p1.pos.y + p2.pos.y) / 2;

  p1.pos.x = mpX + (PLAYER_RADIUS * (p1.pos.x - p2.pos.x)) / d;
  p1.pos.y = mpY + (PLAYER_RADIUS * (p1.pos.y - p2.pos.y)) / d;
  p2.pos.x = mpX + (PLAYER_RADIUS * (p2.pos.x - p1.pos.x)) / d;
  p2.pos.y = mpY + (PLAYER_RADIUS * (p2.pos.y - p1.pos.y)) / d;

  // 3. play roshambo
  roshambo(p1, p2);
}

// determines the 'winner' of a collision
function roshambo(p1, p2) {
  if (p1.type == p2.type) {
    // do nothing, draw
  } else if ((p1.type + 1) % 3 == p2.type) {
    // player 2 wins
    p1.setType(p2.type);
  } else {
    // player 1 wins
    p2.setType(p1.type);
  }
}

// displays the elapsed time
function displayTime() {
  let elapsed = millis();
  let seconds = floor(elapsed / 1000) % 60;
  let minutes = floor(elapsed / 1000 / 60);

  textAlign(LEFT);
  text(
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`,
    326,
    58
  );
}

// displays the number of each type left
function displayScores() {
  fill(color(255, 128));
  noStroke();
  rect(30, 30, 380, 40, 25);

  fill(0, 255);
  textSize(24);
  textAlign(LEFT);
  textFont("monospace");
  text(`🪨 ${scores[TYPE_ROCK]} `, 46, 58);
  text(`📜 ${scores[TYPE_PAPER]} `, 126, 58);
  text(`✂️ ${scores[TYPE_SCISSORS]} `, 216, 58);
}

// informs user of a victory
function displayEndgameText(winner) {
  const typeStrings = ["Rock", "Paper", "Scissors"];

  textSize(48);
  textAlign(CENTER);
  text(`${typeStrings[winner]} wins!`, windowWidth / 2, windowHeight / 2);
}

// entry point, sets up canvas & objects
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < PLAYER_COUNT; i++) {
    players.push(Player());
  }
}

// main draw loop
function draw() {
  // check for collisions then update player positions
  checkCollision();
  for (let i = 0; i < PLAYER_COUNT; i++) {
    players[i].step();
  }

  clear();
  background(192);

  for (let i = 0; i < PLAYER_COUNT; i++) {
    players[i].render();
  }

  // overlay text
  displayScores();
  displayTime();

  // check winner
  if (scores[TYPE_ROCK] >= PLAYER_COUNT) {
    displayEndgameText(TYPE_ROCK);
  } else if (scores[TYPE_PAPER] >= PLAYER_COUNT) {
    displayEndgameText(TYPE_PAPER);
  } else if (scores[TYPE_SCISSORS] >= PLAYER_COUNT) {
    displayEndgameText(TYPE_SCISSORS);
  }
}
