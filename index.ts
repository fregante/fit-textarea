function fitTextarea(textarea: HTMLTextAreaElement): void {
	// Resetting the height will change the page height and might change the scroll
	const positions: Map<Element, number> = new Map();
	let element: Element = textarea;
	while (element && element.parentElement) {
		element = element.parentElement;
		positions.set(element, element.scrollTop);
	}

	// Reset the height to get the smallest possible height
	textarea.style.height = 'auto';
	const style = getComputedStyle(textarea);

	textarea.style.height = String(textarea.scrollHeight + parseFloat(style.borderTopWidth!) + parseFloat(style.borderBottomWidth!)) + 'px';

	// Restore any scrollTop that was lost
	for (const [element, position] of positions) {
		if (position && element.scrollTop !== position) {
			element.scrollTop = position;
		}
	}
}

function listener(event: Event): void {
	fitTextarea(event.target as HTMLTextAreaElement);
	
	
}

function watchAndFit(elements: string | HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>): void {
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

fitTextarea.watch = watchAndFit;

module.exports = fitTextarea;
export default fitTextarea;
