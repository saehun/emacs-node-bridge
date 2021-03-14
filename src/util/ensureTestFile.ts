import { Env } from '../command/type';
import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Create testfile if not exist
 *
 * @param env - Emacs command execution environment
 * @return (test-file-path, whether-it-is-created)
 */
export async function ensureTestFile(env: Env): Promise<[string, boolean]> {
  const { filename, directory } = env;
  const filenameWithoutExt = filename.replace(/\.ts(x?)$/, '');

  const baseDir = path.join(directory, '__test__');
  const testFileName = filenameWithoutExt + '.test.ts';
  const testFilePath = path.join(baseDir, testFileName);

  const exist = await fs.pathExists(testFilePath);

  await Promise.all([fs.ensureDir(baseDir), fs.ensureFile(testFilePath)]);

  if (!exist) {
    await fs.outputFile(testFilePath, generateTestFile(filenameWithoutExt));
  }

  return [testFilePath, exist];
}

function generateTestFile(name: string): string {
  return `import { } from '../${name}';

describe('${name}', () => {
  it('should be defined', () => {
    expect({}).toBeTruthy();
  });
});
`;
}
