import { message } from './message';
import { select } from './select';
import { callback, callbackWithEnv } from './callback';

export const Emacs = {
  message,
  select,
  callback,
  callbackWithEnv,
  LAMBDA_CALLBACK: 'x',
};
