class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprite
        this.load.image("background", "./assets/palpatine_smiling.png");
        this.load.image("palpatine", "./assets/palpatine.png");
        this.load.image("jedi1", "./assets/jedi1.png");
        this.load.image("jedi2", "./assets/jedi2.png");
        this.load.image("windu", "./assets/windu.png");
        this.load.image("lightning", "./assets/lightning.png");

        this.load.image("lightning", "./assets/lightning.png");
        this.load.image("spaceship", "./assets/spaceship.png");
        this.load.image("spaceship alpha", "./assets/spaceship-alpha.png");
        this.load.image("starfield", "./assets/starfield.png");

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    }

    create() {
        // place tile sprite
        this.background = this.add.tileSprite(0, 0, 640, 480, "background").setOrigin(0, 0);

        // white rectangle borders
        //this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        //this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        // red UI background
        this.add.rectangle(37, 10, 566, 64, 0x8A0303).setOrigin(0, 0);

        // add lightning (p1)
        this.lightning = new Lightning(this, game.config.width / 2, 405, "lightning").setOrigin(0, 0);

        // add controllable hand
        this.palpatine = new Palpatine(this, game.config.width / 2, game.config.height - 53, "palpatine", 0, false).setOrigin(0, 0);

        // add spaceship (x3)
        this.jedi1 = new Jedi(this, game.config.width + 192, 163, "jedi1", 0, 30, false).setOrigin(0, 0);
        this.jedi2 = new Jedi(this, game.config.width + 96, 211, "jedi2", 0, 20, false).setOrigin(0, 0);
        this.jedi3 = new Jedi(this, game.config.width, 259, "jedi1", 0, 10, false).setOrigin(0, 0);

        // add spaceship alpha
        this.windu = new Jedi(this, 0, 115, "windu", 0, 60, true).setOrigin(0, 0);

        // define keyboard keys
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
            frameRate: 30
        });

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 22, this.p1Score, scoreConfig);

        // time display
        this.timeRight = this.add.text(game.config.width - 169, 22, game.settings.gameTimer / 1000, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.initialTime = this.time.now; // initial time
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
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

        // scroll starfield
        //this.starfield.tilePositionX -= 4;

        if (!this.gameOver) {
            
            this.palpatine.update();

            // Update lightning and ships
            this.lightning.update();
            this.jedi1.update();
            this.jedi2.update();
            this.jedi3.update();
            this.windu.update();

            // Update timer
            let timeRemaining = Math.floor((game.settings.gameTimer - (this.time.now - this.initialTime)) / 1000) + 1;
            if (timeRemaining > 0) {
                this.timeRight.text = timeRemaining;
            }
            else {
                this.timeRight.text = 0;
            }
        }

        // check collisions
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

    checkCollision(lightning, jedi) {
        // simple AABB checking
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

    jediExplode(jedi) {
        jedi.alpha = 0;                         // temporarily hide jedi
        // create explosion sprite at jedi's position
        let boom = this.add.sprite(jedi.x, jedi.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            jedi.reset();                       // reset jedi position
            jedi.alpha = 1;                     // make jedi visible again
            boom.destroy();                     // remove explosion sprite
        });
        // score increment and repaint
        this.p1Score += jedi.points;
        this.scoreLeft.text = jedi.points;

        if (!jedi.isMaster) {
            this.sound.play('sfx_jedi_death');
        }
        else {
            this.sound.play('sfx_windu_death');
        }
    }
}