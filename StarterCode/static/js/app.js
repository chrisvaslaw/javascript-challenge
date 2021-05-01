// from data.js
var tableData = data;

// Select the button
var button = d3.select("#filter-btn");

// Select the form
var form = d3.select("#form");
var $tbody = d3.select("tbody");

//Create input references
var inputFieldDate = d3.select("#datetime");
var inputFieldCity = d3.select("#city");

// Create event handlers 
button.on("click", runEnter);
form.on("submit", runEnter);

// Create variable to hold table columns
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Create Variable to Add Data
var addData = (dataInput) => {
    dataInput.forEach(ufoSightings => {
        var row = $tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSightings[column]))
    });
};

addData(tableData);

function runEnter() {

  // Prevent the page from refreshing
    d3.event.preventDefault();
    
 // Select the input elements for city and date
    var date_input = inputFieldDate.property("value").trim();
    var city_input = inputFieldCity.property("value").trim();

// Filter for date and city
    var filtereddata = tableData.filter(u => {
        let date_match = u.datetime === date_input;
        date_match = date_match || (date_input === '');
        let city_match = u.city === city_input;
        city_match = city_match || (city_input === '');
        return date_match && city_match;
    });

    $tbody.html("");
    addData(filtereddata);
}
