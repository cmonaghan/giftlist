// AWS stuff
var aws = require("aws-lib");

var prodAdv = aws.createProdAdvClient('AKIAJA3VUOAVLK3I6EGA', '6+cUIObeSHDv5BXuolmIyyCRVpFwoGYJzqImvIHv', 'giftlist08-20');

var options = {SearchIndex: "Books", Keywords: "Javascript"}

prodAdv.call("ItemSearch", options, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    // running `node-debug server.js` (node-inspector) allows you to view result in browser
    console.log(result);
  }
});


// ------------------------------------------------------------------------


// Parse stuff
var Parse = require('node-parse-api').Parse;

var APP_ID = "7sT5TrkKNplKarIBxjcOHh8dDfRUQwNlGq5YMuzG";
var MASTER_KEY = "FzU95q0Il1D8aqAEFWSrvv8haq7pyvJAV0mg1heQ";

var app = new Parse(APP_ID, MASTER_KEY);

// mock data
var sampleGiftItems = [
  { title: 'The Innovator\'s Dilemma',
    description: 'The Revolutionary Book That Will Change the Way You Do Business.',
    productImage: 'http://ecx.images-amazon.com/images/I/41x2I-hjJQL._SY344_PJlook-inside-v2,TopRight,1,0_SH20_BO1,204,203,200_.jpg',
    price: 17.99
  },
  { title: 'Business Model Generation',
    description: 'A Handbook for Visionaries, Game Changers, and Challengers.',
    productImage: 'http://ecx.images-amazon.com/images/I/51jX9F1kXXL._SX258_PJlook-inside-v2,TopRight,1,0_SH20_BO1,204,203,200_.jpg',
    price: 28.99
  },
  { title: 'Miike Snow (Vinyl)',
    description: 'Miike Snow is – are – in a playful mood. The second, somewhat orchatronic, album by the three-headed-band with the one-man-name and mysterious Jackalope symbol is called Happy To You.',
    productImage: 'http://ecx.images-amazon.com/images/I/51nbulxotlL._SL500_AA280_.jpg',
    price: 19.99
  },
  { title: 'Anker® Astro 5600mAh External Battery Backup Charger',
    description: 'with Built-In Flashlight for iPhone 5S, 5C, 5, 4S, 4, Samsung Galaxy S4, S3, Note 2, Note 3, HTC One, Motorola Droid, MOTO X, LG Optimus and most other smartphones and USB-charged devices (Apple adapters - 30 pin and lightning, not included).',
    productImage: 'http://ecx.images-amazon.com/images/I/41h5-B64EEL._SY300_.jpg',
    price: 24.99
  }
];

// ****** This loops through and saves each mock giftItem to parse ******* //
for (var i = 0; i < sampleGiftItems.length; i++) {
  app.insert('GiftItem', sampleGiftItems[i], function(err, response) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('successfully posted sampleGiftItem');
    }
  });
};
