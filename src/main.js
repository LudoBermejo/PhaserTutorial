import "pixi";
import "p2";
import Phaser from "phaser";
import BootState from "./states/Boot";
import SplashState from "./states/Splash";
import GameState from "./states/Game";

class Game extends Phaser.Game {

  constructor() {
    const width = document.documentElement.clientWidth > 768
      ? 768 : document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight > 1024
      ? 1024 : document.documentElement.clientHeight;

    super(width, height, Phaser.AUTO, 'content', null);

    // Add different states
    this.state.add('Boot', BootState, false);
    this.state.add('Splash', SplashState, false);
    this.state.add('Game', GameState, false);

    this.state.start('Boot');
  }

}

window.game = new Game();

export default Game;
