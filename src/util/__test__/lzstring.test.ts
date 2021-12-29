import * as lzstring from '../lzstring';

describe('lzstring', () => {
  it('should compress stirng', () => {
    const compressed = lzstring.compressToEncodedURIComponent(`
console.log('Hello world!');
    `);
    expect(compressed).toEqual('FAYw9gdgzmA2CmA6WYDmAKA5ACXrFABAO5gBOsAJgISYCUA3MAcwUA');
  });
});
