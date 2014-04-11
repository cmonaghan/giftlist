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
var Parse = require('node-parse-api').Parse; // docs are here: https://github.com/leveton/node-parse-api

var APP_ID = "7sT5TrkKNplKarIBxjcOHh8dDfRUQwNlGq5YMuzG";
var MASTER_KEY = "FzU95q0Il1D8aqAEFWSrvv8haq7pyvJAV0mg1heQ";

var app = new Parse(APP_ID, MASTER_KEY);

// mock data
var sampleGiftItems = [
  { title: 'Ball Complete Book of Home Preserving',
    description: 'From the experts, the new bible in home preserving.',
    productImage: 'http://ecx.images-amazon.com/images/I/51nF3izhyuL.jpg',
    price: 12.96
  },
  { title: 'Breville BJE200XL Compact Juice Fountain 700-Watt Juice Extractor',
    description: 'Heavy-duty compact juice fountain with centered knife blade assembly\
                  700-watt motor operates at 14,000 RPM for maximum extraction\
                  Extra-large 3-inch centered feed tube; stainless-steel micro-mesh filter',
    productImage: 'http://ecx.images-amazon.com/images/I/81eCRsy8rzL._SL1500_.jpg',
    price: 99.95
  },
  { title: 'KitchenAid Artisan 5-Quart Stand Mixers',
    description: '325-watt mixer with 10 speeds; 5-quart stainless steel bowl\
                  Tilt-back head for easy access to mixture, 60 Hz. 120 V. 3 Prong\
                  2-piece pouring shield with large chute for adding ingredients',
    productImage: 'http://ecx.images-amazon.com/images/I/81sWvINNTlS._SL1500_.jpg',
    price: 310.26
  },
  { title: 'Libbey Glass 3716YS6B Carolina Glassware, 7-Pc. Set',
    description: 'Versatile 16-ounce goblets can be used for ice tea, water, soft drinks, wine\
                  90-ounce capacity pitcher\
                  Each pitcher features a handcrafted lip',
    productImage: 'http://ecx.images-amazon.com/images/I/71QAEzX0%2BBL._SL1500_.jpg',
    price: 22.97
  },
  { title: 'Totally Bamboo 20-7930 3-Piece Cutting Board Set',
    description: 'Set of 3 bamboo cutting boards measuring 6 by 8 inches, 8-1/2 by 11 inches, and 9-1/2 by 13 inches',
    productImage: 'http://ecx.images-amazon.com/images/I/91hEEu9CAHL._SL1500_.jpg',
    price: 17.99
  },
  { title: 'Ginsu 04817 International Traditions 14-Piece Knife Set with Block, Natural',
    description: 'Symmetrically-cut, two-dimensional serrated edges for precision slicing\
                  Stainless-steel blades never needs sharpening',
    productImage: 'http://ecx.images-amazon.com/images/I/71ItT68f8fL._SL1500_.jpg',
    price: 27.50
  },
  { title: 'Lifetime Brands KC448BXOBA Tool & Gadget Set, Black, 17-Pc.',
    description: 'Tools included: slotted turner, basting spoon, slotted spoon, and nylon tongs\
                  Tool are safe to use on all cookware including nonstick and are heat resistant up to 450 degrees',
    productImage: 'http://ecx.images-amazon.com/images/I/81xxp0hdayL._SL1500_.jpg',
    price: 36.47
  },
  { title: 'Canon EOS Rebel T3i 18 MP CMOS Digital SLR Camera',
    description: '18.0 MP CMOS sensor and DIGIC 4 Image Processor for high image quality and speed\
                  ISO 100 - 6400 for shooting from bright to dim light',
    productImage: 'http://ecx.images-amazon.com/images/I/71hurE69ltL._SL1500_.jpg',
    price: 599.00
  },
  { title: 'Reed & Barton Bristol Flatware Chest',
    description: 'Lined in tarnish-preventive silver cloth. Holds 210 pieces. Mahogany/Brown',
    productImage: 'http://ecx.images-amazon.com/images/I/814%2BCdAX2QL._SL1500_.jpg',
    price: 101.99
  },
  { title: 'Lodge Color Dutch Oven',
    description: 'Dishwasher-safe, but washing by hand recommended; lifetime warranty. Lid fits 11-inch Lodge color skillet; oven-safe to 500-degree F. 2 Coats of durable porcelain enamel in colorful exterior, cream-colored interior',
    productImage: 'http://ecx.images-amazon.com/images/I/41nPt8fAdTL.jpg',
    price: 49.97
  },
  { title: 'Norpro 6 Piece Porcelain Ramekin Set',
    description: '3.75 inch/9.5cm diameter\
                  Holds .5 cup/4 ounces\
                  Bake individual custards and souffles',
    productImage: 'http://ecx.images-amazon.com/images/I/61LlVpoDnDL._SL1500_.jpg',
    price: 11.69
  },
  { title: 'Cuisinart 77-10 Chef\'s Classic Stainless 10-Piece Cookware Set',
    description: 'Classic cookware made of mirror finish stainless steel\
                  8- and 10-inch skillets; 1-1/2- and 3-quart covered saucepans\
                  3-1/2-quart sauté pan with cover; 8-quart covered stockpot',
    productImage: 'http://ecx.images-amazon.com/images/I/719CL1drQuL._SL1500_.jpg',
    price: 129.00
  },
  { title: 'Libbey Glass 80681 Craft Beer Glass Barware, 6-Pc. Set',
    description: 'One glass each: classic pilsner, english pub, belgian ale, craft pub glass, porter/stout, wheat beer\
                  Made of glass\
                  Great bachelor, housewarming, or host gift, as well as an excellent addition for the beer lover\'s collection',
    productImage: 'http://ecx.images-amazon.com/images/I/81kyJtdEMuL._SL1500_.jpg',
    price: 18.00
  },
  { title: 'Bormioli-Rocco Sorgente Glasses',
    description: 'Irregular shape fits perfectly in any hand.\
                  14 1/4 -Ounce\
                  Dishwasher safe\
                  Made in Italy',
    productImage: 'http://ecx.images-amazon.com/images/I/81P9l%2B050cS._SL1500_.jpg',
    price: 15.29
  },
  { title: 'Mr. and Mrs. Apron Set Black & White For The Bride and Groom',
    description: 'Classic bib aprons; 34"L X 30"W\
                  Made of 65/35 poly cotton twill\
                  Durable 7.5 oz. fabric; no pockets',
    productImage: 'http://ecx.images-amazon.com/images/I/41YjrKCspxL.jpg',
    price: 19.95
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
