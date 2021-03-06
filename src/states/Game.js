/* globals __DEV__ */
import Phaser from 'phaser';
import Hero from '../sprites/Ludo';
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

    // enable physics
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    //  Make things a bit more bouncey
    this.game.physics.p2.defaultRestitution = 0.8;

    this.Hero = new Hero({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY,
      asset: 'ludoSprite',
    });
    this.game.add.existing(this.Hero);
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.Hero, 32, 32);
    }
  }
}
