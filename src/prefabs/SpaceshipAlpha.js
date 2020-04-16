// Spaceship Alpha prefab
// Faster, smaller, worth more points, looks different
class SpaceshipAlpha extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing, displayList, updateList
        // store pointValue
        this.points = pointValue;
    }

    update() {
        // move spaceship right
        this.x += game.settings.spaceshipSpeed * 1.5;

        // wrap around screen bounds
        if (this.x >= game.config.width + this.width) {
            this.x = 0;
        }
    }

    // reset spaceship to left
    reset() {
        this.x = 0 - this.width;
    }
}