import * as assert from 'assert';
import { Emacs } from '../../emacs';
import { Env } from '../type';

export async function blame(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");

  // open(url);
  return Emacs.message('blame!');
}

blame.command = 'blame';
