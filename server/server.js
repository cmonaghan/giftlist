var aws = require("aws-lib"); // docs are here: https://github.com/livelycode/aws-lib
var helpers = require('./helpers.js');

// AWS stuff
var amazonAPI = aws.createProdAdvClient('AKIAJA3VUOAVLK3I6EGA', '6+cUIObeSHDv5BXuolmIyyCRVpFwoGYJzqImvIHv', 'giftlist08-20');

saveAmazonItemsToParse('HomeGarden', 'wedding registry', 'Medium', 10);

function saveAmazonItemsToParse (SearchIndex, Keywords, ResponseGroup, numberOfPages) {
  for (var pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
    // each loop will increment the 'ItemPage' value in order to get multiple pages
    // Amazon allows ItemPage to be a max of 10
    var options = {
      SearchIndex: SearchIndex,
      Keywords: Keywords,
      ResponseGroup: ResponseGroup,
      ItemPage: pageNumber
    };

    amazonAPI.call("ItemSearch", options, function(err, response) {
      if (err) {
        console.log(err);
      } else {
        console.log('Amazon request isValid: ' + response.Items.Request.IsValid);
        console.log('Total results fetched: ' + response.Items.Item.length);
        console.log('Total results found: ' + response.Items.TotalResults);
        helpers.saveDataToParse(response);
      }
    });
  };
};
