#!/usr/bin/env node

const program = require('commander');

program
	.version('1.0.0', '-v, --version')
	.usage('<filename>')
	.parse(process.argv);

console.log(program.args);
