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
      // First we get the define a the variable earthquake_day_of_week
      // Then see use a switch-case statement to check the numbered day of the earthquake
      // and defined it the day of the week in words as appropriate
      // that is, 0 = Sunday, 1 = Monday, ..., 6 = Saturday
      var earthquake_day_of_week;
      switch (new Date(feature.properties.time).getDay()) {
        case 0:
          earthquake_day_of_week = "Sunday";
          break;
        case 1:
          earthquake_day_of_week = "Monday";
          break;
        case 2:
          earthquake_day_of_week = "Tuesday";
          break;
        case 3:
          earthquake_day_of_week = "Wednesday";
          break;
        case 4:
          earthquake_day_of_week = "Thursday";
          break;
        case 5:
          earthquake_day_of_week = "Friday";
          break;
        default:
          earthquake_day_of_week = "Saturday";
          break;
      }
      
      // Next we define the earthquake_date variable to gold the date of the earthquake
      var earthquake_date = new Date(feature.properties.time).toLocaleDateString();

      // Then we define earthquake_time_hours to hold the hour of the time the earthquake happened
      // If the hour is less than 0, we concatenate a 0 before it for a more natural-looking time
      // That is, for example: 06:30 lookds better than 6:30
      var earthquake_time_hours = new Date(feature.properties.time).getHours() < 10 ?
      "0" + new Date(feature.properties.time).getHours() : new Date(feature.properties.time).getHours();

      // After that we define earthquake_time_hours to hold the minuts of the time the earthquake happened
      // If the minute is less than 0, we concatenate a 0 before it for a more natural-looking time
      // That is, for example: 06:05 lookds better than 06:5
      var earthquake_time_minutes = new Date(feature.properties.time).getMinutes() < 10 ?
      "0" + new Date(feature.properties.time).getMinutes() : new Date(feature.properties.time).getMinutes();
      
      // Finally we concatenate the earthquake_time_hours variable with the earthquake_time_minutes for a full nicely-formatted time.
      var earthquake_time = earthquake_time_hours + ":" + earthquake_time_minutes
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${earthquake_day_of_week}, ${earthquake_date}</p><p>Time: ${earthquake_time}</p><p>Magnitude: ${feature.properties.mag}</p>`);
    }

    // Define a function to apply a color to each marker
    // Depending on the magnitude of the earthquake
    function make_color(mag) {
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
        pointToLayer: function (feature, latitude_longitude) {
            return L.circleMarker(latitude_longitude);
        },
        onEachFeature: onEachFeature,
        style: function(feature) {
          return {
              "weight": 1,
              "opacity": 0.9,
              "fillOpacity": 1,
              "color": "#3F3F3F",
              "fillColor": make_color(feature.properties.mag),
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
  var street_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var satellite_map =  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
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

  var light_map = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var base_maps = {
      "Street Map": street_map,
      "Satellite Map": satellite_map,
      "Dark Map": dark_map,
      "Light Map": light_map,
  };

  // // Create overlay object to hold our overlay layer
  var overlay_maps = {
      // "Past Hour": earthquakes,
      // "Past 24 Hours": earthquakes,
      "Earthquakes": earthquakes
      // "Past 30 Days": earthquakes,
  };

  // Create our map, giving it the streetmap and earthquake layers to display on load
  var my_map = L.map("map", {
      center: [ 37.09, -95.71],
      zoom: 5,
      layers: [street_map, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(base_maps, overlay_maps, {
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
      labels.push("<li style= 'background-color:  " + colors[index] + "' ></li>");
    });

    for (var i = 0; i < limits.length; i++) {
      i > 4 ? div.innerHTML += "<ul> " + limits[i] + "+&nbsp;" + "\t" + labels[i] + "</ul>" :
      div.innerHTML += "<ul>" + limits[i] + "-" + limits[i+1] + "\t" + labels[i] + "</ul>";
    }

    return div;
  };

  // Add the legend to the map
  legend.addTo(my_map);

}