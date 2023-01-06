import { callback, callbackWithEnv } from './callback';
import { replaceRegion } from './replaceRegion';
import { asyncShellCommand } from './shell-command';
import { message } from './message';
import { select } from './select';
import { progn } from './progn';
import { input } from './input';
import { open } from './open';

export const Emacs = {
  open,
  progn,
  input,
  select,
  message,
  callback,
  replaceRegion,
  callbackWithEnv,
  asyncShellCommand,
  LAMBDA_CALLBACK: 'x',
};
