var should = require('should');
var embed = require('../index');

describe('custom providers', function () {
    it('should load and use custom providers', function() {
        var customProviders = {
            "www.ustream.tv" : {
                init: function (urlStr) {
                    return {
                        getUrls: function () {
                            return {
                                embed: "http://www.ustream.tv/oembed?url=" + urlStr,
                                video: urlStr
                            };
                        }
                    };
                }
            }
        };

        var oembed = embed.init(customProviders);

        oembed.get({'url': 'http://www.ustream.tv/recorded/42341691'}, function(err, result) {
            result.provider_url.should.eql('http://www.ustream.tv/');
            result.video_url.should.eql('http://www.ustream.tv/recorded/42341691');
        });
    });
});