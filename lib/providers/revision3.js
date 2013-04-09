module.exports = {
  name: 'revision3',
  urls: ["www.revision3.com", "revision3.com"],
  init: function (urlStr) {
    return {
      getUrls: function () {
        return {
          embed: "http://revision3.com/api/oembed/?url=" + encodeURIComponent(urlStr) + "&format=json",
          video: urlStr
        }
      }
    };
  }
};
