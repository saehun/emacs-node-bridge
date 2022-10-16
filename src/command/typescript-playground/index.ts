import { Emacs } from '../../emacs';
import assert from 'assert';
import { Env } from '../type';
import * as lzstring from '../../util/lzstring';
import open from 'open';

export async function typescriptPlayground(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  const source = env.region.trim();
  if (source) {
    open(
      `https://www.typescriptlang.org/play?#code/${lzstring.compressToEncodedURIComponent(
        env.region.trim()
      )}`
    );
  } else {
    open('https://www.typescriptlang.org/play');
  }
  return Emacs.message('open typescript playground');
}

typescriptPlayground.command = 'typescript-playground';
