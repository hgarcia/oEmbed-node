var should = require("should");
var providers = require('../index').providers;

describe('Providers', function() {
  describe('.get(url)', function () {
    it('should get a provider for Vimeo', function (done) {
      var provider = providers.init().get("https://vimeo.com/62584176");
      provider.should.have.property("getUrls");
      done();
    });
  });
})
