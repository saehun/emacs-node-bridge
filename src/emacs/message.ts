/**
 * Show message in minibuffer
 */
export function message(text: string, target: MessageTarget = { on: 'minibuffer' }) {
  const formatted = text.replace('"', '\\"');
  if (target.on === 'minibuffer') {
    return `(message "${formatted}")`;
  } else {
    return `(with-help-window "${target.name}" (princ "${formatted}"))`;
  }
}

export type MessageTarget =
  | {
      on: 'minibuffer';
    }
  | {
      on: 'help-window';
      name: string;
    };
