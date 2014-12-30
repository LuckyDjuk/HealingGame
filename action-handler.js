function ActionHandler(actionObject){
        var action = actionObject;
        
        switch(action.type){
              case "DAMAGE": handleDamage()
              case "HEALING": handleHealing()
              case "APPLY_AURA": handleAura()
        }
        function handleDamage(){
            if(!action.target.isAlive){
                return
            }
            var raw_amount_cpy = amount, // Keep a copy of the original value
            amount_cpy = amount,
            caster = casterName || "Environment";

            /// ARMOR & AVOIDANCE
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
}