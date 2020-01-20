chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ExtensionOn: true, Opacity: 0.8});
});

chrome.runtime.onMessage.addListener((msg, _1, _2) => {
    if (msg == 'Convert success') {
        chrome.tabs.query({}, (tabs) =>
            tabs.forEach((tab) =>
                chrome.tabs.sendMessage(tab.id, 'ImgSrc')
            )
        );
    }
});

function genericOnClick(info, tab) {
    if (new URL(info.srcUrl).protocol != 'file:') {
        chrome.storage.local.set({ImgSrc: info.srcUrl}, () =>
            chrome.tabs.query({}, (tabs) =>
                tabs.forEach((tab) =>
                    chrome.tabs.sendMessage(tab.id, 'ExtensionOn')
                )
            )
        );
    } else {
        chrome.tabs.query({active: true}, (tabs) =>
            tabs.forEach((tab) =>
                chrome.tabs.sendMessage(tab.id, 'Convert the image to url')
            )
        )
    }
}

var id = chrome.contextMenus.create({'title': 'Choose this image as background', 'contexts':['image'], 'onclick': genericOnClick});
