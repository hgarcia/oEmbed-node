var fs = require('fs');
var url = require('url');

exports.init = function (extraProviders) {
  var providerFiles = fs.readdirSync(__dirname + '/providers');
  var providers = {};

  providerFiles.forEach(function (file) {
    var code = require(__dirname + '/providers/' + file.replace('.js', ''));
    code.urls.forEach(function (u) {
      providers[u] = code;
    });
  });
  return {
    get: function (urlStr) {
      var parsedUrl = url.parse(urlStr);
      if (extraProviders && extraProviders[parsedUrl.host]) {
        return extraProviders[parsedUrl.host];
      }
      return providers[parsedUrl.host].init(urlStr);
    }
  }
};
