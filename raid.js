var raid;
var raidgrp = [];
var raidsize =  20 ;

function makeRaid(raidsize) { // makes an array of Player objects.
    var grp = [];
    var p;

    for (var x = 0; x < raidsize; x++) {; // random class 0-11
            
        p = new Player({
            name: HG_TOOLS.generatePlayerName(),
            classid: HG_TOOLS.rngFromTo(0,11).toFixed(),
            level: 100
        });
        grp.push(p);
        raid.push(p);

        if(grp.length === 5){
            raidgrp.push(grp);
           grp = [];
        }
    }
}

function getMostInjured(howMany){      
        var raidCpy = raid.slice(0);
        var finalArr = [];
        for(var x = 0 ; x < raidCpy.length;x++){
            if(raidCpy[x].isAlive === true){
               finalArr.push(raidCpy[x]);
            }
        }
        // Look up sort() on MOZILLA DEV to know what A and B means
        var sorted = finalArr.sort(
            function(a, b) { 
                return a.getHealthPercent() < b.getHealthPercent() ? -1 : a.getHealthPercent() > b.getHealthPercent() ? 1 : 0; 
            } 
        );
    
        if (howMany === undefined || 0 || null){
            return sorted;
        }else{
        return sorted.splice(0, howMany);
    }
}

function getRaidGroup(groupNumber){
    return raidgrp[groupNumber-1];
}