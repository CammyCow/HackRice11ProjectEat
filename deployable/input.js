const firebaseConfig = {
  apiKey: "AIzaSyDgOQIJswEfH56KFvVAdq8KXZstPyZB3kg",
  authDomain: "hackriceprojecteating.firebaseapp.com",
  databaseURL: "https://hackriceprojecteating-default-rtdb.firebaseio.com",
  projectId: "hackriceprojecteating",
  storageBucket: "hackriceprojecteating.appspot.com",
  messagingSenderId: "371483673471",
  appId: "1:371483673471:web:169be295bac547daac904a",
  measurementId: "G-44KBRM0SXN"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var uid = user.getUid();
    var currentTab = 0; // Current tab is set to be the first tab (0)
    showTab(currentTab); // Display the current tab

    function showTab(n) {
      // This function will display the specified tab of the form...
      var x = document.getElementsByClassName("tab");
      x[n].style.display = "block";
      //... and fix the Previous/Next buttons:
      if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
      } else {
        document.getElementById("prevBtn").style.display = "inline";
      }
      if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
      } else {
        document.getElementById("nextBtn").innerHTML = "Next";
      }
      //... and run a function that will display the correct step indicator:
      fixStepIndicator(n)
    }

    function nextPrev(n) {
      // This function will figure out which tab to display
      var x = document.getElementsByClassName("tab");
      // Exit the function if any field in the current tab is invalid:
      if (n == 1 && !validateForm()) return false;
      // Hide the current tab:
      x[currentTab].style.display = "none";
      // Increase or decrease the current tab by 1:
      currentTab = currentTab + n;
      // if you have reached the end of the form...
      if (currentTab >= x.length) {
        extractData(uid)
        console.log("form submitted");
        window.location.replace("loggedin_main.html");
      }
      // Otherwise, display the correct tab:
      showTab(currentTab);
    }

    function validateForm() {
      // This function deals with validation of the form fields
      var x, y, i, valid = true;
      x = document.getElementsByClassName("tab");
      y = x[currentTab].getElementsByTagName("input");
      // A loop that checks every input field in the current tab:
      for (i = 0; i < y.length; i++) {
        // If a field is empty...
        if (y[i].value == "") {
          // add an "invalid" class to the field:
          y[i].className += " invalid";
          // and set the current valid status to false
          valid = false;
        }
      }
      // If the valid status is true, mark the step as finished and valid:
      if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
      }
      return valid; // return the valid status
    }

    function fixStepIndicator(n) {
      // This function removes the "active" class of all steps...
      var i, x = document.getElementsByClassName("step");
      for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
      }
      //... and adds the "active" class on the current step:
      x[n].className += " active";
    }

  } else {
    // No user is signed in.

    console.log("not signed in")

  }
});
function extractData(uid){
  var vegetables = document.getElementById("favorite-vegetables").querySelectorAll('input[type=checkbox]');
  var meat = document.getElementById("favorite-meat").querySelectorAll('input[type=checkbox]');
  var staple = document.getElementById("favorite-staple").querySelectorAll('input[type=checkbox]');
  var least_vege = document.getElementById("unfavorite-`  vegetables").querySelectorAll('input[type=checkbox]');
  var least_meat = document.getElementById("unfavorite-meat").querySelectorAll('input[type=checkbox]');
  var least_staple = document.getElementById("unfavorite-staple").querySelectorAll('input[type=checkbox]');
  var allergy = document.getElementById("allergy").querySelectorAll('input[type=checkbox]');
  var vegetarian = false;
  var vege_checkbox = document.getElementById("cb29");
  if (vege_checkbox.checked){
    vegetarian = true;
  }

  const preferences = [];
  const dislikes = [];
  const allergies = [];
  console.log(vegetables);
  for(var i in vegetables){
    if (vegetables[i].checked){
      preferences.push(vegetables[i].value);
    }
  }

  for(var i in meat){
    if (meat[i].checked){
      preferences.push(meat[i].value);
    }
  }
  for(var i in staple){
    if (staple[i].checked){
      preferences.push(staple[i].value);
    }
  }
  console.log(preferences);

  for(var i in least_vege){
    if (least_vege[i].checked){
      dislikes.push(least_vege[i].value);
    }
  }

  for(var i in least_meat){
    if (least_meat[i].checked){
      dislikes.push(least_meat[i].value);
    }
  }

  for(var i in least_staple){
    if (least_staple[i].checked){
      dislikes.push(least_staple[i].value);
    }
  }
  console.log(dislikes);


  for(var i in allergy){
    if (allergy[i].checked){
      allergies.push(allergy[i].value);
    }
  }
  console.log(allergies);
  saveToDatabase(uid, preferences, dislikes, allergies, vegetarian);

}
//
function saveToDatabase(uid, preferences, dislikes, allergies, vegetarian) {
  // A post entry.
  var postData = {
    preferences: preferences,
    dislikes: dislikes,
    allergies: allergies,
    vegetarian: vegetarian
  };

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
  updates['/Users/' + uid] = postData;

  return firebase.database().ref().update(updates);
}
