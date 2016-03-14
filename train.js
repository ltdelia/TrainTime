// Global Variables
// These are empty to start, since the administrator will input them
var name = "";
var destination = "";
var firsttime = "";
var frequency = "";

// This is the link to our Firebase databse, storing all of the data
var trainData = new Firebase("https://choochoocheechee.firebaseio.com/");

// When the submit button is clicked, cue the function
$('#submit').on('click', function(){
	
	// Grabbing the values for each variable, from their specific id in HTML
	name = $('#name').val().trim();
	destination = $('#destination').val().trim();
	firsttime = $('#firsttime').val().trim();
	frequency = $('#frequency').val().trim();
	
	// Pushing a new entry to Firebase, containing these variables
	trainData.push({
		name: name,
		destination: destination,
		firsttime: firsttime,
		frequency: frequency,
		// Timestamp in unix
		dateAdded: Firebase.ServerValue.TIMESTAMP
	});

	// Appending the variables to HTML
	$('.table').append("<tr>"+
					   "<td>"+name+"</td>"+
					   "<td>"+destination+"</td>"+
					   "<td>"+frequency+"</td>"+
					   "</tr>");
	return false;
});

trainData.on('child_added', function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());
}, function (errorObject) {

		// 
	  	console.log("The read failed: " + errorObject.code);
	
	});