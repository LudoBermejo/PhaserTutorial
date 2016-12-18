import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);

    // Game
    this.game = game;

    // Variables
    this.anchor.setTo(0.5);
    this.normalSpeed = 150;
    this.runningSpeed = 300;

    // Animations
    this.animations.add('stop', [0], 12, true, true);

    this.animations.add('down', [0, 1, 2, 3], 12, true, true);
    this.animations.add('left', [4, 5, 6, 7], 12, true, true);
    this.animations.add('right', [8, 9, 10, 11], 12, true, true);
    this.animations.add('up', [12, 13, 14, 15], 12, true, true);
    this.animations.add('stop', [1], 12, true, true);

    // Controls
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);

    // Enable if for physics. This creates a default rectangular body.
    this.game.physics.p2.enable(this);

    //  Modify a few body properties
    this.body.setZeroDamping();
    this.body.fixedRotation = true;
  }

  update() {

    this.body.setZeroVelocity();

    // Do movement or stop
    let selectedAnimation = 'stop';

    let speed = this.normalSpeed;
    if (this.shiftKey.isDown) {
      speed = this.runningSpeed;
    }

    if (this.cursors.up.isDown) {
      this.body.moveUp(speed);
      selectedAnimation = 'up';
    }
    if (this.cursors.down.isDown) {
      this.body.moveDown(speed);
      selectedAnimation = 'down';
    }
    if (this.cursors.left.isDown) {
      this.body.moveLeft(speed);
      selectedAnimation = 'left';
    }
    if (this.cursors.right.isDown) {
      this.body.moveRight(speed);
      selectedAnimation = 'right';
    }
    this.animations.play(selectedAnimation, 12, true);
  }

}
