function remotePlay(filename){
    var url = "/player?name="+filename;
   $.get(url).done(function(data) {
	alert(data);
    });
    
}

