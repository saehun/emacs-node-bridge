/**
 * Open target file in emacs current buffer
 */
export function open(path: string, otherWindow = false) {
  return `(find-file${otherWindow ? '-other-window' : ''} "${path}")`;
}
