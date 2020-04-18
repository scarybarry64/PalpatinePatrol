// Palpatine prefab
class Palpatine extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, status) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isShooting = status;  // track shooting status
    }

    update() {
        // left/right movement
        if (!this.isShooting) {
            if (keyLEFT.isDown && this.x >= 47) {
                this.x -= 2;
            }

            else if (keyRIGHT.isDown && this.y <= 598) {
                this.x += 2;
            }
        }
    }
}