/**
 * Logger interface
 */
export interface Logger {
  log(...data: any[]): void;
  debug(...data: any[]): void;
  error(...data: any[]): void;
  info(...data: any[]): void;
  warn(...data: any[]): void;
}
