// Global Variables
// These are empty to start, since the administrator will input them
var name = "";
var destination = "";
var firstTime = "";
var frequency = "";

// This is the link to our Firebase databse, storing all of the data
var trainData = new Firebase("https://choochoocheechee.firebaseio.com/");

// This is the current time
var currentTime = moment();
console.log("Current Time: " + currentTime);

// When the submit button is clicked, cue the function
$('#submit').on('click', function(){
	
	// Grabbing the values for each variable, from their specific id in HTML
	name = $('#name').val().trim();
	destination = $('#destination').val().trim();
	firstTime = $('#firstTime').val().trim();
	frequency = $('#frequency').val().trim();

	// How to determine the nextTrain and minutesUntilTrain
	
	// 1. Convert the firstTime, push back 1 year to ensure it's before currentTime
	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// 2. Calculate the difference between the times 
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in time: " + diffTime);

	// 3. Determine the time apart (difference in time % frequency)
	var remainder = diffTime % frequency;
	console.log(remainder);

	// 4. Minutes until the train
	var minutesUntilTrain = frequency - remainder;
	console.log("Minutes Until Train: " + minutesUntilTrain);

	// 5. Add minutesUntilTrain to currentTime to get nextTime
	var nextTime = moment().add(minutesUntilTrain, "minutes");
	console.log("Arrival Time: " + moment(nextTime).format("hh:mm"));

	// Pushing a new entry to Firebase, containing these variables
	trainData.push({
		name: name,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency,
		nextTime: nextTime,
		minutesUntilTrain: minutesUntilTrain,
		// Timestamp in unix
		dateAdded: Firebase.ServerValue.TIMESTAMP
	});

	// Appending the variables to HTML
	$('.table').append("<tr>"+
					   "<td>"+name+"</td>"+
					   "<td>"+destination+"</td>"+
					   "<td>"+frequency+"</td>"+
					   "<td>"+nextTime+"</td>"+
					   "<td>"+minutesUntilTrain+"</td>"+
					   "</tr>");
	return false;
});

trainData.on('child_added', function(childSnapshot, prevChildKey){
	// Gives us the entire object for each child added to Firebase
	console.log(childSnapshot.val());
	// Appending the variables to HTML
	$('.table').append("<tr>"+
					   "<td>"+childSnapshot.val().name+"</td>"+
					   "<td>"+childSnapshot.val().destination+"</td>"+
					   "<td>"+childSnapshot.val().frequency+"</td>"+
					   "<td>"+childSnapshot.val().nextTime+"</td>"+
					   "<td>"+childSnapshot.val().minutesUntilTrain+"</td>"+
					   "</tr>");


}, function (errorObject) {

		// 
	  	console.log("The read failed: " + errorObject.code);
	
	});