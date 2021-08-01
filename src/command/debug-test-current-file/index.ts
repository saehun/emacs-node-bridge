import { Emacs } from '../../emacs';
import * as assert from 'assert';
import { Env } from '../type';
import { isTypescriptMode } from '../../util/predicates';
import { write } from 'clipboardy';
import { createCommandWithCurrentfile } from '../../util/createCommandWithCurrentFile';

export async function debugTestCurrentFile(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  const shellCommand = await createCommandWithCurrentfile(
    'node --inspect-brk ./node_modules/jest/bin/jest.js --runInBand',
    env
  );

  write(shellCommand);
  return Emacs.message(`Copied: ${shellCommand}`);
}

debugTestCurrentFile.command = 'debug-test-current-file';
