(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('nette-forms'), require('jquery'), require('corejs-typeahead/dist/typeahead.jquery'), require('corejs-typeahead/dist/bloodhound')) :
    typeof define === 'function' && define.amd ? define(['nette-forms', 'jquery', 'corejs-typeahead/dist/typeahead.jquery', 'corejs-typeahead/dist/bloodhound'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Nette, global.jQuery, null, global.Bloodhound));
})(this, (function (Nette, $, typeahead_jquery, Bloodhound) { 'use strict';

    function defaultTypeaheadFactory(input) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var $input = $(input);
      var autocompleteUrl = $input.data('autocompleteUrl');
      var autocompleteQueryPlaceholder = $input.data('autocompleteQueryPlaceholder') || '__QUERY_PLACEHOLDER__';
      var autocompleteMinLength = $input.data('autocompleteMinLength');
      $input.typeahead($.extend({
        highlight: true,
        autoselect: true,
        minLength: 1
      }, options, {
        minLength: autocompleteMinLength
      }), {
        source: new Bloodhound({
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          datumTokenizer: Bloodhound.tokenizers.whitespace,
          remote: {
            url: autocompleteUrl,
            wildcard: autocompleteQueryPlaceholder
          }
        })
      });
      var $hint = $input.parent().find($input.data('ttTypeahead').selectors.hint);
      // Remove marker data attribute to avoid re-initialization on hint input
      $hint.removeAttr('data-autocomplete-url');
    }
    function initializeForm(form, typeaheadFactory) {
      $(form).find('input[data-autocomplete-url]').each(function (idx, input) {
        if (!$(input).data('ttTypeahead')) {
          typeaheadFactory(input);
        }
      });
    }
    function initializeAutocomplete(Nette) {
      var typeaheadFactory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      typeaheadFactory = typeaheadFactory || defaultTypeaheadFactory;
      // Initialize all forms on document ready
      $(function () {
        $('form').each(function (idx, form) {
          initializeForm(form, typeaheadFactory);
        });
      });

      // Tap into Nette.initForm() to provide AJAX snippet support via e.g. Naja
      var originalInitForm = Nette.initForm;
      Nette.initForm = function (form) {
        originalInitForm(form);
        initializeForm(form, typeaheadFactory);
      };
    }

    initializeAutocomplete(Nette);

}));
//# sourceMappingURL=autocomplete-input.js.map
