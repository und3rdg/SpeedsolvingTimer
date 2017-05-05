$(document).ready(function(){ 



var timeRuning = false;
var down = {};
// colors

function colorIddle(){
    $( "time" ).css( "color", "black");
}

function colorReady(){
    $( "time" ).css( "color", "lightgreen");
}

function colorRuning(){
    $( "time" ).css( "color", "blue");
}



function spaceDown(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if( e.keyCode == 32 || charCode == 32 ){
        if( down['32'] == null) {    
            if( timeRuning == true ){
                timeRuning = false;
                // stop time
                console.log( "stop time // var timeRuning = " + timeRuning );
                colorIddle();
                down['32'] = null;
                return;
            }

            if( timeRuning == false ){
                timeRuning = true;
                // ready to start time in spaceUp()
                console.log( "Ready to start // var timeRuning = " + timeRuning );
                colorReady();
                down['32'] = true;
                return;
            }
        }
    }
}

function spaceUp(e){
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if( e.keyCode == 32 ){
            if( timeRuning == true ){
                // start time
                console.log( "start time // var timeRuning = " + timeRuning )
                colorRuning();
                down['32'] = null;
                return;
            } 
    }
}

$( document ).keydown(spaceDown);
$( document ).keyup(spaceUp);







});

