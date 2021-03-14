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
  pos: [number, number];
}

/**
 * Emacs input (to be transformed)
 */
export type EmacsInput = [
  string /** command */,
  string /** path */,
  string /** posX */,
  string /** posY */,
  string /** buffer */,
  string /** region */
];
