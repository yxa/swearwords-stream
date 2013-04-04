var chai              = require('chai'),
    fs                = require('fs-extra'),
    SwearWordsStream  = require('../swearwords-stream');


var expect = chai.expect;

describe('Swear Word Filter Stream',function(){

  var readStream;
  var writeStream;

  beforeEach(function(done){
    readStream  = fs.createReadStream("test/fixtures/bad-words.txt");
    writeStream = fs.createWriteStream("test/fixtures/after-filter.txt");
    done();
  });

  afterEach(function(done){
    fs.remove("test/fixtures/after-filter.txt",function(err){
      if(err) console.log("could not delete result file");
      done();
    });
  });

  it('should not filter with empty dictionary',function(done){
    var swStream = new SwearWordsStream();

    readStream.pipe(swStream).pipe(writeStream);

    writeStream.on("finish",function(){
      var before = fs.readFileSync('test/fixtures/bad-words.txt').toString();
      var after = fs.readFileSync('test/fixtures/after-filter.txt').toString();
      expect(before).to.equal(after);
      done();
    });
   });

   it('should filter out swear words passed into constructor function', function(done) {
    var swStream = new SwearWordsStream({dict: { bad: "good", word: "sentence" }});
    readStream.pipe(swStream).pipe(writeStream);

    writeStream.on("finish",function(){
      var before = fs.readFileSync('test/fixtures/bad-words.txt').toString();
      var after = fs.readFileSync('test/fixtures/after-filter.txt').toString();
      console.log(after);
      expect(after).to.equal('goodsentence1 goodsentence2\n');
      done();
    });
   });

});
