"use strict";

describe("Providers", function() {

  var expect = require("chai").expect;
  var providers = require("../index").providers;

  describe(".get(url)", function () {

    it("should get a provider for Vimeo", function (done) {
      var provider = providers.init().get("https://vimeo.com/62584176");
      expect(provider).to.have.property("getUrls");
      done();
    });

    it("should get a provider for Rutube", function (done) {
      var provider = providers.init().get("http://rutube.ru/video/59d92e33219f5b81ce0c5375cb537ba0/");
      expect(provider).to.have.property("getUrls");
      done();
    });
  });
});
