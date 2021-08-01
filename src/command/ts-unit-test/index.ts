import { ensureTestFile } from '../../util/ensureTestFile';
import { Emacs } from '../../emacs';
import * as assert from 'assert';
import { Env } from '../type';
import { isTypescriptMode } from '../../util/predicates';

export const handleTsUnitTest = async (_: string, env?: Env) => {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  const [path, created] = await ensureTestFile(env);

  return Emacs.progn(
    Emacs.open(path, true),
    Emacs.message(`Open ${path}.` + created ? ' (created)' : '')
  );
};

handleTsUnitTest.command = 'ts-unit-test';
