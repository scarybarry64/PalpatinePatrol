// Main gameplay scene
class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // Load images and spritesheet
        this.load.image("background", "./assets/palpatine_smiling.png");
        this.load.image("palpatine", "./assets/palpatine.png");
        this.load.image("lightning", "./assets/lightning.png");
        this.load.image("jedi1", "./assets/jedi1.png");
        this.load.image("jedi2", "./assets/jedi2.png");
        this.load.image("windu", "./assets/windu.png");
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create() {
        // Tile background
        this.background = this.add.tileSprite(0, 0, 640, 480, "background").setOrigin(0, 0);

        // Red UI background
        this.add.rectangle(37, 10, 566, 64, 0x8A0303).setOrigin(0, 0);

        // Add player as Palpatine
        this.palpatine = new Palpatine(this, game.config.width / 2, 0, "palpatine", 0, false);
        this.palpatine.y = game.config.height - this.palpatine.height / 2 - 3;
        offset = this.palpatine.width; // for updating lightning sprite

        // Add lightning that the player shoots
        this.lightning = new Lightning(this, game.config.width / 2, 431, "lightning").setDepth(10);

        // Add jedi
        this.jedi1 = new Jedi(this, -150, 140, "jedi1", 0, 30, false).setOrigin(0, 0);
        this.jedi2 = new Jedi(this, -100, 200, "jedi2", 0, 20, false).setOrigin(0, 0);
        this.jedi3 = new Jedi(this, -50, 260, "jedi1", 0, 10, false).setOrigin(0, 0);
        this.windu = new Jedi(this, game.config.width + 30, 80, "windu", 0, 60, true).setOrigin(0, 0);

        // Define keyboard keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // Animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });

        // Displays for score and timer
        this.p1Score = 0;
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#8A0303',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 175
        }
        this.scoreRight = this.add.text(69, 22, "Score: " + this.p1Score, scoreConfig);
        scoreConfig.align = 'right';
        this.initialTime = this.time.now;
        this.timeLeft = this.add.text(game.config.width - 244, 22, "Time: " + (game.settings.gameTimer / 1000), scoreConfig);

        // End game when time runs out and display game over screen
        this.gameOver = false;
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            scoreConfig.backgroundColor = '#F3B141';
            scoreConfig.color = '#8A0303';
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, '(S)hoot to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.sound.play('sfx_gameover');
            this.gameOver = true;
        }, null, this);

        // Play sound halfway thru game
        this.clock2 = this.time.delayedCall(game.settings.gameTimer / 2, () => {
            this.sound.play('sfx_halfway');
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyS)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // If game not over, update sprites and timer
        if (!this.gameOver) {
            this.palpatine.update();
            this.lightning.update();
            this.jedi1.update();
            this.jedi2.update();
            this.jedi3.update();
            this.windu.update();
            let timeRemaining = Math.floor((game.settings.gameTimer - (this.time.now - this.initialTime)) / 1000) + 1;
            if (timeRemaining > 0) {
                this.timeLeft.text = "Time: " + timeRemaining;
            }
            else {
                this.timeLeft.text = "Time: 0";
            }
        }

        // Vaporize jedi if lightning hits them
        if (this.checkCollision(this.lightning, this.jedi3)) {
            this.lightning.reset();
            this.jediExplode(this.jedi3);
        }
        if (this.checkCollision(this.lightning, this.jedi2)) {
            this.lightning.reset();
            this.jediExplode(this.jedi2);
        }
        if (this.checkCollision(this.lightning, this.jedi1)) {
            this.lightning.reset();
            this.jediExplode(this.jedi1);
        }
        if (this.checkCollision(this.lightning, this.windu)) {
            this.lightning.reset();
            this.jediExplode(this.windu);
        }
    }

    // Check if lightning hits a jedi
    checkCollision(lightning, jedi) {
        if (lightning.x < jedi.x + jedi.width &&
            lightning.x + lightning.width > jedi.x &&
            lightning.y < jedi.y + jedi.height &&
            lightning.height + lightning.y > jedi.y) {
            return true;
        }
        else {
            return false;
        }
    }

    // Make jedi go boom, award points
    jediExplode(jedi) {
        jedi.alpha = 0;
        let boom = this.add.sprite(jedi.x, jedi.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            jedi.reset();
            jedi.alpha = 1;
            boom.destroy();
        });
        this.p1Score += jedi.points;
        this.scoreRight.text = "Score: " + this.p1Score;
        if (!jedi.isMaster) {
            this.sound.play('sfx_jedi_death');
        }
        else {
            this.sound.play('sfx_windu_death');
        }
    }
}