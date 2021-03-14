import { Handler } from './type';
import { Emacs } from '../emacs';
import { singleFileLogger } from '../logger/SingleFileLogger';

/**
 * Command Handlers
 */
import { handleOpenUrl } from './open-url';

const handleHello = async (data: string) => {
  singleFileLogger.info(data);

  return Emacs.message('Hello emacs!');
};
handleHello.command = 'hello';

const handleSelectTest = async () => {
  return Emacs.select(
    ['apple', 'banana', 'grape'],
    Emacs.callbackWithEnv('"hello"', Emacs.LAMBDA_CALLBACK)
  );
};
handleSelectTest.command = 'select-test';

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

export default register(withCommandList(handleHello, handleSelectTest, handleOpenUrl));
