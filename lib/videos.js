var curl = require('curling');
var url = require('url');

exports.get = function (options, cb) {
  var connection = curl.connect({});
  var videoUrl = url.parse(options.url);
  var self = this;
  var oEmbeddUrl;
  var video_url = videoUrl.href;
  if (videoUrl.host.indexOf('vimeo') !== -1) {
    oEmbeddUrl = "http://vimeo.com/api/oembed.json?url=" + video_url;
  } else {
    if (videoUrl.host.indexOf("youtu.be/") === -1) {
      video_url = "http://youtu.be/" + videoUrl.query.split('=')[1];
    }
    oEmbeddUrl = "http://www.youtube.com/oembed?url=" + video_url;
  }
  try {
    connection.get(oEmbeddUrl, {}, function (err, result) {
      if (result.payload) {
        var dto = JSON.parse(result.payload);
        dto.video_url = video_url;
        cb(err, dto);
      }
    });
  } catch (parseE) {
    cb(parseE, null);
  }
};
