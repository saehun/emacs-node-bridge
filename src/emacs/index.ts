import { callback, callbackWithEnv } from './callback';
import { message } from './message';
import { select } from './select';
import { progn } from './progn';
import { open } from './open';

export const Emacs = {
  open,
  progn,
  select,
  message,
  callback,
  callbackWithEnv,
  LAMBDA_CALLBACK: 'x',
};
