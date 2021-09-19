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
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


function displayDish(){
  console.log("running displayDish");
  var databaseRef = firebase.database().ref("foodItems");
  console.log("set databaseRef");
  databaseRef.on('value',(snapshot) => {
    const data = snapshot.val();
    dish = data[7];
    display(dish["foodName"]);
    display(dish["date"]);
    display(dish["isLunch"]);
    display(dish["place"]);
  });
    console.log("finished");
  }

function display(data){
  const paragraph = document.createElement('p');
  var node = document.createTextNode(data);
  paragraph.appendChild(node);
  document.getElementById('display').appendChild(paragraph);
}

function initDatabase(){
  // A post entry.
  var testCollection = firebase.database().ref();

  testCollection.set({
    foodItems: {
      "0": {
        name: "Test Food",
        keywords: ["test"]
      }
    },
    weeklyMenu:{
      "lunch" : {

      },
      "dinner" : {

      }
    },
    Review: {

    },
    Keywords : {
      "test" : [0]
    }
  }).then(success => {
          console.log('success',success);
      },
      error => {
          console.log('error',error);
      }
  );
}

function updateDatabase(){
  var testFood =  {
      keywords: ["test"],
      name: "Update Test"
  }
  //var testKey = firebase.database().ref().child('foodItems').push().key;
  var testKey = "tests"; 
  var updates = {};
  updates[testKey] = testFood;
  return firebase.database().ref().update(updates);
}
