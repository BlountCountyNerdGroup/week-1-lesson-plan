// Start game with ready
ready = true;

// Canvas size
canvasWidth = 520;
canvasHeight = 480;

// Score
score = 0;
scoreLabel = "Monsters Caught: ";

// Hero Speed
heroSpeed = 100;

raiseScore = function() {
    score += 1;
};

// Monster Velocity
monsterVelocity = Math.round(Math.random() * 10) - 5;