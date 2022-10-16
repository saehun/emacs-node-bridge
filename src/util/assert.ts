import { Env } from '../command/type';
import assert from 'assert';

export function assertEnv(env?: Env): asserts env is Env {
  assert(env, "Environment required. (use 'post-message-node-with-env')");
}

export function assertRegion(env: Env) {
  assert(env.region, 'Region is empty');
}
