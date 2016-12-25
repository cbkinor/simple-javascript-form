
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
});

// Validate email
function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate() {
  $("#result").text("");
  var email = $("#email").val();
  if (validateEmail(email)) {
    $("#result").text("");
  } else {
    $("#result").text(email + " is not a valid address").css("color", "red");
  }
  return false;
}

$("#btn").bind("click", validate);

// Validate required fields
// function validation(value){
//     return (value.length) ? true : false;
//     // same as if (value.length) {return true;} else {return false;}
// }
//
// // Detecting the event for any field of class field
// $(".required").keyup(function() {
//
//     // checking each item
//     $(".required").each(function(index, item){
//
//         if(!validation($(item).val())){
//             $("#btn").prop("disabled", true);
//             return false; // break the loop. there is a validation error
//         }
//
//         // if is the last item and there aren't validation errors
//         if ($(item).attr('id') == $(".required").last().attr('id'))
//             $("#btn").prop("disabled", false);
//     });
// })



// $('form').submit(function(){
//     // get all empty required fields
//     var reqEmpty = $('.required').filter(function(){
//        return $.trim(this.value).length === 0;
//     });
//     // if any empty required fields are found - do something
//     if(reqEmpty.length){
//         alert('empty required field');
//         return false;
//     }
// });
