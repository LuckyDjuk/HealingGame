

var raid = [];
var raidsize =  20 ;
// --- Nakes an array of Player objects -------------------------------------------
function makeRaid(raidsize) {
    var newPlayer;

    for (var raidIndex = 0; raidIndex < raidsize; raidIndex++) {;
            
        newPlayer = new Player({
            id: raidIndex,
            name: generatePlayerName(),
            classid: randomNumberFromTo(0,11).toFixed(),
            level: 100
        });
                                        
        raid.push(newPlayer);
    }
}