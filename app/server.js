var aws = require("aws-lib");

var prodAdv = aws.createProdAdvClient('AKIAJA3VUOAVLK3I6EGA', '6+cUIObeSHDv5BXuolmIyyCRVpFwoGYJzqImvIHv', 'giftlist08-20');

var options = {SearchIndex: "Books", Keywords: "Javascript"}

prodAdv.call("ItemSearch", options, function(err, result) {
  if (err) {
    console.log(err);
  } else {
    console.log(result);
  }
});

