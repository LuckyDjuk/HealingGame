
function Player(constructorOptions) {

    this.id = null; // A unique id should be generated for each instance. Not implelmented yet
    this.name = constructorOptions.name || 'noName:(';
    this.classID = constructorOptions.classid || 0;
    this.level = constructorOptions.level || 100;
    
    // ---- What raid party the player is in - needed for group-based heals like prayer of healing ----------------------
    this.subGroup = null;
    // ---- Targetting --------------------------------------------------------------------------------------------------
    this.currentTarget = "noTarget";
    this.hasTarget = true;
    // ---- Player status bools -----------------------------------------------------------------------------------------
    this.isAlive = true;
    this.isCasting = false;
    this.onGlobal = false;
    
    // ---- Stats from gear ---------------------------------------------------------------------------------------------
    this.stats = {  
        
        int: 2000,
        stamina: 2000,
        hasteRating: 1200,
        masteryRating: 2414,
        critRating: 455,
        dodgeRating: 142,
        spirit: 4555,
        armorRating: 2413,
        maxMana: 300000,
        maxHealth: 700454
    };
    // ----- Calculated stats for spells -------------------------------------------------------------------------------
    this.a_stats = {  
        
        health: this.stats.maxHealth,
        resistance: { 
            absorb: 190000,  // Absorbs goes under resistance aswell to avoid redudancy. Logically it makes sense too.
            physical: 0.40,
            magic: 0,
            all: 0, 
            frost: 0,
            fire: 0,
            shadow: 0,
            holy: 0,
            nature: 0,
            chaos: 0
        },
        avoidance: {
            miss: 0.04,
            parry: 0.20,
            dodge: 0.20
        },
        enhancements: {
            healing_versatality: 1.8,
            damage_versatality: 0,
            spellpower: 0,
            crit: 0,
            haste: 0,
            mastery: 0,
            healing_taken: 0,
            damage_taken: 0,
            damage_done: 0,
            healing_done: 0
        }

    };
    // ----- Auras -------------------------------------------------------------------------------------------------------
    this.auras = {};
 
    
    //------ Spells ---- For testing -------------------------------------------------------------------------------------
    this.spells = [   { id:2061,  name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500},
                      { id:53563, name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500},
                      { id:20473, name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500},
                      { id:82327, name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500},

                  ];
}

Player.prototype.useAbility = function(spellObject) {
    var spell = spellObject,
        player = this;
        castTime = 0;
    
    
    //#### CHECK IF ITS LEGAL TO CAST ##############/
    if (player.isCasting) {
        console.log("Can't Use That Yet.");
        return;
    }

    if (player.onGlobal && spell.hasGlobal) {
        console.log("Can't Use That Yet.");
        return;
    }

    if (spell.onCooldown) {
        console.log("Spell not ready yet");
        return;
    }
    
    if (player.stats.mana < spell.manacost){
        console.log("Not enough mana to use spell");
    }

    if (player.hasTarget === false) {
        if (player.options.autoSelfCast === true) {
            // set target to self
        }
        else {
            console.log("Invalid or no target");
            return;
        }
    }
    
    // Execute cast
}

// ---- MOD STAT ----- Function to modify stats. returns undefined. ex modStat("int", -20); ---------------------------------------------------
Player.prototype.modStat = function(statName, value) { 
       if(typeof value != 'number'){
           console.log("Error in Player.modStat: value is not number");
           return;
       }
    
       if(statName == "absorb") {
           this.a_stats.resistance.absorb += value;
       }
       if(this.stats[statName]) {
           this.stats[statName] += value;
       }
       if(this.a_stats[statName]) {
           this.a_stats[statName] += value;
       }
};

// --- GET RESIST ---- Returns the resist value (number between 0 and 1 to use in calculation) , Returns 0/false if there is no resistance at all. 
Player.prototype.getResist = function(resistType) {
        for (resistance in this.a_stats.resistance) {
            if (resistance === resistType){
                return this.a_stats.resistance[resistance];
            }
        }
        return false;
}

Player.prototype.getEnhancement = function(enhancementType) {
       for (enhancement in this.a_stats.enhancements) {
            if (enhancement === enhancementType) {
                return this.a_stats.enhancements[enhancement];
            }
        }
        return false;
}

Player.prototype.setTarget = function(target) {
        this.currentTarget = target;

}
// ### Maybe instead of this we can have a sunction that get any stats with to option to be in percent or flat value ? ###
Player.prototype.getHealthPercent = function () {
        return (this.a_stats.health / this.stats.maxHealth) * 100;
};

Player.prototype.getAvoidance = function(avoidanceType){ 
}
    
// Returns true of false based on the player having the aura.
Player.prototype.hasAura = function(auraIDorName){
};

Player.prototype.die = function(){
        // remove all auras, that doesnt presist throuh death
        // set player status to dead
        // other stuff that should happen when dead
}