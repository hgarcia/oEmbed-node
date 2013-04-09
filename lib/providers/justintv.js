module.exports = {
  name: 'justin.tv',
  urls: ["www.justin.tv", "justin.tv"],
  init: function (urlStr) {
    return {
      getUrls: function () {
        return {
          embed: "http://api.justin.tv/api/embed/from_url.json?url=" + encodeURIComponent(urlStr),
          video: urlStr
        }
      }
    };
  }
};
