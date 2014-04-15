var Parse = require('node-parse-api').Parse; // docs are here: https://github.com/leveton/node-parse-api

// Parse stuff
var APP_ID = "7sT5TrkKNplKarIBxjcOHh8dDfRUQwNlGq5YMuzG";
var MASTER_KEY = "FzU95q0Il1D8aqAEFWSrvv8haq7pyvJAV0mg1heQ";
var app = new Parse(APP_ID, MASTER_KEY);



var saveDataToParse = function(response) {
  var items = prepareAmazonDataForParse(response);

  // ****** This loops through and saves each item to parse ******* //
  for (var i = 0; i < items.length; i++) {
    app.insert('Items', items[i], function(error, response) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('successfully posted item to Parse');
      }
    });
  };
};

// prepareAmazonDataForParse is a helper function for saveDataToParse
function prepareAmazonDataForParse(amazonResponse) {
  var dataForParse = [];

  var amazonItems = amazonResponse.Items.Item;

  for (var i = 0; i < amazonItems.length; i++) {
    var item = amazonItems[i];

    var itemData = {
      title: item.ItemAttributes.Title,
      description: item.ItemAttributes.Feature,
      price: item.OfferSummary.LowestNewPrice.Amount / 100,
      productImage: item.LargeImage.URL,
      productGroup: item.ItemAttributes.ProductGroup,
      ASIN: item.ASIN
    };

    dataForParse.push(itemData);
  };

  return dataForParse;
};

exports.saveDataToParse = saveDataToParse;
