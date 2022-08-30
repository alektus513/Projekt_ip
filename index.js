var user= firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) { 
    user = firebase.auth().currentUser;
    uid=user.uid;  
    localStorage.setItem('uid',uid);
    var email_id = user.email;
    userdata1();
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
    if(user != null){}
  } else {
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
function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    location.reload();
    var errorCode = error.code;
    var errorMessage = error.message;
   window.alert("Błąd przy logowaniu! Sprawdź czy Twój email i hasło są poprawne"); 
  }); 
}
function logout(){
  firebase.auth().signOut();
  location.href = "index.html";
  document.reload();
  location.reload(); 
}
function signupview(){
  document.getElementById("rejestracja").style.display="block";
}
function signUp(){    
    var userEmail = document.getElementById("userEmail").value;
    var userPassword = document.getElementById("userPassword").value;
    var userPasswordConfirm = document.getElementById("passwordConfirm").value;
    if(validateUserData(userEmail, userPassword, userPasswordConfirm))
    {
      firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword)
    .then((userCredential) => {})
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
    });

    document.getElementById("rejestracja").style.display="none";
    window.alert("Rejestracja użytkownika powiodła się");
    }
}
function validateUserData(userEmail, userPassword, userPasswordConfirm)
{
  if (userEmail!='' ) {
    if (!validateEmail(userEmail)){
      window.alert("Błąd przy rejestracji! Sprawdź czy Twój email jest poprawny");
      return false;
    }  
  } else {
    window.alert("Błąd przy rejestracji! Email nie może być pusty");
    return false;
    }
  if (userPassword!='' && userPasswordConfirm!='') {
    if(userPassword.length < 6) {
      window.alert("Błąd przy rejestracji! Hasło musi zawierać przynajmniej 6 znaków");
      return false;
    }
    if(!validatePassword(userPassword, userPasswordConfirm)) {
      window.alert("Błąd przy rejestracji! Powtórz hasło");
      return false;
    }
  } else {
    window.alert("Błąd przy rejestracji! Hasło nie może być puste");
    return false;
    }
    return true;
}
function validateEmail(userEmail) {
  var userEmailFormate = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (userEmail.match(userEmailFormate)){ return true;
  } else { return false;
  }}
function validatePassword(userPassword, passwordConfirm) {
  if (userPassword === passwordConfirm) {  return true;
  } else {   return false;
  }}

function userdata1(){
  firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/').on('value', function(childSnapshot) {
    {
     document.getElementById("imie").value=childSnapshot.val().name;
     document.getElementById("nazwisko").value=childSnapshot.val().lastname;
     document.getElementById("email").value=childSnapshot.val().email;
     document.getElementById("nrtel").value=childSnapshot.val().tel;
     document.getElementById("miasto").value=childSnapshot.val().city;
     
    }}); 
}
function saveuserdata(){
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid).update({
    name: document.getElementById("imie").value,
    lastname:document.getElementById("nazwisko").value,
    email: document.getElementById("email").value,
    tel :  document.getElementById("nrtel").value,
    city: document.getElementById("miasto").value
     });
     window.alert("Zapisano.");
}

$(document).ready(function(){
  $("#tableSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
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
}
function ogolne(pet_uid,pet_name){
  localStorage.setItem('pet_uid',pet_uid);
  document.getElementById("podgladpostu").style.display='none';
  document.getElementById("namediv").innerHTML=pet_name;
  var rasa = document.getElementById("rasa");
  var umaszczenie = document.getElementById("umaszczenie");
  var charakter = document.getElementById("charakter");
  var upodobania = document.getElementById("upodobania");
  var dodinfo = document.getElementById("dodinfo");
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
}
function zapiszogolne(){
  document.getElementById("podgladpostu").style.display='none';
  var pet_uid = localStorage.getItem('pet_uid');
  var rasa = document.getElementById("rasa").value;
  var umaszczenie = document.getElementById("umaszczenie").value;
  var charakter = document.getElementById("charakter").value;
  var upodobania = document.getElementById("upodobania").value;
  var dodinfo = document.getElementById("dodinfo").value;
  var specjalne = document.getElementById("specjalne").value;
  firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/pets/'+pet_uid).update({
    breed: rasa, 
    colour:umaszczenie,
    character:charakter,
    likes: upodobania,
    info : dodinfo,
    specjal:specjalne
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

                
        lista.innerHTML=lista.innerHTML+"<div class='card'><div class='card-header'><img src="+im+" alt='rover'/></div><div class='card-body'><span class='tag tag-"+col+"'>"+kategoria+"</span><h4>"+header+"</h4><p>"+opis+"</p><div class='user'><img src='user.png' alt='user' /><div class='user-info'>"+danewystawiajacego+"</h5><small>"+datadodania+"</small></div></div><button onclick='copy1(\""+owner_uid+"\")' type='button' style='margin-left:18%; font-size:10px; ;'>Kopiuj kod użytkownika</button></div></div>";

}

}); });
document.getElementById("showbtn").style.display='none';

}
function pokazpostyuzytkownika(klucz){
  console.log(klucz);
  var lista = document.getElementById('listapostowuzytkownika');
  
    lista.innerHTML="";
      firebase.database().ref('/posts/').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
        {
     if(klucz==childSnapshot.val().uid){
     
      var owner_uid = childSnapshot.val().uid;
      var kategoria = childSnapshot.val().type;
      var header  =childSnapshot.val().header;
      var opis=childSnapshot.val().description;
      var danewystawiajacego=childSnapshot.val().owner;
      var del_pet_uid = childSnapshot.key;
      var pet_uid = childSnapshot.val().petuid;
      var tel = childSnapshot.val().tel ?? "-";
      var mail = childSnapshot.val().mail ?? "-";
      var datadodania='<br>'+childSnapshot.val().datetime;
      var col, im;
      var typ=kategoria;
      if(typ == 'psy') {col = 'teal'; im= 'dog.JPG';}
      else if(typ == 'koty'){ col = 'purple';im= 'cat.JPG';}
      else if(typ =='gryzonie'){ col = 'pink';im= 'hamster.JPG';}
      else {col = 'gray'; im='camera.png';};
lista.innerHTML=lista.innerHTML+"<div class='card'><div class='card-header'><img src="+im+" alt='rover'/></div><div class='card-body'><span class='tag tag-"+col+"'>"+kategoria+"</span><h4>"+header+"</h4><p>"+opis+"</p><div class='user'><img src='user.png' alt='user' /><div class='user-info'>"+danewystawiajacego+"</h5><small>"+datadodania+"</small></div></div></div></div>";
}
}
  }); });
  
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

      var imie = (snapshot.child("name").val());
      var nazwisko = (snapshot.child("lastname").val());
          firebase.database().ref('/users/' + firebase.auth().currentUser.uid+'/favs/').push({
            favuid:klucz,
            name: imie,
            lastname: nazwisko
           });
           favlist();
         }
      
   
     }); 
     }
  else{
    window.alert("Wprowadź wartość."); 
  }
  
  }
  function favlist(){

    document.getElementById('myPets1').innerHTML="";

    firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/favs/').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      {
       var lista = document.getElementById('myPets1');
       var nevfav = document.createElement('button');
       nevfav.setAttribute('class', 'list-group list-group-flush list-group-item');
   
       var col;
     
       col = 'green';
       nevfav.style.display='flex';
       nevfav.style.alignItems='center';
       nevfav.style.justifyContent='space-between';
       nevfav.style.fontSize='20px';
       //if(childSnapshot.val().published=="true")
       {
        var xbtn = document.createElement('button');
        xbtn.setAttribute('class', 'xButton');
        xbtn.setAttribute('id',childSnapshot.val().favuid);
        xbtn.setAttribute('onclick','deletefav(this.id)');
        xbtn.setAttribute('title','Usuń');
        xbtn.innerText="x";
        nevfav.innerHTML='<span></span><p>'+childSnapshot.val().name+' '+childSnapshot.val().lastname+'</p>';
       }
       nevfav.setAttribute('id',childSnapshot.val().favuid);
       nevfav.setAttribute('value', snapshot.val().name + ' '+ snapshot.val().lastname);
       nevfav.setAttribute('onclick','pokazpostyuzytkownika(this.id)');
       nevfav.append(xbtn);
       lista.appendChild(nevfav);     
      }
  
    }); });
  }
  function deletefav(id){
    
    firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/favs/').once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {  
      {   
       if(childSnapshot.val().favuid==id)
       {
        
        firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/favs/'+childSnapshot.key).remove();
       }
      }
  
    }); });  location.reload();
    
  }
  function copy() {
    var copyText = document.getElementById("myid");
    navigator.clipboard.writeText(copyText.value);
  }
  function copy1(text) {
    navigator.clipboard.writeText(text);
  }
  function OgolnePDF(){
  var petID=localStorage.getItem('pet_uid');
  firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/pets/'+petID+"/").on('value', function(childSnapshot) {
    {
     var imiez = childSnapshot.val()?.name;
     var rasa = childSnapshot.val()?.breed ||"-";
     var charakter =childSnapshot.val()?.character||"-";
     var umaszczenie =childSnapshot.val()?.colour||"-";
     var charakter=childSnapshot.val()?.character||"-";
     var upodobania =childSnapshot.val()?.likes||"-";
     var specjalne =childSnapshot.val()?.special||"-";
     var dodinfo= childSnapshot.val()?.info||"-";
     firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', function(childSnapshot) {
      {
         var imie = childSnapshot.val().name;
         var nazwisko = childSnapshot.val().lastname; 
         var telefon =childSnapshot.val().tel;
         var data="";
         var miasto=childSnapshot.val().city;
         var email=childSnapshot.val()?.email;
        var docDefinition={
          pageMargins: [ 50,50,50,50 ],
          content:[
            
            {text: new Date().toISOString().slice(0, 10),fontSize:9},
            {text: " ", fontSize:10},
            {text: "INFORMACJE OGÓLNE ", fontSize:12, bold:true, decoration:'underline'},
            {text: " ", fontSize:20},
            {text: "Dane właściciela ", fontSize:10,lineHeight: 1.5},
            {canvas: [{ type: 'line', x1: 15, y1: 0, x2: 515-15, y2: 0, lineWidth: 0.5 }] },
           {text: " ", fontSize:20},
           {columns: [
            { width: '*', text: '' },
            {
                width: 'auto',
                
                  table: {
                   
                    headerRows: 0,
                    
                    body: [
            
                      [{ text: 'Imię i nazwisko',alignment: 'left'},{ text: imie+' '+nazwisko ,bold:true}],
                      [{ text: 'Miasto',alignment: 'left'},{ text: miasto ,bold:true}],
                      [{ text: 'E-mail',alignment: 'left'},{ text: email,bold:true}],
                      [{ text: 'Telefon kontaktowy',alignment: 'left'},{ text: telefon ,bold:true}],
                      
                    ]
                  },
                layout:'lightHorizontalLines'
                },
            
            { width: '*', text: '' },
        ]
    },
         
           {text: " ", fontSize:40},
           {text: "Informacje ogólne o zwierzęciu ", fontSize:10,lineHeight: 1.5},
           {canvas: [{ type: 'line', x1: 15, y1: 0, x2: 515-15, y2: 0, lineWidth: 0.5 }] },
           {text: " ", fontSize:20},
           {columns: [
            { width: '*', text: '' },
            {
                width: 'auto',
                  table: {
                    headerRows: 0,
                    body: [
                      [{ text: 'Imię',alignment: 'left'},{ text: imiez ,bold:true}],
                      [{ text: 'Rasa',alignment: 'left'},{ text: rasa ,bold:true}],
                      [{ text: 'Umaszczenie',alignment: 'left'},{ text: umaszczenie ,bold:true}],
                      [{ text: 'Charakter',alignment: 'left'},{ text: charakter ,bold:true}],
                      [{ text: 'Upodobania ',alignment: 'left'},{ text: upodobania ,bold:true}],
                      [{ text: 'Specjalne potrzeby',alignment: 'left'},{ text: specjalne ,bold:true}],
                      [{ text: 'Dodatkowe informacje',alignment: 'left'},{ text: dodinfo,bold:true}],
                      
                    ]
                  },
                layout:'lightHorizontalLines'
                },
            
            { width: '*', text: '' },
        ]
    },

       ] //content
        }
        pdfMake.createPdf(docDefinition).download("Ogólne_"+imiez);
        
     }});
      
    }});

  }

  function OgolnePDF2(){
    var petID=localStorage.getItem('pet_uid');
    var rows=[]; var idx=0;
   firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/pets/'+petID+"/").on('value', function(childSnapshot) {
    {
      var imiez = childSnapshot.val()?.name;
    firebase.database().ref('users/'+firebase.auth().currentUser.uid+'/pets/'+petID+"/Med/").once('value', function(snapshot) {
      {
        snapshot.forEach(function(childSnapshot) {  
        idx=idx+1;
        console.log("key: "+snapshot.val().name);
        var data = childSnapshot.val()?.data||"-";
        var opis = childSnapshot.val()?.opis||"-";
        var zabiegi = childSnapshot.val()?.zabiegi||"-";
        var zalecenia = childSnapshot.val()?.zalecenia||"-";
        rows.push(
          [{ text: idx,alignment: 'left',fontSize: 8},{ text: "" ,fontSize: 8}],
          [{ text: 'Data',alignment: 'left'},{ text: data ,bold:true}],
          [{ text: 'Opis',alignment: 'left'},{ text: opis ,bold:true}],
          [{ text: 'Zabiegi',alignment: 'left'},{ text: zabiegi ,bold:true}],
          [{ text: 'Zalecenia',alignment: 'left'},{ text: zalecenia ,bold:true}],
          [{ text: "",alignment: 'left'},{ text: "" ,fontSize: 20}] );
    });
       firebase.database().ref('users/'+firebase.auth().currentUser.uid).on('value', function(childSnapshot) {
        {
          var imie = childSnapshot.val()?.name||"-";
          var nazwisko = childSnapshot.val()?.lastname||"-"; 
          var telefon =childSnapshot.val()?.tel||"-";
          var data="";
          var miasto=childSnapshot.val()?.city||"-";
          var email=childSnapshot.val()?.email||"-";
        var docDefinition={
          pageMargins: [ 50,50,50,50 ],
          content:[
            
            {text: new Date().toISOString().slice(0, 10),fontSize:9},
            {text: " ", fontSize:10},
            {text: "HISTORIA MEDYCZNA: "+imiez, fontSize:12, bold:true, decoration:'underline'},
            {text: " ", fontSize:20},
            {text: "Dane właściciela ", fontSize:10,lineHeight: 1.5},
            {canvas: [{ type: 'line', x1: 15, y1: 0, x2: 515-15, y2: 0, lineWidth: 0.5 }] },
           {text: " ", fontSize:20},
           {columns: [
            { width: '*', text: '' },
            {
                width: 'auto',
                
                  table: {
                   
                    headerRows: 0,
                    
                    body: [
            
                      [{ text: 'Imię i nazwisko',alignment: 'left'},{ text: imie+' '+nazwisko ,bold:true}],
                      [{ text: 'Miasto',alignment: 'left'},{ text: miasto ,bold:true}],
                      [{ text: 'E-mail',alignment: 'left'},{ text: email,bold:true}],
                      [{ text: 'Telefon kontaktowy',alignment: 'left'},{ text: telefon ,bold:true}],
                      
                    ]
                  },
                layout:'lightHorizontalLines'
                },
            
            { width: '*', text: '' },
        ]
    },
           
             {text: " ", fontSize:40},
             {text: "Historia medyczna", fontSize:10,lineHeight: 1.5},
             {canvas: [{ type: 'line', x1: 15, y1: 0, x2: 515-15, y2: 0, lineWidth: 0.5 }] },
             {text: " ", fontSize:20},
             {columns: [
              { width: '*', text: '' },
              {
                  width: 'auto',
                    table: {
                      headerRows: 0,
                      body: rows
                    },
                  layout:'lightHorizontalLines'
                  },
              
              { width: '*', text: '' },
          ]
      },
  
         ] //content
          }
          pdfMake.createPdf(docDefinition).download("Historia_med_"+imiez);
          
       }});
      
      }});
    }});
  
    }