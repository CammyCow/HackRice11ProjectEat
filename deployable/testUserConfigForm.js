// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { database } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const app = initializeApp(firebaseConfig);
var database = firebase.database();
//intercepting the form so we can put inputs into Firebase
document.getElementById("foodReview").addEventListener('submit',submitForm);

  function submitForm(e){
    e.preventDefault();

    var foodName = getInputVal('food');
    var starRating = getInputVal('starRating');
    var comment = getInputVal('comment');

    testReview(foodName, starRating, comment);
  }

  function getInpulVal(id){
    return document.getElementById(id).value;
  }


  function writeReview(userId, itemId, food, serveryId, rating, comment, date) {
    firebase.database().ref('users/' + userId).set({
      userId: userId,
      itemId: email,
      itemName: food
      serveryId: serveryId,
      starRating: rating,
      comment: comment,
      datePosted: date
    });
  }
  function testReview(food, starRating, review){
    firebase.database().ref('foodReview/' + food).set({
      food: food,
      starRating: rating,
      comment: review,
    });
  }
