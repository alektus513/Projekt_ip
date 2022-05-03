var user=null;
var uid=null; 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
    // User is signed in.   
    user = firebase.auth().currentUser;
    uid=user.uid;
    var email_id = user.email;
    
    document.getElementById("logowanie").style.display="none";
   // document.getElementById('rejestracja').style.display="none";
    
    document.getElementById("logout-btn").style.display="flex";
    document.getElementById("signup-btn").style.display="none";
    document.getElementById("q").style.display="none";
    document.getElementById("myposts-btn").style.display="block";
    document.getElementById("mypets-btn").style.display="block";
    document.getElementById("mojekonto").style.display="block";

    if(user != null){
     
     //console.log("1st: "+uid);
     //console.log("1st: "+email_id);
    userdata1();
      //user.sendEmailVerification();????
    }

  } else {
    // No user is signed in.
    
    document.getElementById("logowanie").style.display="block";
    document.getElementById("logout-btn").style.display="none";
    document.getElementById("signup-btn").style.display="block";
    document.getElementById("q").style.display="block";
    document.getElementById("myposts-btn").style.display="none";
    document.getElementById("mypets-btn").style.display="none";
    document.getElementById("mojekonto").style.display="none";
  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    location.reload();
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
   // window.alert("Error : " + errorMessage);
   window.alert("Błąd przy logowaniu! Sprawdź czy Twój email i hasło są poprawne");
    
  }); 

}

function logout(){
  firebase.auth().signOut();
  //location.href("../index.html");

}


function signupview(){
  document.getElementById("rejestracja").style.display="block";
}
function signUp(){
  
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {
      // Signed in 
      //var user = userCredential.user;    
       // ...
    })
    .then((success) =>{
      firebase.database().ref('/users/' + firebase.auth().currentUser.uid).set({
      name: document.getElementById("userName").value,
      lastname:document.getElementById("userLastname").value,
      email: document.getElementById("userEmail").value
       });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
    // firebase.database().ref('users/' + uid).set({
    //   name: document.getElementById("userName").value,
    //   lastname:document.getElementById("userLastname").value,
    //   email: document.getElementById("userEmail").value
    // });
    
    //location.reload();
    
    // var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    // var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    // var checkUserEmailValid = userEmail.match(userEmailFormate);
    // var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    
    // if(checkUserEmailValid == null){
    //     return checkUserEmail();
    // }else if(checkUserPasswordValid == null){
    //     return checkUserPassword();
    // }else{
    /*    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
            var user = firebase.auth().currentUser;
            var uid;
            if (user != null) {
                uid = user.uid;
            }
            var firebaseRef = firebase.database().ref();
            var userData = {
                userEmail: userEmail,
                userPassword: userPassword,
            }
            firebaseRef.child(uid).set(userData);
            swal('Your Account Created','Your account was created successfully, you can log in now.',
            ).then((value) => {
                setTimeout(function(){
                    window.location.replace("../index.html");
                }, 1000)
            });
        }).catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: "Error",
            })
        });
        firebase.auth().signInWithEmailAndPassword(userEmail, userPassword)
       // document.getElementById("rejestracja").style.display="none";
location.reload();
    } */
}
function userdata1(){
  firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/').on('value', function(childSnapshot) {
    {
     document.getElementById("imie").value=childSnapshot.val().name;
     document.getElementById("nazwisko").value=childSnapshot.val().lastname;
     document.getElementById("email").value=childSnapshot.val().email;
     document.getElementById("nrtel").value=childSnapshot.val().tel;
     document.getElementById("miasto").value=childSnapshot.val().city;
     //console.log("usr key: "+childSnapshot.key); 
    // console.log("usr name: "+childSnapshot.val().name);
     
    }}); 
}
function saveuserdata(){
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid).set({
    name: document.getElementById("imie").value,
    lastname:document.getElementById("nazwisko").value,
    email: document.getElementById("email").value,
    tel :  document.getElementById("nrtel").value,
    city: document.getElementById("miasto").value
     });
     window.alert("Zapisano.");
}


function checkUserEmail(){
    var userEmail = document.getElementById("userEmail");
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var flag;
    if(userEmail.value.match(userEmailFormate)){
        flag = false;
    }else{
        flag = true;
    }
    if(flag){
       // document.getElementById("userEmailError").style.display = "block";
    }else{
       // document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword(){
    var userPassword = document.getElementById("userPassword");
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      
    var flag;
    if(userPassword.value.match(userPasswordFormate)){
        flag = false;
    }else{
        flag = true;
    }    
    if(flag){
      //  document.getElementById("userPasswordError").style.display = "block";
    }else{
      //  document.getElementById("userPasswordError").style.display = "none";
    }
}


// Filter table

$(document).ready(function(){
  $("#tableSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

// //Filter list

// $(document).ready(function(){
//   $("#listSearch").on("keyup", function() {
//     var value = $(this).val().toLowerCase();
//     $("#myList li").filter(function() {
//       $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
//     });
//   });
// });

// FIlter anything
$(document).ready(function(){
  $("#myPetsinput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myPets button").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
function mojezwierzeta(){
  document.getElementById('myPets').innerHTML="";
  document.getElementById('myPetsinput').style.display = 'flex';
  firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/pets/').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    {
    // document.getElementById("imie").value=childSnapshot.val().name;
     //document.getElementById("nazwisko").value=childSnapshot.val().lastname;
     //console.log(childSnapshot.val().name +" " + childSnapshot.val().type);
     var lista = document.getElementById('myPets');
     var newpet = document.createElement('button');
     newpet.setAttribute('class', 'list-group list-group-flush list-group-item');
     var typ =  childSnapshot.val().type;
     var col;
     if(typ == 'psy') col = 'teal';
     else if(typ == 'koty') col = 'purple';
     else if(typ =='gryzonie') col = 'pink';
     else col = 'gray';
     newpet.style.display='flex';
     newpet.style.alignItems='center';
     newpet.style.justifyContent='space-between';
     newpet.style.fontSize='20px';
     newpet.innerHTML='<span class="tag tag-'+col+'">'+ childSnapshot.val().type+'</span><p>'+childSnapshot.val().name+'</p>';
     newpet.setAttribute('id',childSnapshot.key);
     newpet.setAttribute('value', childSnapshot.val().name);
     newpet.setAttribute('onclick','ogolne(this.id, this.value)');
     
     lista.appendChild(newpet);     
    }

  }); });
  
}
function dodajzwierze(){
  var types = document.forms[0];
  var selected;
  for (i = 0; i < types.length; i++) {
    if (types[i].checked) {
      selected = types[i].value;
    }
    }
    

  firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/pets/').push({
    name: document.getElementById("petname").value,
    type: selected
   });
   mojezwierzeta();
    // window.alert("Zapisano."); 
}
function ogolne(pet_uid,pet_name){
  localStorage.setItem('pet_uid',pet_uid);
  //console.log("ogolne "+pet_uid);
  document.getElementById("namediv").innerText=pet_name;
  var rasa = document.getElementById("rasa");
  var umaszczenie = document.getElementById("umaszczenie");
  var charakter = document.getElementById("charakter");
  var upodobania = document.getElementById("upodobania");
  var dodinfo = document.getElementById("dodinfo");
}
function histmed(){
  var opis1 = document.getElementById("opis").value;
  var zabiegi1 = document.getElementById("zabiegi").value;
  var zalecenia1 = document.getElementById("zalecenia").value;
  var pet_uid = localStorage.getItem('pet_uid');
  var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
  
  
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/pets/'+pet_uid+"/Med/").push({
    opis: opis1,
    zabiegi: zabiegi1,
    zalecenia: zalecenia1,
    data: dateTime
   });
}
function pokazhistmed(){
  document.getElementById('poprzedniemed').style.display="block";
  document.getElementById('poprzedniemed-list').innerHTML="";
var pet_uid = localStorage.getItem('pet_uid');
  firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/pets/'+pet_uid+"/Med/").once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    {
     var lista = document.getElementById('poprzedniemed-list');
     var newpet = document.createElement('button');
     newpet.setAttribute('class', 'list-group list-group-flush list-group-item');
     
     newpet.style.display='flex';
     newpet.style.alignItems='center';
     newpet.style.justifyContent='space-between';
     newpet.style.fontSize='20px';
     newpet.innerHTML='<ul><li> Opis: '+childSnapshot.val().opis+'</li>'+'<li> Zabiegi: '+childSnapshot.val().zabiegi+'</li>'+'<li>Zalecenia: '+childSnapshot.val().zalecenia+'</li><li>Data dodania: '+childSnapshot.val()?.data+'</li></ul>';
     newpet.setAttribute('id',childSnapshot.key);
     
     lista.appendChild(newpet);     
    }

  }); });
}