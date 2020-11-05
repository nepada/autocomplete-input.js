Client side of Autocomplete text input for Nette forms
======================================================

[![Build Status](https://github.com/nepada/autocomplete-input.js/workflows/CI/badge.svg)](https://github.com/nepada/autocomplete-input.js/actions?query=workflow%3ACI+branch%3Amaster)
[![Latest stable](https://img.shields.io/npm/v/@nepada/autocomplete-input.svg)](https://www.npmjs.com/package/@nepada/autocomplete-input)


Installation
------------

Via npm:

```sh
$ npm install @nepada/autocomplete-input --save
```

Via yarn:

```sh
$ yarn add @nepada/autocomplete-input
```


Usage
-----

This package provides [corejs-typeahead](https://yarnpkg.com/package/corejs-typeahead) based client side for [nepada/autocomplete-input](https://packagist.org/packages/nepada/autocomplete-input).

#### Using precompiled JS bundle

Using precompiled bundles is the quick'n'dirty way of getting client side validation to work.

```html
<script src="https://unpkg.com/jquery@%5E3.5.0/dist/jquery.min.js"></script>
<script src="https://unpkg.com/corejs-typeahead@%5E1.3.1/dist/typeahead.bundle.min.js"></script>
<script src="https://unpkg.com/nette-forms@%5E3.0.3/src/assets/netteForms.min.js"></script>
<script src="https://unpkg.com/nette-forms@%5E1.0.0/dist/js/autocomplete-input.min.js"></script>
```

#### Building your own JS bundle

It is highly recommended to install the client side package via nmp/yarn and compile your own bundle.

Here is an example script for initialization of phone number input and Nette forms.  

```js
import Nette from 'nette-forms';
import initializeAutocompleteInput from '@nepada/autocomplete-input';

initializeAutocompleteInput(Nette);
Nette.initOnLoad();
```

#### Styling

There is no precompiled CSS available, but there is [_bootstrap4.scss](src/scss/_bootstrap4.scss) partial with styles for Bootstrap 4 based websites.
