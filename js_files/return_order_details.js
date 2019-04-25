// alert('sihf');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        document.getElementById('man_name').innerHTML = user.email;       
        document.getElementById('email_field').value = user.email;                

        //   window.location = 'index.html';
        alert(user.email);
        var url_string = window.location.href;
        var url = new URL (url_string);
        var Oid = url.searchParams.get('Oid');
        var Did = url.searchParams.get('Did');
            
        var eventRef_return = firebase.database().ref();
        
        eventRef_return.child('Delivery_Man_Details').child(Did).child('Order').child(Oid).on('value',function(return_dm_order_snapshot){
            var return_dm_order = return_dm_order_snapshot.val();
            // alert('sr');
            // console.log(return_dm_order);
            document.getElementById('customer_name').value = return_dm_order.customer_name;
            document.getElementById('p_no').value = return_dm_order.customer_phone_no;
            document.getElementById('address').value = return_dm_order.customer_address;
            document.getElementById('pin_code').value = return_dm_order.customer_pincode;
            document.getElementById('email').value = return_dm_order.customer_email;                                    
            document.getElementById('item_name').value = return_dm_order.item_name;
            document.getElementById('return_date').value = return_dm_order.return_date;
            document.getElementById('quantity').value = return_dm_order.item_quantity;
            document.getElementById('price').value = return_dm_order.item_price;
            document.getElementById('order_type').value = return_dm_order.order_type;
            document.getElementById('order_status').value = return_dm_order.order_status;
        });
        
        
        
        // eventRef_return.child('Delivery_Man_Details').on('value',function(deliveryman_details_snapshot){
        //     var delivery_man_details = deliveryman_details_snapshot.val();
        //     var deliveryman_keys = Object.keys(delivery_man_details);
        //     for(var i=0;i<deliveryman_keys.length;i++){
                
        //         firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).on('value',function(devManDetsSnapshot){
                    
        //             firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).child('Order').on('value',function(return_dm_order_keys_snapshot){
        //                 var return_dm_order_keys = return_dm_order_keys_snapshot.val();
        //                 var return_dm_order_keys_AC = Object.keys(return_dm_order_keys);
        //                 for(var j=0;j<return_dm_order_keys_AC.length;j++)
        //                 {
        //                     firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).child('Order').child(return_dm_order_keys_AC[j]).on('value',function(return_dm_order_snapshot){
        //                         var return_dm_order = return_dm_order_snapshot.val();
                                
        //                         document.getElementById('customer_name').value = return_dm_order.name;
        //                         document.getElementById('p_no').value = return_dm_order.mobile_number;
        //                         document.getElementById('address').value = return_dm_order.address;
        //                         document.getElementById('pin_code').value = return_dm_order.pincode;
        //                         document.getElementById('email').value = return_dm_order.email;                                    
        //                         document.getElementById('item_name').value = return_dm_order.item_name;
        //                         document.getElementById('return_date').value = return_dm_order.delivery_return_date;
        //                         document.getElementById('quantity').value = return_dm_order.quantity;
        //                         document.getElementById('price').value = return_dm_order.price;
        //                         document.getElementById('order_type').value = return_dm_order.order_type;
        //                         document.getElementById('order_status').value = return_dm_order.order_status;
        //                     });
        //                 }
        //             }); 
        //         });
        //     }
        // });
        
    } 
    else {
        // No user is signed in.
        // alert('No user is signed in.');
        window.location = 'login.html';
    }
});

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


function logout(){
    firebase.auth().signOut();
    // alert('');
    window.location = 'login.html';
}