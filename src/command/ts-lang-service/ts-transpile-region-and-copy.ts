import assert from 'assert';
import ts from 'typescript';
import { Emacs } from '../../emacs';
import { isTypescriptMode } from '../../util/predicates';
import { Env } from '../type';
import { write } from 'clipboardy';

export const tsTranspileRegionAndCopy = async (_: string, env?: Env) => {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  await write(ts.transpile(env.region, { target: ts.ScriptTarget.ESNext }));
  return Emacs.message('Transpiled and Copied!');
};

tsTranspileRegionAndCopy.command = 'ts-transpile-region-and-copy';
