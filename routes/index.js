var fs = require('fs')
var lame = require('lame');
var Speaker = require('speaker');


/*
 * GET home page.
 */

// index
exports.index = function (req, res){
    
    //var files = fs.readdirSync('audio').filter(function (file) {
    //    return file.substr(-4) === '.mp3';
    //});

  res.render('index', { title: 'PiTunes', pagetitle: 'PiTunes', audioFiles: mp3Files() });
};

// player
exports.player = function (req, res) {
    
    var retMsg= playFileRemote(req.query.name) + req.query.name
   
    //res.render('index', { title: 'PiTunes', pagetitle: 'PiTunes', audioFiles: mp3Files() });
    res.writeHead(200, { 'Content-Length': retMsg.length, 'Content-Type' : 'text/xml'} )
    res.send(retMsg);
};

function playFileRemote(filename) {
    var ret = "Success started playing file: ";
    try {
        fs.createReadStream('audio/' + filename)
	    .pipe(new lame.Decoder())
	    .on('format', function (format) {
                    this.pipe(new Speaker(format));
            });
        
    } catch (e) { 
        ret = "Error: " + e.message + " playing file: "
    }
   
    return ret;
}

function mp3Files()
{
    return fs.readdirSync('audio').filter(function (file) {
        return file.substr(-4) === '.mp3';
    });
}
