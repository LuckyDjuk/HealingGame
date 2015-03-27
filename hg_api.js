/*

    Slags API vi bruka for Ã¥ fÃ¥ data ut av spillet.
    
*/

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
      if (currentPlayer.isAlive && (currentPlayer.a_stats.health < currentPlayer.stats.maxHealth)) {
          injuredPlayers.push(currentPlayer);
      }
  }
  if(injuredPlayers.length > 0) {
    return injuredPlayers;
  }
  else {
    return false;
  }
}


function getSpellIconURL(spellId) {
    
    if ( getSpellData(spellId) ) {
       return "http://wow.zamimg.com/images/wow/icons/large/"+ getSpellData(spellId).icon + ".jpg";
    }
    
    else {
        console.log("getSpellIconURL(): error - not valid icon for spellid or missing.");
    }
}

function rollTheDice(diceSize) {
         return Math.random()*diceSize.toFixed();
}
function getRandomInjuredPlayer() {
         var injuredPlayers = _getInjuredPlayers();
         return raid[rollTheDice(injuredPlayers.lenght)];
}
function getUnitIdFromName(unitName){
        for(raidIndex = 0; raidIndex < raid.length; raidIndex++){
            if(raid[raidIndex].name == unitName){
               return raid[raidIndex];
            }
        }
        return false;
}
function unitAura(unitID,filters){

    if ( raid[unitID].auras.length > 0 ) {
        return raid[unitID].auras;
    }
    else {
        return false;
    }

}

function unitHealthMax(unitID){
    return raid[unitID].stats.maxHealth;
}
function unitHealth(unitID){

    return raid[unitID].a_stats.health;
    /* Returns:
    
    health        Number - unit current health
    
    */
}

function getClassColorTxT(classId){
    var classColorsTxT = ["#C41F3B", "#FF7D0A", "#ABD473", "#69CCF0", "#00FF96","#F58CBA", "#FFFFFF", "#FFF569", "#0070DE", "#9482C9", "#C79C6E"
    ];
    
    return classColorsTxT[classId] || classColorsTxT[0] ;

}


function getClassColor(classId){
    var classColors = ["#8c162a", "#8c4406", "#678045", "#386c80", "#008c52", "#8c506a", "#8c8c8c", "#8c873a", "#00468c", "#675b8c", "#8c6e4d"];
    
    return classColors[classId] || classColors[0] ;
}

function getClassIdFromName(className){ // get class id from name
        var class_ids = {
            'warrior':      1,
            'paladin':      2,
            'hunter':       3,
            'rogue':        4,
            'priest':       5,
            'deathknight':  6,
            'shaman':       7,
            'mage':         8,
            'warlock':      9,
            'monk':        10,
            'druid':       11,
        };
        
        if(typeof className != 'string'){
           console.log("input must be strong");
           return;
        }
        
        className = className.toLowerCase();
        return sc_class_ids(className) || console.log("no class id for that name");
    };
function generatePlayerName() {
        var randomNames = "Eowiragan,Ferraseth,Umeilith,Wice,Brierid,Fedriric,Higod,Gweann,Thigovudd,Fraliwyr,Zardorin,Halrik,Qae,Gwoif,Zoican,Tjolme,Dalibwyn,Miram,Medon,Aseannor,Angleus,Seita,Sejta,Fraggoji,Verdisha,Oixte,Lazeil,Jhazrun,Kahva,Ussos,Usso,Neverknow,Sco,Treckie,Slootbag,Unpl,Smirk,Lappe,Fraggoboss,Devai,Luumu,Alzu,Altzu"
  		var nameArray = randomNames.split(",")
  		var x = Math.round(Math.random()*nameArray.length-1);
		return nameArray[x];

}
function randomNumberFromTo(min, max) { // returns a random number between min & max
        var randomNumber = Math.random() * (max - min) + min;
        return randomNumber;
};

function getRaidRosterInfo(raidIndex) {    
    /* Returns:
      name        String  - Raid member's name
      subgroup    Integer - The raid party this character is currently a member of.
      level      
      class       String - 
      isDead      Boolean - Returns 1 if raid member is dead (hunters Feigning Death are considered alive), nil otherwise.
      role        String - The player's role within the raid ("maintank" or "mainassist").
    */
    
}
