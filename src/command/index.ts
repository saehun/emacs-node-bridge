import { Handler } from './type';
import { Emacs } from '../emacs';

/**
 * Command Handlers
 */
import { handleOpenUrl } from './open-url';
import { handleTsUnitTest } from './ts-unit-test';
import { wrapTryCatch } from './wrap-try-catch';
import { runCurrentFile } from './run-current-file';
import { testCurrentFile } from './test-current-file';
import { debugCurrentFile } from './debug-current-file';
import { debugTestCurrentFile } from './debug-test-current-file';
import { gitOpenNodeModules } from './git-open-node-modules';
import { objectToType, objectToTypeWithComment } from './object-to-type';
import { objectToQuery } from './object-to-query';
import { cookieToObject } from './cookie-to-object';

function withCommandList(...handlers: Handler[]): Handler[] {
  const handleGetCommandList = async () => {
    return Emacs.select(
      handlers.map(handler => handler.command),
      Emacs.callbackWithEnv(Emacs.LAMBDA_CALLBACK)
    );
  };
  handleGetCommandList.command = 'list';
  handlers.push(handleGetCommandList);
  return handlers;
}

function register(handlers: Handler[]) {
  const handlerMap: Record<string, Handler> = {};

  for (const handler of handlers) {
    handlerMap[handler.command] = handler;
  }

  return handlerMap;
}

export default register(
  withCommandList(
    handleOpenUrl,
    handleTsUnitTest,
    wrapTryCatch,
    runCurrentFile,
    testCurrentFile,
    debugCurrentFile,
    debugTestCurrentFile,
    gitOpenNodeModules,
    objectToType,
    objectToQuery,
    objectToTypeWithComment,
    cookieToObject
  )
);
