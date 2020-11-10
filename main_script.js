// function handel user input and validation
var error_var = document.getElementById('error_output');
var output_var = document.getElementById('output');
function user_input() {
  var variable = document.getElementById('input_ip').value;

  // regex to identify ip address and network mask
  var regex1 = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  var regex2 = /\b\/\d{1,2}\b/

  var ip_address = variable.match(regex1);
  var network_mask = variable.match(regex2);

  //only process input if both the ip and the network mask is present
  if (ip_address!=null & network_mask!=null) {
    ip_address = str_to_int(ip_address[0].split('.'));
    network_mask = network_mask[0].slice(1,);
    //validate input
    if (validate(ip_address, network_mask)) {
      correct_output();
    }
    else {
      error_output();
    }

  }
  else{
    error_output();
  }

}

//print output on the page

function correct_output() {
  output_var.innerHTML = ""
  error_var.innerHTML = " ";
  output_var.innerHTML = "IP address is correct"
}

function error_output() {
  output_var.innerHTML = ""
  error_var.innerHTML = "";
  error_var.innerHTML = "Error in IP address"
}




// convert the each element of the array from Sring to Number using type casting
function str_to_int(arr) {
  for(let i=0;i<4;i++){
    arr[i] = Number(arr[i]);
  }
  return arr;
}


//function to validate ip
function validate(ip_address, network_mask) {
  console.log(ip_address);
  console.log(network_mask);
  let flag_1 = 0;
  let flag_2 = 0;
  for(let i=0;i<4;i++) {
    if (ip_address[i] > 255 | ip_address[i] < 0) {
      flag_1 = 1;
    }
  }
  if(network_mask>32 | network_mask<0) {
    flag_2 = 1;
  }

  if(flag_1==1 | flag_2 ==1 ){
    return false;
  }
  else {
    return true;
  }
}
