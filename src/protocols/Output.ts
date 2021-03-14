/**
 * Command Output (to be transformed)
 */
export interface Output {
  error?: Error;
  command: string;
}

/**
 * Emacs Output
 */
export type EmacsOutput = string;
