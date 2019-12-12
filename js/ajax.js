
/* ====================================
 Déclaration des variables  URL
==================================== */
let url_Base = 'https://data.nantesmetropole.fr/api/records/1.0/search/';
let tanArrets = "?dataset=244400404_tan-arrets";
let tanArretsRefine = "&refine.stop_name="; //Sully+Prudhomme"
let tanCircuits = "?dataset=244400404_tan-circuits";

// url_Base + '?dataset=244400404_tan-arrets'
/* ==================================== */


let URL = url_Base + tanArrets + tanArretsRefine + "Sully+Prudhomme";
/*
"&refine.route_long_name"
&facet=route_type&refine.route_type=Bus&refine.route_long_name=Armor+-+Bd+de+Doulon";
*/
window.addEventListener('load', function () {
  fetch(URL)
    /*
    Capture de la réponse de la méthode fetch 
    par une promesse
    */
    .then(function (fichierSousFormeDePromesse) {
      /* retourne ici un objet "promise" la réponse */
      return fichierSousFormeDePromesse.json();
    })
    .then(function (monFichierJsonConverti) {
      //
      console.log(monFichierJsonConverti);
      afficherJson(monFichierJsonConverti);

    });

  function afficherJson(fichJson) {
    console.log(fichJson);
    let displayDiv = document.querySelector("#display");
    console.log("--- le json");
    console.log(fichJson);
    console.log("--- le json.records");
    console.log(fichJson.records);
    console.log("--- le json.records de 0");
    console.log(fichJson.records[0]);
    console.log("--- le json.records de 0 .fields");
    console.log(fichJson.records[0].fields);
    tmp = fichJson.records;
    html = "";
    for (const rec of tmp) {
      console.log(rec);
      console.log("REC ================= ");
      console.log(rec.fields);
      html += "<div>" + rec.fields.stop_id;
      html += " - " + rec.fields.stop_name + "</div>";
      html += "<div>" + rec.fields.stop_coordinates[0] + "</div>";
      html += "<div>" + rec.fields.stop_coordinates[1] + "</div>";
    }
    displayDiv.innerHTML += html;
  }


});