/*
    Copyright 2015 Leafbird
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
    http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

(function() {

'use strict';

leafbird.validation = new Validation();

/**
 * @todo Write JSDoc here
 * { function_description }
 *
 * @class
 */
function Validation() {

  var validation = this;

  validation.validateForm = validateForm;

  var configs;

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {HTMLElement}   form  HTML element that contains inputs to validate.
   *
   * @return  {boolean}       Validation status, true if all values is valid.
   */
  function validateForm(form) {

    if (!(form instanceof HTMLElement)) {
      throw new SyntaxError('Invalid HTMLElement.', form);
    }

    configs = leafbird.configure();
    var isValid = true;

    var invalidFields = [].filter.call(
      form.getElementsByTagName('*'), function(elmt) {
        return (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(elmt.nodeName) > -1 &&
                !elmt.checkValidity()) || !validateCheckboxOne(elmt);
      }
    );

    if (invalidFields.length > 0) {
      configs.validationCallback(invalidFields, form);
      isValid = false;
    }

    return isValid;
  }

  /**
   * @todo Write JSDoc here
   * { function_description }
   *
   * @param   {HTMLElement}   element  HTML element with group checkbox to verify.
   *
   * @return  {boolean}       True if at least one checkbox is checked or it is not required.
   */
  function validateCheckboxOne(element) {

    if (element.id && element.id.indexOf('checkboxone_') > -1 &&
                                element.getAttribute('required')) {

      var checkBoxes = document.getElementsByName(
                                element.id.substring('checkboxone_'.length));

      for (var i = 0; i < checkBoxes.length; i++)
        if (checkBoxes[i].checked)
          return true;

      return false;
    }

    return true;
  }
}

})();
