////////////////////////////////////////////////////////////////////////////////////////////////////
// In this section we simply create the starting map.
////////////////////////////////////////////////////////////////////////////////////////////////////


// This creates the map object;
// We also set the starting latitude, longitude, and zoom level.
// This will be inserted into the div with the id "map."
// var myMap = L.map("map" , {
//     center: [35, -80],
//     zoom: 13
// });

// // This adds a "tile layer," or the actual background image of the map.
// // We use the addTo method to add objects to our map.
// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     // id: "mapbox.streets-satellite",
//     id: "mapbox.streets",
//     accessToken: API_KEY
// }
// ).addTo(myMap);

////////////////////////////////////////////////////////////////////////////////////////////////////
// In this section we query the USGS GEOJSON,
// and use the results to place markers on our map.
////////////////////////////////////////////////////////////////////////////////////////////////////

// This is the GEOJSON we will be querying.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

// We perform a GET request to the GEOJSON;
// once we get a response, we send the data.features object to the create_features function.
d3.json(queryUrl, function(data) {
    createFeatures(data.features);
})

function createFeatures(earthquake_data) {
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

    createMap(earthquakes);
}

function createMap(earthquakes) {

  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution:  "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", { 
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
  });
  
//   Here we define a base_maps object to hold our base layers.
  var baseMaps = {
      "Street Map": streetmap,
      "Dark Map": darkmap
  };
  
  // This creates an overlay object to hold our overlay layer.
  var overlayMaps = {
      Earthquakes: earthquakes
  };

  var myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [streetmap, earthquakes]
  });
  
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
  }).addTo(myMap);
}