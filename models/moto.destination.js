var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var DestSchema = new Schema({
  userId: {type: Schema.Types.ObjectId},
  name: {type: String, required: true},
  destName: {type: String, required:true},
  destComment: {type: String},
  location: {type: [Number], required: true}
  });

DestSchema.index({location: '2dsphere'});

module.exports = mongoose.model('motoDestination', DestSchema);
