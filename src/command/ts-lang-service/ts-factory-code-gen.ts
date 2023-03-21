import assert from 'assert';
import ts from 'typescript';
import { Emacs } from '../../emacs';
import { isTypescriptMode } from '../../util/predicates';
import { Env } from '../type';
import { generateCode } from 'ts-factory-code-generator-generator';
import { generateFactoryCode } from './factoryCodeGenerator';
import * as fs from 'fs';
import { singleFileLogger } from '../../logger/SingleFileLogger';
import parserTypescript from 'prettier/parser-typescript';
import prettier from 'prettier/standalone';

export const tsFactoryCodeGen = async (target: string, env?: Env) => {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env)) {
    throw new Error(`Not a typescript buffer. (${env.mode})`);
  }

  const sourceFile = ts.createSourceFile(
    'index.ts',
    target === 'region' ? env.region : env.buffer,
    ts.ScriptTarget.Latest
  );

  const factoryCode = generateFactoryCode(ts, sourceFile);
  singleFileLogger.log(Emacs.message(factoryCode));

  return Emacs.message(prettify(factoryCode), {
    name: `*ts-factory-code-gen-${target}*`,
    on: 'help-window',
  });
};

tsFactoryCodeGen.command = 'ts-factory-code-gen';

/**
 * npx ts-node src/command/ts-lang-service/ts-factory-code-gen.ts
 */
export function generateFactory() {
  const code = generateCode('typescript');
  fs.writeFileSync('./src/command/ts-lang-service/factoryCodeGenerator.ts', code);
}

function prettify(template: string) {
  if (!template) {
    return template;
  }
  return prettier.format(template, {
    parser: 'typescript',
    plugins: [parserTypescript],
    printWidth: 100,
    singleQuote: true,
    bracketSpacing: true,
    trailingComma: 'all',
    arrowParens: 'always',
    useTabs: false,
    tabWidth: 2,
  });
}
