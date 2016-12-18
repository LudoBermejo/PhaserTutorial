import Boot from '../../states/Boot';


describe('Boot', () => {
  it('should return the state object', () => {
    const boot = new Boot();
    expect(boot).toBeDefined();
  });
});
