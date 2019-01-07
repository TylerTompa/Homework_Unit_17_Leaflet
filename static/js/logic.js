// This is the GEOJSON we will be querying.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// We perform a GET request to the GEOJSON;
// once we get a response, we send the data.features object to the create_features function.
d3.json(queryUrl, function(data) {
    create_features(data.features);
})

function create_features(earthquake_data) {
    // This function will run once for every feature in the features array.
    // Each "feature" will be given a popup which describes the location and time of the earthquake.
    function onEachFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
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
  
  L.control.layers(base_maps, overlay_maps, {
      collapsed: false
  }).addTo(the_map);
}