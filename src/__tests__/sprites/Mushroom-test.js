import Hero from '../../sprites/Ludo';

describe('Hero', () => {
  it('should return the state object', () => {
    const Hero = new Hero({
      game: null,
      x: 0,
      y: 0,
      asset: ''
    })
    expect(Hero).toBeDefined()
  });

});
