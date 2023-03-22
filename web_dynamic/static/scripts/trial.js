const $ = window.$;
const store = {};

$(document).ready(function() {
  $('section.date-filter ul li input').change(function() {
    if (this.checked) {
      delete store[$(this)];
      store[$(this).attr('data-id')] = $(this).attr('data-name');
      if (Object.keys(store).length > 0) {
        $('section.date-filter h4').text(Object.values(store));
      }
    }
  });

  $('.date-filter button').click(function() {
    $.ajax({
      type: 'GET',
      url: 'http://0.0.0.0:5001/api/v1/visits/' + encodeURIComponent(Object.keys(store)),
      contentType: 'application/json',
	  dataType: 'json',
	  success: function (data, textStatus) {
		if (textStatus === 'success') {
			$('table.patient-tab').remove();
			data.forEach((visit) => $('section.patient-info').append(
				`
				<table class="patient-tab">
				<form>
					<tr>
						<td>
							<label for="preexisting">Pre-existing Conditions</label>
						</td>
						<td colspan="3">
							<output name="preexisting">${visit.pre_existing_conditions}</output>
							<!-- (value="value needed" readonly) code to be 
							added to make input section sidplay value and be readonly-->
						</td>
					</tr>
					<tr>
						<td>
							<label for="history">History</label>
						</td>
						<td colspan="3">
							<output name="history">${visit.history}</output>
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
							<output name="hr">${visit.heart_rate}</output>
						</td>
						<td>
							<label for="bp">Blood Pressure:</label>
						</td>
						<td>
							<output name="bp">${visit.blood_pressure}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="rr">Respiratory Rate:</label>
						</td>
						<td>
							<output name="rr">${visit.respiratory_rate}</output>
						</td>
						<td>
							<label for="temp">Temprature:</label>
						</td>
						<td>
							<output name="temp">${visit.temprature}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="height">Height:</label>
						</td>
						<td>
							<output name="height">${visit.height}</output>
						</td>
						<td>
							<label for="temp">Weight:</label>
						</td>
						<td>
							<output name="weight">${visit.weight}</output>
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
							<output name="heent">${visit.heent}</output>
						</td>
						<td>
							<label for="abd">Abdomen</label>
						</td>
						<td>
							<output name="abd">${visit.abdomen}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="lg">Lymphoglandular</label>
						</td>
						<td>
							<output name="lg">${visit.lymphoglandular}</output>
						</td>
						<td>
							<label for="gu">Genitourinary</label>
						</td>
						<td>
							<output name="gu">${visit.genitourinary}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="chest">Chest</label>
						</td>
						<td>
							<output name="chest">${visit.chest}</output>
						</td>
						<td>
							<label for="integ">Integumentary</label>
						</td>
						<td>
							<output name="integ">${visit.integumentary}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="cvs">Cardiovascular</label>
						</td>
						<td>
							<output name="cvs">${visit.cardiovascular}</output>
						</td>
						<td>
							<label for="mss">Musculoskeletal</label>
						</td>
						<td>
							<output name="mss">${visit.musculoskeletal}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="add">Additional</label>
						</td>
						<td colspan="2">
							<output name="add">${visit.others}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="lab">Laboratory Investigations</label>
						</td>
						<td colspan="3">
							<output name="lab">${visit.lab_investigations}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="dx">Diagnosis</label>
						</td>
						<td colspan="3">
							<output name="dx">${visit.diagnosis}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="med">Medications</label>
						</td>
						<td colspan="3">
							<output name="med">${visit.current_medication}</output>
						</td>
					</tr>
					<tr>
						<td>
							<label for="physician">Attending Physician:</label>
						</td>
						<td>
							<output name="physician">${visit.doctor_name}</output>
						</td>
					</tr>
				</form>
				</table>
				`
			));
		}
	  }
    });
  });
});
