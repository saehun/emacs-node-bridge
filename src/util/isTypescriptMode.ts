import { Env } from '../command/type';

export function isTypescriptMode(env: Env): boolean {
  if (env.filename.endsWith('.ts') || env.filename.endsWith('.tsx')) {
    return true;
  }

  return false;
}
