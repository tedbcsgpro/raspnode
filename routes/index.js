var fs = require('fs')
/*
 * GET home page.
 */

exports.index = function (req, res){
    
    var files = fs.readdirSync('audio').filter(function (file) {
        return file.substr(-4) === '.mp3';
    });
  res.render('index', { title: 'Raspberry PI Nodejs Web Server', pagetitle: 'Running Nodejs Express on Raspberry PI!', audioFiles: files });
};
