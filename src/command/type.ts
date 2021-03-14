export type Handler = { command: string } & ((data: string, env?: Env) => Promise<string>);

export interface Env {
  directory: string;
  cursor: {
    pos: number;
    col: number;
    row: number;
  };
  filename: string;
  buffer: string;
  region: string;
}
