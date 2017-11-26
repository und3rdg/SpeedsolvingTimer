$(document).ready(function(){ 

String.prototype.convTime = function () {
    var msec    = this % 1000;
    var sec_num = Math.floor(this / 1000);
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if(hours <  10)   {hOut = "0" + hours + ":";}
    if(hours >= 10)   {hOut = hours + ":";}
    if(hours <  1 )   {hOut = ""}

    if(minutes <  10) {mOut = "0" + minutes + ":";}
    if(minutes >= 10) {mOut = minutes + ":";}
    if(minutes <  1 ) {mOut = "";}
   
    if(seconds <  10) {sOut = "0" + seconds + ".";}
    if(seconds >= 10) {sOut = seconds + ".";}
    //if(seconds < 1) {sOut = "";}

    if(msec < 100)    {msec = "0" + msec;}
    if(msec < 10)     {msec = "0" + msec;}
 
    return hOut  + mOut + sOut + msec;
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

var Timer = {
    init: function(){
        // starting from here
        $( document ).keydown(this.spaceDown.bind(this));
        $( document ).keyup(this.spaceUp.bind(this));
        TimeTable.init();
    },
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
        this.timeDate[1] = new Date();
        $("time").css("color", "blue");
        this.runTime();
        debug.log("start time // trigerStatus = " + this.trigerStatus);
    },
    timeDate: [(new Date()).toISOString().substring(0, 19).replace('T', ' ')
],
    timeMs: {},
    runTime: function(){
            if(this.trigerStatus == "stop"){
                clearTimeout(timeout);
                debug.log("stop time // trigerStatus = " + this.trigerStatus + " (" + this.timeMs +")");
                Ajax.insert(this.timeMs + '&date=' + encodeURIComponent(Timer.timeDate[0]));
                TimeTable.update();
            }
            if(this.trigerStatus == "running"){
                var timeout = setTimeout(function(){
                    Timer.timeDate[2] = new Date;
                    Timer.timeMs = Timer.timeDate[2] - Timer.timeDate[1];
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
    }
};

var TimeTable = {
    init: function(){
    // tableArray json from mysql:
    // id:"NUM", times_ms:"NUM", date:"YYYY-MM-DD hh:mm:ss", 
    // plus2:"BOOL", dnf:"BOOL", del:"BOOL"
        tableArray = $.ajax("extract.php");
        tableArray.reverse().map(function(arr){
            if(arr.plus2 == true){ var cls = 'trPlus2'};
            if(arr.dnf == true){ var cls = 'trDnf'};
            if(arr.del == true){ var cls = 'trDel'};

            return TimeTable.render(arr.id, arr.times_ms, arr.date, cls)
        });
        TimeTable.timeAction(); 
    },
    //render table
    render: function(id, time, date, cls){
        var action = '<span class="plus2">+2</span> <span class="dnf">dnf</span> <span class="del">del</span>';
        $('#last_times').prepend('<tr class=' + cls + '>' +
                '<td>' + id + '</td>' +
                '<td>' + time.toString().convTime() + '</td>' +
                '<td>' + date + '</td>' +
                '<td>' + action + '</td></tr>'
        )
    },
    // adding new time to table
    update: function(){
        var timeId = parseInt($('#last_times td:first').text(), 10) + 1;
        var timesAction = '<span class="plus2">+2</span> <span class="dnf">dnf</span> <span class="del">del</span>';

        TimeTable.render(timeId, Timer.timeMs, Timer.timeDate[0]);
        
        // add new time to old array
        arrPush = {
            id:timeId, 
            times_ms:Timer.timeMs, 
            date:Timer.timeDate[0],
            plus2:0, 
            dnf:0, 
            del:0
        }
        tableArray.push(arrPush)
        
        // refresh new action buttons
        TimeTable.timeAction();
    },
    timeAction:function(){ 
        // select id of time, and action type
        // call function on page load and after solve (to refresh it)
        $('.plus2, .dnf, .del, .undel').click(function(){
            var button = $(this); //$(e.target);
            var trRow = $(button).parents().eq(1); // line
            var actionClass = button.attr('class'); // +2 or DNF or DEL 
            debug.log('actionClass: ' + actionClass);

            var StrId = $(button).parents().eq(0).siblings().eq(0).text();
            var timeId = parseInt(StrId, 10);
            debug.log(timeId + typeof(timeId));

            if(actionClass == 'plus2'){
                TimeTable.plusTwoTime(timeId);
                $(trRow).toggleClass('trPlus2');
            }; 
            if(actionClass == 'dnf'){
                TimeTable.dnfTime(timeId);
                $(trRow).toggleClass('trDnf');
            }; 
            if(actionClass == 'del'){
                TimeTable.delTime(timeId);
                $(trRow).toggleClass('trDel');
                $(trRow).fadeOut(500);
            }; 
            if(actionClass == 'undel'){
                debug.log('undelete clicked', actionClass);
            }
        })
    },
    plusTwoTime: function(id){
        // +2 sec peanlty. update time in db on screen
        Ajax.plus2(id);
    },
    dnfTime: function(id){
        // do not finished solve. mark in db and on screen
        Ajax.dnf(id);
    },
    delTime: function(id){
        // remove(hide) time from screen and mark del in db
        Ajax.del(id);
    },
};

var Ajax = {
    connection:function(parm, val){
        $.ajax("ajax.php?" + parm + "=" + val);
    },
    extract: 
        $.ajax("extract.php");
    ,
    insert: function(time){ this.connection('time_ms', time); },
    plus2: function(Id){ this.connection('plus2', Id) },
    dnf: function(Id){ this.connection('dnf', Id) },
    del: function(Id){ this.connection('del', Id) }
};



var debug = {
    debug: 1,
    log: function(x){
        if(this.debug == 1){ console.log(x); }
    }
}

// And at the end... lets begin.
Timer.init();
});
