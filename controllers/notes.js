var Note = require("../models/Note");
var makeDate = require("../scripts/date");

module.exports = {
  get: function(data, holder) {
    Note.find({
      _headlineId: data._id
    }, holder);
  },
  
  save: function(data, holder) {

      _headlineId: data._id,
      date: makeDate(),
      noteText: data.noteText
    };

    Note.create(newNote, function(err, doc) {
      
      if (err) {
        console.log(err);
      }
     
      else {
        console.log(doc);
        holder(doc);
      }
    });
  },
  delete: function(data, holder) {
  
    Note.remove({
      _id: data._id
    }, holder);
  }
};