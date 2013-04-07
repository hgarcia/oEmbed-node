oEmbed-node
===========

A node library to consume some providers of oEmbed.

At the moment it only supports YouTube and Vimeo but you can easily extend it to work with others via custom providers.

### Usage

    var oembed = require('oEmbed-node').init();
    oembed.get({url: "https://vimeo.com/62584176"}, getVideo);
    function getVideo(err, result) {

    }

The result will be a literal object with the properties returned by the provider. The library adds a video_url property to the object.

### Custom providers

The `init` method of the library takes a literal object that's a map from host names to functions. Each of those functions is the handler that will return a proper oEmbed end point.

For example a custom provider for vimeo would be like this:

    var customProviders = {
      "vimeo.com" : {
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

And you can pass it to the `init` function of the module.

    var oembed = require('oEmbed-node').init(customProviders);

You can use the same handler for multiple host names, just associate it to other keys in the hash.
