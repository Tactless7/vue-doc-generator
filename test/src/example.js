const test = require('unit.js');

module.exports =
	describe('Example', () => {
		it('should be a very fabulous example', () => {
			test.string('Fab').is('Fab');
		});
	});
