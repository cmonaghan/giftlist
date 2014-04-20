var Parse = require('node-parse-api').Parse; // docs are here: https://github.com/leveton/node-parse-api
var q = require('q');

// Parse stuff
var APP_ID = "7sT5TrkKNplKarIBxjcOHh8dDfRUQwNlGq5YMuzG";
var MASTER_KEY = "FzU95q0Il1D8aqAEFWSrvv8haq7pyvJAV0mg1heQ";
var app = new Parse(APP_ID, MASTER_KEY);

var findExistingParseItems = function() {
  var promise = new q.Promise(function(resolve, reject){
    app.findMany('Items', {productGroup: 'Kitchen'}, function (error, response) {
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
  itemsAlreadyInParse.then(function(data){
    var itemASINNumbers = listItemsInParse(data);
    // ****** This loops through and removes any item already in parse ******* //
    for (var i = 0; i < itemASINNumbers.length; i++) {
      for (var j = 0; j < amazonItems.length; j++) {
        if (itemASINNumbers[i] === amazonItems[j].ASIN) {
          console.log(amazonItems[j].ASIN, ': this item already exists Parse')
        };
      }
    };
  });


  // ****** This loops through and saves each item to parse ******* //
  // for (var i = 0; i < amazonItems.length; i++) {
  //   app.insert('Items', amazonItems[i], function(error, response) {
  //     if (error) {
  //       console.log('Error:', error);
  //     } else {
  //       console.log('successfully posted item to Parse');
  //     }
  //   });
  // };
};

//
function listItemsInParse (parseResponse) {
  var itemData = parseResponse.results;

  var itemASINNumbers = [];
  for (var i = 0; i < itemData.length; i++) {
    itemASINNumbers.push(itemData[i].ASIN);
  };

  return itemASINNumbers;
}

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


exports.findExistingParseItems = findExistingParseItems;
exports.saveDataToParse = saveDataToParse;
