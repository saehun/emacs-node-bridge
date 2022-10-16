import assert from 'assert';
import ts from 'typescript';
import { Emacs } from '../../emacs';
import { isTypescriptMode } from '../../util/predicates';
import { Env } from '../type';
import { findNodeByPos } from './findNode';

export const tsSyntaxKind = async (_: string, env?: Env) => {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  const sourceFile = ts.createSourceFile('index.ts', env.buffer, ts.ScriptTarget.Latest);
  const { node, stack } = findNodeByPos(sourceFile, env.cursor.pos);
  if (node == null) {
    return Emacs.message('TS AST Node is not found');
  } else {
    const [, startAt, endAt] = node;
    const message = `${stack.join(' > ')}(${startAt}, ${endAt})`;
    if (message.length > 300) {
      return Emacs.message(stack.join('\n- '), { name: '*ts-syntax-kind*', on: 'help-window' });
    } else {
      return Emacs.message(message);
    }
  }
};

tsSyntaxKind.command = 'ts-syntax-kind';
