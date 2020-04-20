// Barry Day
// Professor Altice
// CMPM 120
// 4-19-20

// Start menu scene
class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // Load audio
        this.load.audio('sfx_start', './assets/Treason.wav');
        this.load.audio('sfx_shooting', './assets/Ahhh.wav');
        this.load.audio('sfx_jedi_death', './assets/JediDeath1.wav');
        this.load.audio('sfx_windu_death', './assets/WinduDeath.wav');
        this.load.audio('sfx_halfway', './assets/TakingOver!.wav');
        this.load.audio('sfx_gameover', './assets/UnlimitedPower!.wav');
    }

    create() {
        // Menu display
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
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;
        this.add.text(centerX, centerY - textSpacer, 'PALPATINE PATROL', menuConfig).setOrigin(0.5);
        menuConfig.backgroundColor = '#F3B141';
        menuConfig.color = '#8A0303';
        this.add.text(centerX, centerY, 'Use ←→ arrows to move & (S) to Shoot', menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);

        // Define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        // Easy mode if left, hard mode if right
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('sfx_start');
            this.scene.start("playScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('sfx_start');
            this.scene.start("playScene");
        }
    }
}