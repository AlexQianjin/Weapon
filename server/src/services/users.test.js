// var userService = require('./users');

jest.mock('./users');
const { getUser } = require('./users');

getUser.mockImplementation(
	name =>
		new Promise((resolve, reject) => {
			try {
				if (name === 'alex') {
					resolve({ username: name });
				} else {
					throw new Error('get user error');
				}
			} catch (error) {
				reject({ message: 'User doesnot exist!' });
			}
		})
);

describe('User Service', () => {
	test('should return alex', () => {
		return getUser('alex').then(data => {
			expect(data.username).toBe('alex');
		});
	});
});

describe('User Service', () => {
	test('should return alex again', () => {
		return expect(getUser('alex')).resolves.toEqual({ username: 'alex' });
	});
});

describe('User Service', () => {
	test('should return User doesnot exist!', () => {
		return getUser('lily').catch(data => {
			expect(data.message).toBe('User doesnot exist!');
		});
	});
});

describe('User Service', () => {
	test('should return User doesnot exist again', () => {
		return expect(getUser('lily')).rejects.toEqual({
			message: 'User doesnot exist!'
		});
	});
});
