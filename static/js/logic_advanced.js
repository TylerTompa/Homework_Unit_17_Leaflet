// // Create map object
// var myMap = L.map("map", {
//     center: [46.20491, 19.54740],
//     zoom: 3
// });

// // Add tile layer
// L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     accessToken: API_KEY
// }).addTo(myMap);

// // Link to GeoJSON
// const query_URL_past_hour = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";
// const query_URL_past_day = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
// const query_URL_past_7_days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// const query_URL_past_30_days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// var geojson;

// // Grab data with D3
// d3.json(query_URL_past_7_days, function(data) {

//     // Create a new choropleth layer
//     geojson = L.choropleth(data, {

//         // Define which property in the feature to use
//         valueProperty: "mag",

//         // Set color scale
//         scale: ["#b7f34d", "#f06b6b"],

//         // Set number of breaks in step range
//         steps: 6,

//         // Select q for quartile, e for equidistant, or k for k-means
//         mode: "qs",

//         style: {
//             // Border Color
//             color: "#fff",
//             weight: 1,
//             fillOpacity: 0.8
//         },

//         // Binding a pop-up to each layer
//         onEachFeature: function(feature, layer) {
//             layer.bindPopup(`<p>Magnitude: ${feature.propeties.mag}`);
//         }
//     }).addTo(myMap);

//     // Set up the legend
//     var legend = L.control({ position: "bottom-right"});
//     legend.onAdd = function() {
//         var div = L.DomUtil.create("div", "info legend");
//         var limits = geojson.options.limits;
//         var colors = geojson.options.colors;
//         var labels = [];

//         // Add min & max
//         var legendInfo = "<h1>Magnitude</h1>";

//         div.innerHTML = legendInfo;

//         limits.forEach(function(limit, index) {
//             labels.push(`<li style="background-color: ${colors.index}"></li>`);
//         });

//         div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//     };

//     // Add the legend to the map
//     legend.addTo(myMap);
// })

////////////////////////////////////

// Creating map object
// var myMap = L.map("map", {
//     center: [40.7128, -74.0059],
//     zoom: 11
//   });
  
//   // Adding tile layer
//   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//     maxZoom: 18,
//     id: "mapbox.streets",
//     accessToken: API_KEY
//   }).addTo(myMap);
  
//   // Link to GeoJSON
//   var APILink = "http://data.beta.nyc//dataset/d6ffa9a4-c598-4b18-8caf-14abde6a5755/resource/74cdcc33-512f-439c-" +
//   "a43e-c09588c4b391/download/60dbe69bcd3640d5bedde86d69ba7666geojsonmedianhouseholdincomecensustract.geojson";
  
//   var geojson;
  
//   // Grab data with d3
//   d3.json(APILink, function(data) {
  
//     // Create a new choropleth layer
//     geojson = L.choropleth(data, {
  
//       // Define what  property in the features to use
//       valueProperty: "MHI",
  
//       // Set color scale
//       scale: ["#ffffb2", "#b10026"],
  
//       // Number of breaks in step range
//       steps: 10,
  
//       // q for quartile, e for equidistant, k for k-means
//       mode: "qs",
//       style: {
//         // Border color
//         color: "#fff",
//         weight: 1,
//         fillOpacity: 0.8
//       },
  
//       // Binding a pop-up to each layer
//       onEachFeature: function(feature, layer) {
//         layer.bindPopup(feature.properties.LOCALNAME + ", " + feature.properties.State + "<br>Median Household Income:<br>" +
//           "$" + feature.properties.MHI);
//       }
//     }).addTo(myMap);
  
//     // Set up the legend
//     var legend = L.control({ position: "bottomright" });
//     legend.onAdd = function() {
//       var div = L.DomUtil.create("div", "info legend");
//       var limits = geojson.options.limits;
//       var colors = geojson.options.colors;
//       var labels = [];
  
//       // Add min & max
//       var legendInfo = "<h1>Median Income</h1>" +
//         "<div class=\"labels\">" +
//           "<div class=\"min\">" + limits[0] + "</div>" +
//           "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
//         "</div>";
  
//       div.innerHTML = legendInfo;
  
//       limits.forEach(function(limit, index) {
//         labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
//       });
  
//       div.innerHTML += "<ul>" + labels.join("") + "</ul>";
//       return div;
//     };
  
//     // Adding legend to the map
//     legend.addTo(myMap);
  
//   });
  
//////////////////////////////////////////////////////////////

// Creating map object
var myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 11
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Link to GeoJSON
  // var APILink = "http://data.beta.nyc//dataset/d6ffa9a4-c598-4b18-8caf-14abde6a5755/resource/74cdcc33-512f-439c-" +
  // "a43e-c09588c4b391/download/60dbe69bcd3640d5bedde86d69ba7666geojsonmedianhouseholdincomecensustract.geojson";
  const query_URL_past_7_days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  var geojson;
  
  // Grab data with d3
  d3.json(query_URL_past_7_days, function(data) {
  
    // Create a new choropleth layer
    geojson = L.geoJSON(data, {
  
      // // Define what  property in the features to use
      // valueProperty: "mag",
  
      // // Set color scale
      // scale: ["#b7f34d", "#f06b6b"],
  
      // // Number of breaks in step range
      // steps: 6,
  
      // // q for quartile, e for equidistant, k for k-means
      // mode: "k",
      style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
      },
  
      // Binding a pop-up to each layer
      onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.place + ", " + "<br>Magnitude: " +
        feature.properties.mag);
      }
    }).addTo(myMap);
  
    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "info legend");
      var limits = geojson.options.limits;
      var colors = geojson.options.colors;
      var labels = [];
  
      // Add min & max
      var legendInfo = "<div class=\"min\">" + limits[0] + "</div>" +
          "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
        "</div>";
  
      div.innerHTML = legendInfo;
  
      limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
      });
  
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
      return div;
    };
  
    // Adding legend to the map
    legend.addTo(myMap);
  
  });
  