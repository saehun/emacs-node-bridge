import { Emacs } from '../../emacs';
import * as assert from 'assert';
import { Env } from '../type';
import { isTypescriptMode } from '../../util/isTypescriptMode';
import { write } from 'clipboardy';
import { createCommandWithCurrentfile } from '../../util/createCommandWithCurrentFile';

export async function testCurrentFile(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  const shellCommand = await createCommandWithCurrentfile('npx jest', env);

  write(shellCommand);
  return Emacs.message(`Copied: ${shellCommand}`);
}

testCurrentFile.command = 'test-current-file';
