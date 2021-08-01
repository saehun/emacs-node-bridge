/**
 * Before exit handler manager
 */
const handlers: Array<() => void> = [];

export function registerOnExit(handler: () => void) {
  handlers.push(handler);
}

export function handleOnExit() {
  handlers.forEach(handle => handle());
}
