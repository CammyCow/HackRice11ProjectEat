
/*const firebaseConfig = {
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
      console.log(serv[day]);
      for (var servery in serv[day]["lunch"]){
        console.log("Lunch forloop:" + servery);
        displayServeryFood(serv[day]["lunch"][servery], servery);
      }
  
      for (var servery in serv[day]["dinner"]){
        console.log("Dinner forloop:" + servery)
        displayServeryFood(serv[day]["dinner"][servery], servery);
      }
  
      var node = document.createTextNode(day);
    });
      console.log("finished");
    }
  
    function displayServeryFood(servery, servString){
      console.log(servery);
      const paragraph = document.createElement('p');
      for(var entry in servery){
        var node = document.createTextNode(servery[entry] + ", ");
        paragraph.appendChild(node);
      }
      document.getElementById(servString).appendChild(paragraph);
    }
    */

function getUrlParam(name){
    var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r!=null) return unescape(r[2]);
    return null;
}

let r0 = getUrlParam("rate0");
let r1 = getUrlParam("rate1");
let r2 = getUrlParam("rate2");
let r3 = getUrlParam("rate3");
let r4 = getUrlParam("rate4");
let r5 = getUrlParam("rate5");
let r6 = getUrlParam("rate6");



console.log(r0);

console.log(r1);
console.log(r2);
console.log(r3);
console.log(r4);
console.log(r5);

function writeUserData(r1, r2, r3, r4, r5) {
  const db = firebase.getDatabase();
  firebase.set(firebase.ref(db, 'users/' + userId), {
    username: r1,
    email: r2,
    profile_picture : r3
  });
}
