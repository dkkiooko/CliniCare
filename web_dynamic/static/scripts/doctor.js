$(document).ready(function () {
  $('#search_id').click(function () {
    const inputVal = document.getElementById('input_patient_id').value;
    $.get('http://127.0.0.1:5001/api/v1/patient/' + inputVal, function (data, textStatus) {
      if (textStatus === 'success') {
        $('table.info').remove();
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
							<output name="age">${data.birthyear}</output>
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
      $('section.date-filter').remove();
      $('section.patient-info').append(
        `
        <table class="add_patient">
        <h4>Entering new Data for Today ( ${time} )</h4>
				<form>
					<tr>
						<td>
							<label for="preexisting">Pre-existing Conditions</label>
						</td>
						<td colspan="3">
							<input type="text" name="pre_existing_conditions" placeholder="Type Pre-existing consitions with medications currently on here">
							<!-- (value="value needed" readonly) code to be 
							added to make input section sidplay value and be readonly-->
						</td>
					</tr>
					<tr>
						<td>
							<label for="history">History</label>
						</td>
						<td colspan="3">
							<input type="text" name="history" placeholder="History">
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
							<input type="text" name="hr" placeholder="Insert Here">
						</td>
						<td>
							<label for="bp">Blood Pressure:</label>
						</td>
						<td>
							<input type="text" name="bp" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="rr">Respiratory Rate:</label>
						</td>
						<td>
							<input type="text" name="rr" placeholder="Insert Here">
						</td>
						<td>
							<label for="temp">Temprature:</label>
						</td>
						<td>
							<input type="text" name="temp" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="height">Height:</label>
						</td>
						<td>
							<input type="text" name="height" placeholder="Insert Here">
						</td>
						<td>
							<label for="temp">Weight:</label>
						</td>
						<td>
							<input type="text" name="weight" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td colspan="2">
							<h2>Physical Examination</h2>
						</td>
					</tr>
					<tr>
						<td>
							<label for="hr">HEENT</label>
						</td>
						<td>
							<input type="text" name="heent" placeholder="Insert Here">
						</td>
						<td>
							<label for="pr">Abdomen</label>
						</td>
						<td>
							<input type="text" name="abdomen" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="lg">Lymphoglandular</label>
						</td>
						<td>
							<input type="text" name="lg" placeholder="Insert Here">
						</td>
						<td>
							<label for="gu">Genitourinary</label>
						</td>
						<td>
							<input type="text" name="gu" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="chest">Chest</label>
						</td>
						<td>
							<input type="text" name="chest" placeholder="Insert Here">
						</td>
						<td>
							<label for="integ">Integumentary</label>
						</td>
						<td>
							<input type="text" name="integ" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="cvs">Cardiovascular</label>
						</td>
						<td>
							<input type="text" name="cvs" placeholder="Insert Here">
						</td>
						<td>
							<label for="mss">Musculoskeletal</label>
						</td>
						<td>
							<input type="text" name="mss" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="others">Additional</label>
						</td>
						<td colspan="2">
							<input type="text" name="others" placeholder="Insert Here">
						</td>
					</tr>
					<tr>
						<td>
							<label for="lab">Laboratory Investigations</label>
						</td>
						<td colspan="3">
							<input type="text" name="lab" placeholder="Type Laboratory Investigation orders">
						</td>
					</tr>
					<tr>
						<td>
							<label for="dx">Diagnosis</label>
						</td>
						<td colspan="3">
							<input type="text" name="dx" placeholder="Diagnosis">
						</td>
					</tr>
					<tr>
						<td>
							<label for="med">Medications</label>
						</td>
						<td colspan="3">
							<input type="text" name="med" placeholder="Medications to be given">
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
    });

    $('#new_visit').click(function () {
      var pre_existing_conditions = document.getElementsByName("pre_existing_conditions");
      var history = document.getElementsByName("history");
      var hr = document.getElementsByName("hr");
      var bp = document.getElementsByName("bp");
      var rr = document.getElementsByName("rr");
      var temp = document.getElementsByName("temp");
      var height = document.getElementsByName("height");
      var weight = document.getElementsByName("weight");
      var heent = document.getElementsByName("heent");
      var abdomen = document.getElementsByName("abdomen");
      var lg = document.getElementsByName("lg");
      var gu = document.getElementsByName("gu");
      var chest = document.getElementsByName("chest");
      var integ = document.getElementsByName("integ");
      var cvs = document.getElementsByName("cvs");
      var mss = document.getElementsByName("mss");
      var others = document.getElementsByName("others");
      var lab = document.getElementsByName("lab");
      var dx = document.getElementsByName("dx");
      var med = document.getElementsByName("med");


      $.ajax({
        type: 'POST',
        url: 'http://0.0.0.0:5001/api/v1/',
        contentType: 'application/json',
        data: JSON.stringify({  }),
        success: function (data, textStatus) {}
      });
    });

  });
});
});
