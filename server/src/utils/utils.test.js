const utils = require('./utils');

describe('encrypt', () => {
    it('should encrypt string', () => {
        expect(utils.encrypt('alex')).toEqual('cf03b3d0');
    })
});