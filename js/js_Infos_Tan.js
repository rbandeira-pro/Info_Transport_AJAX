/* ====================================
  File: css_Tags.css 
  This file defines the tags styles



 ==================================== */

/* ====================================
 Déclaration des variables 
 ==================================== */
  var objJson; // Pour accéder à l'objet Global
  var obj_Rec; // Pour accéder à l'objet records
  var n_Pagination = 0; // Description: Variable pour gérer la pagination (LISTE ARRETS)
  var n_Par_Page   = 10;  // nombre d'arrêts à afficher par page

/* ==================================== */

/* ====================================
 Déclaration des variables  URL
 ==================================== */
    let url_Base = 'https://data.nantesmetropole.fr/api/records/1.0/search/';

    tab_Url = new Array();
    // Ajouter: &rows=' + n_Par_Page + '&start=' + valeur;
    tab_Url[0] = url_Base + '?dataset=244400404_tan-arrets';  // &refine.stop_name=Ste-Luce

    tab_Url[1] = url_Base + '?dataset=244400404_info-trafic-tan-temps-reel&rows=30';
    tab_Url[1] = url_Base + '?dataset=244400404_info-trafic-tan-temps-reel&rows=60';
    // tab_Url[1] = url_Base + '?dataset=244400404_info-trafic-tan-temps-reel&q=C9%20OR%20c3';

    tab_Url[2] = url_Base + '?dataset=244400404_info-trafic-tan-temps-reel&rows=38';
    tab_Url[3] = url_Base + '?dataset=244400404_tan-circuits&facet=route_long_name&facet=route_type';
    tab_Url[3] = url_Base + '?dataset=244400404_tan-circuits';
    // tab_Url[3] += '&refine.route_long_name=Armor+-+Bd+de+Doulon';
    
    tab_Url[4] = `http://open.tan.fr/ewp/horairesarret.json` + `/LITT/C3/1`;
    tab_Url[4] = `Data/Horaires_Lligne_C3-1.json`;
    tab_Url[4] = `Data/Horaires_Lligne_C3-1_Bis.txt`;
    tab_Url[4] = `Data/Horaires_Lligne_C3-1.json`;
    tab_Url[4] = 'Data/Horaires_Lligne_C3-1.json';
    
    //https://data.nantesmetropole.fr/explore/embed/dataset/244400404_tan-circuits/table/?disjunctive.route_type


    tab_Tramme = new Array();
    tab_Tramme[0] = "info-trafic-tan-temps-reel";
    tab_Tramme[1] = "info-trafic-tan-Verbose";

/* ==================================== */


/**
* jQuery => Quand la page termine de se charger DOCUMENT.READY
* 
*/
jQuery(document).ready(function () {
  obj_TMP = getUrlInfo( tab_Url[0], "" );
  obj_TMP = objJson;
  console.log("================== obj_TMP ");
  console.log(obj_TMP);
  console.log("================== obj_TMP ");

});

// ============================================================================================ 
//   obj = getUrlInfo( urlInfo, tramme )
// ============================================================================================
  function showHoraires(urlInfo){
    // urlInfo = `https://nas-chique/WWW/_COURS_Etudes/Dawan_Projet_Tan/2019-11-14_Proj_Tan_07_03/Data/Horaires_Lligne_C3-1.json`;
    urlInfo = `Data/Horaires_Lligne_C3-1.json`;
    
    console.log(urlInfo);
      xhttp = new XMLHttpRequest(); 
      xhttp.open("POST", urlInfo, true);
      xhttp.send();
      xhttp.onreadystatechange = function() {
        // getAllResponseHeaders()
        if (this.readyState == 4 && this.status == 200) {
          objJson = JSON.parse(this.responseText);
          console.log(" Horaires ===================================");
          console.log(objJson);
          console.log(" Horaires ===============================(FIN)");
          var html = '<div id="list_Horaires">';
          html += '<div class="lien_Confirmation"><a href="'+ urlInfo + '" target="NEW_Tan">'+ urlInfo + '</a></div>' + "\n";
          html += '<div class="Horaires" >';
          html += '<div class="intitule"><h3>' + objJson.ligne.numLigne + " - " + objJson.arret.libelle;
          html += ' - | <span class="code">' + objJson.arret.codeArret + "</span> |</h3></div>";
          for(i=0;i<objJson.horaires.length;i++){
            html += '<div class="heure">';
            html += '<table class="heure"><tr><th>' + objJson.horaires[i].heure + '</th></tr>';
            for(j=0 ; j<objJson.horaires[i].passages.length;j++){
              html += '<tr><td>'+objJson.horaires[i].passages[j]+'</td></tr>';
            }
            html += '</table>';
            html += '</div>';
          }
            html += '<br class="clear" /><hr />';
          
          html += '</div>';

          document.getElementById("rec_Info").innerHTML = html;
          html = "";

        }else{
          // TODO voir si on a besoin de garder ce else et ce qui serait utile...
          console.log("Status (" + xhttp.status + ") -- ready state: (" + this.readyState + ")");
          // console.log("-- this.responseText: " + this.responseText)
        }
      };
  }
// ============================================================================================ 

// ============================================================================================ 
//   obj = getUrlInfo( urlInfo, tramme )
// ============================================================================================

function getUrlInfo( urlInfo, tramme ){
  xhttp = new XMLHttpRequest(); 
  xhttp.open("GET", urlInfo, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    // getAllResponseHeaders()
    if (this.readyState == 4 && this.status == 200) {
      objJson = JSON.parse(this.responseText);
      console.log(" objJson ===================================");
      console.log(objJson.records);
      console.log(" objJson ===============================(FIN)");
      // return objJson;
      obj_Rec = objJson.records;
      // Pour choisir comment afficher les données
      switch(tramme) {
        case "info-trafic-tan-Verbose":
          showInfoTraficVerbose(obj_Rec,urlInfo); // On envoi obj_Rec ou objJson
        break;
        case "info-trafic-tan-temps-reel":
          // console.log("ICI " + obj_Rec[0] + "<br>");
          showInfoTraficTempsReel(obj_Rec);
        break;

        default:
          // code block
      }


    }else{
      // TODO voir si on a besoin de garder ce else et ce qui serait utile...
      console.log("Status (" + xhttp.status + ") -- ready state: (" + this.readyState + ")");
      // console.log("-- this.responseText: " + this.responseText)
    }
  };

}
// ==============================================================================================











// De ces deux fonctions on ne gardera qu'une...
// VERBOSE affiche toutes les infos...
  function showInfoTraficVerbose(obj, url_Info) {
    console.log(obj);
    // obj_Rec = objJson.records;
    html = ""; 
    html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";
    for (n in obj_Rec) {
      html += '<div class="list_Arrets">';
      for(nom in obj_Rec[n]){
        if(nom == "fields"){
          for(fields in obj_Rec[n][nom]){
            html += '<div class="'+ fields +'">' + fields + " - " + obj_Rec[n][nom][fields] + "</div>";
            //html += "<div>" + nom + " - " + obj_Rec[n][nom] + "</div>";
          }
        }
      }
      html += "</div><br>" + "\n";
    }
    // console.log("TEXTE: (" + html +") ===");
    document.getElementById("rec_Info").innerHTML = html;
    html = ""; 
  }








//*****************************





function infoTraficTanTempsReel_A() {
  monUrl = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_info-trafic-tan-temps-reel&rows=30";
  // obj_Rec = 
  getUrlInfo(monUrl,2);
  // obj_Rec = objJson.records;
  html = "";
  console.log("======================== ");
  console.log(obj_Rec);
  console.log("======================== ");
  for (n in obj_Rec) {
    html += "<div>";
    for(nom in obj_Rec[n]){
      if(nom == "fields"){
        for(fields in obj_Rec[n][nom]){
          html += "<div>" + fields + " - " + obj_Rec[n][nom][fields] + "</div>";
          //html += "<div>" + nom + " - " + obj_Rec[n][nom] + "</div>";
        }
      }
    }
    html += "</div><hr />";
  } 
  // console.log("TEXTE: (" + html +") ===");
  document.getElementById("rec_Info").innerHTML = html;
  html = "";

}







/* =========================================================
var tabURL = new Array();
tabURL[0] = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_info-trafic-tan-temps-reel&rows=30";
tabURL[1] = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets';
iTab = 0; // Pour choisir l'URL 
Autres URLs à tester...

tabURL[1] = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets";
tabURL[2] = "http://open_preprod.tan.fr/ewp/arrets.json"; // ça marche même trame
tabURL[3] = "http://open_preprod.tan.fr/ewp/horairesarret.json/PIRA1/27/1"; // Protégé
tabURL[4] = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets-horaires-circuits";
tabURL[5] = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_info-trafic-tan-temps-reel"; // OK Incidents
tabURL[6] = "https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=horairesarret";





tab_URL = new Array();
// Les deux lignes fonctionnent mais ça ne correspond pas avec notre tramme d'extraction.
// tab_URL[i] = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_info-trafic-tan-temps-reel';
tab_URL[0] = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets';
tab_URL[1] = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_info-trafic-tan-temps-reel&rows=38';
// https://data.nantesmetropole.fr/api/v2/console#!/dataset/getDataset
// Autres exemples de liens propsés par le site mais qui ne marchent pas car problème de droits...
tab_URL[2] = "arrets.json"; // Avoir une base en local
tab_URL[3] = "http://open_preprod.tan.fr/ewp/tempsattente.json/COMM";
tab_URL[4] = "http://open_preprod.tan.fr/ewp/horairesarret.json/PIRA1/27/1";
tab_URL[5] = "http://open_preprod.tan.fr/ewp/arrets.json";
tab_URL[6] = "http://open.tan.fr/ewp/tempsattente.json/CRQU";
tab_URL[7] = "http://open_preprod.tan.fr/ewp/tempsattente.json/COMM";
tab_URL[8] = "https://data.nantesmetropole.fr/api/v2/catalog/datasets/244400404_tan-arrets?pretty=false&timezone=UTC&include_app_metas=false";
*/
  // Ici je ne fait que lister les URLs du tableau (array)
  // tab_URL.forEach( showItems ); // Juste pour tester une façon de faire... (FIN)

/* ====================================================================================================  */




function infoTraficTanTempsReel(url_Info) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    // getAllResponseHeaders()
    //console.log(this.getResponseHeader() );
    if (this.readyState == 4 && this.status == 200) {
      objJson = JSON.parse(this.responseText);
      var html="";
      html="<p>Attention: Ici on affiche en vrac. Il y a une deuxième boucle pour afficher les éléments. Voir plus loin...</p>";
      html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";

      obj_Rec = objJson.records;
      for (n in obj_Rec) {
        html += "<div>";
        for(nom in obj_Rec[n]){
          if(nom == "fields"){
            for(fields in obj_Rec[n][nom]){
              html += '<div class="'+fields+'"><label>' + fields + ": </label>";
              html += '<input type="text" name="' + fields + '" value="' + obj_Rec[n][nom][fields] + '" />';
              html += '</div>';
            }
          }
        }
        html += "</div><br>";
      } 
    document.getElementById("rec_Info").innerHTML = html;
    html="";

    // Une répétition du code.
      console.log("OBJ JSON ===============================");
      console.log("OBJ JSON" + objJson.records[0].fields.date_debut);
      console.log("OBJ JSON LEN (" + objJson.records.length +")");
      console.log("OBJ JSON ===============================");
      html="";
      html="<hr />\n<h3>Autre option d'affichage:</h3>";
      html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";
     for( i=0 ; i < objJson.records.length ; i++){
      obj_Tmp = objJson.records[i].fields;
        html += '<div class="info-trafic-tan-temps-reel" >';
        html += '<div class="intitule"><h3>' + obj_Tmp.route_long_name;
        html += ' [<span class="code">Route_id: ' + obj_Tmp.route_id + ' ' + obj_Tmp.route_type + "</span>]</h3></div>";
        
        html += '<div class="intitule">';
        html += '<div style="width:40px;height:40px; background:#' + obj_Tmp.route_color + ';float:left;"></div>' + obj_Tmp.route_short_name + ' </div>';
        html += '<div class="resume"> ' + obj_Tmp.route_type + "</div>";
        html += '<div class="resume">' + obj_Tmp.geo_point_2d + "</div>";
        for( coord of obj_Tmp.shape.coordinates[0]){
          html += '<div class="resume">' + coord + "</div>";
          // METTRE UNE FONCTION ICI pour LES ARRËTS

        }
        // html += '<div class="resume">' + obj_Tmp.shape.coordinates[0] + "</div>";
        html += '<div class="resume">' + obj_Tmp.shape.coordinates[1] + "</div>";
        html += '<div class="resume">' + obj_Tmp.shape.coordinates[2] + "</div>";

        html += '<div class="troncons">Tronçons: ' + obj_Tmp.troncons + "</div>";
        // html += obj_Tmp.langue;
        // html += obj_Tmp.perturbation_terminee;
        // html += obj_Tmp.resume;
        
        html += '</div>';
        // console.log("Message : " + html + " ------- ");
      }
      document.getElementById("rec_Info").innerHTML += html;


    }else{
      console.log("Status (" + xhttp.status + ")");
      console.log("--" + this.readyState + "--");
      console.log(this.responseText);
    }
  };
  xhttp.open("GET", url_Info, true);
  xhttp.send();
}

// ========================================================================================================== 
//  FONCTIONS TRIEES  
// ==========================================================================================================  


/**
 * showInfoTraficTempsReel()
 * Récupère les informations sur le trafic
 * Ici on utilise AJAX par Javascript
 * 
 * Reçoit une URL comme argument. Cette URL doit retourner la même structure
 * @param : Url permet d'envoyer une Url spécifique.
 */
function showInfoTraficTempsReel(url_Info) {
  xhttp = new XMLHttpRequest(); 
  xhttp.open("GET", url_Info, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    // getAllResponseHeaders()
    if (this.readyState == 4 && this.status == 200) {
      objJson = JSON.parse(this.responseText);
      console.log("===================================");
      console.log(objJson);
      console.log("===================================");
      // return objJson;
      obj_Rec = objJson.records;
      html = "";
      html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";
      html += '<div class="list_Arrets">';
      for (i = 0 ; i < obj_Rec.length; i++) {
        html += '<div class="Arret">';
          // html = '<div class="info-trafic-tan-temps-reel" >';
          html += '<div class="intitule"><h3>' + obj_Rec[i].fields.intitule + ' <span class="code">(' + obj_Rec[i].fields.code + ")</span></h3></div>";
          if (obj_Rec[i].fields.texte_vocal!= undefined){ 
            html += '<div class="texte_vocal">' + obj_Rec[i].fields.texte_vocal + "</div>";
          }
          html += '<div class="dates">';
          html += '  <div class="date_debut">Début: ' + obj_Rec[i].fields.date_debut + " - " + obj_Rec[i].fields.heure_debut + '</div>';
          html += '  <div class="date_fin">' + obj_Rec[i].fields.date_fin + " - " + obj_Rec[i].fields.heure_fin + '</div>';
          html += '</div><br class="clear" />';
          html += '<div class="resume">' + obj_Rec[i].fields.resume +'</div>';
          /*
          // html += obj_Rec[i].fields.langue;
          // html += obj_Rec[i].fields.perturbation_terminee;
          html += '<div class="resume">' + obj_Rec[i].fields.resume + "</div>";
          html += '<div class="troncons">' + obj_Rec[i].fields.troncons + "</div>";
          */
        html += '</div>';
      }
      html += '</div>';
      document.getElementById("rec_Info").innerHTML = html;
      html = "";
      
    }else{
      // TODO voir si on a besoin de garder ce else et ce qui serait utile...
      console.log("Status (" + xhttp.status + ") -- ready state: (" + this.readyState + ")");
      // console.log("-- this.responseText: " + this.responseText)
    }
  };
}


/**
 * pagination
 * Description: Gère la pagintaion de (LISTE ARRETS)
 * @param  {[type]} direction [description]
 * @return {[type]}           [description]
 */
function pagination(direction){
  url_de_Pagination = url_Base + '?dataset=244400404_tan-arrets';
  url_de_Pagination += '&rows=' + n_Par_Page;
  url_de_Pagination += '&start=' + n_Pagination;
  n_Pagination += n_Par_Page;
  if(n_Pagination<0){ n_Pagination=0; }
  if(n_Pagination>3680){ n_Pagination=0; }
  showInfoListeArrets(url_de_Pagination);
}
/**
 * showInfoListeArrets()
 * Récupère les informations sur les arrêts 
 * Ici on utilise AJAX par jQuery
 * 
 * Reçoit une URL comme argument. Cette URL doit retourner la même structure
 * @param : url_Info permet d'envoyer une Url spécifique.
 */
function showInfoListeArrets(url_Info){
  // =====================================================
  // Récupération des code 
    $.ajax( { 
      //Exemple 
      // url: 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets',
      url: url_Info,
      success: function (result) {
        var html = "";
        // On affiche l'url utilisée. (Bon pour le développement et démos)
        html += '<div class="bt';
        obj_Checkbox = jQuery("#ck_box");

        actif = obj_Checkbox[0].checked;
        if(actif){
           html += ' bgVert"> ON </div> ';;

        }else{
          html += ' bgRouge"> OFF </div> ';;
        }
        html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";
        
        // On affiche la pagination
        /*
        html += '<div id="pagination">';
        html += ' <select onchange="n_Par_Page = this.value; ">';
        html += '   <option value="10">10</option>';
        html += '   <option value="20">20</option>';
        html += '   <option value="50">50</option>';
        html += '   <option value="100">100</option>';
        html += ' </select>';
         */
        html += `<div id="pagination">
                  <select onchange="n_Par_Page = this.value; ">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>`;
        html += ' <div class="bt_Prev"><a href="javascript:void(0);" onclick="pagination(-1);">&lt;&lt;= Précédent</a></div>';
          url_Tmp = url_Base + '?dataset=244400404_tan-arrets?rows=3660';
        html += ' <div class="bt_Next"><a href="javascript:void();" onclick="showInfoListeArrets('+"'"+url_Tmp+"'"+');">Tout ?</a></div>';
        html += ' <div class="bt_Next"><a href="javascript:void(0);" onclick="pagination(1);">Suivant =&gt;&gt;</a></div>';
        html += '</div>';
        
        html += '<div class="list_Arrets">';
        n_Page_Temp = 0; // pour afficher un numéro de référence...
        for (i = 0; i < result.records.length; i++){
          n_Page_Temp = parseInt(n_Pagination) + i; // pour afficher un numéro de référence...
          html += '<div class="Arret">';
          rec = result.records[i].fields; // on simplifie le nom de la variable en allant plus haut dans la structure
          html += '<h3>' + n_Page_Temp + " - " + rec.stop_name + '<span class="code"> (ID: ' + rec.stop_id + ' - Location type: ' + rec.location_type + ')</h3>';
          html += '<div class="coordonnees"><a href="#">Ouvrir lieu: ' + rec.stop_coordinates[0] + ' - ' + rec.stop_coordinates[1] + '</a></div>';

          html += '<br class="clear" /></div><!-- .Arret (FIN) -->';
        }
        html += '</div><!-- .list_Arrets (FIN) -->';
        $("#rec_Info").html(html);
        html="";
      },
      error: function (error) {
        console.log("Une erreur: " + error);
      }
    });
  // =====================================================

}







/* =======================================================================
AFFICHER LES ARRETS pour créer un contrôle de type SELECT
=========================================================================*/
/**
 * showSelectArrets()
 * Récupère les informations sur le trafic
 * Ici on utilise AJAX par Javascript
 * 
 * Reçoit une URL comme argument. Cette URL doit retourner la même structure
 * @param : Url permet d'envoyer une Url spécifique.
 * showSelectArrets('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&rows=100');
 */
function showSelectArrets(url_Info) {
  xhttp = new XMLHttpRequest(); 
  console.log("showSelectArrets ===================================");
  // url_Info = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&rows=100';
  
  xhttp.open("GET", url_Info, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    // getAllResponseHeaders()
    console.log("Change ===================================");
    console.log(this.readyState + " " + this.status);
    
    if (this.readyState == 4 && this.status == 200) {
      objJson = JSON.parse(this.responseText);
      console.log("ObjJson showSelectArrets ===================================");
      console.log(objJson);
      console.log("===================================");
      // return objJson;
      obj_Rec = objJson.records;
      html = "";
      html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";
      html += '<div class="list_Arrets">';
      html += '<div class="Arret">';
      html += '<select>';
      for (i = 0 ; i < obj_Rec.length; i++) {
        html += '<option value="'+obj_Rec[i].fields.stop_id+'">';
        html += obj_Rec[i].fields.stop_name + "</option>";
        /*
        obj_Rec[i].fields.intitule
        obj_Rec[i].fields.code
          if (obj_Rec[i].fields.texte_vocal!= undefined){ 
            html += '<div class="texte_vocal">' + obj_Rec[i].fields.texte_vocal + "</div>";
          }
        obj_Rec[i].fields.date_debut
        obj_Rec[i].fields.heure_debut
        obj_Rec[i].fields.date_fin
        obj_Rec[i].fields.heure_fin
        obj_Rec[i].fields.resume
        obj_Rec[i].fields.langue;
        obj_Rec[i].fields.perturbation_terminee;
        obj_Rec[i].fields.resume
        obj_Rec[i].fields.troncons
        */
        
      }
      html += '</select>';
      document.getElementById("rec_Info").innerHTML = html;
      html = "";
      
    }else{
      // TODO voir si on a besoin de garder ce else et ce qui serait utile...
      console.log("Status (" + xhttp.status + ") -- ready state: (" + this.readyState + ")");
      // console.log("-- this.responseText: " + this.responseText)
    }
  };
}





/* =======================================================================
AFFICHER LES ARRETS 
de la ligne C3
=========================================================================*/
/**
 * showSelectArrets()
 * Récupère les informations sur le trafic
 * Ici on utilise AJAX par Javascript
 * 
 * Reçoit une URL comme argument. Cette URL doit retourner la même structure
 * @param : Url permet d'envoyer une Url spécifique.
 * showSelectArrets('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&rows=100');
 */
function showLigneC3(url_Info) {
  url_Info = 'Data/Ligne_C3_Stops.json';
  console.log(url_Info);
  
  xhttp = new XMLHttpRequest(); 
  console.log("showSelectArrets ===================================");
  // url_Info = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&rows=100';
  
  xhttp.open("GET", url_Info, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    // getAllResponseHeaders()
    console.log("Change ===================================");
    console.log(this.readyState + " " + this.status);
    
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      
      objJson = JSON.parse(this.responseText);
      console.log("ObjJson showSelectArrets ===================================");
      console.log(objJson);
      console.log("===================================");
      // return objJson;
      obj_Rec = objJson.records;
      html = "";
      html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";
      html += '<div class="list_Arrets">';
      html += '<div class="Arret">';
      html += '<select>';
      for (i = 0 ; i < obj_Rec.length; i++) {
        html += '<option value="'+obj_Rec[i].fields.stop_id+'">';
        html += obj_Rec[i].fields.stop_name + "</option>";
        /*
        obj_Rec[i].fields.intitule
        obj_Rec[i].fields.code
          if (obj_Rec[i].fields.texte_vocal!= undefined){ 
            html += '<div class="texte_vocal">' + obj_Rec[i].fields.texte_vocal + "</div>";
          }
        obj_Rec[i].fields.date_debut
        obj_Rec[i].fields.heure_debut
        obj_Rec[i].fields.date_fin
        obj_Rec[i].fields.heure_fin
        obj_Rec[i].fields.resume
        obj_Rec[i].fields.langue;
        obj_Rec[i].fields.perturbation_terminee;
        obj_Rec[i].fields.resume
        obj_Rec[i].fields.troncons
        */
        
      }
      html += '</select>';
      document.getElementById("rec_Info").innerHTML = html;
      html = "";
      
    }else{
      // TODO voir si on a besoin de garder ce else et ce qui serait utile...
      console.log("Status (" + xhttp.status + ") -- ready state: (" + this.readyState + ")");
      // console.log("-- this.responseText: " + this.responseText)
    }
  };
}
/* =======================================================================
AFFICHER LES ARRETS 
de la ligne C3
=========================================================================*/
/**
 * showSelectArrets()
 * Récupère les informations sur le trafic
 * Ici on utilise AJAX par Javascript
 * 
 * Reçoit une URL comme argument. Cette URL doit retourner la même structure
 * @param : Url permet d'envoyer une Url spécifique.
 * showSelectArrets('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&rows=100');
 */
function showArret(url_Info,complement) {
  url_Info += complement;
  console.log(url_Info);
  
  xhttp = new XMLHttpRequest(); 
  console.log("showSelectArrets ===================================");
  // url_Info = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&rows=100';
  
  xhttp.open("GET", url_Info, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    // getAllResponseHeaders()
    console.log("Change ===================================");
    console.log(this.readyState + " " + this.status);
    
    if (this.readyState == 4 && this.status == 200) {
      objJson = JSON.parse(this.responseText);
      console.log("ObjJson showSelectArrets ===================================");
      console.log(objJson);
      console.log("===================================");
      // return objJson;
      obj_Rec = objJson.records;
      html = "";
      html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";
      html += '<div class="list_Arrets">';
      for (i = 0 ; i < obj_Rec.length; i++) {
        html += '<div class="Arret">';
        html += '<p>' + obj_Rec[i].fields.stop_id + ' - ' + obj_Rec[i].fields.stop_name + " - ";
        html += `<a href="javascript:void(0);" 
        onclick="showArret(tab_Url[0],'&refine.stop_id=${obj_Rec[i].fields.stop_id}');">${obj_Rec[i].fields.stop_name}</a></p>`;
       // onclick="showArret(tab_Url[0],'&refine.stop_name=${obj_Rec[i].fields.stop_name}');">${obj_Rec[i].fields.stop_name}</a></p>`;
        /*
        obj_Rec[i].fields.intitule
        obj_Rec[i].fields.code
          if (obj_Rec[i].fields.texte_vocal!= undefined){ 
            html += '<div class="texte_vocal">' + obj_Rec[i].fields.texte_vocal + "</div>";
          }
        obj_Rec[i].fields.date_debut
        obj_Rec[i].fields.heure_debut
        obj_Rec[i].fields.date_fin
        obj_Rec[i].fields.heure_fin
        obj_Rec[i].fields.resume
        obj_Rec[i].fields.langue;
        obj_Rec[i].fields.perturbation_terminee;
        obj_Rec[i].fields.resume
        obj_Rec[i].fields.troncons
        */
        
       html += '</div>';
      }
      document.getElementById("rec_Info").innerHTML = html;
      html = "";
      
    }else{
      // TODO voir si on a besoin de garder ce else et ce qui serait utile...
      console.log("Status (" + xhttp.status + ") -- ready state: (" + this.readyState + ")");
      // console.log("-- this.responseText: " + this.responseText)
    }
  };
}

/* =======================================================================
AFFICHER LES Circuits 
 générique
=========================================================================*/
/**
 * showCircuits()
 * Récupère les informations sur le trafic
 * Ici on utilise AJAX par Javascript
 * 
 * Reçoit une URL comme argument. Cette URL doit retourner la même structure
 * @param : Url permet d'envoyer une Url spécifique.
 * showSelectArrets('https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&rows=100');
 */
function showCircuits(url_Info) {
  xhttp = new XMLHttpRequest(); 
  console.log("showSelectArrets ===================================");
  // url_Info = 'https://data.nantesmetropole.fr/api/records/1.0/search/?dataset=244400404_tan-arrets&rows=100';
  
  xhttp.open("GET", url_Info, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    // getAllResponseHeaders()
    console.log("Change ===================================");
    console.log(this.readyState + " " + this.status);
    
    if (this.readyState == 4 && this.status == 200) {
      objJson = JSON.parse(this.responseText);
      console.log("ObjJson showCircuits(url_info) ===================================");
      console.log(objJson);
      console.log("===================================");
      // return objJson;
      obj_Rec = objJson.records;
      
      html = "";
      html += '<div class="lien_Confirmation"><a href="'+ url_Info + '" target="NEW_Tan">'+ url_Info + '</a></div>' + "\n";
      html += '<div class="list_Circuits">';
      for (i = 0 ; i < obj_Rec.length; i++) {
        html += `<div class="Arret">';
            "route_long_name" : "${obj_Rec[i].fields.route_long_name}",  
            "route_id": "${obj_Rec[i].fields.route_id}",
            "route_color": "${obj_Rec[i].fields.route_color}",
            `;
        /*
          "fields": {
                "route_long_name": "Vertou - Pirmil",
                "route_id": "28-0",
                "route_type": "Bus",
                "geo_point_2d": [
                    47.1877337403,
                    -1.50545813807
                ],
                "route_color": "b5ddf3",
                "shape": {
                    "type": "MultiLineString",
                    "coordinates": ["..."]
                }
        */
         html += `</div>`;
      }
      document.getElementById("rec_Info").innerHTML = html;
      html = "";
      
    }else{
      // TODO voir si on a besoin de garder ce else et ce qui serait utile...
      console.log("Status (" + xhttp.status + ") -- ready state: (" + this.readyState + ")");
      // console.log("-- this.responseText: " + this.responseText)
    }
  };
}









