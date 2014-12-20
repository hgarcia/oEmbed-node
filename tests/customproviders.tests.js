"use strict";

describe("Custom Providers", function () {
  var expect = require("chai").expect;

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
      expect(result.provider_name).to.be.eql("Vimeo");
      expect(result.provider_url).to.be.eql("https://vimeo.com/");
      expect(result.video_url).to.be.eql("https://vimeo.com/62584176");
      done(err);
    });
  });
});
