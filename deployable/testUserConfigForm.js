var firebaseConfig = {
  apiKey: "AIzaSyDgOQIJswEfH56KFvVAdq8KXZstPyZB3kg",
  authDomain: "hackriceprojecteating.firebaseapp.com",
  databaseURL: "https://hackriceprojecteating-default-rtdb.firebaseio.com",
  projectId: "hackriceprojecteating",
  storageBucket: "hackriceprojecteating.appspot.com",
  messagingSenderId: "371483673471",
  appId: "1:371483673471:web:169be295bac547daac904a",
  measurementId: "G-44KBRM0SXN"
};

firebase.initializeApp(firebaseConfig);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get get form values
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message
  });
}
