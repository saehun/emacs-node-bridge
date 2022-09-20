import * as fs from 'fs';
import { Logger } from './type';

function createTTYLogger(tty: string): Logger {
  const writeStream = fs.createWriteStream(tty);
  const createWriter =
    (prefix: string) =>
    (...args: any[]) =>
      writeStream.write(`[${prefix}] ` + args.join(' ') + '\n');

  return {
    log: createWriter('log'),
    info: createWriter('info'),
    warn: createWriter('warn'),
    error: createWriter('error'),
    debug: createWriter('debug'),
  };
}

export const ttyLogger = createTTYLogger('/dev/ttys003');
