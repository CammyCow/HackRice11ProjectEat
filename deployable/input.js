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

  } else {
    // No user is signed in.

    console.log("not signed in")

  }
});
function extractData(){
  var vegetables = document.getElementById("favorite-vegetables").querySelectorAll('input[type=checkbox]');
  var meat = document.getElementById("favorite-meat").querySelectorAll('input[type=checkbox]');
  var staple = document.getElementById("favorite-staple").querySelectorAll('input[type=checkbox]');
  var least_vege = document.getElementById("unfavorite-vegetables").querySelectorAll('input[type=checkbox]');
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
