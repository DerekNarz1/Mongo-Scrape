var scrape = require("../scripts/scrape");
var makeDate = require("../scripts/date");

var Headline = require("../models/Headline");

module.exports = {
  fetch: function(holder) {

    scrape(function(data) {
      
      var articles = data;
    
      for (var i = 0; i < articles.length; i++) {
        articles[i].date = makeDate();
        articles[i].saved = false;
      }

      Headline.collection.insertMany(articles, { ordered: false }, function(err, docs) {
        holder(err, docs);
      });
    });
  },

  delete: function(query, holder) {
    Headline.remove(query, holder);
  },

  get: function(query, holder) {

    Headline.find(query)
      .sort({
        _id: -1
      })
      
      .exec(function(err, doc) {
        
        holder(doc);
      });
  },
  
  update: function(query, holder) {
    
    Headline.update({ _id: query._id }, {
      $set: query
    }, {}, holder);
  }
};
