const test = require('tape');
const fitTextarea = require('.');

document.body.innerHTML = `
	<textarea>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla placerat enim risus, at convallis odio venenatis non. Aenean non augue nibh. Phasellus aliquam tempus orci, quis viverra odio placerat ac. Duis tristique neque lectus, vitae tincidunt massa dapibus sit amet. Duis vitae pulvinar mi. Suspendisse tincidunt risus quis commodo finibus. Vestibulum suscipit diam metus, eget suscipit eros mollis sed. Vivamus cursus augue turpis, sit amet luctus lectus vehicula sit amet. Duis ut tincidunt mi. Maecenas iaculis eget lorem vestibulum suscipit.
`;

const textarea = document.querySelector('textarea');
const getHeight = el => el.getBoundingClientRect().height;

test('fit content once', t => {
	const initialHeight = getHeight(textarea);
	fitTextarea(textarea);
	t.true(initialHeight < getHeight(textarea));
	t.true(textarea.clientHeight >= textarea.scrollHeight);
});
