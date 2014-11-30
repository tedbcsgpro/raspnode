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
    playFile(req.query.name);
    res.render('index', { title: 'PiTunes', pagetitle: 'PiTunes', audioFiles: mp3Files() });
    //res.send("player - Trying to Play file: " + req.query.name);
};

function playFile(filename) {
    fs.createReadStream('audio/' + filename)
	.pipe(new lame.Decoder())
	.on('format', function (format) {
            this.pipe(new Speaker(format));
        });
}

function mp3Files()
{
    return fs.readdirSync('audio').filter(function (file) {
        return file.substr(-4) === '.mp3';
    });
}
