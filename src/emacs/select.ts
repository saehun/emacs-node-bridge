/**
 * Pass candidates to ivy buffer and select
 *
 * @param candidates - candidates
 * @param action - Emacs lambda function in string
 */
export function select(
  candidates: string[],
  action: string,
  message = 'Select(emacs-node): '
): string {
  return `(ivy-read "${message}"
    (list ${candidates.map(c => JSON.stringify(c)).join(' ')})
    :action (lambda (x) ${action}))`;
}
