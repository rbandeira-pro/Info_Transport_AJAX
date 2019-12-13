import { Arret } from "./arret.js";
/* ====================================
 Déclaration des variables  URL
==================================== */
let urlBase = 'https://data.nantesmetropole.fr/api/records/1.0/search/';
let tanArrets = "?dataset=244400404_tan-arrets";
let tanArretsRefine = "&refine.stop_name="; //Sully+Prudhomme"
let tanCircuits = "?dataset=244400404_tan-circuits";

// url_Base + '?dataset=244400404_tan-arrets'
/* ==================================== */


/*
"&refine.route_long_name"
&facet=route_type&refine.route_type=Bus&refine.route_long_name=Armor+-+Bd+de+Doulon";
*/





window.addEventListener('load', function () {
  // let URL = url_Base + tanArrets + tanArretsRefine + "Sully+Prudhomme";
  let lstArrets = new Array();
  var i = 0;
  console.log("AJAX lstArretsC3.records.fields ======================== ");
  console.log(lstArretsC3.records.fields);
  let arret = lstArretsC3.records.fields;
  console.log(arret.length);
  
  for (i = 0; i < arret.length; i++) {
      console.log("AJAX ======================== ");
      console.log(arret);
      console.log(arret[i].stop_name);
      console.log("AJAX ======================== ");
  
      //constructor(stop_name, location_type, stop_id, stop_coordinates)
      // ================================================================================
      // METTRE ICI un appel AJAX pour récupérer les informations du fichier JSON TAN
  
      getArretInfo(urlBase,tanArrets,tanArretsRefine+arret[i].stop_name);
      // ================================================================================
      var coord = [47, -1];
      lstArrets[i] = new Arret(arret[i].stop_name, "1", "arret[i].stop_id", coord);
      console.log(lstArrets[i].stop_name);
  }
  

  function getArretInfo(urlBase,tanArrets,tanArretsRefine ){
    let URL = urlBase + tanArrets + tanArretsRefine;
    fetch(URL)
      /* Capture de la réponse de la méthode fetch par une promesse */
      .then(function (fichierSousFormeDePromesse) {
        return fichierSousFormeDePromesse.json();  // retourne ici un objet "promise" la réponse
      })
      .then(function (monFichierJsonConverti) {
        console.log("monFichierJsonConverti ");
        console.log(monFichierJsonConverti);
        afficherJson(monFichierJsonConverti);  //
      });
  }

  function afficherJson(fichJson) {
    console.group("Le Json dans afficherJson() ===================================")
    console.log(fichJson);
    let displayDiv = document.querySelector("#display");
    console.log("--- le json");
    console.log(fichJson);
    console.log("--- le json.records");
    console.log(fichJson.records);
    console.log("--- le json.records de 0");
    console.log(fichJson.records[0]);
    console.log("--- le json.records de 0 .fields");
    console.groupEnd("Le Json dans afficherJson() ===================================")
    
    // =============================================================
    // Création / Association pour l'objet JSon 
    // et Affichage dans la DIV
    // =============================================================
        
        console.group("REC boucle fichJson.records ================= ")
        // Créer un array ici qui sera utilisé plus loin
        let tabRecs = new Array();
        var i=0;
        for (const rec of fichJson.records) {
          console.log(rec);
          console.log(rec);
          console.log(rec.fields);
          tabRecs[i] = `{
              "stop_coordinates": [
                ${rec.fields.stop_coordinates[0]},
                ${rec.fields.stop_coordinates[1]}
              ],
              "stop_name": "${rec.fields.stop_name}",
              "stop_id": "${rec.fields.stop_id}",
              "location_type": "1"        
          }`;
          i++;
          
        }
        let html = ``;
        html = `{
          "records": {
            "fields": [`;
        // faire une boucle avec le tableau de RECs
        // pour ajouter la virgule et assembler le Json
        for(i=0; i<tabRecs.length;i++){
          if( i < (tabRecs.length-1) ){
            tabRecs[i] = tabRecs[i] + ","
          }
          html+=tabRecs[i];
        }
        html+=`
      ]
    }`;

   console.groupEnd("=================================================")
   // =============================================================
    displayDiv.innerHTML += "<pre>" + html + "</pre>";
  }


});