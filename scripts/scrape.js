
var request = require("request");
var cheerio = require("cheerio");

var scrape = function(holder) {

  request("http://www.nytimes.com", function(err, res, body) {
  
    var $ = cheerio.load(body);

    var articles = [];

    //nytimes article parameters

    $(".theme-summary").each(function(i, element) {
      //.theme-summary, story-heading, summary.text
     
      var head = $(this).children(".story-heading").text().trim();


      var sum = $(this).children(".summary").text().trim();

      if (head && sum) {

        // Remove New Lines and Cluter from articles

        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

 
        //Push article
        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat
        };

        articles.push(dataToAdd);
      }
    });
    holder(articles);
  });
};

module.exports = scrape;
