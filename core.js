/*
    Core.js
*/

var mainChat = new Chat("mainchat");
var dbg_chat = new Chat("dbg");
var humanPlayer;

function init() {
    // --- Reset stuff --------------------------------------
    raidgrp = [];
    document.getElementById('raidcontainer').innerHTML = '';
    raid = [];
    makeRaid(raidsize);
    humanPlayer = raid[0];
    // ----- Build the UI elements ---------------------------
    buildRaidFrames();
    buildPlayerFrame();
    buildSpellBar();
    //------ Build the option menu ---------------------------
    var optionMenu = new dat.GUI;
    optionMenu.add(clParser,'testCombatLogSim');
    optionMenu.add(window,'smartAoeHealTest');
    optionMenu.add(window,'aoeDamageTest');
    optionMenu.add(window,'buildSpellBar');
    // ---- Welcome message for the javascript console -------
    console.log('%c Healing Game - World Of Warcraft healing simulation', 'background: #222; color: #bada55');
    //----- Set a interval for the updateScreen function -----
    var screenUpdate = setInterval(updateScreen, 100);
    /* Sidenote: 
       The screenUpdate variable contains the return value of setInterval(), 
       which is an interval id. This can be used to cancel the interval 
       using clearInterval(intervalID);
    */
}


function aoeDamageTest() {
    var damage_amount;
    for(var x = 0; x < raid.length; x++){
        damage_amount = HG_TOOLS.rngFromTo(200000,450000)
        handleDamage({
            source: "test",
            destination: raid[x],
            school: 'physical',
            damageSource: 'melee',
            value: damage_amount
        });
    }
}

function smartAoeHealTest(){
    var mostInjured = getMostInjured(7);
    for(var x = 0; x < mostInjured.length; x++){
        mostInjured[x].changeHealth(20000);
    }
}

function updateScreen() { // updates the UI   
    updateRaidFrames();
    drawChat2();
    drawChat(); 
}

function updateRaidFrames(){
    var playerID,
        player,
        health,
        healthPercent,
        healthFrameID;
    // Goes through every raidmemeber and changes the width of their health frames width based on what HP they got.
    for (playerID = 0; playerID < raidsize; playerID++) {
        player = raid[playerID];
        health = player.getHealthPercent();
        healthPercent = health.toFixed(0) + "%";
        healthFrameID = "#health" + playerID;
        
        //jquery animation for health bars
       $(healthFrameID).animate({
       width: healthPercent
       }, 50);
        
        
        if(playerID == 0){
            $('#player_health').animate({
                width: healthPercent
                }, 50);
        }
    }
}
/* Det e stygt men det funka :p , alt ditta blir vel replaca med ett 2d bibliotek etterkvert uansett */


function buildTargetFrame(){
}

function buildPlayerFrame(){
    if(!humanPlayer){ return; };
    var info_txt = document.createElement('p'),
        mana = document.createElement('div'),
        container = document.createElement('div'),
        health = document.createElement('div');
 
    
    container.style.cssText = " top: 50%; left: 30%; width: 150px; height 45px; position: absolute; background-color: black;";
    mana.style.cssText = "float: left; width: 100%; height: 15px; background-color: blue;";
    health.style.cssText =  "float: left; width: 100%; height: 30px; background-color: "+getClassColor(humanPlayer.classID)+";";
    info_txt.style.cssText = "margin-left: 5px; font-size: 11px;";
    info_txt.innerHTML = humanPlayer.name + "   " + humanPlayer.level;

    container.id = "target_cont";
    health.id = "player_health";
    mana.id = "player_mana";
    
    document.body.appendChild(container);
    container.appendChild(health);
    health.appendChild(info_txt);
    container.appendChild(mana);
}


function setTarget(event){

        var raidid = parseInt(event.id.replace("border",""));
        humanPlayer.setTarget(raid[raidid]);
        console.log("Your target is now: " + humanPlayer.currentTarget.name);
            
}

function buildSpellBar(){
    
    if(!humanPlayer){ return; };
    
    humanPlayer.spells.map(function(spell){
        var iconURL = "http://wow.zamimg.com/images/wow/icons/large/"+ getSpellData(spell.id).icon + ".jpg";
        addActionButton(iconURL);
    });
    
    function addActionButton(iconURL){
        var actionButton = document.createElement("div");
        var spellbar = document.getElementById("spellbar");
        
        spellbar.style.cssText = "width: 500px; height: 50px;";
        actionButton.style.cssText = "margin: 3px; float: left; width: 50px; height: 50px; background-size: contain; background-image: url('"+iconURL+"')";
        spellbar.appendChild(actionButton);
    }
}
function buildRaidFrames() {
    var i,
        border,
        name,
        health,
        auras,
        auraCont,
        node;
    
    for (i = 0; i < raidsize; i++) {
        border = document.createElement("div");
        name = document.createElement("p");
        health = document.createElement("div");
        auras = document.createElement("div");
        auraCont = document.createElement("div");
        name.className = "playerName";
        border.id = "border" + i;
        auras.id = i;
        auras.className = "auras";
        auraCont.id = "auraContainer";
        border.setAttribute("onClick", "setTarget(this)");
        border.className = "raidMemberBorder";
        health.id = "health" + i;
        health.style.backgroundColor = getClassColor(raid[i].classID);
        name.style.color = getClassColorTxT(raid[i].classID);
        health.className = "raidmember";
        node = document.createTextNode(raid[i].name.slice(0,6));
        document.getElementById('raidcontainer').appendChild(border);
        border.appendChild(health);
        name.value = border.id;
        name.appendChild(node);
        border.appendChild(name);
        border.appendChild(auraCont);
        auraCont.appendChild(auras);
    } 
}

function drawChat() {
    var totalLines = 6;
        
    var chatData = mainChat.getLastEntries(6);
    for (line = 0; line < totalLines; line++) {
        temp = document.getElementById("m" + line);
        temp.innerHTML = chatData[line];
    }
}

function drawChat2() {
    var totalLines = 9;
        
    var chatData = dbg_chat.getLastEntries(9);
    for (line = 0; line < totalLines; line++) {
        temp = document.getElementById("y" + line);
        temp.innerHTML = chatData[line];
    }
}