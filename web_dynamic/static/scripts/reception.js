$(document).ready(function () {
	$('#create_patient').click(function () {

		const fname = document.getElementById('fname').value;
		const lname = document.getElementById('lname').value;
		const birthyear = document.getElementById('birthyear').value;
		const sex = document.getElementById('sex').value;
		const city = document.getElementById('city').value;
		const subcity = document.getElementById('subcity').value;
		const county = document.getElementById('county').value;
		const location = document.getElementById('location').value;
		const phone = document.getElementById('phone_number').value;
		const email = document.getElementById('email').value;
		const post_address = document.getElementById('post_address').value;
		const insuranceCompany = document.getElementById('insurance_company').value;
		const insuranceNumber = document.getElementById('insurance_number').value;
		const emergencyFName = document.getElementById('emergency_fname').value;
		const emergencyLName = document.getElementById('emergency_lname').value;
		const emergencyPhone = document.getElementById('emergency_number').value;
		const emergencyEmail = document.getElementById('emergency_email').value;

		$.ajax({
			type: "POST",
			url: 'http://127.0.0.1:5001/api/v1/create_patient',
			data: JSON.stringify({
			  "fname": fname,
			  "lname": lname,
			  "birthyear": birthyear,
			  "email_address": email,
			  "sex": sex,
			  "city": city,
			  "sub_city": subcity,
			  "county": county,
			  "location": location,
			  "phone_number": phone,
			  "email": email,
			  "post_address": post_address,
			  "insurance_company": insuranceCompany,
			  "insurance_number": insuranceNumber,
			  "emergency_fname": emergencyFName,
			  "emergency_lname": emergencyLName,
			  "emergency_number": emergencyPhone,
			  "emergency_email": emergencyEmail
			}),
			contentType: 'application/json',
			dataType: 'json',
			success: function() {
				alert('successful')
			}
		})
	})
})