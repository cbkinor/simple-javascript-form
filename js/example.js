// JSFormValidation.js
/*
 * Run init() after the page is loaded
 */
window.onload = init;

/*
 * Initialization
 */
function init() {
   // Bind "onsubmit" event handler to the "submit" button
   document.getElementById("formTest").onsubmit = validateForm;
   // Bind "onclick" event handler to "reset" button
   document.getElementById("btnReset").onclick = clearForm;
   // Set initial focus
   document.getElementById("firstName").focus();
}

const states = new Array();
states[0]="";
states[1]="Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland|Northwest Territories|Nova Scotia|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon Territory";
states[2]="Alsace|Aquitaine|Auvergne|Basse-Normandie|Bourgogne|Bretagne|Centre|Champagne-Ardenne|Corse|Franche-Comte|Haute-Normandie|Ile-de-France|Languedoc-Roussillon|Limousin|Lorraine|Midi-Pyrenees|Nord-Pas-de-Calais|Pays de la Loire|Picardie|Poitou-Charentes|Provence-Alpes-Cote d'Azur|Rhone-Alpes";
states[3]="Aguascalientes|Baja California|Baja California Sur|Campeche|Chiapas|Chihuahua|Coahuila de Zaragoza|Colima|Distrito Federal|Durango|Guanajuato|Guerrero|Hidalgo|Jalisco|Mexico|Michoacan de Ocampo|Morelos|Nayarit|Nuevo Leon|Oaxaca|Puebla|Queretaro de Arteaga|Quintana Roo|San Luis Potosi|Sinaloa|Sonora|Tabasco|Tamaulipas|Tlaxcala|Veracruz-Llave|Yucatan|Zacatecas";
states[4]="Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming";

function stateList(stateId, stateIndex) {
  var stateOption = document.getElementById(stateId);
  stateOption.length = 0;
  stateOption.selectedIndex = 0;
  var stateArray = states[stateIndex].split('|');
  for (var i = 0; i < stateArray.length; i++) {
    stateOption.options[stateOption.length] = new Option(stateArray[i]);
  }
}

// If Canada selected, make "Subscribe to Email Offers" unavailable.
$('#country').on('change', function() {
    if ($(this).val() === "CA") {
        $('.enable').attr('disabled', 'disabled');
    } else {
        $('.enable').removeAttr('disabled');
    }
    // Require zip if US or Canada is selected country
    var isRequired = /CA|US/i.test(this.value);
    $('div[name=zip]').toggleClass('required',isRequired);
    $('input[name=zip]').toggleClass('disableBtn', isRequired);
});

/*
 * The "onsubmit" event handler to validate the input fields.
 *
 * Most of the input validation functions take 3 arguments:
 *   inputElm: Input element to be validated.
 *   errMsg: the error message to be displayed if validation fails.
 *   errElm: to place the error message
 *
 * @param theForm: the form to be validated
 */
function validateForm(theForm) {
  with(theForm) {
    // return false would prevent default submission
    return (isAlphanumeric(firstName, "Please enter your first name!",    elmNameError)
      && isAlphanumeric(lastName, "Please enter your last name!", elmNameError)
      && isAlphanumeric(street, "Please enter your street address!", elmNameError)
      && isAlphanumeric(apt, "Please enter a valit appartment / suite #!", elmNameError)
      && isAlphanumeric(city, "Please enter your city!", elmNameError)
      && isSelected(country, "Please select your country!", elmCountryError)
      && isSelected(state, "Please select your state / providence!", elmNameError)
      && isValidZip(zipcode, "Please enter a valid zip code!", elmZipcodeError)
      && isValidEmail(email, "Enter a valid email!", elmEmailError)
    );
   }
}

/*
 * Helper function, to be called after validation, to show or clear
 *   existing error message, and to set focus to the input element
 *   for correcting error.
 * If isValid is false, show the errMsg on errElm, and place the
 *   focus on the inputElm for correcting the error.
 * Else, clear previous errMsg on errElm, if any.
 *
 * @param isValid (boolean): flag indicating the result of validation
 * @param errMsg (string)(optional): error message
 * @param errElm (object)(optional): if isValid is false, show errMsg; else, clear.
 * @param inputElm (object)(optional): set focus to this element,
 *        if isValid is false
 */
function postValidate(isValid, errMsg, errElm, inputElm) {
   if (!isValid) {
      // Show errMsg on errElm, if provided.
      if (errElm !== undefined && errElm !== null
            && errMsg !== undefined && errMsg !== null) {
         errElm.innerHTML = errMsg;
      }
      // Set focus on Input Element for correcting error, if provided.
      if (inputElm !== undefined && inputElm !== null) {
         inputElm.classList.add("errorBox");  // Add class for styling
         inputElm.focus();
      }
   } else {
      // Clear previous error message on errElm, if provided.
      if (errElm !== undefined && errElm !== null) {
         errElm.innerHTML = "";
      }
      if (inputElm !== undefined && inputElm !== null) {
         inputElm.classList.remove("errorBox");
      }
   }
}

/*
 * Validate that input value is not empty.
 *
 * @param inputElm (object): input element
 * @param errMsg (string): error message
 * @param errElm (object): element to place error message
 */
function isNotEmpty(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim() !== "");
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

/* Validate that input value contains one or more digits */
function isNumeric(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^\d+$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

/* Validate that input value contains only one or more letters */
function isAlphabetic(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^[a-zA-Z]+$/) !== null) ;
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

/* Validate that input value contains one or more digits or letters */
function isAlphanumeric(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^[0-9a-zA-Z]+$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

/* Validate that input value length is between minLength and maxLength */
function isLengthMinMax(inputElm, minLength, maxLength, errMsg, errElm) {
   var inputValue = inputElm.value.trim();
   var isValid = (inputValue.length >= minLength) && (inputValue.length <= maxLength);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

function isValidZip(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(
         /^[0-9]{5}(?:-[0-9]{4})?$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

// Validate that input value is a valid email address
function isValidEmail(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

/*
 * Validate that a selection is made (not default of "") in <select> input
 *
 * @param selectElm (object): the <select> element
 */
function isSelected(selectElm, errMsg, errElm) {
   // You need to set the default value of <select>'s <option> to "".
   var isValid = (selectElm.value !== "");   // value in selected <option>
   postValidate(isValid, errMsg, errElm, selectElm);
   return isValid;
}

/*
 * Validate that one of the checkboxes or radio buttons is checked.
 * Checkbox and radio are based on name attribute, not id.
 *
 * @param inputName (string): name attribute of the checkbox or radio
 */
function isChecked(inputName, errMsg, errElm) {
   var elms = document.getElementsByName(inputName);
   var isChecked = false;
   for (var i = 0; i < elms.length; ++i) {
      if (elms[i].checked) {
         isChecked = true;
         break;
      }
   }
   postValidate(isChecked, errMsg, errElm, null);  // no focus element
   return isChecked;
}

// Validate password, 6-8 characters of [a-zA-Z0-9_]
function isValidPassword(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^\w{6,8}$/) !== null);
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

// Verify password.
function verifyPassword(pwElm, pwVerifiedElm, errMsg, errElm) {
   var isTheSame = (pwElm.value === pwVerifiedElm.value);
   postValidate(isTheSame, errMsg, errElm, pwVerifiedElm);
   return isTheSame;
}

/*
 * The "onclick" handler for the "reset" button to clear the display,
 * including the previous error messages and error box.
 */
function clearForm() {
   // Remove class "errorBox" from input elements
   var elms = document.querySelectorAll('.errorBox');  // class
   for (var i = 0; i < elms.length; i++) {
      elms[i].classList.remove("errorBox");
   }

   // Remove previous error messages
   elms = document.querySelectorAll('[id$="Error"]');  // id ends with Error
   for (var i = 0; i < elms.length; i++) {
      elms[i].innerHTML = "";
   }

   // Set initial focus
   document.getElementById("firstName").focus();
}
