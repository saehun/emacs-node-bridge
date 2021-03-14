/**
 * Execute sexp sequencially
 */
export function progn(...sexps: string[]) {
  return `(progn ${sexps.join(' ')})`;
}
