import Phaser from 'phaser';
import { centerGameObjects } from '../utils';

export default class extends Phaser.State {
  init() {}

  preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg');
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar');
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // preload your assets
    //
    this.load.spritesheet('ludoSprite', 'assets/sprites/ludo.png', 32, 48);

    // Map
    this.load.tilemap('cityMap', 'assets/maps/city/city.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('cityTiles', 'assets/maps/city/city.png');
  }

  create() {
    this.state.start('Game');
  }

}
