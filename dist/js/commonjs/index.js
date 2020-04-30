'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var $ = _interopDefault(require('jquery'));
require('corejs-typeahead/dist/typeahead.jquery');
var Bloodhound = _interopDefault(require('corejs-typeahead/dist/bloodhound'));

function initializeInput(input) {
    const $input = $(input);
    if ($input.is('.tt-input, .tt-hint')) {
        return;
    }

    const autocompleteUrl = $input.data('autocompleteUrl');
    const autocompleteQueryPlaceholder = $input.data('autocompleteQueryPlaceholder') || '__QUERY_PLACEHOLDER__';
    const autocompleteMinLength = $input.data('autocompleteMinLength') || 1;

    $input.typeahead(
        {
            highlight: true,
            autoselect: true,
            minLength: autocompleteMinLength,
        },
        {
            source: new Bloodhound({
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                datumTokenizer: Bloodhound.tokenizers.whitespace,
                remote: {
                    url: autocompleteUrl,
                    wildcard: autocompleteQueryPlaceholder,
                },
            }),
        },
    );
}

function initializeForm(form) {
    $(form)
        .find('input[data-autocomplete-url]')
        .each((idx, input) => {
            initializeInput(input);
        });
}

function initializeAutocomplete(Nette) {
    // Initialize all forms on document ready
    $(() => {
        $('form').each((idx, form) => {
            initializeForm(form);
        });
    });

    // Tap into Nette.initForm() to provide AJAX snippet support via e.g. Naja
    const originalInitForm = Nette.initForm;
    Nette.initForm = (form) => {
        originalInitForm(form);
        initializeForm(form);
    };
}

module.exports = initializeAutocomplete;
//# sourceMappingURL=index.js.map
