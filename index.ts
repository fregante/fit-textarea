function fitTextarea(element: HTMLTextAreaElement): void {
	element.style.height = 'auto';
	element.style.height = String(element.scrollHeight) + 'px';
}

function watch(elements: string | HTMLTextAreaElement | HTMLTextAreaElement[] | NodeListOf<HTMLTextAreaElement>): void {
	if (typeof elements === 'string') {
		elements = document.querySelectorAll(elements);
	} else if (elements instanceof HTMLTextAreaElement) {
		elements = [elements];
	}

	for (const element of elements) {
		element.addEventListener('input', (event: Event) => fitTextarea(event.target as HTMLTextAreaElement));
		fitTextarea(element);
	}
}

fitTextarea.watch = watch;

module.exports = fitTextarea;
export default fitTextarea;
