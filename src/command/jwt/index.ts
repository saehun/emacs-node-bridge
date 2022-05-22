import { Emacs } from '../../emacs';
import { Env } from '../type';
import { assertEnv, assertRegion } from '../../util/assert';
import { decode } from 'jsonwebtoken';

export async function jwtDecode(_: string, env?: Env) {
  assertEnv(env);
  assertRegion(env);
  return Emacs.progn(Emacs.replaceRegion(JSON.stringify(decode(env.region), null, 2)));
}

jwtDecode.command = 'jwt-decode';
