class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load audio
        this.load.audio('sfx_start', './assets/Treason.wav');
        this.load.audio('sfx_shooting', './assets/Ahhh.wav');
        this.load.audio('sfx_jedi_death', './assets/JediDeath1.wav');
        this.load.audio('sfx_windu_death', './assets/WinduDeath.wav');
        this.load.audio('sfx_halfway', './assets/TakingOver!.wav');
        this.load.audio('sfx_gameover', './assets/UnlimitedPower!.wav');
    }

    create() {
        // menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#8A0303',
            color: '#F3B141',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // show menu text
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, 'PALPATINE PATROL', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#F3B141';
        menuConfig.color = '#843605';
        this.add.text(centerX, centerY, 'Use ←→ arrows to move & (S) to Shoot', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);

        // launch the next scene
        //this.scene.start("playScene");

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_start');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_start');
            this.scene.start("playScene");
        }
    }
}