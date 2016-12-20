import Hero from '../../sprites/Ludo';
import Phaser from "phaser";

describe('Hero', () => {
  it('should return the state object', () => {
    const hero = new Hero({
      game: null,
      x: 0,
      y: 0,
      asset: ''
    });
    expect(hero).toBeDefined()
  });

  it('should prepare the hero if we use a valid game', () => {

    const hero = new Hero({
      game: new Phaser.Game(),
      x: 0,
      y: 0,
      asset: ''
    });

    hero.prepare();

    expect(hero).toBeDefined()
  });

});
