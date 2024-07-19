var map = L.map('map').setView([33.4484, -112.0740], 10);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load the CSV data for Phoenix zip codes
d3.csv('uszips.az.phoenix.csv').then(zipData => {
    zipData.forEach(entry => {
        var lat = parseFloat(entry.lat);
        var lng = parseFloat(entry.lng);

        L.circleMarker([lat, lng], { color: 'blue' }).addTo(map);
    });

    // Load the CSV data for Zillow housing market data
    d3.csv('zillow_data.csv').then(zillowData => {
        zillowData.forEach(entry => {
            var zipCode = entry.zip;
            var date1 = "12/31/2007";
            var date2 = "12/31/2009";
            var value1 = parseFloat(entry.value1);
            var value2 = parseFloat(entry.value2);

            var percentageChange = calculatePercentageChange(value1, value2);

            // Find coordinates for the zip code
            var zipCoordinates = zipData.find(feature => feature.zip === zipCode);
            if (zipCoordinates) {
                L.circleMarker([parseFloat(zipCoordinates.lat), parseFloat(zipCoordinates.lng)], { color: 'blue' })
                    .addTo(map)
                    .bindPopup('Zip Code: ' + zipCode + '<br>Percentage Change: ' + percentageChange.toFixed(2) + '%');
            } else {
                console.error(`Coordinates not found for zip code: ${zipCode}`);
            }
        });
    })
    .catch(error => console.error('Error loading Zillow housing market data:', error));
})
.catch(error => console.error('Error loading Phoenix zip code data:', error));

function calculatePercentageChange(value1, value2) {
    return ((value2 - value1) / value1) * 100;
}

var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML = '<h4>Legend</h4>' +
                    '<p>Color levels and meanings</p>' +
                    '<p>Date range</p>';
    return div;
};

legend.addTo(map);






// from geopy.geocoders import Nominatim

// // Initialize the map
// var map = L.map('map').setView([33.4484, -112.0740], 10);

// // Add OpenStreetMap tile layer
// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// // Load the zillow_data.csv file into the script
// d3.csv("zillow_data.csv").then(function(data) {
//     // Process the data
//     data.forEach(function(entry) {
//         var zipCode = entry.zip; // Assuming the zip code is in the 'zip' column
//         var value1 = entry.value1; // Value closest to 12/01/2007
//         var value2 = entry.value2; // Value closest to 12/01/2009

//         // Calculate percentage change
//         var percentageChange = calculatePercentageChange(value1, value2);

//         // Define color scale for percentage change
//         var colorScale = d3.scaleLinear()
//             .domain([-50, 0, 50]) // Adjust the domain based on your data
//             .range(['blue', 'white', 'red']); // Adjust the color range as needed

//         var color = colorScale(percentageChange);

//         // Add zip code areas to the map with color gradient based on percentage change
//         getZipCodeCoordinates(zipCode).then(function(coordinates) {
//             if (coordinates) {
//                 L.polygon(coordinates, {
//                     fillColor: color,
//                     fillOpacity: 0.7,
//                     color: 'black',
//                     weight: 1
//                 }).addTo(map).bindPopup('Zip Code: ' + zipCode + '<br>Percentage Change: ' + percentageChange.toFixed(2) + '%');
//             } else {
//                 console.error(`Coordinates not found for zip code: ${zipCode}`);
//             }
//         }).catch(error => {
//             console.error(`Error fetching coordinates for zip code ${zipCode}: ${error}`);
//         });
//     });
// }).catch(error => {
//     console.error('Error loading zillow_data.csv:', error);
// });

// // Function to calculate percentage change
// function calculatePercentageChange(value1, value2) {
//     return ((value2 - value1) / value1) * 100;
// }

// // // Function to get coordinates for a specific zip code using GeoPy for geocoding
// // function getZipCodeCoordinates(zipCode) {
// //     // Use GeoPy to geocode the zip code and retrieve the coordinates
// //     // Replace this with the actual GeoPy geocoding code
// //     // Example: geopy.geocoders.Nominatim().geocode(zipCode)
// //     return new Promise((resolve, reject) => {
// //         // Simulated coordinates for demonstration
// //         var coordinates = [33.6251, -112.0021]; // Example coordinates for zip code 85032
// //         resolve([coordinates]);
// //     });
// // }

// // Add legend
// var legend = L.control({ position: 'bottomright' });

// legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'legend');
//     div.innerHTML = '<h4>Legend</h4>' +
//                     '<p>Color levels and meanings</p>' +
//                     '<p>Date range</p>';
//     return div;
// };

// legend.addTo(map);








// // Define the base URL for the API
// var base_url = 'https://data.nasdaq.com/api/v3/datatables/ZILLOW/REGIONS?api_key=WNQMF7uhurU_yiNiP8P9';

// // Function to calculate percentage change
// function calculatePercentageChange(value1, value2) {
//     return ((value2 - value1) / value1) * 100;
// }

// // Fetch data from the API
// fetch(base_url)
//     .then(response => response.json())
//     .then(data => {
//         // Process the API response data
//         data.datatable.data.forEach(entry => {
//             var zip = entry[0]; // Assuming the zip code is at index 0 in the response data
//             var value1 = entry[1]; // Assuming the first value is at index 1 in the response data
//             var value2 = entry[2]; // Assuming the last value is at index 2 in the response data

//             // Calculate percentage change
//             var percentageChange = calculatePercentageChange(value1, value2);

//             // Define color scale for percentage change
//             var colorScale = d3.scaleLinear()
//                 .domain([-10, 0, 10])
//                 .range(['red', 'white', 'green']);

//             var color = colorScale(percentageChange);

//             // Add zip code areas to the map with color gradient based on percentage change
//             L.polygon(getZipCodeCoordinates(zipCode), {
//                 fillColor: color,
//                 fillOpacity: 0.7,
//                 color: 'black',
//                 weight: 1
//             }).addTo(map).bindPopup('Zip Code: ' + zipCode + '<br>Percentage Change: ' + percentageChange.toFixed(2) + '%');
//         });
//     })
//     .catch(error => console.error('Error fetching data from API: ' + error));

// // Add legend
// var legend = L.control({ position: 'bottomright' });

// legend.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'legend');
//     div.innerHTML = '<h4>Legend</h4>' +
//                     '<p>Color levels and meanings</p>' +
//                     '<p>Date range</p>';
//     return div;
// };

// legend.addTo(map);

// // Function to toggle map view based on date range
// function toggleMapView(dateRange) {
//     // Define the date ranges for "The Great Recession" and "COVID-19"
//     var recessionStartDate = '12/01/2007';
//     var recessionEndDate = '12/01/2009';
//     var covidStartDate = '01/01/2019';
//     var covidEndDate = '01/01/2024';

//     // Filter the data based on the selected date range
//     var filteredData = data.filter(entry => {
//         var date = entry.date; // Assuming the date is available in the data

//         if (dateRange === 'The Great Recession') {
//             return date >= recessionStartDate && date <= recessionEndDate;
//         } else if (dateRange === 'COVID-19') {
//             return date >= covidStartDate && date <= covidEndDate;
//         }
//     });

//     // Update the map visualization based on the filtered data
//     filteredData.forEach(entry => {
//         var zipCode = entry.zipCode;
//         var percentageChange = entry.percentageChange;

//         var color = colorScale(percentageChange);

//         // Add or update zip code areas on the map with color gradient based on percentage change
//         // You may need to handle adding new polygons or updating existing ones based on the date range
//     });
// }

// // Toggle view for "The Great Recession" date range
// toggleMapView('The Great Recession');

// // Toggle view for "COVID-19" date range
// toggleMapView('COVID-19');
