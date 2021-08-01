import { Env } from "../command/type";

export function currentLineOf(env: Pick<Env, 'buffer' | 'cursor'>) {
  return env.buffer.split('\n')[env.cursor.row - 1];
}

export function wraparoundedStringOf(
  { buffer, cursor }: Pick<Env, 'buffer' | 'cursor'>,
  delimeter: string
) {
  const pos = cursor.pos - 1;
  return buffer.slice(buffer.lastIndexOf(delimeter, pos) + 1, buffer.indexOf(delimeter, pos));
}
