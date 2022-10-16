import { singleFileLogger } from './logger/SingleFileLogger';
import { handleOnExit } from './hook/onExit';
import { dispatch } from './Dispatcher';
import { Logger } from './logger/type';
import { Emacs } from './emacs';
import 'source-map-support/register';

/**
 * Command start
 */
async function main(argv: string[], logger: Logger) {
  try {
    logger.log(argv);
    await dispatch(argv, done);
  } catch (e) {
    const PrettyError = require('pretty-error') as typeof import('pretty-error');
    logger.error(new PrettyError().render(e, undefined, false));
    done(Emacs.message(`${e.name}: ${e.message}`));
  } finally {
    handleOnExit();
  }

  function done(result: string) {
    console.log(result);
    logger.log(result);
  }
}

main(process.argv, singleFileLogger);
