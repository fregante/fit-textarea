# fit-textarea [![Build Status](https://api.travis-ci.com/bfred-it/fit-textarea.svg?branch=master)](https://travis-ci.com/bfred-it/fit-textarea)

> Automatically expand a `<textarea>` to fit its content

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
