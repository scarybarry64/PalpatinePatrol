///////////////////////////////////////////////////////////////

// Barry Day
// Professor Altice
// CMPM 120
// 4-19-20

// PALPATINE PATROL: A treasonous mod of Rocket Patrol . . .

// Overhauled the entire game, in which you now play as
// Emperor Palpatine in the meme-worthy Palpatine v. Windu
// scene from Star Wars: Episode III. 

// Total List of Changes:
// - Redesigned all sprites and sounds to fit the new theme
// - Player now controls Emperor Palpatine
// - Palpatine sprite now faces the direction the player
//   is moving
// - Player now shoots with (S), which emits a separate
//   lightning sprite complete with its own sound effect
// - Enemy spaceships are now Jedi, with two sprite variants
// - New sound for when a Jedi is killed
// - Added additional enemy type, Jedi Master Mace Windu; he
//   moves faster in the opposite direction, is worth more
//   points, and has his own sound effect when killed
// - Explosion spritesheet reflavored red for blood
// - 3 new sounds play at the beginning, middle, and end
//   of the game
// - Changed UI colors to red/orange; removed white borders;
//   moved existing borders
// - Moved score to right side, added a timer display on left
//   side, and labeled both
// - Added beautifully-rendered background tile of the Emperor
//   himself, to really reinforce the professional tone of the
//   game ;)

// I argue that this is worth 100 points total. Entire game
// was overhauled, new mechanics added, and existing ones
// polished. Many Jedi were killed in the process.

// Thank you!
// "UNLIMITED POWERRRRRR!!!"

///////////////////////////////////////////////////////////////

let config =
{
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

let game = new Phaser.Game(config);

// Define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

// Reserve some keyboard variables
let keyS, keyLEFT, keyRIGHT;

// Shooting status
let isShooting;

// Used for aligning Palpatine and lightning sprites
let offset;