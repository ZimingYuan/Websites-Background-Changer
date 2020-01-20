$(document).ready(() => {
    chrome.storage.local.get(['ExtensionOn', 'Opacity'], function(data) {
        $('#CheckboxExt')[0].checked = data.ExtensionOn;
        $('#ValuebarExt')[0].value = data.Opacity;
    });
    $('#CheckboxExt').click(function () {
        chrome.storage.local.set({ExtensionOn: $(this)[0].checked}, () =>
            chrome.tabs.query({}, (tabs) =>
                tabs.forEach((tab) =>
                    chrome.tabs.sendMessage(tab.id, "ExtensionOn")
                )
            )
        );
    });
    $('#ValuebarExt')[0].onchange = function () {
        chrome.storage.local.set({Opacity: this.value}, () =>
            chrome.tabs.query({}, (tabs) =>
                tabs.forEach((tab) =>
                    chrome.tabs.sendMessage(tab.id, "Opacity")
                )
            )
        );
    };
});
