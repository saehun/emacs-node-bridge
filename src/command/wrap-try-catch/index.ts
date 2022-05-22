import { Emacs } from '../../emacs';
import { Env } from '../type';
import { indent } from '../../util/strings';
import { assertEnv, assertRegion } from '../../util/assert';

/**
 * Wrap block with try-catch
 */
export const wrapTryCatch = async (_: string, env?: Env) => {
  assertEnv(env);
  assertRegion(env);
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
