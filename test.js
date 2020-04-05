import test from 'tape';
import fitTextarea from '.';

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

test('fit content once (keep minimum height)', t => {
	t.plan(1);
	const textarea = getField(0);
	textarea.style.height = '200px';
	const minimumHeight = getHeight(textarea);
	fitTextarea(textarea);
	t.equal(getComputedStyle(textarea).height, `${minimumHeight}px`);
});

test('fit content once + undo when empty', t => {
	t.plan(1);
	const textarea = getField();
	const initialHeight = getHeight(textarea);
	fitTextarea(textarea);
	const fitHeight = getHeight(textarea);
	textarea.value = '';
	fitTextarea(textarea);
	t.true(fitHeight > getHeight(textarea));
	// TODO: t.equal(getHeight(textarea), initialHeight);
});
