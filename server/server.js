var aws = require("aws-lib"); // docs are here: https://github.com/livelycode/aws-lib
var helpers = require('./helpers.js');

// AWS stuff
var amazonAPI = aws.createProdAdvClient('AKIAJA3VUOAVLK3I6EGA', '6+cUIObeSHDv5BXuolmIyyCRVpFwoGYJzqImvIHv', 'giftlist08-20');
var options = {
  SearchIndex: "HomeGarden",
  Keywords: "wedding registry",
  ResponseGroup: 'Medium'
};


amazonAPI.call("ItemSearch", options, function(err, response) {
  if (err) {
    console.log(err);
  } else {
    // running `node-debug server.js` (node-inspector) allows you to view response in browser

    // will print 'Amazon Request IsValid: {boolean}'
    console.log('Amazon request isValid: ' + response.Items.Request.IsValid);
    console.log('Total results fetched: ' + response.Items.Item.length);
    console.log('Total results found: ' + response.Items.TotalResults);
    helpers.saveDataToParse(response);
  }
});
