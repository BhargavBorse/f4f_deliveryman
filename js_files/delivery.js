firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        
        document.getElementById('man_name').innerHTML = user.email;
        document.getElementById('email_field').value = user.email;
        //   window.location = 'index.html';
        var tableRef = document.getElementById('order_details').getElementsByTagName('tbody')[0];
        
        // alert(user.uid);
        
        
        firebase.database().ref().child('Admin').child('users_invoice').on('value',function(invoice_snapshot){
            var invoice_id = invoice_snapshot.val();
            var invoice_keys = Object.keys(invoice_id);
            
            var in_id = invoice_keys;
            // alert(user_uid_keys);
            for(var i=0;i<invoice_keys.length;i++)
            {
                firebase.database().ref().child('Admin').child('users_invoice').child(invoice_keys[i]).on('value',function(invoiceidSnapshot){
                    var invoice = invoiceidSnapshot.val();
                    // alert(invoice.id)
                    
                    var eventRef = firebase.database().ref();
                    eventRef.child('Delivery_Man_Details').on('value',function(deliveryman_details_snapshot){
                        var delivery_man_details = deliveryman_details_snapshot.val();
                        var deliveryman_keys = Object.keys(delivery_man_details);
                        
                        // var keys = deliveryman_keys.value;
                        // var name = keys.Name;
                        // alert(keys.Name);
                        
                        for(var k=0;k<deliveryman_keys.length;k++){
                            
                            firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[k]).on('value',function(devManDetsSnapshot){
                                var devManDets = devManDetsSnapshot.val();
                                // var inner_id = invoice.invoice_id;
                                // if(invoice.invoice_id == inner_id)
                                // {
                                //     alert(invoice_keys);
                                // }
                                if(devManDets.Email === user.email)
                                {
                                    // alert('order deliveryman = ' + final_ac_details.deliveryman);
                                    var dev_email =  devManDets.Email;
                                    
                                    if(invoice.deliveryman === dev_email)
                                    {
                                        if(invoice.order_status == 'Completed')
                                        {
                                            
                                        }
                                        else
                                        {
                                            
                                            var hide = document.getElementById('no_order');
                                            hide.style.visibility = 'hidden';
                                            
                                            var cust_name = invoice.invoice_id;
                                            var cust_address = invoice.item_total_gst;
                                            var order_date = invoice.item_total_deposit;
                                            var return_date = invoice.item_total_price;  
                                            var order_status = invoice.order_status;
                                            var deposit_status = invoice.deposit_status;                                 
                                            var id = invoice.invoice_id;
                                            // alert();
                                            // var uid = user_uid_keys;
                                            
                                            // alert(id);
                                            // alert(uid);
                                            var newRow   = tableRef.insertRow(0);
                                            
                                            //Cells
                                            var customer_name_cell = newRow.insertCell(0);
                                            var item_price_cell = newRow.insertCell(1);
                                            var order_date_cell = newRow.insertCell(2);
                                            var return_date_cell = newRow.insertCell(3);
                                            var order_status_cell = newRow.insertCell(4);
                                            var deposit_status_cell = newRow.insertCell(5);                                    
                                            var item_more_info_link = newRow.insertCell(6);
                                            
                                            //Creation of More Info Link (Not Cell)
                                            var item_more_info_actual_link = document.createElement("a");
                                            var item_button = document.createElement("button");
                                            item_more_info_actual_link.appendChild(item_button);
                                            var item_more_info_actual_link_text = document.createTextNode('');
                                            item_more_info_actual_link.appendChild(item_more_info_actual_link_text);
                                            item_button.setAttribute('class', "btn btn-block btn-primary fa fa-info");
                                            // item_button.setAttribute('class', "fa fa-info");
                                            // item_button.setAttribute('style', "width: 40%; height: 30px; background-color: silver;");
                                            item_more_info_actual_link.href = "order_list.html?id="+id;
                                            // item_more_info_actual_link.href = "delivery_order_details.html?id="+id;
                                            // item_more_info_actual_link.setAttribute('href','order_details.html?id='+id+'&uid='+order_date);
                                            
                                            //CellValue
                                            var customer_name_cell_value = document.createTextNode(cust_name);
                                            var item_price_cell_value = document.createTextNode(cust_address);
                                            var order_date_text = document.createTextNode(order_date);
                                            var return_date_text = document.createTextNode(return_date);
                                            var order_status_text = document.createTextNode(order_status);
                                            var deposit_status_text = document.createTextNode(deposit_status);
                                            
                                            //Append Cell value to cell   
                                            customer_name_cell.appendChild(customer_name_cell_value);
                                            item_price_cell.appendChild(item_price_cell_value);
                                            order_date_cell.appendChild(order_date_text);
                                            return_date_cell.appendChild(return_date_text);
                                            item_more_info_link.appendChild(item_more_info_actual_link);
                                            order_status_cell.appendChild(order_status_text);
                                            deposit_status_cell.appendChild(deposit_status_text);
                                            
                                        }
                                    }
                                    
                                }
                                
                            });
                        }
                    });
                    // });
                    // }
                    // });
                });            
            }
        });
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        // var tableRef = document.getElementById('order_details').getElementsByTagName('tbody')[0];
        
        
        
        // var eventRef = firebase.database().ref();
        // eventRef.child('Delivery_Man_Details').on('value',function(deliveryman_details_snapshot){
        //     var delivery_man_details = deliveryman_details_snapshot.val();
        //     var deliveryman_keys = Object.keys(delivery_man_details);
        //     for(var i=0;i<deliveryman_keys.length;i++){
        
        //         firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).on('value',function(devManDetsSnapshot){
        
        //             var devManDets = devManDetsSnapshot.val();
        //             if(devManDets.Email == user.email)
        //             {
        //                 firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).child('Order').on('value',function(dm_order_keys_snapshot){
        //                     var dm_order_keys = dm_order_keys_snapshot.val();
        //                     var dm_order_keys_AC = Object.keys(dm_order_keys);
        //                     for(var j=0;j<dm_order_keys_AC.length;j++)
        //                     {
        //                         // alert(dm_order.work_order);
        //                         firebase.database().ref().child('Delivery_Man_Details').child(deliveryman_keys[i]).child('Order').child(dm_order_keys_AC[j]).on('value',function(dm_order_snapshot){
        //                             var dm_order = dm_order_snapshot.val();
        
        //                             if(dm_order.work_order == 'delivery'){
        
        
        //                                 var hide = document.getElementById('no_order');
        //                                 hide.style.visibility = 'hidden';
        
        //                                 var cust_name = dm_order.customer_name;
        //                                 var cs_item_name = dm_order.item_name;
        //                                 var cust_address = dm_order.customer_address;
        //                                 var order_date = dm_order.delivery_date;                                   
        //                                 var id = dm_order_keys_AC[j];
        
        //                                 var newRow   = tableRef.insertRow(0);
        
        //                                 //Cells
        //                                 var customer_name_cell = newRow.insertCell(0);
        //                                 var item_name_cell = newRow.insertCell(1);
        //                                 var item_price_cell = newRow.insertCell(2);
        //                                 var order_date_cell = newRow.insertCell(3);
        //                                 var item_more_info_link = newRow.insertCell(4);
        //                                 // var id_cell = newRow.insertCell(5).hidden;                                    
        
        //                                 //Creation of More Info Link (Not Cell)
        //                                 var item_more_info_actual_link = document.createElement("a");
        //                                 var item_button = document.createElement("button");
        //                                 item_more_info_actual_link.appendChild(item_button);
        //                                 var item_more_info_actual_link_text = document.createTextNode('');
        //                                 item_more_info_actual_link.appendChild(item_more_info_actual_link_text);
        //                                 item_button.setAttribute('class', "btn btn-block btn-primary fa fa-info");
        //                                 // item_button.setAttribute('class', "fa fa-info");
        //                                 // item_button.setAttribute('style', "width: 40%; height: 30px; background-color: silver;");
        //                                 item_more_info_actual_link.href = "delivery_order_details.html?Did="+deliveryman_keys[i]+"&&Oid="+id;
        //                                 // item_more_info_actual_link.setAttribute('href','order_details.html?id='+id+'&uid='+order_date);
        
        //                                 //CellValue
        //                                 var customer_name_cell_value = document.createTextNode(cust_name);
        //                                 var  item_name_cell_value = document.createTextNode(cs_item_name);
        //                                 var item_price_cell_value = document.createTextNode(cust_address);
        //                                 var order_date_text = document.createTextNode(order_date);
        //                                 // var id_cell_text = document.createTextNode(id);
        
        //                                 //Append Cell value to cell   
        //                                 customer_name_cell.appendChild(customer_name_cell_value);
        //                                 item_name_cell.appendChild(item_name_cell_value);
        //                                 item_price_cell.appendChild(item_price_cell_value);
        //                                 order_date_cell.appendChild(order_date_text);
        //                                 item_more_info_link.appendChild(item_more_info_actual_link);
        //                                 // id_cell.appendChild(id_cell_text);
        
        //                                 // more_info_cell.appendChild(button_text_cell_value);
        
        //                                 // button.addEventListener ("click", function() {
        //                                 //   window.location.href='order_details.html';
        
        
        //                                 // });
        //                             }
        //                         });
        //                     }
        //                 });
        //             }
        //         });
        //     }
        
        // });
    } 
    else {
        // No user is signed in.
        alert('No user is signed in.');
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
    window.location = 'login.html';
}