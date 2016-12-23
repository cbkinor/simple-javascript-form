
// Country and State drop-down menues.
const country_arr = new Array("Canada", "France", "Mexico", "United States");
const s_a = new Array();
s_a[0]="";
s_a[1]="Alberta|British Columbia|Manitoba|New Brunswick|Newfoundland|Northwest Territories|Nova Scotia|Nunavut|Ontario|Prince Edward Island|Quebec|Saskatchewan|Yukon Territory";
s_a[2]="Alsace|Aquitaine|Auvergne|Basse-Normandie|Bourgogne|Bretagne|Centre|Champagne-Ardenne|Corse|Franche-Comte|Haute-Normandie|Ile-de-France|Languedoc-Roussillon|Limousin|Lorraine|Midi-Pyrenees|Nord-Pas-de-Calais|Pays de la Loire|Picardie|Poitou-Charentes|Provence-Alpes-Cote d'Azur|Rhone-Alpes";
s_a[3]="Aguascalientes|Baja California|Baja California Sur|Campeche|Chiapas|Chihuahua|Coahuila de Zaragoza|Colima|Distrito Federal|Durango|Guanajuato|Guerrero|Hidalgo|Jalisco|Mexico|Michoacan de Ocampo|Morelos|Nayarit|Nuevo Leon|Oaxaca|Puebla|Queretaro de Arteaga|Quintana Roo|San Luis Potosi|Sinaloa|Sonora|Tabasco|Tamaulipas|Tlaxcala|Veracruz-Llave|Yucatan|Zacatecas";
s_a[4]="Alabama|Alaska|Arizona|Arkansas|California|Colorado|Connecticut|Delaware|District of Columbia|Florida|Georgia|Hawaii|Idaho|Illinois|Indiana|Iowa|Kansas|Kentucky|Louisiana|Maine|Maryland|Massachusetts|Michigan|Minnesota|Mississippi|Missouri|Montana|Nebraska|Nevada|New Hampshire|New Jersey|New Mexico|New York|North Carolina|North Dakota|Ohio|Oklahoma|Oregon|Pennsylvania|Rhode Island|South Carolina|South Dakota|Tennessee|Texas|Utah|Vermont|Virginia|Washington|West Virginia|Wisconsin|Wyoming";

function print_country(country_id) {
  var option_str = document.getElementById(country_id);
  option_str.length = 0;
  option_str.options[0] = new Option('Please Select a Country');
  option_str.selectedIndex = 0;
  for (var i = 0; i<country_arr.length; i++) {
    option_str.options[option_str.length] = new Option(country_arr[i]);
  }
}

function print_state(state_id, state_index) {
  var option_str = document.getElementById(state_id);
  option_str.length = 0;
  option_str.options[0] = new Option('Please Select a State');
  option_str.selectedIndex = 0;
  var state_arr = s_a[state_index].split("|");
  for (var i = 0; i < state_arr.length; i++) {
    option_str.options[option_str.length] = new Option(state_arr[i]);
  }
}
// End Country and State drop-down menues.

// If Canada selected, make "Subscribe to Email Offers" unavailable.
$("#country").on("change", function() {
    if ($(this).val() === "canada") {
        $(".enable").attr("disabled", "disabled");
    } else {
        $(".enable").removeAttr("disabled");
    }
});
// End Canada selected script.
