import { Emacs } from '../../emacs';
import assert from 'assert';
import { Env } from '../type';
import { isJavascriptMode, isTypescriptMode } from '../../util/predicates';
import * as path from 'path';
import { getPackageJsonRoot, getRootPackageJson } from '../../util/getPackageJsonRoot';

export async function importFromProject(data: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env) && !isJavascriptMode(env)) {
    throw new Error(`Not a typescript, javascript buffer. (${env.mode})`);
  }

  const pkgJson = await getRootPackageJson(env.directory);
  const deps = [
    ...Object.keys(pkgJson.dependencies || {}),
    ...Object.keys(pkgJson.peerDependencies || {}),
  ];
  const files = parseFileList(data).filter(file => /\.[tj]sx?$/.test(file));

  return Emacs.select(
    files.concat(deps),
    Emacs.callbackWithEnv('"import-from-project-select"', Emacs.LAMBDA_CALLBACK),
    'import {} from '
  );
}

export async function importFromProjectSelect(data: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  const rootDir = await getPackageJsonRoot(env.directory);
  let importFrom = data;
  if (/\.[tj]sx?$/.test(data)) {
    const resolved = path
      .relative(env.directory, path.join(rootDir, data))
      .replace(/\/index.[tj]sx?$/, '')
      .replace(/\.[tj]sx?$/, '');
    importFrom = resolved.startsWith('.') ? resolved : `./${resolved}`;
  }

  return `(node-insert-import-and-complete "${importFrom}")`;
}

importFromProject.command = 'import-from-project';
importFromProjectSelect.command = 'import-from-project-select';

// data: ((.editorconfig . .editorconfig) (.eslintignore . .eslintignore) (.eslintrc.js . .eslintrc.js) (.gitignore . .gitignore))
function parseFileList(data: string) {
  return data
    .slice(1, -1)
    .split('(')
    .map(line => {
      const parsed = /^(\S+)\s/.exec(line);
      return parsed?.[1] || '';
    });
}
