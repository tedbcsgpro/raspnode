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
    console.log('player function invoked');

    var retMsg = playFileRemote(req.query.name) 
    retMsg += req.query.name

    console.log("retMsg:" + retMsg);
    //res.writeHead(200, { 'Content-Length': retMsg.length, 'Content-Type' : 'text/plain'} )
    res.send(retMsg);

};

function playFileRemote(filename) {
    console.log('playFileRemote called with filename: ' + filename);
    var ret = "Success started playing file:  ";
    try {
            filename=filename.replace('music','mnt/vista64audio');
            fs.createReadStream(filename)
	    .pipe(new lame.Decoder())
	    .on('format', function (format) {
                    this.pipe(new Speaker(format));
            });
        
    } catch (e) { 
        ret = "Error: " + e.message + " playing file: ";
    }
   
    return ret;
}

function mp3Files()
{
    var dirPath = '/mnt/vista64audio/Pamplemousse'; // audio;
    var retFiles = [];
    var files = fs.readdirSync(dirPath).filter(function (file) {
        return file.substr(-4) === '.mp3';
    });
    for (i in files) {
        var name = "/music/Pamplemousse/" + files[i];
        retFiles.push(name);
    }
    return retFiles;
   
}
