window.onload = init;

function init() {
   // Bind "onsubmit" event handler to the "submit" button
   document.getElementById("formTest").onsubmit = validateForm;
  //  // Bind "onclick" event handler to "reset" button
  //  document.getElementById("btnReset").onclick = clearForm;
   // Set initial focus
   document.getElementById("firstName").focus();
}

function validateForm(theForm) {
  with(theForm) {
    // return false would prevent default submission
    return (isAlphanumeric(firstName, "Please enter your first name!",    elmFirstNameError)
      && isAlphanumeric(lastName, "Please enter your last name!", elmLastNameError)
      && isAlphanumeric(street, "Please enter your street address!", elmStreetError)
      && isAlphanumeric(apt, "Please enter a valid appartment / suite #!", elmAptError)
      && isAlphanumeric(city, "Please enter your city!", elmCityError)
      // && isSelected(country, "Please select your country!", elmCountryError)
      // && isSelected(state, "Please select your state / providence!", elmStateError)
      && isValidZip(zip, "Please enter a valid zip code!", elmZipError)
      && isValidEmail(email, "Enter a valid email!", elmEmailError)
    );
   }
}

function postValidate(isValid, errMsg, errElm, inputElm) {
   if (!isValid) {
      // Show errMsg on errElm, if provided.
      if (errElm !== undefined && errElm !== null
            && errMsg !== undefined && errMsg !== null) {
         errElm.innerHTML = errMsg;
      }
      // Set focus on Input Element for correcting error, if provided.
      if (inputElm !== undefined && inputElm !== null) {
        //  inputElm.classList.add("errorBox");  // Add class for styling
         inputElm.focus();
      }
   } else {
      // Clear previous error message on errElm, if provided.
      if (errElm !== undefined && errElm !== null) {
         errElm.innerHTML = "";
      }
      // if (inputElm !== undefined && inputElm !== null) {
      //    inputElm.classList.remove("errorBox");
      // }
   }
}

function isNotEmpty(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim() !== "");
   postValidate(isValid, errMsg, errElm, inputElm);
   return isValid;
}

/* Validate that input value contains one or more digits or letters */
function isAlphanumeric(inputElm, errMsg, errElm) {
   var isValid = (inputElm.value.trim().match(/^[A-Za-z\d\s]+$/) !== null);
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


// Country and State drop-down menues.
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
    var isRequired = /CA|US/i.test(this.value);
    $('div[name=zip]').toggleClass('required',isRequired);
    $('input[name=zip]').toggleClass('disableBtn', isRequired);
});

// // Validate email
// function validEmail(email) {
//   var result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return result.test(email);
// }
//
// function validateEmail() {
//   $('#emailResult').text("");
//   var email = $('#email').val();
//   if (validEmail(email)) {
//     $('#emailResult').text("");
//   } else {
//     $('#emailResult').text(email + ' is not a valid address').css('color', 'red');
//   }
//   return false;
// }
//
// $("#btn").bind("click", validateEmail);

// Disable "Send Request" btn until all fields filled
$('.disableBtn').on('keyup change', function(){
  var empty = false;
  $('.disableBtn').each(function() {
      if ($(this).val() == '') {
          empty = true;
      }
  });

  if (empty) {
      $('#btnSubmit').prop('disabled', true);
  } else {
      $('#btnSubmit').prop('disabled', false);
  }
});

function clearForm() {
  //  // Remove class "errorBox" from input elements
  //  var elms = document.querySelectorAll('.errorBox');  // class
  //  for (var i = 0; i < elms.length; i++) {
  //     elms[i].classList.remove("errorBox");
  //  }
   //
  //  // Remove previous error messages
  //  elms = document.querySelectorAll('[id$="Error"]');  // id ends with Error
  //  for (var i = 0; i < elms.length; i++) {
  //     elms[i].innerHTML = "";
  //  }

   // Set initial focus
   document.getElementById("firstName").focus();
}
