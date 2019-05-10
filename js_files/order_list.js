var eventRef = firebase.database().ref('users');
var databaseRef = firebase.database().ref();
firebase.auth().onAuthStateChanged(function(user) {
    
    var url_string = window.location.href;
    var url = new URL (url_string);
    var id = url.searchParams.get('id');
    
    var total = 0;
    var total_gst = 0;
    var total_deposit = 0;
    var total_final = 0;
    var tot_gst = 0;
    
    // firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        
        
        databaseRef.child('Admin').child('Order').on('value',function(user_uid_snapshot){
            var user_uid_details = user_uid_snapshot.val();
            var uid_key = Object.keys(user_uid_details);
            
            for(var i = 0; i<uid_key.length; i++)
            {
                databaseRef.child('Admin').child('Order').child(uid_key[i]).on('value',function(uid_snapshot){
                    var uid_main = uid_snapshot.val();
                    // alert(uid_key);
                    databaseRef.child('Admin').child('Order').child(uid_key[i]).on('value',function(order_snapshot){
                        var order_details = order_snapshot.val();
                        var order_key = Object.keys(order_details);
                        // alert(order_key);
                        
                        for(var j = 0; j<order_key.length; j++)
                        {
                            databaseRef.child('Admin').child('Order').child(uid_key[i]).child(order_key[j]).on('value',function(uid_snapshot){
                                var uid = uid_snapshot.val();
                                
                                // alert(uid.invoice_id);
                                
                                if(uid.invoice_id == id)
                                {
                                    var tableRef = document.getElementById('invoice_table').getElementsByTagName('tbody')[0];
                                    
                                    firebase.database().ref().child('Admin').child('Order').child(uid_key[i]).child(order_key[j]).on('value', function(big_details_snapshot){
                                        var big_detail = big_details_snapshot.val();
                                        // alert(big_detail.item_name);
                                        
                                        var item_name = big_details_snapshot.child('item_name').val();
                                        // alert(item_name);
                                        var item_price = big_details_snapshot.child('item_price').val();
                                        var item_quantity = big_details_snapshot.child('item_quantity').val();
                                        var total_days = big_details_snapshot.child('days').val();
                                        var from_date = big_details_snapshot.child('delivery_date').val();
                                        var from_time = big_details_snapshot.child('delivery_time').val();
                                        var to_date = big_details_snapshot.child('return_date').val();
                                        var to_time = big_details_snapshot.child('return_time').val();
                                        var purchase_date = big_details_snapshot.child('purchase_date').val();
                                        var order_type = big_details_snapshot.child('order_type').val();
                                        var days = big_details_snapshot.child('days').val();
                                        var order_status = big_details_snapshot.child('order_status').val();
                                        var order_id = big_details_snapshot.child('order_id').val();
                                        var item_total_deposit = big_details_snapshot.child('item_total_deposit').val();
                                        var item_total_gst = big_details_snapshot.child('item_total_gst').val();
                                        var item_total_price = big_details_snapshot.child('item_total_price').val();
                                        var item_image = big_details_snapshot.child('item_image').val();
                                        
                                        
                                        document.getElementById('name').innerHTML = big_detail.customer_name;
                                        document.getElementById('email').innerHTML = big_detail.customer_email;
                                        document.getElementById('pn_no').innerHTML = big_detail.customer_phone_no;
                                        document.getElementById('address').innerHTML = big_detail.customer_address;
                                        document.getElementById('pin_code').innerHTML = big_detail.customer_pincode;
                                        
                                        
                                        document.getElementById('from_date').innerHTML = from_date;
                                        document.getElementById('from_time').innerHTML = from_time;
                                        document.getElementById('to_date').innerHTML = to_date;
                                        document.getElementById('to_time').innerHTML = to_time;
                                        document.getElementById('total_days').innerHTML = days;
                                        // document.getElementById('order_status').innerHTML = order_status;
                                        
                                        document.getElementById('days').value = big_detail.total_days;
                                        var item_price_divided =  item_price/item_quantity;
                                        var item_total = item_price_divided * item_quantity * total_days;
                                        
                                        
                                        // Insert a row in the table at the last row
                                        var newRow   = tableRef.insertRow(0);
                                        
                                        //Cells
                                        var item_name_cell = newRow.insertCell(0);
                                        var item_price_cell = newRow.insertCell(1);
                                        var item_quantity_cell = newRow.insertCell(2);
                                        var item_days_cell = newRow.insertCell(3);
                                        var item_total_cell = newRow.insertCell(4);
                                        
                                        //CellValue
                                        var item_name_cell_value = document.createTextNode(item_name);
                                        var item_price_cell_value = document.createTextNode(item_price);
                                        var item_quantity_cell_value = document.createTextNode(item_quantity);
                                        var item_days_cell_value = document.createTextNode(total_days);
                                        var item_total_cell_value = document.createTextNode(item_total);
                                        
                                        
                                        item_name_cell.appendChild(item_name_cell_value);
                                        item_price_cell.appendChild(item_price_cell_value);
                                        item_quantity_cell.appendChild(item_quantity_cell_value);
                                        item_days_cell.appendChild(item_days_cell_value);
                                        item_total_cell.appendChild(item_total_cell_value);
                                        
                                        total += item_price_divided * item_quantity * total_days;
                                        document.getElementById('subtotal').innerHTML = total;
                                        
                                        total_gst = total * 5/100;
                                        
                                        tot_gst = total +total_gst;
                                        
                                        document.getElementById('gst').innerHTML = total_gst;
                                        total_deposit = tot_gst * 30/100;
                                        document.getElementById('deposit').innerHTML = total_deposit;
                                        
                                        total_final = total + total_gst + total_deposit;
                                        document.getElementById('final_total').innerHTML = total_final;
                                        
                                        // alert(big_detail.)                                        
                                        var userid = uid_key[i];
                                        var orderid = order_key[j];
                                        // alert(orderid);
                                        // document.getElementById('small').innerText = total_final;
                                        
                                        document.getElementById('update_status').onclick = function(){
                                            // alert('in');
                                            
                                            
                                            var status = document.getElementById('update_order').value;
                                            
                                            if (status == "---Select---") {
                                                alert("Please select status to update");
                                                return false;    
                                            }
                                            // alert(status);
                                            // var describe = document.getElementById('describe').value;
                                            // var deposit = document.getElementById('deposit_taken').value;
                                            // alert(describe);
                                            
                                            if(status == 'delivered')
                                            {
                                                // alert('delivered');
                                                var deposit = document.getElementById('deposit_taken').value;
                                                // alert(deposit);
                                                firebase.database().ref().child('Admin').child('users_invoice').on('value',function(invoice_snapshot){
                                                    var invoice_id = invoice_snapshot.val();
                                                    var invoice_keys = Object.keys(invoice_id);
                                                    
                                                    var in_id = invoice_keys;
                                                    // alert(user_uid_keys);
                                                    for(var i=0;i<invoice_keys.length;i++)
                                                    {
                                                        firebase.database().ref().child('Admin').child('users_invoice').child(invoice_keys[i]).on('value',function(invoiceidSnapshot){
                                                            var invoice = invoiceidSnapshot.val();
                                                            // alert(invoice.deposit_status);
                                                            // document.getElementById('deposit_status').innerHTML = invoice.deposit_status;
                                                            
                                                            
                                                            if(invoice.invoice_id == id)
                                                            {
                                                                var idd = invoice_keys[i];
                                                                // alert('idd is :' +idd);
                                                                // alert(invoice_keys[i]);
                                                                
                                                                firebase.database().ref().child('Admin').child('users_invoice').child(idd).update({
                                                                    
                                                                    order_status : 'Delivered',
                                                                    deposit_status : deposit
                                                                    
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                                // databaseRef.child('Admin').child('Order').child(userid).child(orderid).update({
                                                
                                                //     order_status : 'Delivered',
                                                //     deposit_status : deposit
                                                
                                                // });
                                                
                                                
                                                
                                                firebase.database().ref().child('users').on('value',function(uid_snapshot){
                                                    var uid_details = uid_snapshot.val();
                                                    var user_uid_key = Object.keys(uid_details);
                                                    
                                                    for(var l = 0; l<user_uid_key.length; l++)
                                                    {
                                                        // alert('user id:'+ user_uid_key[l]);
                                                        firebase.database().ref().child('users').child(user_uid_key[l]).on('value',function(uid_deep_snapshot){
                                                            var uid_deep = uid_deep_snapshot.val();
                                                            
                                                            firebase.database().ref().child('users').child(user_uid_key[l]).child('Order').on('value',function(uid_order_snapshot){
                                                                var uid_order_details = uid_order_snapshot.val();
                                                                var user_uid_order_key = Object.keys(uid_order_details);
                                                                
                                                                for(var a = 0; a<user_uid_order_key.length; a++)
                                                                {
                                                                    // alert(user_uid_order_key[a]);
                                                                    firebase.database().ref().child('users').child(user_uid_key[l]).child('Order').child(user_uid_order_key[a]).on('value',async function(order_snapshot){
                                                                        var order_details = order_snapshot.val();
                                                                        
                                                                        if(order_details.invoice_id == id)
                                                                        {
                                                                            // alert('inside if invoice id'+order_details.invoice_id);
                                                                            // alert('Inside if user id:'+ user_uid_key[l]);
                                                                            // alert('Inside if order key: '+user_uid_order_key[a]);
                                                                            firebase.database().ref().child('users').child(user_uid_key[l]).child('Order').child(user_uid_order_key[a]).update({
                                                                                
                                                                                order_status : 'Delivered',
                                                                                deposit_status : deposit
                                                                                
                                                                            }); 
                                                                            location.reload();
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        });
                                                    }
                                                });
                                            }
                                            else if(status == 'returned')
                                            {
                                                // alert('returned');
                                                var describe = document.getElementById('describe').value;
                                                // alert(deposit);
                                                
                                                
                                                firebase.database().ref().child('Admin').child('users_invoice').on('value',function(invoice_snapshot){
                                                    var invoice_id = invoice_snapshot.val();
                                                    var invoice_keys = Object.keys(invoice_id);
                                                    
                                                    var in_id = invoice_keys;
                                                    // alert(user_uid_keys);
                                                    for(var i=0;i<invoice_keys.length;i++)
                                                    {
                                                        firebase.database().ref().child('Admin').child('users_invoice').child(invoice_keys[i]).on('value',function(invoiceidSnapshot){
                                                            var invoice = invoiceidSnapshot.val();
                                                            // alert(id);
                                                            if(invoice.invoice_id == id)
                                                            {
                                                                var idd = invoice_keys[i];
                                                                // alert('idd is :' +idd);
                                                                // alert(invoice_keys[i]);
                                                                
                                                                firebase.database().ref().child('Admin').child('users_invoice').child(idd).update({
                                                                    
                                                                    order_status : 'Completed',
                                                                    deposit_status : describe
                                                                    
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                                
                                                
                                                
                                                firebase.database().ref().child('users').on('value',function(uid_snapshot){
                                                    var uid_details = uid_snapshot.val();
                                                    var user_uid_key = Object.keys(uid_details);
                                                    
                                                    for(var l = 0; l<user_uid_key.length; l++)
                                                    {
                                                        // alert('user id:'+ user_uid_key[l]);
                                                        firebase.database().ref().child('users').child(user_uid_key[l]).on('value',function(uid_deep_snapshot){
                                                            var uid_deep = uid_deep_snapshot.val();
                                                            
                                                            firebase.database().ref().child('users').child(user_uid_key[l]).child('Order').on('value',function(uid_order_snapshot){
                                                                var uid_order_details = uid_order_snapshot.val();
                                                                var user_uid_order_key = Object.keys(uid_order_details);
                                                                
                                                                for(var a = 0; a<user_uid_order_key.length; a++)
                                                                {
                                                                    // alert(user_uid_order_key[a]);
                                                                    firebase.database().ref().child('users').child(user_uid_key[l]).child('Order').child(user_uid_order_key[a]).on('value',async function(order_snapshot){
                                                                        var order_details = order_snapshot.val();
                                                                        
                                                                        if(order_details.invoice_id == id)
                                                                        {
                                                                            // alert('inside if invoice id'+order_details.invoice_id);
                                                                            // alert('Inside if user id:'+ user_uid_key[l]);
                                                                            // alert('Inside if order key: '+user_uid_order_key[a]);
                                                                            firebase.database().ref().child('users').child(user_uid_key[l]).child('Order').child(user_uid_order_key[a]).update({
                                                                                
                                                                                order_status : 'completed',
                                                                                deposit_status : describe
                                                                                
                                                                            }); 
                                                                            location.reload();
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        });
                                                    }
                                                });
                                                
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
            }
        });
    }
});