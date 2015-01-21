
function Player(constructorObject) {

    this.id = null;
    this.name = HG_TOOLS.generatePlayerName() || "BUG";
    this.classID = Math.floor(Math.random() * 11); 
    this.level = 100;
    
    /* Targetting */
    this.currentTarget = "noTarget"; //id of target enitiy
    this.hasTarget = true;
    /* Player status bools */
    this.isAlive = true;
    this.isCasting = false;
    this.onGlobal = false;
    
    this.stats = {  // Stats from gear
        
        int: 20000,
        stamina: 29913,
        haste: 12.38,
        mastery: 0,
        crit: 29.44,
        dodge: 5,
        spirit: 0,
        armorPercent: 30,
        maxMana: 300000,
        maxHealth: 110454
    };

    this.a_stats = {  // Calculated stats for spells
        
        health: this.stats.maxHealth,
        resistance: { // number between 0 and 1 to use in calculations
            absorb: 1251,    // Absorbs goes under resistance aswell to avoid redudancy. Logically it makes sense too 
            healing_taken: 0, 
            physical: 0.45,
            magic: 0,
            all: 0,
            frost: 0,
            nature: 0,
            fire: 0,
            shadow: 0,
            holy: 0,
            nature: 0
        },
        avoidance: {
            miss: 0,
            parry: 0,
            dodge: 0
        },
        enhancements: {
            healing_versatality: 0,
            damage_versatality: 0,
            spellpower: 0,
            crit: 0,
        }

    };
    
    /* Dummy spells for testing, the ID is real */
    
    this.spells = [   { id:2061,  name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500},
                      { id:53563, name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500},
                      { id:20473, name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500},
                      { id:82327, name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500},

                  ];


}

Player.prototype.useAbility = function(spellObject){
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

Player.prototype.modStat = function(statName, value){ // function to modify stats
       if(typeof value != 'number'){
           console.log("Error in Player.modStat: value is not number");
           return;
       }
       if(this.stats[statName]) {
           this.stats[statName] += value;
       }
       if(this.a_stats[statName]) {
           this.a_stats[statName] += value;
       }
};

Player.prototype.hasAura = function(auraIDorName){
                // returns true of false based on the player having the aura.
};

Player.prototype.getResist = function(resistType){ // Returns the resist value , or false if there is no resistance at all.
        for (resistance in this.a_stats.resistance){
            if (resistance === resistType){
                return this.a_stats.resistance[resistance];
            }
        }
        return false;
}

Player.prototype.setTarget = function(target) {
        this.currentTarget = target;

}

Player.prototype.getHealthPercent = function () {
        return (this.a_stats.health / this.stats.maxHealth) * 100;
};