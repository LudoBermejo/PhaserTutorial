import Phaser from 'phaser';

export default class extends Phaser.Sprite {

  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    // Game
    this.game = game;
    this.asset = asset;
  }

  prepare(layerToCollide) {
    // Variables
    this.anchor.setTo(0.5);
    this.normalSpeed = 150;
    this.runningSpeed = 300;
    this.layerToCollide = layerToCollide;


    // Animations
    if(this.asset) {
      this.animations.add('stop', [0], 12, true, true);
      this.animations.add('down', [0, 1, 2, 3], 12, true, true);
      this.animations.add('left', [4, 5, 6, 7], 12, true, true);
      this.animations.add('right', [8, 9, 10, 11], 12, true, true);
      this.animations.add('up', [12, 13, 14, 15], 12, true, true);
      this.animations.add('stop', [1], 12, true, true);
    }

    // Controls
    if(this.game.input) {
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.shiftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SHIFT);
    }

    // Enable if for physics. This creates a default rectangular body.
    if(this.game.physics) {
      this.game.physics.arcade.enable(this);
      this.game.physics.enable(this);
    }

    if(this.game.camera) {
      game.camera.follow(this);
    }

    //  Modify a few body properties
    if(this.body) {
//      this.body.setZeroDamping();
      this.body.setSize(20, 30, 0, 10);
      this.body.collideWorldBounds = true;
    }

    this.scale.setTo(0.8, 0.8)

  }

  update() {

    this.body.velocity.set(0);

    // Do movement or stop
    let selectedAnimation = 'stop';

    if(this.layerToCollide) {
      this.game.physics.arcade.collide(this, this.layerToCollide);
    }
    this.body.velocity.set(0);

    let speed = this.normalSpeed;
    if (this.shiftKey.isDown) {
      speed = this.runningSpeed;
    }

    if (this.cursors.up.isDown) {
      this.body.velocity.y -= speed;
      selectedAnimation = 'up';
    }
    if (this.cursors.down.isDown) {
      this.body.velocity.y += speed;
      selectedAnimation = 'down';
    }
    if (this.cursors.left.isDown) {
      this.body.velocity.x -= speed;
      selectedAnimation = 'left';
    }
    if (this.cursors.right.isDown) {
      this.body.velocity.x += speed;
      selectedAnimation = 'right';
    }
    this.animations.play(selectedAnimation, 12, true);
  }

}
