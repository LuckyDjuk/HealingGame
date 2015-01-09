
function Player() {

    this.id = null;
    this.name = generateName();
    this.classID = Math.floor(Math.random() * 11); 
    this.level = 100;

    this.stats = {  // Stats from gear
        
        int: 20000,
        stamina: 29913,
        haste: 12.38,
        mastery: 0,
        mana: 300000,
        crit: 29.44,
        dodge: 5,
        spirit: 0,
        armorPercent: 30,
        maxHealth: 110454
    };

    this.a_stats = {  // Calculated stats for spells
        
        mastery: null,//this.class.mastery(),
        spellpower: null,
        health: null,
        physical_resist: 0, // basicly armor
        all_resist: 0,
        magic_resist: 0,     
        amlifications: null, // For example healing taken reduced by %
        haste: 0.20,
        crit: null
        
        // get scaling data from getScaleData("datatype", level , class)    
    };
    
    this.spells = [   { id:0, name:"Healing Surge", casttime: 1500, powercost:2400, powertype:"mana", effect: null , cooldown: 8000, gcd: 1500 }   ];

    
    this.auras = [];
    this.currentHealth = this.stats.maxHealth;

    this.currentTarget = "noTarget"; //id of target enitiy
    this.hasTarget = true;

    this.isAlive = true;
    this.absorbs = 0;
    this.isCasting = false;
    this.castProgress = 0;
    this.gdc = 0;
}

Player.prototype.useAbility = function(spellObject){
    var spell = spellObject,
        player = this;
        castTime = 0;
    
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
    castTime = spell.casttime * (1 - player.a_stats.haste);
    dbg_chat.addLine("Casting: " + spell.name + "  -  Execute time: " + castTime);
    player.isCasting == true;
    var countdown = setTimeout(castFinished,castTime);
    
    function castFinished(){
        
            player.isCasting == false;
            //spell.use();
            player.stats.mana -= spell.manacost;
            
            dbg_chat.addLine("Finished casting: " + spell.name);
        
    }
}

Player.prototype.modStat = function(statName, value){ // function to modify stats
       // example: target.modStat("int",20)
};

Player.prototype.hasAura = function(auraIDorName){
                // returns true of false based on the player having the aura.
};

Player.prototype.hasResist = function(resistType){ // physical, shadow, frost etc.
}

Player.prototype.getHealthPercent = function () {
        return (this.currentHealth / this.stats.maxHealth) * 100;
};

Player.prototype.changeHealth = function (amount, type, source, casterName, effect) {
        if (!this.isAlive) {
            return;
        }
        var raw_amount_cpy = amount, // Keep a copy of the original value
            amount_cpy = amount,
            caster = casterName || "Environment";

        /// RESISTANCE & AVOIDANCE
        
        if (type === "physical") { // If damage type is Physical , armor will reduce the damage
            amount_cpy = amount_cpy * (1 - (this.stats.armorPercent / 100));

            if (source === "melee") { // If source is melee then avoidance will be possible.
                var roll = Math.floor(Math.random() * 100);
                if (roll <= this.stats.dodge) {
                    mainChat.addLine("<p id = 'system'>" + caster + "</p>  hits " + this.name + "<p id='error'> ,dodged</p>");
                    return;
                }
            }
        }
        /// ABSORBS
        if (this.absorbs > 0 && effect === "damage") { // If type is damage and player has absorbs on them.
            var x = amount_cpy + this.absorbs; // 
            if (x >= 0) { // If there is more absorb left after the damage is taken
                this.absorbs = x;
                amount_cpy = 0;
            } else { // 
                amount_cpy += this.absorbs;
                this.absorbs = 0;
            }

        }
        // CHECK IF STILL ALIVE
        if ((this.currentHealth + amount_cpy) <= 0) { // Check if the player dies
            this.currentHealth = 0;
            this.isAlive = false;
            return;
        }

        // OVERHEALING
        if ((this.currentHealth + amount_cpy) >= this.stats.maxHealth) { // Check if the value goes over maximum possible health.
            this.currentHealth = this.stats.maxHealth;
            return;
        }
        //
    
        this.currentHealth += amount_cpy;

        if (raw_amount_cpy < 0) {
            mainChat.addLine(caster + " did<p id ='system'>" + Math.abs(amount_cpy.toFixed(0)) + "  ( " +
            Math.abs(raw_amount_cpy.toFixed(0) - amount_cpy.toFixed(0)) + " absorbed by Armor)</p> damage to : <p id = 'error'>" + this.name + "</p>");
        }
};

/*
    Ideen bak apply() e at alt som kan skje med en player går igjennom dinna funksjonen, som da sende det videre til "subroutines".
    Komme til å replace changeHealth funksjonen med ditta, etterkvert som motivasjonen kjeme ;D.
    
    Eksempel:
    
    Eg sende ett objekt til dinna funksjonen som ser sånn ut:
    
    ACTIONOBJECT
    {
        action: "damage",
        school: "physical,
        source: "melee",
        value:  62000        
    }
    
    

*/
Player.prototype.apply = function(actionObject) {
    switch(actionObject.action){
        case "damage":
            handleDamage();
            break;
       // case: "healing"
       // case: "aura"
    }
            
    function handleDamage(){ // same as Player.prototype.changeHealth() , just much more readable. 
            var value = actionObject.value;

            if(actionObject.source === 'melee'){
                // avoidance will happen here : parry - dodge - block??
            }
            
            if(this.getResist(actionObject.school)){ // if player has any resistance to the thing happening to them. Armor goes under resitance aswell
                value *= this.getResist(apply.Object.school);
            }
            
            if(this.getResist("all")){
                value *= this.getResist("all");
            }
            
            if(this.a_stats.absorbs){
                value -= absorbs; 
            }
            
            this.modStat("health", -Math.abs(value));
    }

}