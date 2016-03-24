/* eslint-env mocha */
import leftpad from '../index';
import expect from 'expect';

describe('leftpad', () => {
  it('should waste our time', (done) => {
    const expectedResult = '@@@@@@@@@@@@@@@@@@@js ecosystem is great';

    leftpad('js ecosystem is great', 40, '@').then(padded => {
      expect(padded).toEqual(expectedResult);
      done();
    }).catch(done);
  });
});
