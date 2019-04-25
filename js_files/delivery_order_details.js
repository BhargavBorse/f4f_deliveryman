var dbRef = firebase.database().ref('users');
var adRef = firebase.database().ref('Admin');
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
        
        
        var eventRef = firebase.database().ref();
        
        var customer_name;
        var customer_phone_no;
        var customer_address;
        var customer_pincode;
        var customer_email;
        var item_name;
        var delivery_date;
        var item_quantity;
        var item_price;
        var order_type;
        
        
        
        eventRef.child('Delivery_Man_Details').child(Did).child('Order').child(Oid).on('value',function(dm_order_snapshot){
            var dm_order = dm_order_snapshot.val();
            // alert('sr');
            // console.log(return_dm_order);
            document.getElementById('customer_name').value = dm_order.customer_name;
            document.getElementById('p_no').value = dm_order.customer_phone_no;
            document.getElementById('address').value = dm_order.customer_address;
            document.getElementById('pin_code').value = dm_order.customer_pincode;
            document.getElementById('email').value = dm_order.customer_email;                                    
            document.getElementById('item_name').value = dm_order.item_name;                                    
            document.getElementById('delivery_date').value = dm_order.delivery_date;
            document.getElementById('quantity').value = dm_order.item_quantity;
            document.getElementById('price').value = dm_order.item_price;
            document.getElementById('order_type').value = dm_order.order_type;
            
            
            
            customer_name = dm_order.customer_name;
            customer_phone_no = dm_order.customer_phone_no;
            customer_address = dm_order.customer_address;
            customer_pincode = dm_order.customer_pincode;
            customer_email = dm_order.customer_email;
            item_name = dm_order.item_name;
            delivery_date = dm_order.delivery_date;
            item_quantity = dm_order.item_quantity;
            item_price = dm_order.item_price;
            order_type = dm_order.order_type;
            
            
            
            
            
            
        });
        
        document.getElementById('update_order').onclick = function(){
            dbRef.on('value',function(user_ids_snapshot){
                var user_ids = user_ids_snapshot.val();
                var user_ids_keys = Object.keys(user_ids);
                for(var i = 0;i<user_ids_keys.length;i++){
                    dbRef.child(user_ids_keys[i]).child('Order').on('value',function(order_details_snapshot){
                        
                        var order_details = order_details_snapshot.val();
                        var order_keys = Object.keys(order_details);
                        
                        for(var j=0;j<order_keys.length;j++)
                        {
                            dbRef.child(user_ids_keys[i]).child('Order').child(order_keys[j]).on('value',function(order_details_sub_snapshot){
                                var order_deep_details = order_details_sub_snapshot.val();
                                if(order_deep_details.customer_name == customer_name 
                                    && order_deep_details.customer_phone_no == customer_phone_no 
                                    && order_deep_details.customer_address == customer_address
                                    && order_deep_details.customer_pincode == customer_pincode
                                    && order_deep_details.customer_email == customer_email
                                    && order_deep_details.item_name == item_name
                                    && order_deep_details.delivery_date == delivery_date
                                    && order_deep_details.item_quantity == item_quantity
                                    && order_deep_details.item_price == item_price
                                    && order_deep_details.order_type == order_type)
                                    {
                                        var order_status_select = document.getElementById('order_status').value;
                                        var deposit_taken_select = document.getElementById('deposit_taken').value;
                                        if(order_status_select == 'delivered')
                                        {
                                            dbRef.child(user_ids_keys[i]).child('Order').child(order_keys[j]).update({
                                                "order_status" : order_status_select,
                                                "deposit_taken" : deposit_taken_select
                                            });
                                            
                                            alert('Updated Successfully');
                                        }
                                        
                                    }
                                });
                            }
                        });
                    }
                });
                
                var order_status_select = document.getElementById('order_status').value;
                var deposit_taken_select = document.getElementById('deposit_taken').value;
                if(order_status_select == 'delivered')
                {
                    adRef.child('Previous_History').child(Oid).update({
                        "order_status" : order_status_select,
                        "deposit_taken" : deposit_taken_select
                    });
                    alert('Updated Successfully');
                }
                
                
            };
            
            // eventRef.child('Delivery_Man_Details').on('value',function(deliveryman_details_snapshot){
            //     var delivery_man_details = deliveryman_details_snapshot.val();
            //     var deliveryman_keys = Object.keys(delivery_man_details);
            //     for(var i=0;i<deliveryman_keys.length;i++){
            
            //         firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).on('value',function(devManDetsSnapshot){
            
            //             firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).child('Order').on('value',function(dm_order_keys_snapshot){
            //                 var dm_order_keys = dm_order_keys_snapshot.val();
            //                 var dm_order_keys_AC = Object.keys(dm_order_keys);
            //                 for(var j=0;j<dm_order_keys_AC.length;j++)
            //                 {
            //                     firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).child('Order').child(dm_order_keys_AC[j]).on('value',function(dm_order_snapshot){
            //                         var dm_order = dm_order_snapshot.val();
            
            //                         document.getElementById('customer_name').value = dm_order.name;
            //                         document.getElementById('p_no').value = dm_order.mobile_number;
            //                         document.getElementById('address').value = dm_order.address;
            //                         document.getElementById('pin_code').value = dm_order.pincode;
            //                         document.getElementById('email').value = dm_order.email;                                    
            //                         document.getElementById('item_name').value = dm_order.item_name;                                    
            //                         document.getElementById('delivery_date').value = dm_order.ordered_date;
            //                         document.getElementById('quantity').value = dm_order.quantity;
            //                         document.getElementById('price').value = dm_order.price;
            //                         document.getElementById('order_type').value = dm_order.order_type;
            //                     });
            //                 }
            //             }); 
            //         });
            //     }
            // });
            
            // dbRef.child(user.uid)
            var div_1 = document.createElement('div');
            
            // var item_dropdown = document.createElement("select");
            document.getElementsByClassName('select-dropdown')[0].appendChild(div_1);
            var select = document.createElement('select');
            select.setAttribute('class','form-control');
            div_1.appendChild(select);
            
            var k = document.createElement("option");
            select.appendChild(k);
            j = document.createTextNode("Pending Delivery");
            k.appendChild(j);
            
            var a = document.createElement("option");
            select.appendChild(a);
            b = document.createTextNode("Delivered");
            a.appendChild(b);
            
            var c = document.createElement("option");
            select.appendChild(c);
            d = document.createTextNode("Return");
            c.appendChild(d);
            
            document.getElementById('update_order').onclick = function(){   
                
                var Ref = firebase.database().ref();
                Ref.child('users').on('value',function(user_details_snapshot){
                    var user_details = user_details_snapshot.val();
                    var user_keys = Object.keys(user_details);
                    for(var i=0;i<user_keys.length;i++){
                        
                        firebase.database().ref().child('users').child(user_keys[i]).on('value',function(userDetsSnapshot){
                            var userDets = userDetsSnapshot.val();
                            for(var K=0;K<userDets.length;K++){
                                firebase.database().ref().child('users').child(user_keys[i]).child('Order').on('value',function(user_order_keys_snapshot){
                                    var user_order_keys = user_order_keys_snapshot.val();
                                    var user_order_keys_AC = Object.keys(user_order_keys);
                                    for(var j=0;j<user_order_keys_AC.length;j++)
                                    {
                                        alert(user_order_keys_AC);
                                        firebase.database().ref().child('users').child(user_keys[i]).child('Order').child(user_order_keys_AC[j]).on('value',function(user_order_snapshot){
                                            var user_order = user_order_snapshot.val();
                                            
                                            if(user_keys[i] == user_order.Placed_By){
                                                alert(user_keys[i] == user_order.Placed_By);
                                                firebase.database().ref().child('users').child(user_keys[i]).child('Order').child(user_order_keys_AC).push({
                                                    Order_Status : "boiboi"
                                                });
                                            }
                                        });
                                    }
                                }); 
                            }
                        });
                    }
                });
            }
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