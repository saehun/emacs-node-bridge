import ts from 'typescript';
import { syntaxKindToString } from './syntaxKindToString';

export function printTree(rootNode: ts.Node, sourceFile: ts.SourceFile): string {
  const tree: StringTree = {};

  function visit(node: ts.Node, currentTree: StringTree) {
    const kind = ts.isIdentifier(node)
      ? `Identifier(${node.getText(sourceFile)})`
      : syntaxKindToString(node.kind);

    if (node.getChildCount(sourceFile) === 0) {
      currentTree[kind] = null;
    }

    const subTree: StringTree = {};
    currentTree[kind] = subTree;
    ts.forEachChild(node, child => visit(child, subTree));
  }

  visit(rootNode, tree);

  return require('object-treeify')(tree);
}

type StringTree = {
  [key: string]: StringTree | null;
};
