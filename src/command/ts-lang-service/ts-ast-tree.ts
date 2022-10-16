import assert from 'assert';
import ts from 'typescript';
import { Emacs } from '../../emacs';
import { singleFileLogger } from '../../logger/SingleFileLogger';
import { isTypescriptMode } from '../../util/predicates';
import { Env } from '../type';
import { printTree } from './printTree';

export const tsAstTree = async (_: string, env?: Env) => {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  const sourceFile = ts.createSourceFile('index.ts', env.buffer, ts.ScriptTarget.Latest);
  let tree = null;
  try {
    ts.forEachChild(sourceFile, child => {
      const start = child.pos + 1;
      const end = child.end;
      if (env.cursor.pos >= start && env.cursor.pos <= end) {
        tree = printTree(child, sourceFile);
      }
    });

    if (tree == null) {
      tree = printTree(sourceFile, sourceFile);
    }
  } catch (e) {
    singleFileLogger.error(e.stack);
    return Emacs.message('Typescript AST Tree is not found');
  }

  return Emacs.message(tree, { name: '*ts-ast-tree*', on: 'help-window' });
};

tsAstTree.command = 'ts-ast-tree';
