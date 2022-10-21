(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('nette-forms'), require('jquery'), require('corejs-typeahead/dist/typeahead.jquery'), require('corejs-typeahead/dist/bloodhound')) :
    typeof define === 'function' && define.amd ? define(['nette-forms', 'jquery', 'corejs-typeahead/dist/typeahead.jquery', 'corejs-typeahead/dist/bloodhound'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Nette, global.jQuery, null, global.Bloodhound));
})(this, (function (Nette, $, typeahead_jquery, Bloodhound) { 'use strict';

    function initializeInput(input) {
      var $input = $(input);
      if ($input.is('.tt-input, .tt-hint')) {
        return;
      }
      var autocompleteUrl = $input.data('autocompleteUrl');
      var autocompleteQueryPlaceholder = $input.data('autocompleteQueryPlaceholder') || '__QUERY_PLACEHOLDER__';
      var autocompleteMinLength = $input.data('autocompleteMinLength') || 1;
      $input.typeahead({
        highlight: true,
        autoselect: true,
        minLength: autocompleteMinLength
      }, {
        source: new Bloodhound({
          queryTokenizer: Bloodhound.tokenizers.whitespace,
          datumTokenizer: Bloodhound.tokenizers.whitespace,
          remote: {
            url: autocompleteUrl,
            wildcard: autocompleteQueryPlaceholder
          }
        })
      });
    }
    function initializeForm(form) {
      $(form).find('input[data-autocomplete-url]').each(function (idx, input) {
        initializeInput(input);
      });
    }
    function initializeAutocomplete(Nette) {
      // Initialize all forms on document ready
      $(function () {
        $('form').each(function (idx, form) {
          initializeForm(form);
        });
      });

      // Tap into Nette.initForm() to provide AJAX snippet support via e.g. Naja
      var originalInitForm = Nette.initForm;
      Nette.initForm = function (form) {
        originalInitForm(form);
        initializeForm(form);
      };
    }

    initializeAutocomplete(Nette);

}));
//# sourceMappingURL=autocomplete-input.js.map
