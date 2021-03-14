/**
 * Build emacs-lisp Callback with env
 */
export function callbackWithEnv(command: string, data?: string): string {
  return '(post-message-node-with-env ' + command + (data ? ` ${data}` : '') + ')';
}

/**
 * Build emacs-lisp Callback.
 */
export function callback(command: string, data?: string): string {
  return '(post-message-node ' + command + (data ? ` ${data}` : '') + ')';
}
