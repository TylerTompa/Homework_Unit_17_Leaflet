// This is the GEOJSON we will be querying.
// var query_URL_4_5 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// var query_URL_2_5 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson"

// var query_URL_1_0 = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson"

const query_URL_past_hour = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
const query_URL_past_day = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
const query_URL_past_7_days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const query_URL_past_30_days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// We perform a GET request to the GEOJSON;
// once we get a response, we send the data.features object to the create_features function.
d3.json(query_URL_past_7_days, function(data) {
    create_features(data.features);

})

function create_features(earthquake_data) {
    // This function will run once for every feature in the features array.
    // Each "feature" will be given a popup which describes the location and time of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place + "</h3>" +
        "<p><strong>Magnitude: </strong>" + feature.properties.mag + "</p>" +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // This creates a GEOJSON layer containing the features array on the earthquake_data object.
    // We will run the onEachFeature function once for every item in the array.
    var earthquakes = L.geoJSON(earthquake_data, {
        onEachFeature: onEachFeature
    });

    create_map(earthquakes);
}

function create_map(earthquakes) {

  var street_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution:  "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
  });

  var satellite_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:  "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: API_KEY
});

  var dark_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", { 
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
  });
  
//   Here we define a base_maps object to hold our base layers.
  var base_maps = {
      "Street Map": street_map,
      "Satellite Map": satellite_map,
      "Dark Map": dark_map
  };
  
  // This creates an overlay object to hold our overlay layer.
  var overlay_maps = {
      Earthquakes: earthquakes
  };

  var the_map = L.map("map", {
      center: [46.20491, 19.54740],
      zoom: 3,
      layers: [street_map, earthquakes]
  });

    // var the_map = L.map("map", {
    //     center: [46.20491, 19.54740],
    //     zoom: 3,
    //     layers: [
    //         layers.M1,
    //         layers.M2,
    //         layers.M3,
    //         layers.M4,
    //         layers.M5_PLUS
    //     ]
    // });

  L.control.layers(base_maps, overlay_maps, {
      collapsed: true
  }).addTo(the_map);
}



////////////////////////////////////////////////////////////////////////////////////////////////////
// This section adds the more advanced features.
// I might write a more specific comment later.
////////////////////////////////////////////////////////////////////////////////////////////////////

// var layers = {
//     M1: new L.LayerGroup(),
//     M2: new L.LayerGroup(),
//     M3: new L.LayerGroup(),
//     M4: new L.LayerGroup(),
//     M5_PLUS: new L.LayerGroup()
// };

// // var the_map = L.map("map", {
// //     center: [46.20491, 19.54740],
// //     zoom: 3,
// //     layers: [
// //         layers.M1,
// //         layers.M2,
// //         layers.M3,
// //         layers.M4,
// //         layers.M5_PLUS
// //     ]
// // });

// // L.control.layers(null, overlays).addTo(map);

// var info = L.control({
//     position: "bottomright"
// });