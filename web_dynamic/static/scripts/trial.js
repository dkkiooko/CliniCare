$(document).ready(function() {

  store = {}

  $('section.date-filter ul li input').change(function() {
    
    $('input[type="checkbox"]').not(this).prop('checked', false);
  });

  $('section.date-filter ul li input').change(function() {
    if (this.checked) {
      if (Object.keys(store).length > 0) {
        store = {}
      }
      store[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete store[$(this).attr('data-id')];
    }
    if (Object.keys(store).length >= 0) {
      $('.date-filter h4').text(Object.values(store).join(', '));
    }
  });

  $('#search-date').click(function() {
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
                <output name="gu">${data.genitourinary}</output>
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
});
