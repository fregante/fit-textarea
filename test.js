const test = require('tape');
const fitTextarea = require('.');

const getField = (repeat = 50) => {
	const field = document.createElement('textarea');
	field.textContent = 'Lorem ipsum dolor sit amet'.repeat(repeat);
	document.body.append(field);
	return field;
};

const getHeight = el => el.getBoundingClientRect().height;

test('fit content once (increase)', t => {
	t.plan(2);
	const textarea = getField();
	const initialHeight = getHeight(textarea);
	fitTextarea(textarea);
	t.true(initialHeight < getHeight(textarea));
	t.true(textarea.clientHeight >= textarea.scrollHeight);
});

test.skip('fit content once (keep minimum height)', t => {
	t.plan(1);
	// TODO: I don't know if this is possible, but the rows attribute and min-height should be followed
	const textarea = getField(1);
	textarea.style.minHeight = '200px';
	fitTextarea(textarea);
	t.equal(getComputedStyle(textarea).height, '200px');
});

test('fit content once + undo when empty', t => {
	t.plan(1);
	const textarea = getField();
	fitTextarea(textarea);
	const fitHeight = getHeight(textarea);
	textarea.value = '';
	fitTextarea(textarea);
	t.true(fitHeight > getHeight(textarea));
	// TODO: t.equal(getHeight(textarea), initialHeight);
});
