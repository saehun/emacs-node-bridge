import { callback, callbackWithEnv } from './callback';
import { replaceRegion } from './replaceRegion';
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
  replaceRegion,
  callbackWithEnv,
  LAMBDA_CALLBACK: 'x',
};
