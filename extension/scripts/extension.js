(function(){
  if (firebase !== undefined) {
    return;
  }
 var newscript = document.createElement('script');
    newscript.type = 'text/javascript';
    newscript.async = true;
    newscript.src = 'https://www.gstatic.com/firebasejs/3.0.2/firebase.js';
 (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
})();
var __setFormData = function setFormData (sel, data) {
 console.info('setting form to data', data);
 var inputList = document.querySelectorAll(sel + ' [name]');
 [].forEach.call(inputList, function(input) { 
     if (data[input.name] && data[input.name] !== "undefined") {
       input.value = data[input.name];
     }
 });
};
var _fb;
var fbToForm = function fbToForm (key, sel) {
    var config = config || {
        apiKey: "AIzaSyDMU8bIRFMCn2MozdUIdNryXhne3ziapJo",
        databaseURL: "https://pronto-34571.firebaseio.com",
        storageBucket: "pronto-34571.appspot.com",
    };
    _fb = _fb && _fb.name === "fbToForma" ? _fb : firebase.initializeApp(config, "fbToForma");
    _fb.database().ref('user-data/' + key).on('value', function(snapshot) {
        __setFormData(sel, snapshot.val());
    });
};

$(function () {
    var button = $('<button>');
    button.addEventListener('click', function () {
      button.html = "aaaaa";
    });

    $('.loadpatient').on('click', function () {
        $('.loadpatient').html('clicked load patient button');
        var key = $('.patientkey').val();
        if (!key) {
            return;
        }
        fbToForm(key);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementsByTagName('button')[0].html = "hola";
});
// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    chrome.tabs.create({url: 'https://google.com'});
    // ...check the URL of the active tab against our pattern and...
    // if (urlRegex.test(tab.url)) {
        // ...if it matches, send a message specifying a callback too
        // chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    // }
});

