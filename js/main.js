

window.addEventListener('load', function () {
    
    
    



    class Arret {

        constructor(modele, immatriculation, Km, vendue) {
            this.modele = modele;
            this.immatriculation = immatriculation;
            this.Km = Km;
            this.vendue = vendue;
        }
        Facturer() {
            console.log("Acheter");
        }
        Acheter() {
            console.log("Acheter");
        }
    }

    console.warn('Ceci est un Warning!');

    lstVoitures = new Array();
    voit01 = new Voiture("Lotus", "BBx-404-Serv", 100, false);
    voit02 = new Voiture("Ferrari", "OK-200-Serv", 100, false);
    voit03 = new Voiture("Ferraille", "Err-500-Serv", 100, false);
    voit04 = new Voiture("La casse", "Err-550-Serv", 200000, false);
    let i = 0;
    lstVoitures[i] = voit01;
    lstVoitures[i++] = voit02;
    lstVoitures[i++] = voit03;
    lstVoitures[i++] = voit04;

    objResult = document.getElementById("result");
    console.log(objResult);
    html = `<pre>{
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
    for (i = 0; i < lstVoitures.length; i++) {
        html += `{ 
            "modele" : "${lstVoitures[i].modele}",
            "immatriculation" : "${lstVoitures[i].immatriculation}",
            "Km" : "${lstVoitures[i].Km}",
            "vendue" : "${lstVoitures[i].vendue}"
            `;
        if(i < lstVoitures.length-1 ){
            html += "},<br/>";
        }else{
            html += "}<br/>";
        }
    }
    html+=`}</pre>`;
    objResult.innerHTML = html

    console.log(lstVoitures);


});
