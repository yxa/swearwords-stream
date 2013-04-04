var PassThrough = require('stream').PassThrough;

function SwearWordsStream(options) {
  options = options || {};

  if(!(this instanceof SwearWordsStream)) {
    return new SwearWordsStream(options);
  }
  PassThrough.call(this,options);
  this.dict = options.dict || {};
}

SwearWordsStream.prototype = Object.create(PassThrough.prototype,{ constructor: { value: SwearWordsStream } });

SwearWordsStream.prototype._transform = function(chunk, encoding, callback){
  chunk = chunk.toString();

  for (var key in this.dict) {
    var regexp = new RegExp(key, "ig");
    chunk = chunk.replace(regexp,this.dict[key]);
  }
  callback(null, chunk);
};

module.exports = SwearWordsStream;
