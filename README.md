oembed-node
===========

[![Build Status](https://travis-ci.org/hgarcia/oEmbed-node.png?branch=master)](https://travis-ci.org/hgarcia/oEmbed-node)

A node library to consume some providers of oEmbed.

At the moment it only supports YouTube and Vimeo but you can easily extend it to work with others via custom providers.

### Usage

    var oembed = require('oembed-node').init();
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

    var oembed = require('oembed-node').init(customProviders);

You can use the same handler for multiple host names, just associate it to other keys in the hash.

### Changelog

0.3.0 - Fixed bug on custom providers to actually call `init` thanks to [PR #6](https://github.com/hgarcia/oEmbed-node/pull/6) (Originally reported on [PR #1](https://github.com/hgarcia/oEmbed-node/pull/1) but build was broken)
        Removed support for Justin.tv thanks to [PR #6](https://github.com/hgarcia/oEmbed-node/pull/6) (Originally reported on [PR #4](https://github.com/hgarcia/oEmbed-node/pull/4) but build was broken)
        Added support for rutube.ru thanks to [PR #3](https://github.com/hgarcia/oEmbed-node/pull/3)

0.2.0 - Fixed a bug supporting YouTube with multi query parameters
        Added support for Justin.tv
        Added support for Revision3
        Added support for yFrog
0.1.0 - Initial release support for Vimeo and YouTube

### Collaborators 

Thanks to PR from [aulizko](https://github.com/aulizko) and [finder-dp-lewis](https://github.com/finder-dp-lewis) pushed me to update the library and release v0.3.0
