if(user){
    
}
else{
    alert("no user");
}
function logout(){
    firebase.auth().signOut();
    window.location = 'login.html';
}
