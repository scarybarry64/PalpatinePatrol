// Palpatine prefab
class Palpatine extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, status) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
    }

    update() {
        // left/right movement and sprite direction
        if (!isShooting) {
            if (keyLEFT.isDown && this.x >= 47) {
                this.flipX = false;
                this.x -= 2;
            }
            else if (keyRIGHT.isDown && this.y <= 598) {
                this.flipX = true;
                this.x += 2;
            }
        }
    }
}