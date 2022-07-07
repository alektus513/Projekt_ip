var user= firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   
    // User is signed in.   
    user = firebase.auth().currentUser;
    uid=user.uid;
    
    localStorage.setItem('uid',uid);
    var email_id = user.email;
    
    userdata1();
    //pokazmojeposty();
    document.getElementById("logowanie").style.display="none";
   // document.getElementById('rejestracja').style.display="none";
    
    document.getElementById("logout-btn").style.display="flex";
    document.getElementById("signup-btn").style.display="none";
    document.getElementById("q").style.display="none";
    document.getElementById("myposts-btn").style.display="block";
    document.getElementById("mypets-btn").style.display="block";
    document.getElementById("myfav-btn").style.display="block";

    document.getElementById("mojekonto").style.display="block";
    document.getElementById("myid").value=firebase.auth().currentUser.uid;

    if(user != null){
     
    //pokazmojeposty(firebase.auth().currentUser.uid);
    //pokazmojeposty();
    }

  } else {
    // No user is signed in.
    console.log("no one");
    document.getElementById("logowanie").style.display="block";
    document.getElementById("logout-btn").style.display="none";
    document.getElementById("signup-btn").style.display="block";
    document.getElementById("q").style.display="block";
    document.getElementById("myposts-btn").style.display="none";
    document.getElementById("mypets-btn").style.display="none";
    document.getElementById("myfav-btn").style.display="none";

    document.getElementById("mojekonto").style.display="none";

  }
});
pokazposty();
pokazmojeposty();

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
 // document.getElementById("myid").value=firebase.auth().currentUser.uid;
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
     //window.alert("Zapisano.");
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
$(document).ready(function(){
  $("#postsinput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#listapostow .card").filter(function() {
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
     else col = 'green';
     newpet.style.display='flex';
     newpet.style.alignItems='center';
     newpet.style.justifyContent='space-between';
     newpet.style.fontSize='20px';
     if(childSnapshot.val().published=="true"){

      newpet.innerHTML='<span class="tag tag-'+'gray'+'">'+ childSnapshot.val().type+'</span><p>'+childSnapshot.val().name+' [P]</p>';
     }
     else{
     newpet.innerHTML='<span class="tag tag-'+col+'">'+ childSnapshot.val().type+'</span><p>'+childSnapshot.val().name+'</p>';
     }
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
    
  if(document.getElementById("petname").value!=''){
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/pets/').push({
    name: document.getElementById("petname").value,
    type: selected,
    published: "false"
   });
  };
   mojezwierzeta();
    // window.alert("Zapisano."); 
}
function ogolne(pet_uid,pet_name){
  localStorage.setItem('pet_uid',pet_uid);
  document.getElementById("podgladpostu").style.display='none';
  //console.log("ogolne "+typ+" "+pet_name);
  document.getElementById("namediv").innerText=pet_name;
  var rasa = document.getElementById("rasa");
  var umaszczenie = document.getElementById("umaszczenie");
  var charakter = document.getElementById("charakter");
  var upodobania = document.getElementById("upodobania");
  var dodinfo = document.getElementById("dodinfo");
  //var kategoria =document.getElementById("kategoriainfo");
  //var pet_uid = localStorage.getItem('pet_uid');
  firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/pets/'+pet_uid).once('value', function(snapshot) {
   // snapshot.forEach(function(childSnapshot) {
    {
     
     rasa.innerHTML=snapshot.val().breed ?? "";
     umaszczenie.innerHTML =snapshot.val().colour ?? "";
     charakter.innerHTML =snapshot.val().character ?? "";
     upodobania.innerHTML =snapshot.val().likes ?? "";
     dodinfo.innerHTML =snapshot.val().info ?? "";
      
    }

  }); //});
  
 // window.alert("Zapisano.");


}
function zapiszogolne(){
  document.getElementById("podgladpostu").style.display='none';
  var pet_uid = localStorage.getItem('pet_uid');
  //console.log("ogolne "+typ+" "+pet_name);
 // document.getElementById("namediv").innerText=pet_name;
  var rasa = document.getElementById("rasa").value;
  var umaszczenie = document.getElementById("umaszczenie").value;
  var charakter = document.getElementById("charakter").value;
  var upodobania = document.getElementById("upodobania").value;
  var dodinfo = document.getElementById("dodinfo").value;
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/pets/'+pet_uid).update({
    breed: rasa, 
    colour:umaszczenie,
    character:charakter,
    likes: upodobania,
    info : dodinfo
   });
  
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

function podglad(publikuj){

  document.getElementById("podgladpostu").style.display='block';
  var pet_uid = localStorage.getItem('pet_uid');
  var danewystawiajacego; var telefon;
  var usermail =firebase.auth().currentUser.email;
  firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/').on('value', function(childSnapshot) {
    {
    telefon=childSnapshot.val().tel ?? "";
    danewystawiajacego="Tel: "+telefon+", "+usermail+"<br> "+childSnapshot.val().name+" "+childSnapshot.val().lastname;
  
    // telefon = childSnapshot.val().tel;
     document.getElementById("wystawiajacy").innerHTML=danewystawiajacego;  
    }}); 
    var kategoria = document.getElementById('kategoria');
    var header = document.getElementById('header');
    var opis = document.getElementById('opisinput').value;
    var data = document.getElementById('datadodania');
    var dateTime='';
    var czyopublikowano=false;
  firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/pets/'+pet_uid).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    {
     
      kategoria1=snapshot.val().type;
      kategoria.innerHTML=snapshot.val().type;
      header1=snapshot.val().name;
      header.innerHTML = snapshot.val().name;
      czyopublikowano = snapshot.val().published;
      var col, im;
    var typ=kategoria1;
    if(typ == 'psy') {col = 'tag tag-teal'; im= 'dog.JPG';}
    else if(typ == 'koty'){ col = 'tag tag-purple';im= 'cat.JPG';}
    else if(typ =='gryzonie'){ col = 'tag tag-pink';im= 'hamster.JPG';}
    else {col = 'tag tag-gray'; im='camera.png';};
      
      document.getElementById('imgsrc').innerHTML="<img id='zdjecie' src="+im+" alt='rover'/>";
      kategoria.setAttribute('class', col);
      var today = new Date();
      var day = today.getDate();
      var month = today.getMonth()+1;
      if(day<10){day='0'+day;}
      if(month<10){month='0'+month;}
      var date = day+'-'+month+'-'+today.getFullYear();
      var min=today.getMinutes();

      if(today.getMinutes()<10){min='0'+today.getMinutes();}
      var time = today.getHours() + ":" +min;
      dateTime = date+' '+time;
      data.innerHTML = '<br>'+dateTime;
            
       
    }

  }); });
  if((publikuj==true) && (czyopublikowano=='false')){
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/pets/'+pet_uid).update({
      published:"true"
     });

  firebase.database().ref('/posts/').push({
    uid: firebase.auth().currentUser.uid,
    type: kategoria1,
    header: header1,
    description: opis,
    owner: danewystawiajacego,
    datetime: dateTime,
    tel: telefon,
    mail: usermail,
    petuid: pet_uid
   
   });

   document.getElementById("podgladpostu").style.display='none';
   window.alert('Post został opublikowany pomyślnie.');
   location.reload();
  }
  else if((publikuj==true) && (czyopublikowano=='true')){
    window.alert('Post został już opublikowany. Aby dodać kolejny - usuń poprzedni post.');
  }
}

function dodajzdjecie()
{
}

function pokazposty(){
var lista = document.getElementById('listapostow');

  lista.innerHTML="";
    firebase.database().ref('/posts/').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      {
         
        var owner_uid = childSnapshot.val().uid;
        var kategoria = childSnapshot.val().type;
        var header  =childSnapshot.val().header ?? "";
        var opis=childSnapshot.val().description ?? "";
        var danewystawiajacego=childSnapshot.val().owner;
        var datadodania='<br>'+childSnapshot.val(). datetime;
        var tel = childSnapshot.val().tel ?? "-";
        var mail = childSnapshot.val().mail ?? "-";
        var col, im;
        var typ=kategoria;
        if(typ == 'psy') {col = 'teal'; im= 'dog.JPG';}
        else if(typ == 'koty'){ col = 'purple';im= 'cat.JPG';}
        else if(typ =='gryzonie'){ col = 'pink';im= 'hamster.JPG';}
        else {col = 'gray'; im='camera.png';};

                
                lista.innerHTML=lista.innerHTML+"<div class='card'><div class='card-header'><img src="+im+" alt='rover'/></div><div class='card-body'><span class='tag tag-"+col+"'>"+kategoria+"</span><h4>"+header+"</h4><p>"+opis+"</p><div class='user'><img src='user.png' alt='user' /><div class='user-info'>"+danewystawiajacego+"</h5><small>"+datadodania+"</small></div></div><button type='button' style='margin-left:18%; font-size:10px; ;'>Kopiuj kod użytkownika</button></div></div>";

}

}); });
document.getElementById("showbtn").style.display='none';

}
function pokazmojeposty(){
  var klucz = firebase.auth().currentUser.uid;
  var lista = document.getElementById('listamoichpostow');
  
    lista.innerHTML="";
      firebase.database().ref('/posts/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        {
          if(firebase.auth().currentUser.uid==childSnapshot.val().uid){
     //if(klucz==childSnapshot.val().uid){
     
      var owner_uid = childSnapshot.val().uid;
      var kategoria = childSnapshot.val().type;
      var header  =childSnapshot.val().header;
      var opis=childSnapshot.val().description;
      var danewystawiajacego=childSnapshot.val().owner;
      var del_pet_uid = childSnapshot.key;
      var pet_uid = childSnapshot.val().petuid;
      var tel = childSnapshot.val().tel ?? "-";
      var mail = childSnapshot.val().mail ?? "-";
      //console.log(pet_uid);
      var datadodania='<br>'+childSnapshot.val().datetime;
      var col, im;
      var typ=kategoria;
      if(typ == 'psy') {col = 'teal'; im= 'dog.JPG';}
      else if(typ == 'koty'){ col = 'purple';im= 'cat.JPG';}
      else if(typ =='gryzonie'){ col = 'pink';im= 'hamster.JPG';}
      else {col = 'gray'; im='camera.png';};
//lista.innerHTML=lista.innerHTML+"<div class='card'><div class='card-header'><img src="+im+" alt='rover'/></div><div class='card-body'><span class='tag tag-"+col+"'>"+kategoria+"</span><h4>"+header+"</h4><p>"+opis+"</p><div class='user'><img src='https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo' alt='user' /><div class='user-info'> Tel: "+tel+", "+mail+"<br> "+danewystawiajacego+"</h5><small>"+datadodania+"</small></div></div></div></div>";
  
  lista.innerHTML=lista.innerHTML+"<div class='card'><div class='card-header'><div><button class='btn btn' onclick='usunpost(\""+del_pet_uid+"\",\""+pet_uid+"\")'>Usuń post</button><div><img src="+im+" alt='rover'/></div><div class='card-body'><span class='tag tag-"+col+"'>"+kategoria+"</span><h4>"+header+"</h4><p>"+opis+"</p><div class='user'><img src='https://yt3.ggpht.com/a/AGF-l7-0J1G0Ue0mcZMw-99kMeVuBmRxiPjyvIYONg=s900-c-k-c0xffffffff-no-rj-mo' alt='user' /><div class='user-info'><h5>"+danewystawiajacego+"</h5><small>"+datadodania+"</small></div></div></div></div>";
    // console.log(pet_uid);
}
}
  }); });
 // document.getElementById("showbtn").style.display='none';
  
  }
  function usunpost(del_pet_uid,pet_uid){
    firebase.database().ref('/posts/'+del_pet_uid).remove();
    firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/pets/'+pet_uid).update({
      published:"false"
     });
     location.reload();
  }

 
  function dodajklucz(){
  var klucz = document.getElementById("userkey").value;
  if(document.getElementById("userkey").value!=''){
    firebase.database().ref('users/'+klucz).on('value', function(snapshot) {
        if(!snapshot.hasChild("email")) window.alert("Ten użytkownik nie istnieje.");
        else{

      
        firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/favs/').push({
          favuid: klucz
         });
           favlist(klucz);
         }
      
   
     }); 
     }
  else{
    window.alert("Wprowadź wartość."); 
  }
  
 
  // mojezwierzeta();
    // window.alert("Zapisano."); 
  }
  function favlist(klucz){

    document.getElementById('myPets1').innerHTML="";
    //document.getElementById('myPetsinput').style.display = 'flex';

    firebase.database().ref('users/'+klucz).once('value', function(snapshot) {
   //   snapshot.forEach(function(childSnapshot) {
      {
       var lista = document.getElementById('myPets1');
       var newpet = document.createElement('button');
       newpet.setAttribute('class', 'list-group list-group-flush list-group-item');
      // var typ =  childSnapshot.val().type;
       var col;
     
       col = 'green';
       newpet.style.display='flex';
       newpet.style.alignItems='center';
       newpet.style.justifyContent='space-between';
       newpet.style.fontSize='20px';
       //if(childSnapshot.val().published=="true")
       {
  
        newpet.innerHTML='<span class="tag tag-'+'green'+'"> </span><p>'+snapshot.val().email+'</p>';
       }
       newpet.setAttribute('id',snapshot.key);
       newpet.setAttribute('value', snapshot.val().name + ' '+ snapshot.val().lastname);
       newpet.setAttribute('onclick','favposts(this.id, this.value)');
       
       lista.appendChild(newpet);     
      }
  
    }); //});
  }
  function favposts(id, value){




  }
  function copy() {
    /* Get the text field */
    var copyText = document.getElementById("myid");
  
    /* Select the text field */
   // copyText.select();
   // copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
   // alert("Copied the text: " + copyText.value);
  }