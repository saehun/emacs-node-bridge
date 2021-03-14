import * as open from 'open';
import { Emacs } from '../../emacs';

const data: Record<string, string> = {
  'github-minidonut-new-repository': 'https://github.com/new',
};

/**
 * Open selected url (replace bookmarks)
 */
export const handleOpenUrl = async (target: string) => {
  if (target && data[target]) {
    open(data[target]);
    return Emacs.message(`Open ${target}`);
  } else {
    return Emacs.select(Object.keys(data), Emacs.callback('"open-url"', Emacs.LAMBDA_CALLBACK));
  }
};

handleOpenUrl.command = 'open-url';
