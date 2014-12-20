"use strict";

module.exports = {
  name: "rutube",
  urls: ["www.rutube.ru", "rutube.ru"],
  init: function (urlStr) {
    return {
      getUrls: function () {
        return {
          embed: "http://rutube.ru/api/oembed/?url=" + encodeURIComponent(urlStr) + "&format=json",
          video: urlStr
        };
      }
    };
  }
};