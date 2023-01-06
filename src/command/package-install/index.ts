import { Emacs } from '../../emacs';
import { Env } from '../type';

export async function packageInstall(packageManager: 'npm' | 'pnpm' | 'yarn', env?: Env) {
  return Emacs.asyncShellCommand(`"${packageManager} install"`);
}

packageInstall.command = 'package-install';

export async function packageAdd(packageManager: 'npm' | 'pnpm' | 'yarn', env?: Env) {
  const add = packageManager === 'npm' ? 'install' : 'add';
  const inputDependency = `(read-string "${packageManager} ${add} ")`;

  return Emacs.asyncShellCommand(`(format "${packageManager} ${add} %s" ${inputDependency})`);
}

packageAdd.command = 'package-add';

export async function packageAddDev(packageManager: 'npm' | 'pnpm' | 'yarn', env?: Env) {
  const add = packageManager === 'npm' ? 'install' : 'add';
  const inputDependency = `(read-string "${packageManager} ${add} ")`;

  return Emacs.asyncShellCommand(`(format "${packageManager} ${add} -D %s" ${inputDependency})`);
}

packageAddDev.command = 'package-add-dev';
