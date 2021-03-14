import { Env } from '../../command/type';
import { isTypescriptMode } from '../isTypescriptMode';

describe('isTypescriptMode', () => {
  it(`should be truthy for`, () => {
    expect(isTypescriptMode({ filename: 'test.ts' } as Env)).toBeTruthy();
    expect(isTypescriptMode({ filename: 'test.tsx' } as Env)).toBeTruthy();
  });

  it(`should be falsy for`, () => {
    expect(isTypescriptMode({ filename: 'test.go' } as Env)).toBeFalsy();
  });
});
