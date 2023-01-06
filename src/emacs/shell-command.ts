/**
 * Execute shell command
 */
export function asyncShellCommand(command: string) {
  return `(async-shell-command ${command})`;
}
