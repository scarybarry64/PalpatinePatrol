// Barry Day
// Professor Altice
// CMPM 120
// 4-19-20

// Prefab for Palpatine sprite controlled by the player
class Palpatine extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, status) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
    }

    update() {
        // Left/right movement and direction Palpatine is facing
        if (!isShooting) {
            if (keyLEFT.isDown && (this.x >= this.width / 2 + 3)) {
                this.flipX = false;
                this.x -= 2;
            }
            else if (keyRIGHT.isDown && (this.x <= game.config.width - this.width / 2 - 3)) {
                this.flipX = true;
                this.x += 2;
            }
        }
    }
}