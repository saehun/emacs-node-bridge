import ts from 'typescript';
import { syntaxKindToString } from './syntaxKindToString';

export function findNodeByPos(
  sourceFile: ts.SourceFile,
  position: number
): { node: [node: ts.Node, startAt: number, endAt: number] | null; stack: string[] } {
  const syntaxKindStack: string[] = [];
  let foundNode: [node: ts.Node, startAt: number, endAt: number] | null = null;

  visit(sourceFile);

  return { node: foundNode, stack: syntaxKindStack };

  function visit(node: ts.Node) {
    if (foundNode) {
      return;
    }

    const start = node.pos + 1;
    const end = node.end;

    if (position >= start && position <= end) {
      if (!ts.isSourceFile(node)) {
        syntaxKindStack.push(syntaxKindToString(node.kind));
      }

      if (node.getChildCount(sourceFile) === 0) {
        foundNode = [node, start, end];
      } else {
        ts.forEachChild(node, child => {
          visit(child);
        });
      }
    }
  }
}
