import { singleFileLogger } from './logger/SingleFileLogger';
import { handleOnExit } from './hook/onExit';
import { Logger } from './logger/type';
import { Emacs } from './emacs';

const done = console.log;

/**
 * Command start
 */
async function main(argv: string[], logger: Logger) {
  try {
    logger.log(argv);
    done(Emacs.message('hi'));
  } catch (e) {
    done(Emacs.message(e.message));
  } finally {
    handleOnExit();
  }
}

main(process.argv, singleFileLogger);
