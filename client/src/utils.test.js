import add from './utils';

describe('add', () => {
    it('should add the params', () => {
        expect(add(1, 2)).toBe(3);
    })
});