/**
 * Transform object to type literal string
 */
export function toTypeLiteral(obj: any, withComment = false, indent = 2): string {
  const space = ' '.repeat(indent);
  const typePair = Object.entries(obj)
    .map(([key, value]) => {
      let type = 'any';
      switch (typeof value) {
        case 'number':
          type = 'number;';
          break;
        case 'string':
          type = 'string';
          break;
        case 'boolean':
          type = 'boolean';
          break;
        case 'object':
          if (value === null) {
            type = 'null | string;';
          } else {
            type = toTypeLiteral(value, withComment, indent + 2);
          }
          break;
      }

      return space + `"${key}": ${type}` + createComment(value, withComment);
    })
    .join('\n');

  return `{
${typePair}
}`;
}

function createComment(value: any, withComment: boolean) {
  if (withComment === false) {
    return '';
  }
  if (value === null) {
    return ' // null';
  }
  return ['number', 'string', 'boolean'].includes(typeof value)
    ? ` // ${JSON.stringify(value)}`
    : '';
}
