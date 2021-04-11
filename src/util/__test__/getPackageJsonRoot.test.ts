import { getPackageJsonRoot } from '../getPackageJsonRoot';

describe('getPackageJsonRoot', () => {
  it('should find root dir', async () => {
    const dir = await getPackageJsonRoot(__dirname);
    expect(dir).toEqual(expect.stringMatching(/emacs-node-bridge$/));
  });
});
