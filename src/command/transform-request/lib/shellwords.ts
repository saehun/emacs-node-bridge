// code from https://github.com/jimmycuadra/shellwords/blob/master/lib/shellwords.js
function scan(string: string, pattern: RegExp, callback: (...args: any[]) => string | undefined) {
  let match: RegExpMatchArray, result: string;
  result = '';
  while (string.length > 0) {
    match = string.match(pattern)!;
    if (match) {
      result += string.slice(0, match.index);
      result += callback(match) || '';
      string = string.slice((match.index || 0) + match[0].length);
    } else {
      result += string;
      string = '';
    }
  }
  return result;
}

export function split(line: string): string[] {
  let field: string;
  if (line == null) {
    line = '';
  }
  const words = [];
  field = '';
  scan(
    line,
    /\s*(?:([^\s\\'"]+)|'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/,
    match => {
      let dq: string, escape: string, garbage: string, seperator: string, sq: string, word: string;
      (word = match[1]),
        (sq = match[2]),
        (dq = match[3]),
        (escape = match[4]),
        (garbage = match[5]),
        (seperator = match[6]);
      if (garbage != null) {
        throw new SyntaxError('Unmatched quote');
      }
      field += word || (sq || dq || escape).replace(/\\(?=.)/, '');
      if (seperator != null) {
        words.push(field);
        return (field = '');
      }
      return '';
    }
  );
  if (field) {
    words.push(field);
  }
  return words;
}

export function escape(str: string): string {
  if (str == null) {
    str = '';
  }
  if (str == null) {
    return "''";
  }
  return str.replace(/([^A-Za-z0-9_\-.,:/@\n])/g, '\\$1').replace(/\n/g, "'\n'");
}
