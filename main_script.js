// function handel user input and validation
function user_input() {
  var variable = document.getElementById('input_ip').value;

  // regex to identify ip address and network mask
  var regex1 = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;
  var regex2 = /\b\/\d{1,2}\b/

  var ip_address = variable.match(regex1);
  var network_mask = variable.match(regex2);

  //if we found both then only process the input
  if (ip_address!=null & network_mask!=null) {
    ip_address = str_to_int(ip_address[0].split('.'));
    network_mask = Number(network_mask[0].slice(1,));
  }

}

// convert the each element of the array from Sring to Number using type casting
function str_to_int(arr) {
  for(let i=0;i<4;i++){
    arr[i] = Number(arr[i]);
  }
  return arr;
}
