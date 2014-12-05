function remotePlay(filename){
    
    $.get("/player?name="+filename, function (data) {
        
        alert("Played File " + filename);

    });
    
}

