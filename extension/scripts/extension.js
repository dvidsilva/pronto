var __setFormData = function setFormData (sel, data) {
  sel = sel || 'form';
  $('#status').html('setting up data for: ' + data.FIRSTNAME + " " + data.LASTNAME);
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {sel: sel, data: data}, function(response) {
          $('#status').html('changed data in form');
          console.log('success');
      });
  });
};

var _fb;
var config = config || {
    apiKey: "AIzaSyDMU8bIRFMCn2MozdUIdNryXhne3ziapJo",
    databaseURL: "https://pronto-34571.firebaseio.com",
    storageBucket: "pronto-34571.appspot.com",
};
_fb = _fb && _fb.name === "fbToForma" ? _fb : firebase.initializeApp(config, "fbToForma");
var fbToForm = function fbToForm (key, sel) {
    $('#status').html('Adding data to: ' + sel + " for key: " + key);
    key = (key || "").trim();
    sel = sel || "form";
    _fb.database().ref('user-data/' + key).on('value', function(snapshot) {
        $('#status').html('Retrieved data from firebase');
        __setFormData(sel, snapshot.val());
    });
};

// http://stackoverflow.com/questions/377961/efficient-javascript-string-replacement
function templateReplace (template, data) {
  return template.replace(/%(\w*)%/g, function (m,key) {
      return data.hasOwnProperty(key) ? data[key] : "";
  });
}

var loaded_patient_data = false;
function loadPatientsData () {
    $('#status').html('Loading patients list');
    if (loaded_patient_data) {
        return $('#status').html('Loaded patient list');
    }
    var patient_template = $('patienttemplate').html();
    loaded_patient_data = true;
    _fb.database().ref('user-data/').limitToLast(40).on('value', function(snapshot) {
        $('#status').html('Loaded patients list');
        var results = snapshot.val();
        for (var i in  results) {
            results[i].key = i;
            $('.patient-list').prepend(templateReplace(patient_template, results[i]));
        }
        $('#status').html('Loaded patient data');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('status').textContent = "Extension loaded";
    var button = document.getElementById('loadpatient');
    button.addEventListener('click', function () {
        $('#status').html('Clicked load patient button');
        var key = $('.patientkey').val();
        if (!key) {
            $('#status').html('Invalid key provided');
            return;
        }
        fbToForm(key, 'form');
    });
    button = document.getElementById('loadpatientsdata');
    button.addEventListener('click', loadPatientsData);
});

