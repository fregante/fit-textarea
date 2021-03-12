const mirrors = new WeakMap();

const mirrorDefaults = {
	height: '',
	position: 'fixed',
	top: '-500px',
	left: '-500px'
} as const;

interface Data {
	mirror: HTMLTextAreaElement;
	additionalHeight: number;
}

function getFieldData(source: HTMLTextAreaElement): Data {
	const cached = mirrors.get(source);
	if (cached) {
		return cached;
	}

	const sourceStyle = getComputedStyle(source);

	const mirror = source.cloneNode() as HTMLTextAreaElement;

	for (const property of sourceStyle) {
		mirror.style.setProperty(property, sourceStyle.getPropertyValue(property));
	}

	Object.assign(mirror.style, mirrorDefaults);

	const data = {
		mirror,
		additionalHeight:
			parseFloat(sourceStyle.borderTopWidth) +
			parseFloat(sourceStyle.borderBottomWidth)
	};

	// Cache it and automatically de-cache it when something relevant happens
	mirrors.set(source, data);
	const regenerateMirror = () => {
		mirrors.delete(source);
	};

	const settings = {
		once: true,
		passive: true
	} as const;
	window.addEventListener('resize', regenerateMirror, settings);
	window.addEventListener('load', regenerateMirror, settings);
	return data;
}

function fitTextarea(textarea: HTMLTextAreaElement): void {
	const {mirror, additionalHeight} = getFieldData(textarea);

	// Match content and reset height
	mirror.value = textarea.value;

	document.body.append(mirror);

	const desiredHeight = String(mirror.scrollHeight + additionalHeight) + 'px';
	if (textarea.style.minHeight !== desiredHeight) {
		textarea.style.minHeight = desiredHeight;
	}

	mirror.remove();
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

