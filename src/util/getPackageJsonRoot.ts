import * as os from 'os';
import * as fs from 'fs-extra';
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

export async function getNodeMoudlesPackageJson(rootDir: string, packageName: string) {
  const path = rootDir + `/node_modules/${packageName}/package.json`;
  return await fs.readJson(path);
}

export async function getRootPackageJson(dirname: string) {
  const rootDir = await getPackageJsonRoot(dirname);
  return await fs.readJson(rootDir + `/package.json`);
}
