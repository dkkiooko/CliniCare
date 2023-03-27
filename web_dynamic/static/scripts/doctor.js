$(document).ready(function () {
  $('#search_id').click(function () {
    const inputVal = document.getElementById('input_patient_id').value;
    $.get('http://127.0.0.1:5001/api/v1/patient/' + inputVal, function (data, textStatus) {
      if (textStatus === 'success') {
        $('table.info').remove();
        $('section.date-filter').remove();
        $('button#add_new').remove();

        var birthdate = new Date(data.birthyear);
        var ageDifMs = Date.now() - birthdate.getTime();
        var ageDate = new Date(ageDifMs); 
        var age = Math.abs(ageDate.getUTCFullYear() - 1970);
        $('section.personal-data').append(
					`
					<table class="info">
					<tr>
						<td><h2>Personal Information</h2></td>
					</tr>
					<tr>
						<td>Name:</td>
						<td>
							<output name="name">${data.fname} ${data.lname}</output>
						</td>
						<td>Age:</td>
						<td>
							<output name="age"><b>${age} years old </b> ( ${data.birthyear} )</output>
						</td>
					</tr>
					<tr>
						<td>Gender:</td>
						<td>
							<output name="gender">${data.sex}</output>
						</td>
					</tr>
					<tr>
						<td><h2>Address</h2></td>
					</tr>
					<tr>
						<td>Phone Number:</td>
						<td>
							<output name="phone">${data.phone_number}</output>
						</td>
						<td>Email Address:</td>
						<td>
							<output name="email">${data.email}</output>
						</td>
					</tr>
					<tr>
						<td> </td>
					</tr>
					<tr>
						<td>City:</td>
						<td>
							<output name="city">${data.city}</output>
						</td>
						<td>Sub-city:</td>
						<td>
							<output name="sub-city">${data.subcity}</output>
						</td>
					</tr>
					<tr>
						<td>County:</td>
						<td>
							<output name="county">${data.county}</output>
						</td>
						<td>Location:</td>
						<td>
							<output name="location">${data.location}</output>
						</td>
					</tr>
					<tr>
						<td><h2>Insurance Details</h2></td>
					</tr>
					<tr>
						<td>Insurance Company:</td>
						<td>
							<output name="insurance-name">${data.insurance_company}</output>
						</td>
						<td>Insurance Number:</td>
						<td>
							<output name="insurance-number">${data.insurance_number}</output>
						</td>
					</tr>
					</table>
          <section class="date-filter">
            <ul>
              <h2>Previous Visits:</h2>
            </ul>
            <button id="search-date">Search Date</button>
            <h3>Date Selected:</h3>
            <h4>&nbsp;</h4>
          </section>
          <button type="button" id="add_new">Add New Visit</button>
					`
        );
      }
    });

    $.get('http://127.0.0.1:5001/api/v1/patient/visit/' + inputVal, function (data, textStatus) {
      if (textStatus === 'success') {
        if (data[1] === 404) {
          $('section.datefilter button').remove();
          $('section.date-filter ul').append(
            `
					  <li>
						  <input type="checkbox" data-id="" data-name="">
						  No Previous Records Found
					  </li>
            `
          )
        }
        else {
        $('table.patient-tab').remove();
            for (let i = 0; i < data.length; i++) {
              $('section.date-filter ul').append(
              `
              <li>
                <input type="checkbox" data-id="${data[i].id}" data-name="${data[i].updated_at}">
                ${data[i].updated_at}
              </li>
              `
            );
          }
        }
      }

      store = {};

      $('section.date-filter ul li input').change(function () {
        $('input[type="checkbox"]').not(this).prop('checked', false);
      });

      $('section.date-filter ul li input').change(function () {
        if (this.checked) {
          if (Object.keys(store).length > 0) {
            store = {};
          }
          store[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
          delete store[$(this).attr('data-id')];
        }
        if (Object.keys(store).length >= 0) {
          $('.date-filter h4').text(Object.values(store).join(', '));
        }
      });
      $('#search-date').click(function () {
        $.get('http://127.0.0.1:5001/api/v1/visits/' + Object.keys(store), function (data, textStatus) {
          if (textStatus === 'success') {
            $('table.patient-tab').remove();
            $('section.patient-info').append(
            `
            <table class="patient-tab">
            <form>
              <tr>
                <td>
                  <label for="preexisting">Pre-existing Conditions</label>
                </td>
                <td colspan="3">
                  <output name="preexisting">${data.pre_existing_conditions}</output>
                  <!-- (value="value needed" readonly) code to be 
                  added to make input section sidplay value and be readonly-->
                </td>
              </tr>
              <tr>
                <td>
                  <label for="history">History</label>
                </td>
                <td colspan="3">
                  <output name="history">${data.history}</output>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <h2>Vital Signs and Anthropometry</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="hr">Heart Rate:</label>
                </td>
                <td>
                  <output name="hr">${data.heart_rate}</output>
                </td>
                <td>
                  <label for="bp">Blood Pressure:</label>
                </td>
                <td>
                  <output name="bp">${data.blood_pressure}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="rr">Respiratory Rate:</label>
                </td>
                <td>
                  <output name="rr">${data.respiratory_rate}</output>
                </td>
                <td>
                  <label for="temp">Temprature:</label>
                </td>
                <td>
                  <output name="temp">${data.temperature}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="height">Height:</label>
                </td>
                <td>
                  <output name="height">${data.height}</output>
                </td>
                <td>
                  <label for="temp">Weight:</label>
                </td>
                <td>
                  <output name="weight">${data.weight}</output>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <h2>Physical Examination</h2>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="heent">HEENT</label>
                </td>
                <td>
                  <output name="heent">${data.heent}</output>
                </td>
                <td>
                  <label for="abd">Abdomen</label>
                </td>
                <td>
                  <output name="abd">${data.abdomen}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="lg">Lymphoglandular</label>
                </td>
                <td>
                  <output name="lg">${data.lymphoglandular}</output>
                </td>
                <td>
                  <label for="gu">Genitourinary</label>
                </td>
                <td>
                  <output name="gu">${data.gentourinary}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="chest">Chest</label>
                </td>
                <td>
                  <output name="chest">${data.chest}</output>
                </td>
                <td>
                  <label for="integ">Integumentary</label>
                </td>
                <td>
                  <output name="integ">${data.integumentary}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="cvs">Cardiovascular</label>
                </td>
                <td>
                  <output name="cvs">${data.cardiovascular}</output>
                </td>
                <td>
                  <label for="mss">Musculoskeletal</label>
                </td>
                <td>
                  <output name="mss">${data.muscoskeletal}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="add">Additional</label>
                </td>
                <td colspan="2">
                  <output name="add">${data.others}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="lab">Laboratory Investigations</label>
                </td>
                <td colspan="3">
                  <output name="lab">${data.lab_investigations}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="dx">Diagnosis</label>
                </td>
                <td colspan="3">
                  <output name="dx">${data.diagnosis}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="med">Medications</label>
                </td>
                <td colspan="3">
                  <output name="med">${data.current_medication}</output>
                </td>
              </tr>
              <tr>
                <td>
                  <label for="physician">Attending Physician:</label>
                </td>
                <td>
                  <output name="physician">${data.doctor_name}</output>
                </td>
              </tr>
            </form>
            </table>
            `
            );
          }
        });
      });

    $('#add_new').click(function () {
      var dt = new Date();
      var time = dt.getDate() + "/" + dt.getMonth() + "/" + dt.getFullYear() + " G.C.  " + dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      $('table.patient-tab').remove();
      $('table.add_patient').remove();
      $('.timeTeller').remove();
      $('section.date-filter').remove();
      $('section.patient-info').append(
        `
        <table class="add_patient">
        <h4 class="timeTeller">Entering new Data for Today ( ${time} )</h4>
				<form>
					<tr>
						<td>
							<label for="preexisting">Pre-existing Conditions</label>
						</td>
						<td colspan="3">
							<input required type="text" name="pre_existing_conditions" id="pre_existing_conditions" placeholder="Type Pre-existing consitions with medications currently on here">
							<!-- (value="value needed" readonly) code to be 
							added to make input section sidplay value and be readonly-->
						</td>
					</tr>
					<tr>
						<td>
							<label for="history">History</label>
						</td>
						<td colspan="3">
							<input type="text" id="history" name="history" placeholder="History">
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<h2>Vital Signs and Anthropometry</h2>
						</td>
					</tr>
					<tr>
						<td>
							<label for="hr">Heart Rate:</label>
						</td>
						<td>
							<input type="text" id="hr" name="hr" placeholder="Insert Here">
						</td>
						<td>
							<label for="bp">Blood Pressure:</label>
						</td>
						<td>
							<input type="text" id="bp" name="bp" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="rr">Respiratory Rate:</label>
						</td>
						<td>
							<input type="text" id="rr" name="rr" placeholder="Insert Here">
						</td>
						<td>
							<label for="temp">Temprature:</label>
						</td>
						<td>
							<input type="text" id="temp" name="temp" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="height">Height:</label>
						</td>
						<td>
							<input type="text" id="height" name="height" placeholder="Insert Here">
						</td>
						<td>
							<label for="temp">Weight:</label>
						</td>
						<td>
							<input type="text" id="weight" name="weight" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<h2>Physical Examination</h2>
						</td>
					</tr>
					<tr>
						<td>
							<label for="heent">HEENT</label>
						</td>
						<td>
							<input type="text" id="heent" name="heent" placeholder="Insert Here">
						</td>
						<td>
							<label for="abdomen">Abdomen</label>
						</td>
						<td>
							<input type="text" id="abdomen" name="abdomen" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="lg">Lymphoglandular</label>
						</td>
						<td>
							<input type="text" id="lg" name="lg" placeholder="Insert Here">
						</td>
						<td>
							<label for="gu">Genitourinary</label>
						</td>
						<td>
							<input type="text" id="gu" name="gu" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="chest">Chest</label>
						</td>
						<td>
							<input type="text" id="chest" name="chest" placeholder="Insert Here">
						</td>
						<td>
							<label for="integ">Integumentary</label>
						</td>
						<td>
							<input type="text" id="integ" name="integ" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="cvs">Cardiovascular</label>
						</td>
						<td>
							<input type="text" id="cvs" name="cvs" placeholder="Insert Here">
						</td>
						<td>
							<label for="mss">Musculoskeletal</label>
						</td>
						<td>
							<input type="text" id="mss" name="mss" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="others">Additional</label>
						</td>
						<td colspan="2">
							<input type="text" id="others" name="others" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="lab">Laboratory Investigations</label>
						</td>
						<td colspan="3">
							<input type="text" id="lab" name="lab" placeholder="Type Laboratory Investigation orders">
						</td>
					</tr>
					<tr>
						<td>
							<label for="dx">Diagnosis</label>
						</td>
						<td colspan="3">
							<input type="text" id="dx" name="dx" placeholder="Diagnosis">
						</td>
					</tr>
					<tr>
						<td>
							<label for="med">Medications</label>
						</td>
						<td colspan="3">
							<input type="text" id="med" name="med" placeholder="Medications to be given">
						</td>
					</tr>
					<tr>
						<td>
							<button type="submit" id="new_visit">Submit</button>
						</td>
					</tr>
				</form>
			  </table>
        `
      )
      $('#new_visit').click(function () {
        $.get('http://127.0.0.1:5001/api/v1/patient/' + inputVal, function (data, textStatus) {
          if (textStatus === 'success') {
            const name = data.fname + " " + data.lname;
            const birthyear = data.birthyear;
            //Calculate the age from the birthyear
            var birthdate = new Date(birthyear);
            var ageDifMs = Date.now() - birthdate.getTime();
            var ageDate = new Date(ageDifMs); 
            var age = Math.abs(ageDate.getUTCFullYear() - 1970);
            const sex = data.sex;
            const phone_number = data.phone_number;
            const city = data.city;
            const county = data.county;
            const subcity = data.subcity;
            const location = data.location;
            const email = data.email;
            const pre_existing_conditions = document.getElementById("pre_existing_conditions").value;
            const history = document.getElementById("history").value;
            const hr = document.getElementById("hr").value;
            const bp = document.getElementById("bp").value;
            const rr = document.getElementById("rr").value;
            const temp = document.getElementById("temp").value;
            const height = document.getElementById("height").value;
            const weight = document.getElementById("weight").value;
            const heent = document.getElementById("heent").value;
            const abdomen = document.getElementById("abdomen").value;
            const lg = document.getElementById("lg").value;
            const gu = document.getElementById("gu").value;
            const chest = document.getElementById("chest").value;
            const integ = document.getElementById("integ").value;
            const cvs = document.getElementById("cvs").value;
            const mss = document.getElementById("mss").value;
            const others = document.getElementById("others").value;
            const lab = document.getElementById("lab").value;
            const dx = document.getElementById("dx").value;
            const med = document.getElementById("med").value;
            const price_charged = 0;
            const doctor_name = 'Nisha Patel';
            const doctor_id = '18d24670-bc4e-43a2-bffb-7edef0df0f76'
            $.ajax({
              type: "POST",
              url: 'http://127.0.0.1:5001/api/v1/save_visits',
              data: JSON.stringify({
                "patient_id": inputVal,
                "doctor_id": doctor_id,
                "doctor_name": doctor_name,
                "name": name,
                "email_address": email,
                "patient_age": age,
                "patient_gender": sex,
                "phone_number": phone_number,
                "price_charged": price_charged,
                "city": city,
                "sub_city": subcity,
                "county": county,
                "location": location,
                "pre_existing_conditions": pre_existing_conditions,
                "history": history,
                "heart_rate": hr,
                "blood_pressure": bp,
                "height": height,
                "weight": weight,
                "respiratory_rate": rr,
                "temperature": temp,
                "heent": heent,
                "genitourinary": gu,
                "lymphoglandular": lg,
                "integumentary": integ,
                "chest": chest,
                "muscoskeletal": mss,
                "cardiovascular": cvs,
                "abdomen": abdomen,
                "others": others,
                "lab_investigations": lab,
                "current_medication": med,
                "diagnosis": dx
              }),
              contentType: 'application/json',
              dataType: 'json',
              success: function() {
                alert('successful')
              }
            })
          }
        });
      });
    });

  });
});
});
