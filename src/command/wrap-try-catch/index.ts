import { Emacs } from '../../emacs';
import { Env } from '../type';
import * as assert from 'assert';

/**
 * Wrap block with try-catch
 */
export const wrapTryCatch = async (_: string, env: Env) => {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!env.region) {
    throw new Error('Region is empty');
  }
  return Emacs.progn(Emacs.replaceRegion(wrapRegionWithTryCatch(env.region)));
};

wrapTryCatch.command = 'wrap-try-catch';

function wrapRegionWithTryCatch(region: string) {
  const indentation = findIndent(region);
  return `${indentation}try {
${indent(1, region).trimRight()}
${indentation}} catch (e) {
${indentation}}
`;
}

function findIndent(region: string) {
  const parsed = /^(\s+)?\S/.exec(region);
  if (!parsed) {
    throw new Error('Parse failed. invalid region');
  }
  return parsed[1];
}

/**
 * currently support positive indentation
 */
function indent(level: number, region: string) {
  return region
    .split('\n')
    .map(line => ' '.repeat(level * 2) + line)
    .join('\n');
}
