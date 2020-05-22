$(document).ready(() => {

    function DrawBackground(url) {
        let canvas = $('#BackgroundExt')[0];
        let scale = window.devicePixelRatio / 1.25;
        canvas.width = screen.width / scale;
        canvas.height = screen.height / scale;
        let ctx = canvas.getContext('2d');
        let img = new Image(); img.src = url;
        img.onload = () => {
            let midx = img.width / 2, midy = img.height / 2;
            let imgscale = Math.max(canvas.width / 2 / midx,
                                    canvas.width / 2 / (img.width - midx),
                                    canvas.height / 2 / midy,
                                    canvas.height / 2 / (img.height - midy));
            ctx.scale(imgscale, imgscale);
            ctx.drawImage(img, canvas.width / 2 - midx * imgscale, canvas.height / 2 - midy * imgscale);
        };
    }

    function ExtensionOn() {
        let background = '<canvas id="BackgroundExt" style="position: fixed; top: 0; left: 0; z-index: 9999; pointer-events: none; opacity: 0;"></canvas>';
        $('body').append(background);
        chrome.storage.local.get(['ImgSrc', 'Opacity'], function(data) {
            if (data.ImgSrc != undefined) {
                DrawBackground(data.ImgSrc);
                $('#BackgroundExt').css('opacity', 1 - data.Opacity);
            }
        });
    }

    chrome.storage.local.get('ExtensionOn', function(data) {
        if (data.ExtensionOn) ExtensionOn();
    });
    chrome.runtime.onMessage.addListener((msg, _1, _2) => {
        if (msg == 'ExtensionOn' || msg == 'ImgSrc') {
            chrome.storage.local.get('ExtensionOn', (data) => {
                if ($('#BackgroundExt').length > 0) $('#BackgroundExt').remove();
                if (data.ExtensionOn) ExtensionOn();
            });
        }
        if (msg == 'Opacity') {
            chrome.storage.local.get('Opacity', (data) => {
                $('#BackgroundExt').css('opacity', 1 - data.Opacity);
            });
        }
    });
});
