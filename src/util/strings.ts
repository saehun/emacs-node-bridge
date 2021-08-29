/**
 * currently support positive indentation
 */
export function indent(level: number, region: string) {
  return region
    .split('\n')
    .map(line => ' '.repeat(level * 2) + line)
    .join('\n');
}
