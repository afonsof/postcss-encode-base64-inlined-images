var postcss = require('postcss');
var btoa = require('btoa');

module.exports = postcss.plugin('postcss-encode-base64-inlined-images', function (opts) {
    return function (css, result) {
        css.walkDecls('background-image', function (decl) {
            decl.value = decl.value.replace(/url\(["']data/g, 'url(data');
            decl.value = decl.value.replace(/["']\)$/g, ')');

            if (decl.value.indexOf('url(data:image/svg+xml;charset=UTF-8,') === 0) {
                var encodedFile = decl.value.substring(decl.value.indexOf(',') + 1, decl.value.length - 1);
                decl.value = 'url(data:image/svg+xml;base64,' + btoa(decodeURIComponent(encodedFile)) + ')';
            }
        });
    };
});
