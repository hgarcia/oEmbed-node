var Promise = global.Promise || require('bluebird');
var request = require('request');

exports.init = function (customProviders) {
    var providers = require('./factory').init(customProviders);
    return {
        get: function (options, cb) {
            var provider = providers.get(options.url);
            var provUrls = provider.getUrls();

            var promise = new Promise(function (resolve, reject) {
                request({
                    method: 'GET',
                    url: provUrls.embed
                }, function (error, response, body) {
                    if (error) {
                        reject(error);
                    } else {
                        if (response.statusCode == 200) {
                            resolve(body);
                        } else {
                            reject(new Error('error: ' + response.statusCode));
                        }
                    }
                });
            }).then(function (result) {
                var dto = JSON.parse(result);
                dto.video_url = provUrls.video;
                return dto;
            });

            if (cb) { // if callback is provided, send result or error to it in a node-way
                promise
                    .then(function (result) {
                        cb(null, result);
                    }, cb)
            }


            return promise;
        }
    };
};
