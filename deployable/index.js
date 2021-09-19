firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
   .then(() => {
     // Existing and future Auth states are now persisted in the current
     // session only. Closing the window would clear any existing state even
     // if a user forgets to sign out.
     // ...
     // New sign-in will be persisted with session persistence.
     console.log("persistance set");
     return firebase.auth().signInWithEmailAndPassword(email, password);
   })
   .catch((error) => {
     // Handle Errors here.
     var errorCode = error.code;
     var errorMessage = error.message;
   });

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

  });
  window.location.replace("input.html");

}

function google_login(){
  console.log("google login called");


  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token.
      console.log('token acquired')
      var token = result.credential.accessToken;
    }
    var user = result.user;
  });
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');
  firebase.auth().signInWithRedirect(provider);
  window.location.replace("input.html");

}

function logout(){
  firebase.auth().signOut();
}


const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-pwd'].value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred=>{
      console.log(cred.user);
    });

})
function setPersistenceSession() {
  var email = "...";
  var password = "...";

  // [START auth_set_persistence_session]
  firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
      // Existing and future Auth states are now persisted in the current
      // session only. Closing the window would clear any existing state even
      // if a user forgets to sign out.
      // ...
      // New sign-in will be persisted with session persistence.
      return firebase.auth().signInWithEmailAndPassword(email, password);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
  // [END auth_set_persistence_session]
}
