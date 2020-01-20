chrome.runtime.onMessage.addListener((msg, _1, _2) => {
    if (msg == 'Convert the image to url') {
        let img = $('img')[0];
        let tmpcanvas = '<canvas id="tmpcanvas" width="'
            + img.naturalWidth
            + '" height="'
            + img.naturalHeight
            + '" style="display: none"></canvas>';
        $('body').append(tmpcanvas);
        tmpcanvas = $('#tmpcanvas')[0];
        let ctx = tmpcanvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        chrome.storage.local.set({ImgSrc: tmpcanvas.toDataURL()}, () => {
            $('#tmpcanvas').remove();
            chrome.runtime.sendMessage('Convert success');
        });
    }
});
