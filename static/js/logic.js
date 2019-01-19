// URLs for earthquake GeoJSONs
// depending on time period
const earthquakes_past_30_days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";
const earthquakes_past_7_days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const earthquakes_past_day = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
const earthquakes_past_hour = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";

d3.json(earthquakes_past_7_days, function(data) {
    // When we get a response,
    // send the data.features object to the create_features function
    create_features(data.features);

});



function create_features(earthquake_data) {
    // Define a function to run once for each feature in the array
    // Give each feature a popup describing the location, and magnitude of the earthquake
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p>`);
    }

    // Define a function to apply a color to each marker
    // Depending on the magnitude of the earthquake
    function makeColor(mag) {
        switch(true) {
            case mag > 5:
              return "#f06b6b";
            case mag > 4:
              return "#f0a76b";
            case mag > 3:
              return "#f3ba4d";
            case mag > 2:
              return "#f3db4d";
            case mag > 1:
              return "#e1f34d";
            default:
              return "#b7f34d";
        }
    }

    // Create a GeoJSON layer containing the features array on the earthquake_data object
    // Run the onEachFeature function once for each element in the array
    var earthquakes = L.geoJSON(earthquake_data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        onEachFeature: onEachFeature,
        style: function(feature) {
          return {
              "weight": 1,
              "opacity": 0.9,
              "fillOpacity": 1,
              "color": "#3F3F3F",
              "fillColor": makeColor(feature.properties.mag),
              "stroke": true,
              "radius": feature.properties.mag > 0 ? feature.properties.mag * 4 : 0.4
          }
        }
    });

    // Send our earthquakes layer to the create_map function
    create_map(earthquakes);
}

function create_map(earthquakes) {
  // Define streetmap, satellite , darkmap, and lightmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var satellitemap =  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-satellite",
    accessToken: API_KEY
    });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });

  var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
      "Street Map": streetmap,
      "Satellite Map": satellitemap,
      "Dark Map": darkmap,
      "Light Map": lightmap,
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
      Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquake layers to display on load
  var my_map = L.map("map", {
      center: [ 37.09, -95.71],
      zoom: 5,
      layers: [streetmap, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
      collapsed: true
  }).addTo(my_map);

  // Create the legend
  var legend = L.control({ position: "bottomright"});
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = [0, 1, 2, 3, 4, 5]
    var colors = ["#b7f34d",
                  "#e1f34d",
                  "#f3db4d",
                  "#f3ba4d",
                  "#f0a76b",
                  "#f06b6b"]
    var labels = [];

    // Addd legend title
    var legend_info = "<h3>Magnitude</h3>";
    div.innerHTML = legend_info;

    limits.forEach(function(limit, index) {
      labels.push("<li style= \"background-color:  " + colors[index] + "\"></li>");
    });

    for (var i = 0; i < limits.length; i++) {
      i > 4 ? div.innerHTML += "<ul> " + limits[i] + " +" + "\t" + labels[i] + "</ul>" :
      div.innerHTML += "<ul>" + limits[i] + "-" + limits[i+1] + "\t" + labels[i] + "</ul>";
    }

    return div;
  };

  // Add the legend to the map
  legend.addTo(my_map);

}