import { Env } from '../command/type';

export function isTypescriptMode(env: Env): boolean {
  if (env.filename.endsWith('.ts') || env.filename.endsWith('.tsx')) {
    return true;
  }

  return false;
}

export function isJavascriptMode(env: Env): boolean {
  if (env.filename.endsWith('.js') || env.filename.endsWith('.jsx')) {
    return true;
  }

  return false;
}

export function isPackageJsonFile(env: Env): boolean {
  return env.filename === 'package.json';
}
