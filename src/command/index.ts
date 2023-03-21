import { Emacs } from '../emacs';
import { Handler } from './type';

/**
 * Command Handlers
 */
import { blame, blameCommit } from './blame';
import { cookieToObject } from './cookie-to-object';
import { debugCurrentFile } from './debug-current-file';
import { debugTestCurrentFile } from './debug-test-current-file';
import { gitOpenNodeModules } from './git-open-node-modules';
import { importFromProject, importFromProjectSelect } from './import-from-project';
import { jwtDecode } from './jwt';
import { objectToQuery } from './object-to-query';
import { objectToType, objectToTypeWithComment } from './object-to-type';
import { handleOpenUrl } from './open-url';
import { runCurrentFile } from './run-current-file';
import { testCurrentFile } from './test-current-file';
import { transformRequest } from './transform-request';
import { packageInstall, packageAdd, packageAddDev } from './package-install';
import {
  tsAstTree,
  tsCopyType,
  tsSyntaxKind,
  tsFactoryCodeGen,
  tsTranspileRegionAndCopy,
} from './ts-lang-service';
import { handleTsUnitTest } from './ts-unit-test';
import { typescriptPlayground } from './typescript-playground';
import { wrapTryCatch } from './wrap-try-catch';

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
    cookieToObject,
    importFromProject,
    importFromProjectSelect,
    typescriptPlayground,
    transformRequest,
    jwtDecode,
    blame,
    blameCommit,
    tsAstTree,
    tsCopyType,
    tsSyntaxKind,
    tsFactoryCodeGen,
    tsTranspileRegionAndCopy,
    packageInstall,
    packageAdd,
    packageAddDev
  )
);
