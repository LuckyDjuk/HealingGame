// En basic javascript module, kan putte alt mulig rart her så vi slippe å ha det global. Javascript støtta egentlig ikkje modules eller private ting :p men men rare hax så går det. Vi burde kanskje bruke Typescript, så blir det lettere for oss og andre å hjelpe til med projektet.

var HG_TOOLS = (function () {
    HG_TOOLS = {};
    
    
    
    HG_TOOLS.isItCrit = function(chanceToCrit) {
        var rand_num = HG_TOOLS.rngFromTo(0, 100); //random number from 0 - 100

        if (rand_num <= chanceToCrit) 
            return true; // if the number is less than or equal to crit chance , then           its a crit.
        else 
            return false;
    
    };

    
    HG_TOOLS.rngFromTo = function(min, max) { // returns a random number between min & max
        var result = Math.random() * (max - min) + min;
        return result;
    };   
    
    
    HG_TOOLS.CountDown = function CountDown(ms) {

        var interval_id = setInterval(tick, 100);
        var progress_ms = ms;

   
        function tick() {
       
        if (progress_ms <= 0) {
            clearInterval(interval_id);
            return;
        }
        progress_ms = progress_ms - 100;
        }
    
        function getProgress (){
            return progress_ms;
        }
    
        return { progress: function(){ return getProgress()} };

    };
    
    return HG_TOOLS;
}());