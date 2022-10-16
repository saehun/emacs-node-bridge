import { Emacs } from '../../emacs';
import assert from 'assert';
import { Env } from '../type';
import { isTypescriptMode } from '../../util/predicates';
import { write } from 'clipboardy';
import { createCommandWithCurrentfile } from '../../util/createCommandWithCurrentFile';

export async function debugCurrentFile(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  const shellCommand = await createCommandWithCurrentfile(
    'node --require ts-node/register --inspect-brk',
    env
  );

  write(shellCommand);
  return Emacs.message(`Copied: ${shellCommand}`);
}

debugCurrentFile.command = 'debug-current-file';
