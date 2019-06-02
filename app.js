// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyC1oWRwsFtgVkMOhDz1IiYnMT9zy5lnhLs",
    authDomain: "timesheet-18a95.firebaseapp.com",
    databaseURL: "https://timesheet-18a95.firebaseio.com",
    projectId: "timesheet-18a95",
    storageBucket: "timesheet-18a95.appspot.com",
    messagingSenderId: "207913891299",
    appId: "1:207913891299:web:c7ca0609f8ec276e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  var database = firebase.database();


  // Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed



// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDes = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    destination: trainDes,
    time: trainTime,
    frequency: trainFreq,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDes = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDes);
  console.log(trainTime);
  console.log(trainFreq);

//   // Prettify the employee start
  var trainTimePretty = moment.unix(trainTime).format("HH:mm");

//   // Calculate the months worked using hardcore math
//   // To calculate the months worked
    
    var trainArrival = moment().diff(moment(trainTime, "X"), "Arrival");
    console.log(trainArrival);
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

//   // Calculate the total billed rate

//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDes),
    $("<td>").text(trainTimePretty),
    $("<td>").text(trainFreq),
    // $("<td>").text(empRate),
    // $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case

