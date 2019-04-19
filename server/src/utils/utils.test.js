const utils = require('./utils');

describe('encrypt', () => {
	test('should encrypt string', () => {
		expect(utils.encrypt('alex')).toEqual('cf03b3d0');
	});
});
