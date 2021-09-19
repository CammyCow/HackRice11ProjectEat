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

  function generateDailyView(){
    let day;
    switch (new Date().getDay()) {
      case 0:
        day = "Sunday";
        break;
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case  6:
        day = "Saturday";
    }
    const dateHeader = document.createElement('h4');
    var ndoe = document.createTextNode(day);
    dateHeader.append(ndoe);
    document.getElementById("date").appendChild(dateHeader);

    var databaseRef = firebase.database().ref();
    console.log("retreiving menu");
    databaseRef.on('value',(snapshot) => {
      const serv = snapshot.val();
      menu = serv["Menu"][day];
      foodDB = serv["foodItems"];
      console.log(menu);
      for (var servery in menu["lunch"]){
        console.log("Lunch forloop:" + servery);
        foodItems = menu["lunch"][servery];
        console.log(foodItems);
        for(var food in foodItems){
          foodName = Object.keys(foodDB[foodItems[food]])[0];
          displayServeryFood(foodName, servery);
        }
      for (var servery in menu["dinner"]){
        console.log("dinner forloop:" + servery);
        foodItems = menu["dinner"][servery];
        console.log(foodItems);
        for(var food in foodItems){
          foodName = Object.keys(foodDB[foodItems[food]])[0];
          displayServeryFood(foodName, servery);
        }
      }

    });
      console.log("finished");
    }

    function displayServeryFood(foodName, servString){
      console.log(foodName);
      const paragraph = document.createElement('p');
      var node = document.createTextNode(foodName + ", ");
      console.log(node);
      paragraph.appendChild(node);
      console.log(servString);
      console.log(document.getElementById(servString));
      document.getElementById(servString).appendChild(paragraph);
    }
