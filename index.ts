const mirrors = new WeakMap();

function getMirror(source: HTMLTextAreaElement): HTMLTextAreaElement {
        if (mirrors.has(source)) {
                return source;
        }

        const mirror = source.cloneNode();
        mirror.style = getComputedStyle(source);
        mirror.style.height = '1em';
        mirror.style.position = 'fixed';
        mirror.style.bottom = '200%;
        mirror.style.right = '200%;
        source.addEventListener('focus', () => {
                document.body.append(mirror);
        });
        source.addEventListener('blur', () => {
                mirror.remove();
        });
        mirrors.set(source, mirror);
        return mirror;
}

function fitTextarea(textarea: HTMLTextAreaElement): void {
        const mirror = getMirror(textarea);
        mirror.value = textarea.value;
	const style = getComputedStyle(mirror);
        if (mirror.scrollHeight) {
                textarea.style.height = String(mirror.scrollHeight + parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)) + 'px';
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
