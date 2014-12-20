"use strict";

var curl = require("curling");

exports.init = function (customProviders) {
  var providers = require("./factory").init(customProviders);
  return {
    get: function (options, cb) {
      var connection = curl.connect({});
      var provider = providers.get(options.url);
      var provUrls = provider.getUrls();
      try {
        connection.get(provUrls.embed, {}, function (err, result) {
          if (result.payload) {
            var dto = JSON.parse(result.payload);
            dto.video_url = provUrls.video;
            cb(err, dto);
          }
        });
      } catch (parseE) {
        cb(parseE, null);
      }
    }
  };
};
