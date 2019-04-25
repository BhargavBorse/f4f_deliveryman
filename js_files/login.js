firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    
    window.location = 'index.html';
    // alert(user.email);
    
  } else {
    // No user is signed in.
    
  }
});






// database.child('Delivery_Man_Details').child(user.uid).child('role').child('admin').on('value',function(getadminrolesnapshot){

//   var getadminrole = getadminrolesnapshot.val();
//   console.log(getadminrole);
//   if(getadminrole == true)
//   {
//     alert("You're admin, you can proceed");
//     window.location.href = 'index.html';
//   }
//   else
//   {
//     alert('Sorry, you aren"t admin');
//   }

// });



document.getElementById('login').onclick = function(){
  
  
  var dbRef_men = firebase.database().ref();
  var itemRef_men = firebase.database().ref('Delivery_Man_Details');
  dbRef_men.child('Delivery_Man_Details').on('value',function(deliveryman_details_snapshot){
    var deliveryman_details = deliveryman_details_snapshot.val();
    var deliveryman_keys = Object.keys(deliveryman_details);
    for(var i=0;i<deliveryman_keys.length;i++)
    {
      firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).on('value',function(deliveryman_snapshot){
        var deliveryman_details = deliveryman_snapshot.val();
        var userEmail = document.getElementById("email_field").value;
        // alert(deliveryman_details.Name);
        if(userEmail == deliveryman_details.Email){
          // alert('hello');
          var userEmail = document.getElementById("email_field").value;
          var userPass = document.getElementById("password_field").value;
          
          firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            window.alert("Error : " + errorMessage);
            window.alert("Error in code" + errorCode);
          });
          return true;
        }
        else{
          // alert('you are not deliveryman');
        }
      });
    }
  });
}

// function login(){
//   alert('sdg');

//   var userEmail = document.getElementById("email_field").value;
//   var userPass = document.getElementById("password_field").value;

//   firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;

//     window.alert("Error : " + errorMessage);
//     window.alert("Error in code" + errorCode);
//     // ...
//   });

// }

function create_account(){
  
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    
    window.alert("Error : " + errorMessage);
    
  });
  
}

function forgot_password(){
  
  var auth = firebase.auth();
  var userEmail = document.getElementById("email_field").value;
  
  auth.sendPasswordResetEmail(userEmail).then(function() {
    // Email sent.
    window.alert("To reset password please check your email");
  }).catch(function(error) {
    // An error happened.
    window.alert("Error");
  });
  
}

function send_verification(){
  
  var user = firebase.auth().currentUser;
  
  user.sendEmailVerification().then(function() {
    // Email sent.
    window.alert("Verification sent to your E-Mail");
  }).catch(function(error) {
    // An error happened.
    window.alert("Error" + error.message);
  });
  
}

function logout(){
  firebase.auth().signOut();
  window.location = 'login-2.html';
}
