// Lightning prefab
class Lightning extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        this.isFiring = false;  // track rocket's firing status

        this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        this.alpha = 0; // set invisible

        // left/right movement
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= 47) {
                this.x -= 2;
            }

            else if (keyRIGHT.isDown && this.y <= 598) {
                this.x += 2;
            }
        }

        // fire button (f)
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();  // play sfx
        }

        // if fired, appear and move up
        if (this.isFiring && this.y >= 108) {
            this.alpha = 1;
            this.y -= 2;
        }

        // reset on miss, make invisible
        if (this.y <= 108) {
            this.isFiring = false;
            this.alpha = 0;
            this.y = 431;
        }
    }

    // reset rocket to "ground" and make invisible
    reset() {
        this.isFiring = false;
        this.alpha = 0;
        this.y = 431;
    }
}