chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
    console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
    var data = request.data || {};
    var sel = request.sel || 'form';
    console.log(data);

    var inputList = document.querySelectorAll(sel + ' [name]:not([type="checkbox"]):not([type="radio"])');
    [].forEach.call(inputList, function(input) {
        if (data[input.name] && data[input.name] !== "undefined") {
            input.value = data[input.name];
        }
    });
    var checkboxList = document.querySelectorAll(sel + ' [name][type="checkbox"]');
    [].forEach.call(checkboxList, function(input) {
        if (data[input.name] && data[input.name] !== "undefined") {
            if (input.value === data[input.name]) {
                input.checked = true;
            }
        }
    });
    var radioList = document.querySelectorAll(sel + ' [name][type="radio"]');
    [].forEach.call(radioList, function(input) {
        console.log(input);
        if (data[input.name] && data[input.name] !== "undefined") {
            console.log(data[input.name]);
            if (input.value === data[input.name]) {
                input.checked = true;
            }
        }
    });
    if (!data.EMAIL) {
<<<<<<< HEAD
        jQuery('[name=noemail]').click();
        jQuery('[name=noemail]').change();
=======
        $('[name=noemail]').click();
        $('[name=noemail]').prop('checked', true);
        $('[name=noemail]').change();
>>>>>>> f85aae134e9383ed07ba945bd476f719bb36d3be
    }
    jQuery('[name="INTERFACECONSENT.RXHUB.VERIFYMEDICATIONHISTORY"][value=Y]').click();
    sendResponse({data: data, success: true});
});

