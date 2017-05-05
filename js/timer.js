$(document).ready(function(){ 


// colors
function colorIddle(){
    $("time").css("color", "black");
}

function colorReady(){
    $("time").css("color", "lightgreen");
}

function colorRuning(){
    $("time").css("color", "blue");
}


var timeRuning = false;
var down = {};
var trigerStep = 1;

function spaceDown(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if(e.keyCode == 32){
            // ready to start time
        if(trigerStep % 3 == 1){
            if(down['32'] == null){    
                trigerStep++;
                console.log("Ready to start // var timeRuning = " + timeRuning + " // trigerStep = " + trigerStep %3);
                colorReady();
                down['32'] = true;
            }
        }
            // stop time
        if(trigerStep % 3 == 0){
            if(down['32'] == null){
                trigerStep++;
                console.log("stop time // var timeRuning = " + timeRuning + " // trigerStep = " + trigerStep %3);
                colorIddle();
                down['32'] = true;
            }
        }
    }
}

function spaceUp(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if(e.keyCode == 32){
            // start time
            if(trigerStep % 3 == 2){
                trigerStep++;
                console.log("start time // var timeRuning = " + timeRuning + " // trigerStep = " + trigerStep %3)
                colorRuning();
                down['32'] = null;
            } else {
                down['32'] = null;
            }
    }
}

$( document ).keydown(spaceDown);
$( document ).keyup(spaceUp);







});

