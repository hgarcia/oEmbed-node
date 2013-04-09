module.exports = {
  name: 'yfrog',
  urls: ["www.yfrog.com", "yfrog.com", "twitter.yfrog.com"],
  init: function (urlStr) {
    return {
      getUrls: function () {
        return {
          embed: "http://www.yfrog.com/api/oembed?url=" + encodeURIComponent(urlStr),
          video: urlStr
        }
      }
    };
  }
};
