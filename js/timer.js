//$(document).ready(function(){ 

String.prototype.convTime = function () {
    var msec    = this % 1000;
    var sec_num = Math.floor(this / 1000);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ":" + minutes + ":" + seconds + "." + msec;
}

var Timer = {
    iddle: function(){
        $("time").css("color", "black");
        debug.log("stop time // trigerStatus = " + this.trigerStatus);
    },
    ready: function(){
        $("time").css("color", "lightgreen");
        debug.log("Ready to start // trigerStatus = " + this.trigerStatus);
    },
    runing: function(){
        this.timeDate[0] = new Date();
        $("time").css("color", "blue");
        this.runTime();
        debug.log("start time // trigerStatus = " + this.trigerStatus);
    },
    timeDate: [],
    timeMs: {},
    runTime: function(){
            if(this.trigerStatus == "stop"){
                clearTimeout(timeout);
                //$('time').text(this.timeMs.toString().convTime());
                debug.log("stop time // trigerStatus = " + this.trigerStatus + " (" + this.timeMs +")");
                this.ajaxInsert(this.timeMs);
            }
            if(this.trigerStatus == "running"){
                var timeout = setTimeout(function(){
                    Timer.timeDate[1] = new Date;
                    Timer.timeMs = Timer.timeDate[1] - Timer.timeDate[0];
                    debug.log(Timer.timeMs);
                    $('time').text(Timer.timeMs.toString().convTime());   
                    Timer.runTime();
                },100);
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
    ajaxInsert: function(getTime){
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // m$ #$%#@
        }
        xmlhttp.open("GET", "insert.php?time_ms=" + getTime, true);
        xmlhttp.send();

        Timer.ajaxExtract();
    },
    ajaxExtract: function(){
        var tableRow = "<tr><td>NO</td><td>"+ this.timeMs.toString().convTime() + "</td></tr>";
        debug.log(tableRow);
        $("#last_times table").prepend(tableRow);
        /*
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // m$ #$%#@
        }
        xmlhttp.onreadystatechange = function() {
            document.getElementById("last_times").innerHTML = this.responseText;
            $("last_times").text(this.responseText);
        }; 
        xmlhttp.open("GET", "extract.php", true);
        xmlhttp.send();
        */
    },
    init: function(){
        $( document ).keydown(this.spaceDown.bind(this));
        $( document ).keyup(this.spaceUp.bind(this));
    }
};

Timer.init();


    
var debug = {
    debug: 1,
    log: function(x){
        if(this.debug == 1){
            console.log(x);
        }
    },
}

//});
