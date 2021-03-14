import handlers from './command';
import { Env } from './command/type';
/**
 * Dispatch nodejs command
 */
export async function dispatch(argv: string[], done: (result: string) => void): Promise<void> {
  const [, , command, data, env] = argv;

  const handle = handlers[command];
  if (handle == null) {
    throw new Error(`Command '${command}' is not defined.`);
  }

  done(await handle(data, tryParseEnv(env)));
}

/**
 * Parse environment JSON
 * @throw SyntaxError
 */
function tryParseEnv(envString?: string): Env | undefined {
  if (envString == null) {
    return undefined;
  }
  const env: Env = JSON.parse(envString);
  return env;
}
