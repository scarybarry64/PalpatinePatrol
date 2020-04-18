// Jedi prefab
class Jedi extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, rankStatus) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        // store pointValue
        this.points = pointValue;

        // normal jedi move to the right
        // jedi masters move faster and to the left
        this.isMaster = rankStatus;
    }

    update() {
        // move normal if not master, faster if master
        if (!this.isMaster) {
            this.x += game.settings.spaceshipSpeed;
        }
        else {
            this.x -= game.settings.spaceshipSpeed * 1.5;
        }

        // wrap around screen bounds
        if (!this.isMaster) {
            if (this.x >= game.config.width + this.width) {
                this.x = 0;
            }
        }
        else {
            if (this.x <= 0 - this.width) {
                this.x = game.config.width;
            }
        }
    }

    // reset spaceship to right side
    reset() {
        if (!this.isMaster) {
            this.x = 0 - this.width;
        }
        else {
            this.x = game.config.width;
        }
    }
}