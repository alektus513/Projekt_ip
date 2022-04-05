var user;
var uid; 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    
    // User is signed in.   
    user = firebase.auth().currentUser;
    document.getElementById("logowanie").style.display="none";
    document.getElementById("logout-btn").style.display="flex";
    document.getElementById("signup-btn").style.display="none";
    document.getElementById("q").style.display="none";
    document.getElementById("myposts-btn").style.display="block";
    document.getElementById("mypets-btn").style.display="block";

    if(user != null){
     
      var email_id = user.email;
      uid=user.uid;
      console.log(email_id);
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
  location.reload();

}


function signupview(){
  document.getElementById("rejestracja").style.display="block";
}
function signUp(){
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userFullNameFormate = /^([A-Za-z.\s_-])/;    
    var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;      

    var checkUserEmailValid = userEmail.match(userEmailFormate);
    var checkUserPasswordValid = userPassword.match(userPasswordFormate);

    
    // if(checkUserEmailValid == null){
    //     return checkUserEmail();
    // }else if(checkUserPasswordValid == null){
    //     return checkUserPassword();
    // }else{
        firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then((success) => {
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
    }
//}

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