/*
{
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
        }]
     }
}
*/
export class Arret {

    constructor(stop_name, location_type, stop_id, stop_coords) {
        this.stop_name = stop_name;
        this.location_type = location_type;
        this.stop_id = stop_id;
        this.stop_coordinates = new Array();
        console.log(stop_coords);
        this.stop_coordinates[0] = stop_coords[0];
        this.stop_coordinates[1] = stop_coords[1];
    }
    voirCurcuit() {
        console.log("Voit circuit");
    }

}