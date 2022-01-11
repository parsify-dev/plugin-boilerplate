import test from 'ava';

import parsifyExamplePlugin from './src';

const mockedUtils = {
	scope: new Map(),
	fetcher: (a, b) => Promise.resolve(a + b),
}

test('general', async t => {
	t.is(await parsifyExamplePlugin(mockedUtils)('hello'), 'hello, world!');
});

test('with environmental variable', async t => {
	process.env.UPPER_CASE = 'true';
	t.is(await parsifyExamplePlugin(mockedUtils)('hello'), 'HELLO, WORLD!');
});

test('custom function', async t => {
	await parsifyExamplePlugin(mockedUtils)('foo');
	t.truthy(mockedUtils.scope.get('toUpperCase'));
});

test('if an error occurs, just output the expression', async t => {
	t.is(await parsifyExamplePlugin(mockedUtils)('foo / bar'), 'foo / bar');
});
