function create_patient() {
	var fname = document.getElementById("fname");
	var lname = document.getElementById("lname");
	var birthyear = document.getElementById("birthyear");

	var sex = document.getElementById("sex").value;
  
	var city = document.getElementById("city");
	var subcity = document.getElementById("subcity");
	var county = document.getElementById("county");
	var location = document.getElementById("location");
	var phone_number = document.getElementById("phone_number");
	var email = document.getElementById("email");
	var insurance_company = document.getElementById("insurance_company");
	var insurance_number = document.getElementById("insurance_number");
	var emergency_fname = document.getElementById("emergency_fname");
	var emergency_lname = document.getElementById("emergency_lname");
	var emergency_number = document.getElementById("emergency_number");
	var emergency_email = document.getElementById("emergency_email");
	const post_address = 1000;

	resultsContainer.style.display = "block";

  var server_data = [
    {"fname": fname},
    {"lname": lname},
    {"birthyear":birthyear},
    {"sex": sex},
    {"city": city},
    {"subcity": subcity},
    {"county": county},
    {"location": location},
    {"phone_number": phone_number},
    {"email": email},
    {"insurance_company": insurance_company},
    {"insurance_number": insurance_number},
    {"emergency_fname": emergency_fname},
    {"emergency_lname": emergency_lname},
    {"emergency_number": emergency_number},
    {"emergency_email": emergency_email},
    {"post_address": post_address},
  ];

   $.ajax({
	 type: "POST",
	 url: "127.0.0.1:5001/api/v1/reception",
	 data: JSON.stringify(server_data),
	 contentType: "application/json",
	 dataType: 'json',
	 success: function(textStatus) {
		if (textStatus === 'success') {
	   		alert('Patient has been registered successfully')
		}
	 } 
   });
  }