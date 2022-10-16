import { Emacs } from '../../emacs';
import assert from 'assert';
import { Env } from '../type';
import * as JSON from 'json5';
import { write } from 'clipboardy';
import { toTypeLiteral } from '../../util/toTypeLiteral';

export async function objectToType(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");

  const data = JSON.parse(env.region);
  const typeLiteral = `type Props = ${toTypeLiteral(data)}`;
  await write(typeLiteral);

  return Emacs.message('(object-to-type) Copied to clipboard');
}

objectToType.command = 'object-to-type';

export async function objectToTypeWithComment(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");

  const data = JSON.parse(env.region);
  const typeLiteral = `type Props = ${toTypeLiteral(data, true)}`;
  await write(typeLiteral);

  return Emacs.message('(object-to-type-with-comment) Copied to clipboard');
}

objectToTypeWithComment.command = 'object-to-type-with-comment';
