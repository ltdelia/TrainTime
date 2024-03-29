// This is the link to our Firebase database, storing all of the data
var trainData = new Firebase("https://choochoocheechee.firebaseio.com/");

// This is the current time
var currentTime = moment();
console.log("Current Time: " + currentTime);

// When the submit button is clicked, cue the function
$('#submit').on('click', function(){
	
	// Grabbing the values for each variable, from their specific id in HTML
	var name = $('#name').val().trim();
	var destination = $('#destination').val().trim();
	var firstTime = $('#firstTime').val().trim();
	var frequency = $('#frequency').val().trim();

	// Pushing a new entry to Firebase, containing these variables
	trainData.push({
		name: name,
		destination: destination,
		firstTime: firstTime,
		frequency: frequency,
	});

	$('#name').val("")
	$('#destination').val("")
	$('#firstTime').val("")
	$('#frequency').val("")

	return false;
});

trainData.on('child_added', function(childSnapshot, prevChildKey){
	// Gives us the entire object for each child added to Firebase
	console.log(childSnapshot.val());

	// How to determine the nextTrain and minutesUntilTrain
	
	firstTime = childSnapshot.val().firstTime;
	
	// 1. Convert the firstTime, push back 1 year to ensure it's before currentTime
	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
	console.log(firstTimeConverted);

	// 2. Calculate the difference between the times 
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	console.log("Difference in time: " + diffTime);

	// 3. Determine the time apart (difference in time % frequency)
	var remainder = diffTime % childSnapshot.val().frequency;
	console.log(remainder);

	// 4. Minutes until the train
	var minutesUntilTrain = childSnapshot.val().frequency - remainder;
	console.log("Minutes Until Train: " + minutesUntilTrain);

	// 5. Add minutesUntilTrain to currentTime to get nextTime
	var nextTime = moment().add(minutesUntilTrain, "minutes");
	console.log("Arrival Time: " + moment(nextTime).format("hh:mm"));

	// Appending the variables to HTML
	$('.table').append("<tr>"+
					   "<td>"+childSnapshot.val().name+"</td>"+
					   "<td>"+childSnapshot.val().destination+"</td>"+
					   "<td>"+childSnapshot.val().frequency+"</td>"+
					   "<td>"+moment(nextTime).format("hh:mm")+"</td>"+
					   "<td>"+minutesUntilTrain+"</td>"+
					   "</tr>");


}, function (errorObject) {

		// 
	  	console.log("The read failed: " + errorObject.code);
	
	});