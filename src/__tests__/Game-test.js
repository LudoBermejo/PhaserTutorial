import Game from '../main';

describe('Game', () => {
  it('should return the state object', () => {
    console.log(Object.keys(Game));
    const game = new Game();
    expect(game).toBeDefined();
  });
});
