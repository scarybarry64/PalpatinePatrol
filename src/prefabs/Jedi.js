// Barry Day
// Professor Altice
// CMPM 120
// 4-19-20

// Prefab for jedi the player can kill
class Jedi extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, rankStatus) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);

        // Stores the points a jedi is worth when killed
        this.points = pointValue;
        
        // Stores whether a jedi is a master
        this.isMaster = rankStatus;
    }

    update() {
        // Move right at normal speed if not master, move left and faster if master
        if (!this.isMaster) {
            this.x += game.settings.spaceshipSpeed;
        }
        else {
            this.x -= game.settings.spaceshipSpeed * 1.5;
        }

        // Wrap around screen bounds
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

    // Reset to respective side
    reset() {
        if (!this.isMaster) {
            this.x = 0 - this.width;
        }
        else {
            this.x = game.config.width;
        }
    }
}