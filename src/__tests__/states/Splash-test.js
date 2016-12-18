import Splash from '../../states/Splash';

describe('Splash', () => {
  it('should return the state object', () => {
    const splash = new Splash();
    expect(splash).toBeDefined();
  });
});
