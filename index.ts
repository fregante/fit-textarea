function fitTextarea(element: HTMLTextAreaElement): void {
	element.style.height = 'auto';
	const style = getComputedStyle(element);
	element.style.height = String(element.scrollHeight + parseFloat(style.borderTopWidth!) + parseFloat(style.borderBottomWidth!)) + 'px';
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
