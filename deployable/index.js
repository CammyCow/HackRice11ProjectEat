import from "https://www.gstatic.com/firebasejs/8.0.1/firebase-app.js";
import from "https://www.gstatic.com/firebasejs/8.0.0/firebase-auth.js"
import from "https://www.gstatic.com/firebasejs/4.8.1/firebase.js";

  // Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDgOQIJswEfH56KFvVAdq8KXZstPyZB3kg",
  authDomain: "hackriceprojecteating.firebaseapp.com",
  projectId: "hackriceprojecteating",
  storageBucket: "hackriceprojecteating.appspot.com",
  messagingSenderId: "371483673471",
  appId: "1:371483673471:web:169be295bac547daac904a",
  measurementId: "G-44KBRM0SXN"
};
  firebase.initializeApp(firebaseConfig);



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

}

function google_login(){
  console.log("google login called");
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);
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

function signup(){

}
