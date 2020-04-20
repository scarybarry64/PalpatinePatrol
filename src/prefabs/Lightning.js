// Barry Day
// Professor Altice
// CMPM 120
// 4-19-20

// Prefab for the lightning the player shoots
class Lightning extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        isShooting = false;
        this.sfxLightning = scene.sound.add('sfx_shooting');
    }

    update() {
        // Set invisible as default
        this.alpha = 0;

        // Moves with the player, shoots from Palpatine
        if (!isShooting) {
            if (keyLEFT.isDown && (this.x >= offset / 2 + 3)) {
                this.x -= 2;
            }
            else if (keyRIGHT.isDown && this.x <= (game.config.width - offset / 2 - 3)) {
                this.x += 2;
            }
        }

        // Shoot button (s)
        if (Phaser.Input.Keyboard.JustDown(keyS) && !isShooting) {
            isShooting = true;
            this.sfxLightning.play();  // play sfx
        }

        // If shooting lightning, make lightning visible and move up
        if (isShooting && this.y >= 0 - this.height / 2) {
            this.alpha = 1;
            this.y -= 2;
        }

        // On miss, reset position and make invisible
        if (this.y <= 0 - this.height / 2) {
            isShooting = false;
            this.alpha = 0;
            this.y = 431;
        }
    }

    // On hit, do the same as on miss
    reset() {
        isShooting = false;
        this.alpha = 0;
        this.y = 431;
    }
}