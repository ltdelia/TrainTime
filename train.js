// 

var name = "";
var destination = "";
var firsttime = "";
var frequency = "";

$('#submit').on('click', function(){
	
	name = $('#name').val().trim();
	destination = $('#destination').val().trim();
	firsttime = $('#firsttime').val().trim();
	frequency = $('#frequency').val().trim();

	$('.table').append("<tr>"+
					   "<td>"+name+"</td>"+
					   "<td>"+destination+"<td>"+
					   "<td>"+firsttime+"</td>"+
					   "<td>"+frequency+"</td>"+
					   "</tr>");
	return false;
});