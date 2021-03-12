import test from 'tape';
import fitTextarea from './index.js';

const getField = (repeat = 50) => {
	const field = document.createElement('textarea');
	field.textContent = 'Lorem ipsum dolor sit amet'.repeat(repeat);
	document.body.append(field);
	return field;
};

const getHeight = element => element.getBoundingClientRect().height;

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
	const textarea = getField(1);
	textarea.rows = 10;
	fitTextarea(textarea);
	t.equal(getHeight(textarea) > 100);
});

test('fit content once + undo when empty', t => {
	t.plan(1);
	const textarea = getField();
	fitTextarea(textarea);
	const fitHeight = getHeight(textarea);
	textarea.value = '';
	fitTextarea(textarea);
	t.true(fitHeight > getHeight(textarea));
});
