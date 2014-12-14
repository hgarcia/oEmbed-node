var should = require("should");
var embed = require('../index').init();

describe('oEmbed', function() {
  describe('.get(options, cb)', function () {
    it('should get data from Vimeo', function (done) {
      embed.get({url: "https://vimeo.com/62584176"}, function (err, result) {
        result.provider_name.should.eql('Vimeo');
        result.provider_url.should.eql('https://vimeo.com/');
        result.video_url.should.eql('https://vimeo.com/62584176');
        done(err);
      });
    });
    it('should get data from YouTube', function (done) {
      embed.get({url: "https://www.youtube.com/watch?feature=endscreen&NR=1&v=NinLmiTvpxg"}, function (err, result) {
        result.provider_name.should.eql('YouTube');
        result.provider_url.should.eql('http://www.youtube.com/');
        result.video_url.should.eql('http://youtu.be/NinLmiTvpxg');
        done(err);
      });
    });
    it('should get data from Revision3', function (done) {
      embed.get({url: "http://revision3.com/stufftoblowyourmind/death"}, function (err, result) {
        result.provider_name.should.eql('Revision3');
        result.provider_url.should.eql('http://revision3.com');
        result.video_url.should.eql('http://revision3.com/stufftoblowyourmind/death');
        done(err);
      });
    });
    it('should get data from Yfrog', function (done) {
      embed.get({url: "http://twitter.yfrog.com/j0we2z"}, function (err, result) {
        result.provider_name.should.eql('yFrog');
        result.provider_url.should.eql('http://yfrog.com');
        result.video_url.should.eql('http://twitter.yfrog.com/j0we2z');
        done(err);
      });
    });
  });
})
