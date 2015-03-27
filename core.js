/*
    Core.js
*/
var mainChat = new Chat("mainchat");
var dbg_chat = new Chat("dbg");
var playerControlledUnit;

var testOptions = {
    aoe_amount: 40000,
    aoeheal_amount: 40000,
    aoeheal_targets: 5
};
function init() {
    
    makeRaid(raidsize);
    playerControlledUnit = raid[0];
    // ----- Build the UI elements ---------------------------
    buildRaidFrames();
    buildPlayerFrame();
    buildSpellBar();
    //------ Build the option menu ---------------------------
    var optionMenu = new dat.GUI;
    optionMenu.add(clParser,'testCombatLogSim');
    optionMenu.add(window,'smartAoeHealTest');
    optionMenu.add(window,'aoeDamageTest');
    optionMenu.add(testOptions, 'aoe_amount',50000,500000);
    optionMenu.add(testOptions, 'aoeheal_amount',20000,100000);
    optionMenu.add(testOptions, 'aoeheal_targets',1,20);
    // ---- Welcome message for the javascript console -------
    console.log('%c Healing Game - World Of Warcraft healing simulation', 'background: #222; color: #bada55');
    //----- Set a interval for the updateScreen function -----
    var screenUpdate = setInterval(updateScreen, 200);
    var aoe_damage_test = setInterval(stoneBreath,11200);
    var chain_heal_test = setInterval(smartAoeHealTest,1800);
    //var hots_test = setInterval(aoe_hots, 1600);
    /* Sidenote: 
       The screenUpdate variable contains the return value of setInterval(), 
       which is an interval id. This can be used to cancel the interval 
       using clearInterval(intervalID);
    */
}


function stoneBreath() {
    
    var x = setInterval(aoeDamageTest,1000);
    var ticks = 0;
    function aoeDamageTest() {
        if(ticks >= 6){
            clearInterval(x);
            return;
            
        }
        else {ticks++};
        var damage_amount;
        for (var x = 0; x < raid.length; x++) {
            damage_amount = testOptions.aoe_amount;
            handleDamage({
                source: "test",
                destination: raid[x],
                school: 'nature',
                damageSource: 'melee',
                value: damage_amount
            });
        }
    }
    
}

function aoeDamageTest() {
    var damage_amount;
    for(var x = 0; x < raid.length; x++){
        damage_amount = testOptions.aoe_amount;
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
    var mostInjured = getMostInjuredPlayers(testOptions.aoeheal_targets);
    for(index = 0; index < mostInjured.length; index++){
        handleHealing({
            source: mostInjured[index],
            destination: mostInjured[index],
            value: testOptions.aoeheal_amount - (index * 2000)
        });
    }
}


function aoe_hots(){
    var mostInjured = getMostInjuredPlayers(17);
    for(index = 0; index < mostInjured.length; index++){
        handleHealing({
            source: mostInjured[index],
            destination: mostInjured[index],
            value: 66000
        });
    }
}


function updateScreen() { // updates the UI   
    updateRaidFrames();
    drawChat2();
    drawChat(); 
}

function updateRaidFrames(){
    var playerID,
        unitHealthPercent,
        cssHealthPercent,
        iconUrl;

    for ( playerID = 0; playerID < raidsize; playerID++ ) {
        
        // --- Updates/animates the health bars -------------------------------------
        unitHealthPercent = ( unitHealth(playerID) / unitHealthMax(playerID) ) * 100
        cssHealthPercent = unitHealthPercent.toFixed(0) + "%";
        targetHealthFrameId = "#health" + playerID;
        
        $(targetHealthFrameId).animate({
        width: cssHealthPercent
        }, 150);
    
        
        // -------- Draw/update Auras -----------------------------------------------
        if ( unitAura(playerID) ) {      
                
            iconUrl = getSpellIconURL(unitAura(playerID)[0].spellID);
            console.log(iconUrl);
            $('#'+playerID).css('background-image', "url("+iconUrl+")");
        }
        
        else {
            $('#'+playerID).css('background-image', "");

        }
    
    }
}


function buildPlayerFrame(){
    var info_txt = document.createElement('p'),
        mana = document.createElement('div'),
        container = document.createElement('div'),
        health = document.createElement('div');
    
    container.style.cssText = " top: 50%; left: 30%; width: 150px; height 45px; position: absolute; background-color: black;";
    mana.style.cssText = "float: left; width: 100%; height: 15px; background-color: blue;";
    health.style.cssText =  "float: left; width: 100%; height: 30px; background-color: "+getClassColor(playerControlledUnit.classID)+";";
    info_txt.style.cssText = "margin-left: 5px; font-size: 11px;";
    info_txt.innerHTML = playerControlledUnit.name + "   " + playerControlledUnit.level;

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
        playerControlledUnit.setTarget(raid[raidid]);
        applyAura_absorb();
        console.log("Your target is now: " + playerControlledUnit.currentTarget.name);
            
}

function buildSpellBar(){
    
    if(!playerControlledUnit){ return; };
    
    playerControlledUnit.spells.map(function(spell){
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

/*
function newCDTimer(timerObject) {
         var obj = timerObject;
    
         boss_timers.push(obj);
         
         var interval = setInterval(updateTimeLeft, 100);
         
         function updateTimeLeft() {
             obj.timeleft -= 100;
             if ( obj.timeleft <= 0 ) {
                 if ( obj.repeat == true ) {
                    obj.timeleft = obj.cd;
                    return;
                 }
                 clearInterval(interval);
             }
         }
}
*/

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