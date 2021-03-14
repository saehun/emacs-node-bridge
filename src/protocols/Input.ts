/**
 * Command input
 */
export interface Input {
  dir: string;
  root: string;
  filename: string;
  command: string;
  buffer: string;
  region: string;
  cursor: number;
}

/**
 * Emacs input (to be transformed)
 */
export type EmacsInput = [
  string /** command */,
  string /** path */,
  string /** cursor */,
  string /** buffer */,
  string /** region */
];
