var fs = require('fs');
var lame = require('lame');
var Speaker = require('speaker');


function playFile(filename) {
    fs.createReadStream('audio/'+filename)
	.pipe(new lame.Decoder())
	.on('format', function (format) {
            this.pipe(new Speaker(format));
        });
}

exports.list = function (req, res) {
    playFile(req.query.name)
    res.send("player - Trying to Play file: " + req.query.name);
};