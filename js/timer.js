//$(document).ready(function(){ 

var Timer = {
    iddle: function(){ // stop
        $("time").css("color", "black")
        console.log("stop time // trigerStep = " + this.trigerStep %3);
    },
    ready: function(){
        $("time").css("color", "lightgreen");
        console.log("Ready to start // trigerStep = " + this.trigerStep %3);
    },
    runing: function(){
        $("time").css("color", "blue")
        console.log("start time // trigerStep = " + this.trigerStep %3)
    },
    trigerStep: 1,
    // 0 start, spaceUp //ready to stop on keyDown
    // 1 stop, spaceDown // do noting on keyUp
    // 2 ready, spaceDown // ready to start on keyUp
    down: {}, // key down spamming fix
    initKey: 32, // space
    spaceDown: function(e){
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(e.keyCode == this.initKey){
                // ready to start time
            if(this.trigerStep % 3 == 1){
                if(this.down[this.initKey] == null){    
                    this.trigerStep++;
                    this.ready();
                }
            }
                // stop time
            if(this.trigerStep % 3 == 0){
                if(this.down[this.initKey] == null){
                    this.trigerStep++;
                    this.iddle();
                }
            }
            this.down[this.initKey] = true;
        };
    },
    spaceUp: function(e){
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(e.keyCode == this.initKey){
            // start time
            if(this.trigerStep % 3 == 2){
                this.trigerStep++;
                this.runing();
            } 
            this.down[this.initKey] = null;
        }
    },
    init: function(){
        $( document ).keydown(this.spaceDown.bind(this));
        $( document ).keyup(this.spaceUp.bind(this));
    }
};

Timer.init();


//});
