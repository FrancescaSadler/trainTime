
var firebaseConfig = {
    apiKey: "AIzaSyC1oWRwsFtgVkMOhDz1IiYnMT9zy5lnhLs",
    authDomain: "timesheet-18a95.firebaseapp.com",
    databaseURL: "https://timesheet-18a95.firebaseio.com",
    projectId: "timesheet-18a95",
    storageBucket: "timesheet-18a95.appspot.com",
    messagingSenderId: "207913891299",
    appId: "1:207913891299:web:c7ca0609f8ec276e"
};

firebase.initializeApp(firebaseConfig);


var database = firebase.database();


$("#add-train-btn").on("click", function (event) {
    event.preventDefault();


    var trainName = $("#train-name-input").val().trim();
    var trainDes = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
    var trainFreq = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDes,
        time: trainTime,
        frequency: trainFreq,
    };

    
    database.ref().push(newTrain);


    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    alert("Train successfully added");


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});


database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());


    var trainName = childSnapshot.val().name;
    var trainDes = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDes);
    console.log(trainTime);
    console.log(trainFreq);

    //this formats train time 
    // var trainTimePretty = moment.unix(trainTime).format("HH:mm");


    //this is where I am trying to get # of minutes away from next train- should be a combination of departure time, current time, and the eta based off the frequency
    //arrival time - current time = min away  
    // var minAway= moment(trainTime).endOf('day').fromNow(); 
    var minAway = moment().diff(moment(trainTime, "X"), "Arrival");
    console.log(minAway);

    //this is where I am trying to combine the firt train time with the train frequency to get the next train arrival
    var trainArrival = trainTime + trainFreq;
    console.log(trainArrival);



    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDes),
        // $("<td>").text(trainTimePretty),
        $("<td>").text(trainFreq),
        $("<td>").text(trainArrival),
        $("<td>").text(minAway),
    );


    $("#train-table > tbody").append(newRow);
});


