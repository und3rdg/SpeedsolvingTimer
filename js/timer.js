$(document).ready(function(){ 

var Timer = {
    iddle: function(){
        $("time").css("color", "black");
        this.runTime();
        console.log("stop time // trigerStatus = " + this.trigerStatus);
    },
    ready: function(){
        $("time").css("color", "lightgreen");
        this.timeMs = 0;
        console.log("Ready to start // trigerStatus = " + this.trigerStatus);
    },
    runing: function(){
        $("time").css("color", "blue");
        this.runTime();
        console.log("start time // trigerStatus = " + this.trigerStatus);
    },
    timeMs: 0,
    runTime: function(){
            if(this.trigerStatus == "stop"){
                clearTimeout(timeout);
                $('time').text(Timer.timeMs);
            }
            if(this.trigerStatus == "running"){
                var timeout = setTimeout(function(){
                    Timer.timeMs++;
                    console.log(Timer.timeMs);
                    $('time').text(Timer.timeMs);   
                    Timer.runTime();
                },100)
            }
    },
    trigerStatus: "stop",
    down: {}, // key down spamming fix
    initKey: 32, // space
    spaceDown: function(e){
        var keycode = (e.keyCode ? e.keyCode : e.which);
        if(e.keyCode == this.initKey){
                // ready to run time
            if(this.trigerStatus == "stop"){
                if(this.down[this.initKey] == null){    
                    this.trigerStatus = "ready";
                    this.ready();
                }
            }
                // stop time
            if(this.trigerStatus == "running"){
                if(this.down[this.initKey] == null){
                    this.trigerStatus = "stop";
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
            if(this.trigerStatus == "ready"){
                this.trigerStatus = "running";
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


});
