import { Emacs } from '../../emacs';
import * as assert from 'assert';
import { Env } from '../type';
import * as JSON from 'json5';
import { stringify } from 'query-string';

export async function objectToQuery(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");

  const data = JSON.parse(env.region);
  return Emacs.progn(Emacs.replaceRegion(stringify(data)));
}

objectToQuery.command = 'object-to-query';
