import { Logger } from './type';
import * as path from 'path';
import * as fs from 'fs';
import { registerOnExit } from '../hook/onExit';

export function createSingleFileLogger(filename = 'default.log'): Logger {
  const buffer: string[] = [];

  registerOnExit(() => {
    fs.writeFileSync(path.join(__dirname, '..', '..', filename), buffer.join('\n'));
  });

  return {
    debug: append('debug'),
    info: append('info'),
    log: append('log'),
    error: append('error'),
    warn: append('warn'),
  };

  function append(type: string) {
    return (...data: any[]) => {
      buffer.push(`[${type}]:
${data.map(item => JSON.stringify(item, undefined, 2)).join('\n')}
`);
    };
  }
}

export const singleFileLogger = createSingleFileLogger();
