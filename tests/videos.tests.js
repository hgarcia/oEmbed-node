var should = require("should");
var embed = require('../index');

describe('oEmbed', function() {
  describe('.get(options, cb)', function () {
    it('should get video data from Vimeo', function (done) {
      embed.videos.get({url: "https://vimeo.com/62584176"}, function (err, result) {
        result.provider_name.should.eql('Vimeo');
        result.provider_url.should.eql('http://vimeo.com/');
        result.video_url.should.eql('https://vimeo.com/62584176');
        done(err);
      });
    });
  });

})
