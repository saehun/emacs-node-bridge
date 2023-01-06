import { Env } from '../command/type';
import { getPackageJsonRoot } from './getPackageJsonRoot';
import * as path from 'path';

export async function createCommandWithCurrentfile(prefix: string, { filename, directory }: Env) {
  const root = getPackageJsonRoot(directory);
  return `${prefix} ${path.relative(root, directory)}/${filename}`;
}
