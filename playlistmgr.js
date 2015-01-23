var fs = require('fs')
var util = require('util')
var dirPath = '/mnt/vista64audio'
var allFiles = [];
var cnt = 0;

var SongList = function()
{
    var self = this;
    self.Albums = [];

} ();

function Song(title,filepath)
{
    var self = this;
    this.Title = title;
    this.FilePathname = filepath;

}

function Folder(name, folders, songs)
{
    var self = this;
    self.Name = name;
    self.Folders = folders || [];
    self.Songs = songs || [];
}

function getFiles(dir, folder_, files_){
   cnt++
    files_ = files_ || [];
    folder_ = folder_ || new Folder(dir);
    if (typeof (files_) === 'undefined') files_ = [];

    var files = fs.readdirSync(dir).filter(function (file) {
      return (file.substr(-4) === ".mp3" || fs.statSync(dir+"/"+file).isDirectory());
    });
    
    if (cnt < 20) {
        for (var i in files) {
            if (!files.hasOwnProperty(i)) {
                continue;
            }
            var name = dir + '/' + files[i];
            
            //console.log(name);
            if (fs.statSync(name).isDirectory()) {
                
                folder_.Folders.push(new Folder(files[i]));
                getFiles(name, folder_.Folders[folder_.Folders.length - 1], files_);
            
            } else {
                folder_.Songs.push(new Song(files[i].replace(".mp3",""),name));
            //files_.push(name);
            }
        }
    }
    
    return folder_;

}
var st = new Date()
var ret = getFiles(dirPath, new Folder(dirPath))
fs.writeFile("songs.json", JSON.stringify(ret));
console.log((new Date()).getTime() - st.getTime())


/*
var jsonData = '{"albums": [ { "albumartist": "Jimmy U", "albumtitle": "grong the skonk", "files": [ {"filepath": "/slld/slldk/song1.mp3","title": "song1" },{"filepath": "/slld/slldk/song2.mp3","title": "song1" } ] }]}'

var obj = JSON.parse(jsonData);

console.log(util.inspect(obj, false, 3))

var objExample = 
 {
    "albums": [
        {
            "albumartist": "Jimmy U",
            "albumtitle": "grong the skonk",
            "files": [
                {
                    "filepath": "/slld/slldk/song1.mp3",
                    "title": "song1"
                },
                {
                    "filepath": "/slld/slldk/song2.mp3",
                    "title": "song1"
                }
            ]
        }
    ]
};

*/
//console.log(getFiles(dirPath))

/*
getFiles(dirPath, function (flz){
   
    for (var i=0;i<flz.length;i++)
    {
        allFiles.push(flz[i]);
    }
    console.log(allFiles.length)
});
*/


function getFilesAsync()
{
    fs.readdir(dirPath, 
        function(err, files){
            console.log(files);
        }
    );
    console.log('getFilesAsync done');
}



//getFilesAsync();

//console.log(allFiles);