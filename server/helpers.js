var Parse = require('node-parse-api').Parse; // docs are here: https://github.com/leveton/node-parse-api
var q = require('q');

// Parse stuff
var APP_ID = "7sT5TrkKNplKarIBxjcOHh8dDfRUQwNlGq5YMuzG";
var MASTER_KEY = "FzU95q0Il1D8aqAEFWSrvv8haq7pyvJAV0mg1heQ";
var app = new Parse(APP_ID, MASTER_KEY);

var findExistingParseItems = function() {
  var promise = new q.Promise(function(resolve, reject){
    app.findMany('Items', '', function (error, response) {
      if (error) {
        reject(error);
      } else {
        resolve(response);
      }
    });
  });
  return promise;
};

var saveDataToParse = function(response) {
  var amazonItems = prepareAmazonDataForParse(response);

  var itemsAlreadyInParse = findExistingParseItems();
  itemsAlreadyInParse.then(function(existingParseItems){
    var existingParseItems = existingParseItems.results;
    // ****** This loops through and removes any items already in parse from amazonItems ******* //
    for (var i = 0; i < existingParseItems.length; i++) {
      // REFACTOR - double-nested loop is expensive, refactor amazonItems and itemsAlreadyInParse as objects
      for (var j = 0; j < amazonItems.length; j++) {
        if (existingParseItems[i].ASIN === amazonItems[j].ASIN) {
          console.log('item with ASIN ' + amazonItems[j].ASIN + ' already exists Parse');
          amazonItems.splice(j,1);
          j--;
        };
      }
    };
  }).then(function(){
    // ****** This loops through and saves each remaining amazonItems to parse ******* //
    for (var i = 0; i < amazonItems.length; i++) {
      app.insert('Items', amazonItems[i], function(error, response) {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('successfully posted item to Parse');
        }
      });
    };
  });
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
