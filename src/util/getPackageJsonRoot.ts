import * as os from 'os';
import * as fs from 'fs/promises';
import * as path from 'path';

export async function getPackageJsonRoot(
  dirname: string,
  boundary = os.homedir(),
  safeLoopCountMax = 20
): Promise<string> {
  let currentDir = dirname;
  let safeLoopCount = 0;
  // eslint-disable-next-line
  while (safeLoopCount++ < safeLoopCountMax) {
    if (currentDir === boundary) {
      break;
    }

    const children = await fs.readdir(currentDir);
    for (const child of children) {
      if (child === 'package.json') {
        return currentDir;
      }
    }
    currentDir = path.join(currentDir, '..');
  }

  throw new Error('cannot found package.json');
}
