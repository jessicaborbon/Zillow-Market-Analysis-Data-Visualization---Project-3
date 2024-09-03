// Creating the map object
 let myMap = L.map("map", {
     center: [33.4484, -112.0740],
     zoom: 11
   });

   // Adding the tile layer
   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
   }).addTo(myMap);

// Define the legend content for each selected period
const legendContent = {
    '2006-2009': `<h1>Phoenix Housing Market Analysis</h1><img src="markers.png" style="width: 300px; height: auto;"><hr><h3> 2006-2009 Recession Period </br> - Overall Average Percentage Change in Market Value for SFH: -48% </br> - Overall Average Market Price for SFH: -$123,678.76 </br> Click on each marker to see exact pricing for each area in Phoenix. <h3>`,
    '2009-2019': `<h1>Phoenix Housing Market Analysis</h1><img src="markers.png" style="width: 300px; height: auto;"><hr><h3> 2009-2019 Recovery Period </br> - Overall Average Percentage Change in Market Value for SFH: 138% </br> - Overall Average Market Price for SFH: $157,136.34 </br> Click on each marker to see exact pricing for each area in Phoenix. <h3>`,
    '2019-2023': `<h1>Phoenix Housing Market Analysis</h1><img src="markers.png" style="width: 300px; height: auto;"><hr><h3> 2019-2023 COVID-19 Period </br> - Overall Average Percentage Change in Market Value for SFH: 59% </br> - Overall Average Market Price for SFH: $181,224.55 </br> Click on each marker to see exact pricing for each area in Phoenix. <h3>`
};

// Create a custom legend control
const legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = legendContent['2006-2009']; // Initial legend content

    return div;
};

legend.addTo(myMap);

//set the customer icon
const greenIcon = L.icon({
    iconUrl: 'img/greenIcon.png',
    iconSize: [20, 25]
  });
  const yellowIcon = L.icon({
    iconUrl: 'img/yellowIcon.png',
    iconSize: [20, 25]
  });
  const blueIcon = L.icon({
    iconUrl: 'img/blueIcon.png',
    iconSize: [20, 25]
  });
  const orangeIcon = L.icon({
    iconUrl: 'img/orangeIcon.png',
    iconSize: [20, 25]
  });
  const pinkIcon = L.icon({
    iconUrl: 'img/pinkIcon.png',
    iconSize: [20, 25]
  });

// Load data from the CSV file
d3.csv('combine_data_zip.csv').then(data => {
    console.log(data);
    // Function to handle changing the selected period
    document.getElementById('periodSelect').addEventListener('change', function() {
        let selectedPeriod = this.value;

        // Update the legend content based on the selected period
        legend.getContainer().innerHTML = legendContent[selectedPeriod];

        // Clear all existing popups
        myMap.eachLayer(layer => {
            if (layer instanceof L.Popup) {
                myMap.removeLayer(layer);
            }
        });

        // Filter the data based on the selected period and create markers with specific information
        data.forEach(d => {
            var lat = parseFloat(d.lat);
            var lng = parseFloat(d.lng);
            if (!isNaN(lat) && !isNaN(lng)) {
                var location = [lat, lng];
                let popupContent = '';
                if (selectedPeriod === '2006-2009') {
                    popupContent = `<h1>2006-2009 Period</h1><hr><h3> Zip Code: ${d.zip} </br> Average Percentage Change in Market Value for SFH: ${d.RecPc}% </br> Average Market Price for SFH: ${d.RecPr}</h3>`;
                } else if (selectedPeriod === '2009-2019') {
                    popupContent = `<h1>2009-2019 Period</h1><hr><h3> Zip Code: ${d.zip} </br> Average Percentage Change in Market Value for SFH: ${d.RevPc}% </br> Average Market Price for SFH: ${d.RevPr}</h3>`;
                } else if (selectedPeriod === '2019-2023') {
                    popupContent = `<h1>2019-2023 Period</h1><hr><h3> Zip Code: ${d.zip} </br>  Average Percentage Change in Market Value for SFH: ${d.CovPc}% </br> Average Market Price for SFH: ${d.CovPr}</h3>`;
                } 
                // L.marker(location).bindPopup(popupContent).addTo(myMap);

                let icon;
              // console.log(icon)
          if (selectedPeriod === '2006-2009') {
              if (d.RecPc >= -0.35) {
                icon = pinkIcon;
              } else if (d.RecPc < -0.35 && d.RecPc >= -0.45) {
                icon = greenIcon;
              } else if (d.RecPc < -0.45 && d.RecPc >= -0.55) {
                icon = yellowIcon;
              } else if (d.RecPc < -0.55) {
                icon = blueIcon;
              } else {
                icon = orangeIcon;
              }
          }
          if (selectedPeriod === '2009-2019') {
              // RevPc
              if (d.RevPc <= 0.50) {
                icon = pinkIcon;
              } else if (d.RevPc > 0.50 && d.RevPc <= 1.0) {
                icon = greenIcon;
              } else if (d.RevPc > 1.0 && d.RevPc <= 2.0) {
                icon = yellowIcon;
              } else if (d.RevPc > 2.0) {
                icon = blueIcon;
              } else {
                icon = orangeIcon;
              }
          }
          if (selectedPeriod === '2019-2023') {
              // CovPc
              if (d.CovPc <= 0.50) {
                icon = pinkIcon;
              } else if (d.CovPc > 0.50 && d.CovPc <= 0.55) {
                icon = greenIcon;
              } else if (d.CovPc > 0.55 && d.CovPc <= 0.60) {
                icon = yellowIcon;
              } else if (d.CovPc > 0.60) {
                icon = blueIcon;
              } else {
                icon = orangeIcon;
              }
          }
              L.marker(location, { icon: icon })
                  .bindPopup(popupContent)
                  .addTo(myMap);
            } else {
                console.error('Invalid coordinates for data entry:', d);
            }
        });
    });
});

