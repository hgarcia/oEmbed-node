"use strict";

describe("oEmbed", function() {
  var embed = require("../index").init();
  var expect = require("chai").expect;

  describe(".get(options, cb)", function () {

    it("should get data from Vimeo", function (done) {
      embed.get({url: "https://vimeo.com/62584176"}, function (err, result) {
        expect(result.provider_name).to.be.eql("Vimeo");
        expect(result.provider_url).to.be.eql("https://vimeo.com/");
        expect(result.video_url).to.be.eql("https://vimeo.com/62584176");
        done(err);
      });
    });

    it("should get data from YouTube", function (done) {
      embed.get({url: "https://www.youtube.com/watch?feature=endscreen&NR=1&v=NinLmiTvpxg"}, function (err, result) {
        expect(result.provider_name).to.be.eql("YouTube");
        expect(result.provider_url).to.be.eql("http://www.youtube.com/");
        expect(result.video_url).to.be.eql("http://youtu.be/NinLmiTvpxg");
        done(err);
      });
    });

    it("should get data from YouTube with youtu.be url", function (done) {
      embed.get({url: "http://youtu.be/rpCOr9CFAa0"}, function (err, result) {
        expect(result.provider_name).to.be.eql("YouTube");
        expect(result.provider_url).to.be.eql("http://www.youtube.com/");
        expect(result.video_url).to.be.eql("http://youtu.be/rpCOr9CFAa0");
        done(err);
      });
    });

    it("should get data from Yfrog", function (done) {
      embed.get({url: "http://twitter.yfrog.com/j0we2z"}, function (err, result) {
        expect(result.provider_name).to.be.eql("yFrog");
        expect(result.provider_url).to.be.eql("http://yfrog.com");
        expect(result.video_url).to.be.eql("http://twitter.yfrog.com/j0we2z");
        done(err);
      });
    });

    it("should get data from Rutube", function (done) {
      embed.get({url: "http://rutube.ru/video/59d92e33219f5b81ce0c5375cb537ba0/"}, function (err, result) {
        expect(result.provider_name).to.be.eql("rutube");
        expect(result.provider_url).to.be.eql("http://rutube.ru");
        expect(result.video_url).to.be.eql("http://rutube.ru/video/59d92e33219f5b81ce0c5375cb537ba0/");
        done(err);
      });
    });
  });
});
