import { Emacs } from '../../emacs';
import * as assert from 'assert';
import { Env } from '../type';

export async function cookieToObject(_: string, env?: Env) {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
  return Emacs.progn(Emacs.replaceRegion(parseCookieToObject(env.region)));
}

cookieToObject.command = 'cookie-to-object';

function parseCookieToObject(cookie: string) {
  return JSON.stringify(
    cookie
      .trim()
      .split('\n')
      .map(line => {
        const parsed = /^(\S+?):(.*)$/.exec(line);
        if (parsed?.length !== 3) {
          return {};
        } else {
          return { [parsed[1]]: parsed[2].trim() };
        }
      })
      .reduce((acc, n) => ({ ...acc, ...n }), {}),
    undefined,
    2
  );
}
