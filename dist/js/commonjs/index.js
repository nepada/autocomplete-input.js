'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var $ = require('jquery');
require('corejs-typeahead/dist/typeahead.jquery');
var Bloodhound = require('corejs-typeahead/dist/bloodhound');

function defaultTypeaheadFactory(input, options = {}) {
    const $input = $(input);
    const autocompleteUrl = $input.data('autocompleteUrl');
    const autocompleteQueryPlaceholder = $input.data('autocompleteQueryPlaceholder') || '__QUERY_PLACEHOLDER__';
    const autocompleteMinLength = $input.data('autocompleteMinLength');

    $input.typeahead(
        $.extend(
            {
                highlight: true,
                autoselect: true,
                minLength: 1,
            },
            options,
            {
                minLength: autocompleteMinLength,
            },
        ),
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

    const $hint = $input.parent().find($input.data('ttTypeahead').selectors.hint);
    // Remove marker data attribute to avoid re-initialization on hint input
    $hint.removeAttr('data-autocomplete-url');
}

function bootstrap5TypeaheadFactory(input, options = {}) {
    defaultTypeaheadFactory(
        input,
        $.extend(
            {
                classNames: {
                    menu: 'dropdown-menu',
                    suggestion: 'dropdown-item',
                    cursor: 'active',
                },
            },
            options,
        ),
    );

    const $input = $(input);

    const $wrapper = $input.parent();
    if ($wrapper.parent().is('.form-floating')) {
        // Merge with form-floating wrapper, if possible
        const attrs = Object.fromEntries(Array.from($wrapper.parent().prop('attributes')).map((item) => {return [item.name, item.value];}));
        attrs.class = $wrapper.attr('class') + ' ' + (attrs.class || '');
        attrs.style = $wrapper.attr('style') + ' ' + (attrs.style || '');
        $wrapper.attr(attrs);
        $wrapper.prevAll().prependTo($wrapper);
        $wrapper.nextAll().appendTo($wrapper);
        $wrapper.unwrap();
    }

    const $hint = $wrapper.find($input.data('ttTypeahead').selectors.hint);
    // Reset placeholder to make floating labels working
    $hint.attr({placeholder: ''});
    // Reset copied background to avoid problems with validation
    $hint.css({background: 'none'});
}

function initializeForm(form, typeaheadFactory) {
    $(form)
        .find('input[data-autocomplete-url]')
        .each((idx, input) => {
            if (!$(input).data('ttTypeahead')) {
                typeaheadFactory(input);
            }
        });
}

function initializeAutocomplete(Nette, typeaheadFactory = null) {
    typeaheadFactory = typeaheadFactory || defaultTypeaheadFactory;
    // Initialize all forms on document ready
    $(() => {
        $('form').each((idx, form) => {
            initializeForm(form, typeaheadFactory);
        });
    });

    // Tap into Nette.initForm() to provide AJAX snippet support via e.g. Naja
    const originalInitForm = Nette.initForm;
    Nette.initForm = (form) => {
        originalInitForm(form);
        initializeForm(form, typeaheadFactory);
    };
}

exports.bootstrap5TypeaheadFactory = bootstrap5TypeaheadFactory;
exports.default = initializeAutocomplete;
exports.defaultTypeaheadFactory = defaultTypeaheadFactory;
//# sourceMappingURL=index.js.map
