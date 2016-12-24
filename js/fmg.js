
// Country and State drop-down menues.
const states = new Array();
states[0]="";
states[1]="Please Select a State|Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland|Northwest Territories|Nova Scotia|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon Territory";
states[2]="Please Select a State|Alsace|Aquitaine|Auvergne|Basse-Normandie|Bourgogne|Bretagne|Centre|Champagne-Ardenne|Corse|Franche-Comte|Haute-Normandie|Ile-de-France|Languedoc-Roussillon|Limousin|Lorraine|Midi-Pyrenees|Nord-Pas-de-Calais|Pays de la Loire|Picardie|Poitou-Charentes|Provence-Alpes-Cote d'Azur|Rhone-Alpes";
states[3]="Please Select a State|Aguascalientes|Baja California|Baja California Sur|Campeche|Chiapas|Chihuahua|Coahuila de Zaragoza|Colima|Distrito Federal|Durango|Guanajuato|Guerrero|Hidalgo|Jalisco|Mexico|Michoacan de Ocampo|Morelos|Nayarit|Nuevo Leon|Oaxaca|Puebla|Queretaro de Arteaga|Quintana Roo|San Luis Potosi|Sinaloa|Sonora|Tabasco|Tamaulipas|Tlaxcala|Veracruz-Llave|Yucatan|Zacatecas";
states[4]="Please Select a State|Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming";

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
});

$('#country').change(function () {
    var isRequired = /CA|US/i.test(this.value);
    $('div[name=zip]').toggleClass('required',isRequired);
});

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
