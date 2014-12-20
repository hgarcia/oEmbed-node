"use strict";

module.exports = {
  name: "vimeo",
  urls: ["www.vimeo.com", "vimeo.com"],
  init: function (urlStr) {
    return {
      getUrls: function () {
        return {
          embed: "http://vimeo.com/api/oembed.json?url=" + encodeURIComponent(urlStr),
          video: urlStr
        };
      }
    };
  }
};
