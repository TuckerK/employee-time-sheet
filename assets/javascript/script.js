$(document).ready(function() {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCGknepuEMXLQJHM8tFpbP86dfR78tD-MA",
    authDomain: "employee-data-management-65c95.firebaseapp.com",
    databaseURL: "https://employee-data-management-65c95.firebaseio.com",
    projectId: "employee-data-management-65c95",
    storageBucket: "employee-data-management-65c95.appspot.com",
    messagingSenderId: "751569384883"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  var name = "";
  var role = "";
  var startDate;
  var monthlyRate = "";

$("#submit").on("click", function(event) {

  event.preventDefault();

  var newName = $("#name-input").val().trim();
  var newRole = $("#role-input").val().trim();
  var newStartDate = $("#start-date-input").val();
  var newMonthlyRate = parseInt($("#monthly-input").val().trim());

  database.ref().push({
    name: newName,
    role: newRole,
    startDate: newStartDate,
    monthlyRate: newMonthlyRate
    //dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  $("#name-input").val("");
  $("#role-input").val("");
  $("#start-date-input").val("");
  $("#monthly-input").val("");

})



database.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().name);
  console.log(childSnapshot.val().role);
  console.log(childSnapshot.val().startDate);
  console.log(childSnapshot.val().monthlyRate);
  console.log(childSnapshot.val().dateAdded);

  var newRow = $("<tr>");
  var nameCell = $("<td>").text(childSnapshot.val().name);
  var roleCell = $("<td>").text(childSnapshot.val().role);
  var startDateCell = $("<td>").text(childSnapshot.val().startDate);
  var monthsWorkedCell = $("<td>").text("");
  var monthlyRateCell = $("<td>").text(childSnapshot.val().monthlyRate);
  var totalBilledCell = $("<td>").text("");

  newRow.append(nameCell, roleCell, startDateCell, monthsWorkedCell, monthlyRateCell, totalBilledCell);

  $("#table-body").append(newRow);

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});


/*database.ref().on("value", function(snapshot) {

  // If Firebase has a highPrice and highBidder stored (first case)
  if (snapshot.child("highBidder").exists() && snapshot.child("highPrice").exists()) {
    // Set the variables for highBidder/highPrice equal to the stored values.
    highBidder = snapshot.val().highBidder;
    highPrice = parseInt(snapshot.val().highPrice);

    // Change the text inside the HTML element to reflect the initial value
    $("#highest-bidder").text(snapshot.val().highBidder);
    $("#highest-price").text("$" + snapshot.val().highPrice);

    // Print the data to the console.
    console.log(snapshot.val().highBidder);
    console.log(snapshot.val().highPrice);
  }

  // Keep the variables for highBidder/highPrice equal to the initial values
  else {

    // Change the HTML to reflect the initial value
    $("#highest-bidder").text(highBidder);
    $("#highest-price").text("$" + highPrice);

    // Print the initial data to the console.
    console.log("Current High Price");
    console.log(highBidder);
    console.log(highPrice);
  }*/




});
