var should = require('should');
// use native Promise if possible
var Promise = global.Promise || require('bluebird');

// Such a strange construction used because Custom Providers actually do not get .init(url) call
// despite README telling us so
var getUrls = function () {
    return {
        embed: 'http://google.com',
        video: 'doesn\'t matter'
    }
};

// I need custom provider to test malformed JSON as a response
var embed = require('../index').init({
    'google.com': {
        init: function () {
            return {
                getUrls: getUrls
            };
        },
        getUrls: getUrls
    }
});

describe('API', function () {
    describe('callback', function () {
        it('should provide callback api', function (done) {
            embed.get({url: "https://www.youtube.com/watch?feature=endscreen&NR=1&v=NinLmiTvpxg"}, function (err, result) {
                result.provider_name.should.eql('YouTube');
                result.provider_url.should.eql('http://www.youtube.com/');
                result.video_url.should.eql('http://youtu.be/NinLmiTvpxg');
                done(err);
            });
        });

        it('should allow to deal with error in node way', function (done) {
            embed.get({url: "https://www.youtube.com/watch?feature=endscreen&NR=1&v=111"}, function (err, result) {
                err.should.be.an.instanceOf(Error);
                err.message.should.be.eql('error: 404');

                done();
            });
        });

        it('should allow to catch parse error', function (done) {
            embed.get({url: "http://google.com"}, function (err) {
                err.should.be.an.instanceOf(Error);
                err.message.should.be.eql('Unexpected token <');

                done();
            });
        });
    });

    describe('promise', function () {
        it('.get should return a promise', function (done) {
            var promise = embed.get({url: "https://www.youtube.com/watch?feature=endscreen&NR=1&v=NinLmiTvpxg"});

            promise.should.be.type('object');
            promise.should.be.an.instanceOf(Promise);

            // duck typing check
            promise.then.should.be.a.Function;
            promise.catch.should.be.a.Function;

            done();
        });

        it('should fulfill valid request', function (done) {
            embed
                .get({url: "https://www.youtube.com/watch?feature=endscreen&NR=1&v=NinLmiTvpxg"})
                .then(function (result) {
                    result.provider_name.should.eql('YouTube');
                    result.provider_url.should.eql('http://www.youtube.com/');
                    result.video_url.should.eql('http://youtu.be/NinLmiTvpxg');

                    done();
                });
        });

        it('should allow to catch network error', function (done) {
            embed
                .get({url: "https://www.youtube.com/watch?feature=endscreen&NR=1&v=111"})
                .catch(function (err) {
                    err.should.be.an.instanceOf(Error);
                    err.message.should.be.eql('error: 404');

                    done();
                });
        });

        it('should allow to catch parse error', function (done) {
            embed
                .get({url: "http://google.com"})
                .catch(function (err) {
                    err.should.be.an.instanceOf(Error);
                    err.message.should.be.eql('Unexpected token <');

                    done();
                });
        });
    });
});