/*
    Core.js
*/

var classColorsTxT = ["#C41F3B", "#FF7D0A", "#ABD473", "#69CCF0", "#00FF96",
    "#F58CBA", "#FFFFFF", "#FFF569", "#0070DE", "#9482C9", "#C79C6E"
    ];
var classColors = ["#8c162a", "#8c4406", "#678045", "#386c80", "#008c52",
    "#8c506a", "#8c8c8c", "#8c873a", "#00468c", "#675b8c", "#8c6e4d"
    ];

var mainChat = new Chat("mainchat");
var dbg_chat = new Chat("dbg");

function init() {
    // --- reset stuff ---
    raidgrp = [];
    document.getElementById('raidcontainer').innerHTML = '';
    raid = [];
    makeRaid(raidsize);
    // -------------------
    makeRaid(raidsize);
    buildRaidFrames();
    
    var optionMenu = new dat.GUI;
    optionMenu.add(window, 'testCombatLogSim');
    optionMenu.add(window, 'smartAoeHeal');
    optionMenu.add(window, 'aoeDamage');
    
    var screenUpdate = setInterval(updateScreen, 250);       
}

function aoeDamage(){
    for(var x = 0; x < raid.length; x++){
        raid[x].changeHealth(-Math.abs(Math.random()*15000+15000), "physical", "bah", "Garrosh Hellscream", "damage");
    }
}

function smartAoeHeal(){
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
       }, 200);
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