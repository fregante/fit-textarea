type Positions = Map<Element, number>;

function fitTextarea(element: HTMLTextAreaElement): void {
	const positions = getScrollPositions(element);
	element.style.height = 'auto';
	const style = getComputedStyle(element);

	element.style.height = String(element.scrollHeight + parseFloat(style.borderTopWidth!) + parseFloat(style.borderBottomWidth!)) + 'px';
	setScrollPositions(positions);
}

function getScrollPositions(element: Element): Positions {
	const positions: Positions = new Map();

	while (element && element.parentElement) {
		if (element.parentElement.scrollTop) {
			positions.set(element.parentElement, element.parentElement.scrollTop);
		}

		element = element.parentElement;
	}

	return positions;
}

function setScrollPositions(positions: Positions): void {
	for (const [element, position] of positions) {
		element.scrollTop = position;
	}
}

function listener(event: Event): void {
	fitTextarea(event.target as HTMLTextAreaElement);
}

function watch(elements: string | HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>): void {
	if (typeof elements === 'string') {
		elements = document.querySelectorAll(elements);
	} else if (elements instanceof HTMLTextAreaElement) {
		elements = [elements];
	}

	for (const element of elements) {
		element.addEventListener('input', listener);
		fitTextarea(element);
	}
}

fitTextarea.watch = watch;

module.exports = fitTextarea;
export default fitTextarea;
