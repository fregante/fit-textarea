function fitTextarea(textarea: HTMLTextAreaElement): void {
	// Resetting the height will change the page height and might change the scroll
	const positions: Map<Element, number> = new Map();
	let element: Element = textarea;
	while (element?.parentElement) {
		element = element.parentElement;
		positions.set(element, element.scrollTop);
	}

	const style = getComputedStyle(textarea);
	const needsReset = parseInt(style.minHeight, 10) > 0;
	if (needsReset) {
		// Reset the height to get the smallest possible height
		textarea.style.minHeight = '';
	}

	const newMinHeight = textarea.scrollHeight + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
	const needsUpdate = parseInt(style.height, 10) < newMinHeight;
	if (needsUpdate) {
		textarea.style.minHeight = `${newMinHeight}px`;
	}

	if (!needsReset) {
		// Restore any scrollTop that was lost
		for (const [element, position] of positions) {
			if (position && element.scrollTop !== position) {
				element.scrollTop = position;
			}
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
		if (element.form) {
			element.form.addEventListener('reset', listener);
		}

		fitTextarea(element);
	}
}

fitTextarea.watch = watchAndFit;

export default fitTextarea;
