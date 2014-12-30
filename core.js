/*
    Core.js
*/

//var raiddmg = 698125 ; 
//var bossdmg = 1100000;

//var aggro = 0; // Test, change this in browser console if you want the boss to attack a new player (0-9)
//var aggro2 = 1;

var classColorsTxT = ["#C41F3B", "#FF7D0A", "#ABD473", "#69CCF0", "#00FF96",
    "#F58CBA", "#FFFFFF", "#FFF569", "#0070DE", "#9482C9", "#C79C6E"
    ];
var classColors = ["#8c162a", "#8c4406", "#678045", "#386c80", "#008c52",
    "#8c506a", "#8c8c8c", "#8c873a", "#00468c", "#675b8c", "#8c6e4d"
    ];

var gamethread = [];
var mainChat = new Chat("mainchat");
var dbg_chat = new Chat("dbg");

function clearAllIntervals(){
         for (c = 0; c < gamethread.length; c++){
             clearInterval(gamethread[c]);
         }
}

function init() {
    // --- reset stuff ---
    aggro = 0; 
    aggro2 = 1;
    clearAllIntervals();
    gamethread = [];
    raidgrp = [];
    document.getElementById('raidcontainer').innerHTML = '';
    raid = []; 
    makeRaid(raidsize);
    // -------------------

    // Ignore this , im just experimenting. 
    
    raid[0].name = "Blome";
    raid[0].classID = 1; // Druid
/*
    raid[1].stats.armorPercent = 74.23;
  
    raid[1].stats.dodge = 65;
    raid[1].stats.maxHealth = 1200000;
    raid[1].stats.currentHealth = 1200000;
    raid[1].classID = 5; // Paladin
*/
    addKeydownListener();
    buildUnitFrames();   
    //main thread, drawing only
    gamethread.push(setInterval(updateScreen, 250));
    // These 3 are for testing
    /*
    gamethread.push(setInterval(BossSim, 1380));
    gamethread.push(setInterval(BossSim2, 1280));
       
    // Single target heals test 
    gamethread.push(setInterval(function(){Heal(getMostInjured(1))}, 1270));
    gamethread.push(setInterval(function(){Heal(getMostInjured(1))}, 1255));
    gamethread.push(setInterval(function(){Heal(getMostInjured(1))}, 1355));
    gamethread.push(setInterval(function(){Heal(getMostInjured(1))}, 1355));
    gamethread.push(setInterval(function(){Heal(getMostInjured(1))}, 1355));

    // aoe heals test
    gamethread.push(setInterval(raidaoeheal, 1355));
    gamethread.push(setInterval(raidaoe, 2100));             
    gamethread.push(setInterval(raidaoehots, 1055));
    gamethread.push(setInterval(raidaoeheal, 1555));
    gamethread.push(setInterval(raidaoeheal, 1455));
               
    */         
}

function raidaoe(){
    for(var x = 0; x < raid.length; x++){
        raid[x].changeHealth(-raiddmg, "physical", "bah", "Garrosh Hellscream", "damage");
    }
}

function raidaoeheal(){
    var mostInjured = getMostInjured(5);
    for(var x = 0; x < mostInjured.length; x++){
        mostInjured[x].changeHealth(225000);
    }
}

function raidaoehots(){
    var mostInjured = getMostInjured(5);
    for(var x = 0; x < mostInjured.length; x++){
        mostInjured[x].changeHealth(65000);
    }
}

function updateScreen() { // updates the UI   
    drawUnitFrames();
    drawChat2();
    drawChat(); 
}

function drawUnitFrames(){
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
       }, 200);
    }
}

function buildUnitFrames() {
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
        health.style.backgroundColor = classColors[(raid[i].classID)];
        name.style.color = classColorsTxT[(raid[i].classID)];
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

// All functions below is for testing/fun
function BossSim() {
    var meleeDamage = Math.floor(Math.random() * 80000 + bossdmg);

    if (raid[aggro].isAlive) {
        raid[aggro].changeHealth(-meleeDamage, "physical", "melee", "Garrosh Hellscream", "damage");
    } else {
        if (aggro === raidsize-1) {
            return;
        }
        aggro += 1;
    }
}

function BossSim2() {
    var meleeDamage = Math.floor(Math.random() * 80000 + bossdmg);

    if (raid[aggro2].isAlive) {
        raid[aggro2].changeHealth(-meleeDamage, "physical", "melee", "Garrosh Hellscream", "damage");
    } else {
        if (aggro2 === raidsize-1) {
            return;
        }
        aggro2 += 1;
    }
}

function Heal(player,amount) {
    var p = player[0];

    var a = amount || restosham.healing_surge();
    if (p.isAlive) {
        p.changeHealth(a);
    }
}