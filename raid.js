

var raid = [];
var raidsize =  20 ;
// --- Nakes an array of Player objects -------------------------------------------
function makeRaid(raidsize) {
    var newPlayer;

    for (var x = 0; x < raidsize; x++) {;
            
        newPlayer = new Player({
            name: HG_TOOLS.generatePlayerName(),
            classid: HG_TOOLS.rngFromTo(0,11).toFixed(),
            level: 100
        });
                                        
        raid.push(newPlayer);
    }
}


function getMostInjuredPlayers(numberOfPlayers) {
  var injuredPlayers = _getInjuredPlayers(),

      mostInjuredPlayers = injuredPlayers.sort(
          function sortByDamageTakenAscending (player, otherPlayer) {
              if (player.getHealthPercent() < otherPlayer.getHealthPercent()) {
                  return -1;
              } else if (player.getHealthPercent() > otherPlayer.getHealthPercent()) {
                  return 1;
              } else {
                  return 0;
              }
          } 
      );

  return injuredPlayers.splice(0, numberOfPlayers || raid.length);
}

function _getInjuredPlayers() {
  var index,
      currentPlayer,
      injuredPlayers= [];

  for (index = 0 ; index < raid.length; index++) {
      currentPlayer = raid[index];
      if (currentPlayer.isAlive) {
          injuredPlayers.push(currentPlayer);
      }
  }

  return injuredPlayers;
}