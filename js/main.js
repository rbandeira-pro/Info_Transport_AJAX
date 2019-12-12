import { Arret } from "./arret.js";

/* ====================================
 Déclaration des variables  URL
==================================== */
let url_Base = 'https://data.nantesmetropole.fr/api/records/1.0/search/';
let tanArrets = "?dataset=244400404_tan-arrets";
let tanCircuits = "?dataset=244400404_tan-circuits";

// url_Base + '?dataset=244400404_tan-arrets'
/* ==================================== */


window.addEventListener('load', function () {


    console.warn('Ceci est un Warning!');

    let lstArrets = new Array();
    var i = 0;
    console.log(lstArretsC3.records.fields);
    let arret = lstArretsC3.records.fields;
    for (i = 0; i < arret.length; i++) {
        console.log("arret.stop_name");
        console.log(arret);
        console.log(arret[i].stop_name);

        //constructor(stop_name, location_type, stop_id, stop_coordinates)
        // ================================================================================
        // METTRE ICI un appel AJAX pour récupérer les informations du fichier JSON TAN

        //getArretInfo(urlBase,tanArrets,tanArretsRefine+arret[i].stop_name);
        // ================================================================================
        var coord = [47, -1];
        lstArrets[i] = new Arret(arret[i].stop_name, "1", "arret[i].stop_id", coord);
        console.log(lstArrets[i].stop_name);
    }
    let objResult = document.getElementById("result");
    console.log(objResult);
    let html = `<pre>{
        "records": {
            "fields": [
                {
                "stop_coordinates": [
                    47.25034785,
                    -1.4851167
                ],
                "stop_name": "Bd De Doulon",
                "location_type": "1",
                "stop_id": ""
                },
                {
                "stop_coordinates": [
                    47.25034785,
                    -1.4851167
                ],
                "stop_name": "Bd De Doulon",
                "location_type": "1",
                "stop_id": ""
                }
            ]
        }</pre>`;
    /*
    {
        "records": {
            "fields": [{
                "stop_coordinates": [
                    47.25034785,
                    -1.4851167
                ],
                "stop_name": "Bd De Doulon",
                "location_type": "1",
                "stop_id": ""
            }
    */
    for (i = 0; i < lstArrets.length; i++) {
        console.log(lstArrets[i].stop_name);

        html += `{ 
            "stop_name" : "${lstArrets[i].stop_name}"`;
        if (i < lstArrets.length - 1) {
            html += "},<br/>";
        } else {
            html += "}<br/>";
        }
    }
    html += `}</pre>`;
    objResult.innerHTML = html

    console.log(lstArrets);


});
