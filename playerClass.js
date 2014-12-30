function Player() {

    this.name = generateName();
    this.classID = Math.floor(Math.random() * 11); 
    this.spells = null;
    this.level = 100;

    this.stats = { 
        spellpower: 20000,
        stamina: 29913,
        haste: 12.38,
        mana: 300000,
        crit: 29.44,
        dodge: 5,
        armorPercent: 30,
        maxHealth: 110454,
    };
    
    this.activeStats = function (){
        // get scaling data from getScaleData("datatype", level , class);
        //calculated stats , including auras etc.
    }
    
    this.auras = [];

    this.cooldowns = []; // Manages spell cooldowns;
    this.currentHealth = this.stats.maxHealth;

    this.currentTarget = "noTarget";
    this.hasTarget = true;
    this.timeAlive;

    this.isAlive = true;
    this.absorbs = 0;
    
    this.isCasting = false;
    this.castProgress = 0;
    this.gdc = 0;
}
/*
    this.cast = function(spid){
        if (this.isCasting) { // Check if in gcd or already casting
            return console.log("Can't Use That Yet. (GCD) -"+this.names);
        }

        if (this.hasCooldown(spid)){
            return console.log("Spell not ready yet");
        }

        if (this.hasTarget === false){
            if (options.autoSelfCast === true){
                // set target to self

            }

            else return console.log("Invalid target or no target");
        }
        

        var castTime; // CALCULATE CASTTIME

        if (SPELL.castTime != 0){ /// IF SPELL HAS A CAST TIME
            castTime = SPELL.castTime * (1 - (this.stats.haste/100));
            this.isCasting == true;
            console.log("i am here");
            new countDown(castTime);
        }
        else 
            castTime = 0;
            this.gcd = 1500;


        switch (SPELL.effect[0]){
                case "HEAL": 
                var heal = (this.stats.spellpower * SPELL.effect[2]) + SPELL.effect[3];
                console.log("heal amount"+ heal);
                break;

                case "AURA":


                case "I"
        }

      


                     // SEND OUTPUT AT FINISHED CAST
                     // REMOVE POWER FROM PLAYER
        this.stats.mana -= SPELL.powerCost;

        console.log("Actual cast time: " + castTime);
        console.log("Player mana: " + this.stats.mana);
        

    }

    */
Player.prototype.hasAura = function(auraIDorName){
                // returns true of false based on the player having the aura.
};

Player.prototype.getHealthPercent = function () {
        return (this.currentHealth / this.stats.maxHealth) * 100;
};

/*
Player.protoype.hasCooldown = function(spid){
                for(spell in cooldowns){
                    if spell === spid {
                        return true;
                    }
                }
                return false;
}
*/

Player.prototype.changeHealth = function (amount, type, source, casterName, effect) {
        if(!this.isAlive){return}
        var raw_amount_cpy = amount, // Keep a copy of the original value
            amount_cpy = amount,
            caster = casterName || "Environment";

        /// ARMOR & AVOIDANCE
        if (type === "physical") { // If damage type is Physical , armor will reduce the damage
            amount_cpy = amount_cpy * (1 - (this.stats.armorPercent / 100));

            if (source === "melee") { // If source is melee then avoidance will be possible.
                var roll = Math.floor(Math.random() * 100);
                if (roll <= this.stats.dodge) {
                    mainChat.addLine("<p id = 'system'>" + caster + "</p>  hits " + this.name + "<p                                     id='error'> ,dodged</p>");
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