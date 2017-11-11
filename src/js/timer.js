$(document).ready(function(){ 

String.prototype.convTime = function () {
    var msec    = this % 1000;
    var sec_num = Math.floor(this / 1000);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours <  10)   {hOut = "0" + hours + ":";}
    if (hours >= 10)   {hOut = hours + ":";}
    if (hours <  1 )   {hOut = ""}

    if (minutes <  10) {mOut = "0" + minutes + ":";}
    if (minutes >= 10) {mOut = minutes + ":";}
    if (minutes <  1 ) {mOut = "";}
   
    if (seconds <  10) {sOut = "0" + seconds + ".";}
    if (seconds >= 10) {sOut = seconds + ".";}
    //if (seconds <  1 ) {sOut = "";}

    if (msec < 100) {msec = "0" + msec;}
    if (msec < 10) {msec = "0" + msec;}
 
    return hOut  + mOut + sOut + msec;
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

var Timer = {
    iddle: function(){
        $('html').scrollTop('0');
        $("time").css("color", "yellow");
        debug.log("stop time // trigerStatus = " + this.trigerStatus);
    },
    ready: function(){
        $('html').scrollTop('0');
        $("time").css("color", "lightgreen");
        debug.log("Ready to start // trigerStatus = " + this.trigerStatus);
    },
    runing: function(){
        $('html').scrollTop('0');
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
                // this.ajaxInsert(this.timeMs);
                Ajax.insert(this.timeMs);
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
    updateTimeTable: function(){
        var lastTimeId = parseInt($('#last_times td:first').text(), 10) + 1;
        var dateTime = "";
        var timesAction = '<a class="peanlty">+2</a> <a class="dnf">dnf</a> <a class="del">del</a>';

        var tableRow = "<tr>" +
            "<td>" + lastTimeId + "</td>" +
            "<td>" + this.timeMs.toString().convTime() + "</td>" +
            "<td>" + dateTime + "</td>" +
            "<td>" + timesAction + "</td>" +
            "</tr>";
        debug.log(tableRow);
        $("#last_times").prepend(tableRow);
        this.timeAction();
    },
    timeAction: function(){
        // select id of time, and action type
        // call function on page load and after solve to refresh it
        $('.peanlty, .dnf, .del').click(function(e){
            var button = $(e.target);
            var actionType = button.text(); // +2 or DNF or DEL 
            debug.log(actionType);
            var StrId = $(button).parents().eq(0).siblings().eq(0).text();
            var timeId = parseInt(StrId, 10);
            debug.log(timeId + typeof(timeId));

           if(actionType == '+2'){ Timer.plusTwoTime(timeId)}; 
           if(actionType == 'dnf'){ Timer.dnfTime(timeId)}; 
           if(actionType == 'del'){ Timer.delTime(timeId)}; 
        })
    },
    plusTwoTime: function(id){
        // +2 sec peanlty. update time in db on screen
        debug.log('plusTwoTime ' + id);    
    },
    dnfTime: function(id){
        // do not finish. mark in db and on screen
        debug.log('dnfTwoTime ' + id);    
    },
    delTime: function(id){
        // delete time from db and from screen
        debug.log('delTime ' + id);    
    },
    init: function(){
        $( document ).keydown(this.spaceDown.bind(this));
        $( document ).keyup(this.spaceUp.bind(this));
        this.timeAction();
    }
};

var Ajax = {
    connection:function(parm, val){
        if(window.XMLHttpRequest){
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // m$ #$%#@
        }
        xmlhttp.open("GET", "ajax.php?" + parm + "=" + val, true);
        xmlhttp.send();

        Timer.updateTimeTable();
    },
    insert: function(time){
        this.connection('time_ms', time);
    },
    plusTwo:'',
    dnf:'',
    del:''
}
Timer.init();


    
var debug = {
    debug: 1,
    log: function(x){
        if(this.debug == 1){
            console.log(x);
        }
    }
}

});
