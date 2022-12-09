import { ensureSourceFile, ensureTestFile } from '../../util/ensureTestFile';
import { Emacs } from '../../emacs';
import assert from 'assert';
import { Env } from '../type';
import { isTypescriptMode } from '../../util/predicates';

export const handleTsUnitTest = async (_: string, env?: Env) => {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  if (env.filename.endsWith('.test.ts') || env.filename.endsWith('.spec.ts')) {
    const [path, exist] = await ensureSourceFile(env);
    if (exist) {
      return Emacs.open(path, false);
    } else {
      throw new Error(`Cannot find source file: ${path}`);
    }
  }

  const [path, created] = await ensureTestFile(env);

  return Emacs.progn(
    Emacs.open(path, false),
    Emacs.message(`Open ${path}.` + created ? ' (created)' : '')
  );
};

handleTsUnitTest.command = 'ts-unit-test';
