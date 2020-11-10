// function handel user input and validation
var error_var = document.getElementById('error_output');
var output_var = document.getElementById('output');
const zeroPad = (num, places) => String(num).padStart(places, '0');

//data for calculation

network_lower = {
0 :[0, 0, 0, 0],
1 :[128, 0, 0, 0],
2 :[192, 0, 0, 0],
3 :[224, 0, 0, 0],
4 :[240, 0, 0, 0],
5 :[248, 0, 0, 0],
6 :[252, 0, 0, 0],
7 :[254, 0, 0, 0],
8 :[255, 0, 0, 0],
9 :[255, 128, 0, 0],
10 :[255, 192, 0, 0],
11 :[255, 224, 0, 0],
12 :[255, 240, 0, 0],
13 :[255, 248, 0, 0],
14 :[255, 252, 0, 0],
15 :[255, 254, 0, 0],
16 :[255, 255, 0, 0],
17 :[255, 255, 128, 0],
18 :[255, 255, 192, 0],
19 :[255, 255, 224, 0],
20 :[255, 255, 240, 0],
21 :[255, 255, 248, 0],
22 :[255, 255, 252, 0],
23 :[255, 255, 254, 0],
24 :[255, 255, 255, 0],
25 :[255, 255, 255, 128],
26 :[255, 255, 255, 192],
27 :[255, 255, 255, 224],
28 :[255, 255, 255, 240],
29 :[255, 255, 255, 248],
30 :[255, 255, 255, 252],
31 :[255, 255, 255, 254],
32 :[255, 255, 255, 255]
}
network_higher = {
0 :[255, 255, 255, 255],
1 :[127, 255, 255, 255],
2 :[63, 255, 255, 255],
3 :[31, 255, 255, 255],
4 :[15, 255, 255, 255],
5 :[7, 255, 255, 255],
6 :[3, 255, 255, 255],
7 :[1, 255, 255, 255],
8 :[0, 255, 255, 255],
9 :[0, 127, 255, 255],
10 :[0, 63, 255, 255],
11 :[0, 31, 255, 255],
12 :[0, 15, 255, 255],
13 :[0, 7, 255, 255],
14 :[0, 3, 255, 255],
15 :[0, 1, 255, 255],
16 :[0, 0, 255, 255],
17 :[0, 0, 127, 255],
18 :[0, 0, 63, 255],
19 :[0, 0, 31, 255],
20 :[0, 0, 15, 255],
21 :[0, 0, 7, 255],
22 :[0, 0, 3, 255],
23 :[0, 0, 1, 255],
24 :[0, 0, 0, 255],
25 :[0, 0, 0, 127],
26 :[0, 0, 0, 63],
27 :[0, 0, 0, 31],
28 :[0, 0, 0, 15],
29 :[0, 0, 0, 7],
30 :[0, 0, 0, 3],
31 :[0, 0, 0, 1],
32 :[0, 0, 0, 0]
}

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
      render_output(ip_address, network_mask);
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
  error_var.innerHTML = "";
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


// main logic area

function network_range(ip_address, sub_range) {
  // return the network range
  let network_first_address = []
  for(let i=0;i<4;i++) {
    network_first_address[i] = network_lower[sub_range][i] & ip_address[i];
  }

  let network_last_address = []
  for(let i=0;i<4;i++) {
    network_last_address[i] = network_higher[sub_range][i] | ip_address[i];
  }
return [network_first_address, network_last_address];
}

// return number of addresses in the given network range
function address_in_network(sub_range) {
  return 2**(32-sub_range)
}


//network mask in hex
function network_mask_hex(sub_range) {
	var total = 0
	for(let i=0;i<sub_range;i++) {
		total += 2**(31-i)
	}
	return total.toString(16)
}

function bin_cal(bin_number) {

}

// return the decimal and hex address
function dec_hex_address(ip_address) {

	var number = zeroPad(ip_address[0].toString(2),8) + zeroPad(ip_address[1].toString(2),8) + zeroPad(ip_address[2].toString(2),8) + zeroPad(ip_address[3].toString(2),8)

	var number = number.split('').reverse();

	var total = 0;
	for(let i=0;i<32;i++) {
		total += Number(number[i])*2**i;
	}
	return [total, total.toString(16)]
}


//return the usable address range

function usable_address(ip_first, ip_last , sub_range) {

	if (sub_range<31) {

		const usable_first = [...ip_first];
		const usable_last = [...ip_last];
		usable_first[3] += 1;
		usable_last[3] -= 1;

		return [usable_first.join('.'), usable_last.join('.')];
	}

	return [null, null];

}

// main rendering method
function render_output(ip_address, sub_range) {
	const Host_address = ip_address.join('.');
	var dec_hex = dec_hex_address(ip_address);
	const Host_address_in_decimal  = dec_hex[0];
	const Host_address_in_hex = dec_hex[1];
	var net_add = network_range(ip_address, sub_range);
	const Network_address = net_add[0].join('.');
	const Network_mask = network_lower[sub_range];
	const Network_mask_bits = sub_range;
	const Network_mask_hex = network_mask_hex(sub_range);
	const Broadcast_address = net_add[1].join('.');
	const Addresses_in_network = address_in_network(sub_range);
	var usable_add_range = usable_address(net_add[0], net_add[1] , sub_range)

}
