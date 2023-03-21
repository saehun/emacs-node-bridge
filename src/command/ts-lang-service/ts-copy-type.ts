import assert from 'assert';
import { Emacs } from '../../emacs';
import { write } from 'clipboardy';
import { isTypescriptMode } from '../../util/predicates';
import { Env } from '../type';
import { Project, ts } from 'ts-morph';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Identifier } from 'ts-morph';

export const tsCopyType = async (_: string, env?: Env) => {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }
  const tsConfigFilePath = getNearestTsConfigPath(env.directory);
  const project = new Project({ tsConfigFilePath });
  const sourceFile = project.getSourceFileOrThrow(path.join(env.directory, env.filename));
  let identifierNode: Identifier | null = null;

  sourceFile.forEachDescendant(node => {
    if (node.getKind() !== ts.SyntaxKind.Identifier) {
      return;
    }
    const [start, end] = [node.getStart(), node.getEnd()];
    const pos = env.cursor.pos;
    if (pos >= start && pos <= end) {
      identifierNode = node.asKindOrThrow(ts.SyntaxKind.Identifier);
    }
  });

  if (identifierNode == null) {
    throw new Error('Failed to find node on position');
  }
  const typeOfIdentifier = (identifierNode as Identifier).getType();
  const typeText = typeOfIdentifier.getText();

  await write(typeText);
  return Emacs.message(typeText, { name: '*ts-copy-type*', on: 'help-window' });
};
tsCopyType.command = 'ts-copy-type';

function getNearestTsConfigPath(basedir: string) {
  for (const filepath of enumerateToUpperDirectory(basedir, 'tsconfig.json')) {
    if (fs.existsSync(filepath)) {
      return filepath;
    }
  }
  throw new Error(`Cannot find tsconfig.json from ${basedir}`);
}

function* enumerateToUpperDirectory(basedir: string, filename: string, until = '/') {
  do {
    yield path.join(basedir, filename);
    basedir = path.join(basedir, '..');
  } while (basedir !== until);
}
