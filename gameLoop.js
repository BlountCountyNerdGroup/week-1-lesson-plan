// Create the canvas
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvasWidth;
canvas.height = canvasHeight;

// Hero image
let heroReady = false;
const heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
let monsterReady = false;
const monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
let hero = {
    speed: heroSpeed, // movement in pixels per second
    x: canvas.width / 2,
    y: canvas.height / 2
};
let monster = {
    x: 0,
    y: 0,
    // Monster Speed is a random # between -5 and 5
    dx: Math.floor(Math.random() * 11) - 5,
    dy: Math.floor(Math.random() * 11) - 5
};

// Handle keyboard controls
const keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Reset the monster when the player catches him
const resetMonster = function () {
    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
    // Give the monster a random velocity
    monster.dx = monsterVelocity;
    monster.dy = monsterVelocity;
};

const checkForBounce = function () {
    if (monster.y + monster.dy < 0 || monster.y + monster.dy > (canvas.height-30)) {
        monster.dy = -monster.dy;
    }
    if (monster.x + monster.dx < 0 || monster.x + monster.dx > (canvas.width-30)) {
        monster.dx = -monster.dx;
    }
};

// Update game objects
let update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }

    // Are they touching?
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        raiseScore();
        resetMonster();
    }
};

let render = function () {
    ctx.fillStyle = "#33963b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (monsterReady) {
        checkForBounce();
        monster.x += monster.dx;
        monster.y += monster.dy;
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }

    // Score
    ctx.fillStyle = "rgb(250, 195, 0)";
    ctx.font = "24px Courier New";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText(scoreLabel + score, 38, 30);
};

// The main game loop
let main = function () {
    let now = Date.now();
    let delta = now - then;

    update(delta / 1000);
    render();

    then = now;

    requestAnimationFrame(main);
};

// Play ball!
let then = Date.now();
resetMonster();
if (ready) {
    main();
}