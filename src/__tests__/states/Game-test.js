import Game from '../../states/Game';

describe('Game', () => {
  it('should return the state object', () => {
    const game = new Game();
    expect(game).toBeDefined();
  });
});
