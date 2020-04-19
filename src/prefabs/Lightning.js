// Lightning prefab
class Lightning extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        isShooting = false;  // track lightning's firing status

        this.sfxLightning = scene.sound.add('sfx_shooting'); // add lightning sfx
    }

    update() {
        this.alpha = 0; // set invisible

        // left/right movement
        if (!isShooting) {
            if (keyLEFT.isDown && (this.x >= offset / 2 + 3)) {
                this.x -= 2;
            }

            else if (keyRIGHT.isDown && this.x <= (game.config.width - offset / 2 - 3)) {
                this.x += 2;
            }
        }

        // shoot button (s)
        if (Phaser.Input.Keyboard.JustDown(keyS) && !isShooting) {
            isShooting = true;
            this.sfxLightning.play();  // play sfx
        }

        // if fired, appear and move up
        if (isShooting && this.y >= 0 - this.height / 2) {
            this.alpha = 1;
            this.y -= 2;
        }

        // reset on miss, make invisible
        if (this.y <= 0 - this.height / 2) {
            isShooting = false;
            this.alpha = 0;
            this.y = 431;
        }
    }

    // reset lightning to "ground" and make invisible
    reset() {
        isShooting = false;
        this.alpha = 0;
        this.y = 431;
    }
}