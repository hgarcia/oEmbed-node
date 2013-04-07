var url = require('url');

module.exports = {
  name: 'youtube',
  urls: ["www.youtube.com", "youtube.com", "m.youtube.com", "youtu.be"],
  init: function (urlStr) {
    return {
      getUrls: function () {
        var parsedUrl = url.parse(urlStr);
        if (parsedUrl.host.indexOf("youtu.be/") === -1) {
          urlStr = "http://youtu.be/" + parsedUrl.query.split('=')[1];
        }
        return {
          embed: "http://www.youtube.com/oembed?url=" + urlStr,
          video: urlStr
        };
      }
    };
  }
};
