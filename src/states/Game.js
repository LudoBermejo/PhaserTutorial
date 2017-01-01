/* globals __DEV__ */
import Phaser from 'phaser';
import Hero from '../sprites/Ludo';
import City from '../tilemaps/city';
import { setResponsiveWidth } from '../utils';

export default class extends Phaser.State {
  init() {}
  preload() {}

  create() {
    const banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Use cursors and shift key to move Ludo');
    banner.font = 'Nunito';
    banner.fontSize = 40;
    banner.fill = '#77BFA3';
    banner.anchor.setTo(0.5);

    // enable physicsOOF
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    //  Make things a bit more bouncey
    this.game.physics.arcade.defaultRestitution = 0.8;

    this.City = new City({
      game: this.game,
      tilemap: 'cityMap',
      tileset: 'cityTiles',
    });

    this.Hero = new Hero({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'ludoSprite',
    });

    this.Hero.prepare(this.City.layerToCollide);

    this.game.add.sprite(0, 0, 'background');
    this.game.add.existing(this.Hero);
  }

  render() {
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.Hero, 32, 32);
      this.game.debug.text(`render FPS: ${this.game.time.fps || '--'}`, 2, 14, '#00ff00');

      if (this.game.time.suggestedFps !== null) {
        this.game.debug.text(`suggested FPS: ${this.game.time.suggestedFps}`, 2, 28, '#00ff00');
        this.game.debug.text(`desired FPS: ${this.game.time.desiredFps}`, 2, 42, '#00ff00');
      }
    }
  }
}
