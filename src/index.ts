import { singleFileLogger } from './logger/SingleFileLogger';
import { handleOnExit } from './hook/onExit';
import { Logger } from './logger/type';
import { Emacs } from './emacs';

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

  function done(result: string) {
    console.log(result);
    logger.log(result);
  }
}

main(process.argv, singleFileLogger);
