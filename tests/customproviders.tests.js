"use strict";

describe("Custom Providers", function () {

  require("should");

  it("should get data from a custom provider", function (done) {
    var customProviders, embed;

    // Use the custom provider provided in the documentation
    customProviders = {
      "vimeo.com": {
        init: function (urlStr) {
          return {
            getUrls: function () {
              return {
                embed: "http://vimeo.com/api/oembed.json?url=" + urlStr,
                video: urlStr
              };
            }
          };
        }
      }
    };

    embed = require("../index").init(customProviders);

    embed.get({
      url: "https://vimeo.com/62584176"
    }, function (err, result) {
      result.provider_name.should.eql("Vimeo");
      result.provider_url.should.eql("https://vimeo.com/");
      result.video_url.should.eql("https://vimeo.com/62584176");
      done(err);
    });
  });
});
