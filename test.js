const test = require('tape');
const fitTextarea = require('.');

const getField = (repeat = 50) => {
const field = document.createElement('textarea');
field.textContent = `Lorem ipsum dolor sit amet`.repeat(repeat);
document.body.append(field);
return field;
};

const textarea = document.querySelector('textarea');
const getHeight = el => el.getBoundingClientRect().height;

test('fit content once', t => {
	const textarea = getField();
	const initialHeight = getHeight(textarea);
	fitTextarea(textarea);
	t.true(initialHeight < getHeight(textarea));
	t.true(textarea.clientHeight >= textarea.scrollHeight);
});

test('fit content once + undo when empty', t => {
	const textarea = getField();
	const initialHeight = getHeight(textarea);
	fitTextarea(textarea);
	textarea.value = '';
	fitTextarea(textarea);
	t.equal(initialHeight, getHeight(textarea));
});
