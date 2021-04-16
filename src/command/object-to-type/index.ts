import { Emacs } from '../../emacs';
import * as assert from 'assert';
import { Env } from '../type';
import { toTypeLiteral } from '../../util/toTypeLiteral';

export async function objectToType(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");

  const data = JSON.parse(env.region);
  return Emacs.progn(Emacs.replaceRegion(toTypeLiteral(data)));
}

objectToType.command = 'object-to-type';

export async function objectToTypeWithComment(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");

  const data = JSON.parse(env.region);
  return Emacs.progn(Emacs.replaceRegion(toTypeLiteral(data, true)));
}

objectToTypeWithComment.command = 'object-to-type-with-comment';
