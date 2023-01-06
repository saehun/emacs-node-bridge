import * as os from 'os';
import * as fs from 'fs-extra';
import * as path from 'path';

export function getPackageJsonRoot(dirname: string) {
  for (const packageJsonPath of generateParentPathOf(path.join(dirname, 'package.json'))) {
    if (fs.existsSync(packageJsonPath)) {
      return path.parse(packageJsonPath).dir;
    }
  }
  throw new Error('Failed to find tsconfig.json');
}

function parentOf(basePath: string) {
  const { dir, base } = path.parse(basePath);
  return path.join(dir, '..', base);
}

function* generateParentPathOf(basePath: string, until = os.homedir()): IterableIterator<string> {
  do {
    yield basePath;
    basePath = parentOf(basePath);
  } while (basePath !== until);
}

export function getNodeMoudlesPackageJson(rootDir: string, packageName: string) {
  const path = rootDir + `/node_modules/${packageName}/package.json`;
  return fs.readJsonSync(path);
}

export function getRootPackageJson(dirname: string) {
  const rootDir = getPackageJsonRoot(dirname);
  return fs.readJsonSync(rootDir + `/package.json`);
}
