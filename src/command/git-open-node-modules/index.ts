import assert from 'assert';
import open from 'open';
import { Emacs } from '../../emacs';
import { getNodeMoudlesPackageJson, getPackageJsonRoot } from '../../util/getPackageJsonRoot';
import { wraparoundedStringOf } from '../../util/parsing';
import { isJavascriptMode, isPackageJsonFile, isTypescriptMode } from '../../util/predicates';
import { Env } from '../type';

export async function gitOpenNodeModules(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  if (!isTypescriptMode(env) && !isPackageJsonFile(env) && !isJavascriptMode(env)) {
    throw new Error(`Not a typescript buffer or package.json. (${env.mode})`);
  }

  const packageName = getPackageName(env);
  const rootDir = await getPackageJsonRoot(env.directory);
  const pkgJson = await getNodeMoudlesPackageJson(rootDir, packageName);
  const [url, message] = getGitUrl(pkgJson);
  open(url);
  return Emacs.message(message);
}

gitOpenNodeModules.command = 'git-open-node-modules';

/**
 * Inner functions
 */
function getPackageName(env: Pick<Env, 'buffer' | 'cursor' | 'filename'>) {
  const packageName =
    env.filename === 'package.json'
      ? wraparoundedStringOf(env, `"`)
      : wraparoundedStringOf(env, `'`) || wraparoundedStringOf(env, `"`);
  return assertPackageName(packageName);

  function assertPackageName(name: string) {
    if (name.length < 1) {
      throw new Error(`Cannot find package name.`);
    }
    if (/[^A-Za-z0-9-_@/]/.test(name)) {
      throw new Error(`Invalid package name: '${name}'`);
    }
    return name;
  }
}

function getGitUrl(pkgJson: Record<string, any>): [string, string] {
  let url;
  if (pkgJson.repository === undefined) {
    if (typeof pkgJson.homepage === 'string') {
      url = pkgJson.homepage;
    } else {
      url = `https://www.npmjs.com/package/${pkgJson.name}`;
    }
  } else if (typeof pkgJson.repository === 'string') {
    url = pkgJson.repository.startsWith('http')
      ? pkgJson.repository
      : `https://github.com/${pkgJson.repository}`;
  } else if (typeof pkgJson.repository === 'object') {
    if ('directory' in pkgJson.repository) {
      url = pkgJson.repository.url.replace('.git', '/blob/master/' + pkgJson.repository.directory);
    } else {
      url = pkgJson.repository.url;
    }
  }

  if (!url) {
    throw new Error(`Cannot find repository url`);
  }
  return [sanitize(url), `Opening ${url}`];

  function sanitize(url: string) {
    return url.replace(/^git\+/, '');
  }
}
