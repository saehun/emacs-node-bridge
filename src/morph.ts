import { Project, ScriptTarget } from 'ts-morph';

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ESNext,
  },
});

export const sourceText = `
import { apple, banana } from 'fruit'

`;
const sourceFile = project.createSourceFile('source.ts', sourceText);
const decl = sourceFile.getImportDeclarations()[0];

decl.setModuleSpecifier('foo');
sourceFile.insertImportDeclaration(0, {
  moduleSpecifier: 'bar',
  namedImports: ['haha'],
});

const result = sourceFile.getText();

console.log(result);
