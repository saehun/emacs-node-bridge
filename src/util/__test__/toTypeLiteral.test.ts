import { toTypeLiteral } from '../toTypeLiteral';

describe('toTypeLiteral', () => {
  it('can transform', () => {
    expect(toTypeLiteral({ a: 1 })).toEqual(`{
  a: number;
}`);
  });
});
