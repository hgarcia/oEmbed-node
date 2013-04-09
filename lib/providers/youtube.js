var url = require('url');
var qs = require('querystring');

module.exports = {
  name: 'youtube',
  urls: ["www.youtube.com", "youtube.com", "m.youtube.com", "youtu.be"],
  init: function (urlStr) {
    return {
      getUrls: function () {
        var parsedUrl = url.parse(urlStr);
        var query = qs.parse(parsedUrl.query);
        if (parsedUrl.host.indexOf("youtu.be/") === -1) {
          urlStr = "http://youtu.be/" + query.v;
        }
        return {
          embed: "http://www.youtube.com/oembed?url=" + urlStr,
          video: urlStr
        };
      }
    };
  }
};
