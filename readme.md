# fit-textarea [![(size)][badge-gzip]](#no-link) [![(status)][badge-travis]][link-travis]

  [badge-gzip]: https://img.shields.io/bundlephobia/minzip/fit-textarea.svg?label=gzipped
  [badge-travis]: https://api.travis-ci.com/bfred-it/fit-textarea.svg
  [link-travis]: https://travis-ci.com/bfred-it/fit-textarea

<img align="right" width="361" src="https://user-images.githubusercontent.com/1402241/54336211-66fd5e00-4666-11e9-9c5e-111fccab004d.gif">

> Automatically expand a `<textarea>` to fit its content, in a few bytes

## Install

```
npm install fit-textarea
```

## Setup

```js
const fitTextarea = require('fit-textarea');
```

```js
import fitTextarea from 'fit-textarea';
```

```html
<textarea rows="3">Use the rows attribute to set its minimum height</textarea>
```

## Usage

### Once, one element

```js
const textarea = document.querySelector('textarea');
fitTextarea(textarea);
```

### As the user types

#### One element

```js
const textarea = document.querySelector('textarea');
fitTextarea.watch(textarea);
```

#### Array/NodeList/Iterable of elements

```js
const textareas = document.querySelectorAll('textarea');
fitTextarea.watch(textareas);
```

#### With a selector

The selector is run once, so it's equivalent to the example above.

```js
fitTextarea.watch('textarea');
```

# Related

- [indent-textarea](https://github.com/bfred-it/indent-textarea) - Add editor-like tab-to-indent functionality to <textarea>, in a few bytes.
- [delegate-it](https://github.com/bfred-it/delegate-it) - DOM event delegation, in <1KB. Can be used to attach one `fit-textarea` to many elements.
- [Refined GitHub](https://github.com/sindresorhus/refined-github) - Uses this module.
