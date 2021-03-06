/* Actionhandler.js */

/* 
    ### DAMAGE HANDLER ###
    This should be able to handle any basic form of damage that exists in the game.
    
    The input it takes is an object like this:
            {
                source: pointer_to_sender_of_damage
                destination: pointer_to_reciver_of_damage
                school: spell_school_of_the_damage ex. 'physical',
                damageSource: ex.'melee',
                value: raw_damage_amount_number
            }
    You can see it used in core.js in the aoeDamageTest() function.
    The idea is that both damage spells and auras can produce these kind of objects. To keep everything more modular. 
    
*/ 

function handleDamage(actionObj) {
        var action = actionObj;
        var dmg = action.value;
        var avoided_damage = false;
        var output_data = { // Capture some data to use for combatlogging etc.
            parry:false,
            dodge:false,
            blocked: 0,
            absorbed: 0,
            resisted: 0,
            overkill: 0
        }
        
        //-------- AVOIDANCE ------------------------------------------------------------------------------------------------
        if(action.damageSource === 'melee' || action.isAvoidable) {
            // This needs to be finished
            if(action.destination.getAvoidance('dodge')){avoided_damage === true;}

            else if(action.destination.getAvoidance('parry')){avoided_damage === true}
            
            else if(action.destination.getAvoidance('miss')){avoided_damage === true}

            else if(action.destination.getAvoidance('block')){avoided_damage === true} // Maybe block fits better under resistance. Needs research
        }

        //------- RESISTANCE --- happens if the damage was not completely avoided ------------------------------------------
        if(!avoided_damage) {
            var dmg_before_resist = dmg;
            
            //---- Checks if player has any resistance to the damage school. Armor goes under resitance/spellschool aswell ---
            if(action.destination.getResist(action.school)) {
                dmg *= 1-(action.destination.getResist(action.school));
            }
            
            //---- Checks if player has any resistance to all types of damage -----------------------------------------------
            if(action.destination.getResist('all')) { 
                dmg *= 1-(action.destination.getResist('all'));
            }
            output_data.resisted = dmg_before_resist - dmg;
            
            //---- Checks if any absorb is on the player --------------------------------------------------------------------
            if(action.destination.getResist('absorb')) {
                var dmg_before_absorb = dmg,
                    player_absorb_amount = action.destination.getResist('absorb');
                // ---- Full absorb ------------------------------------------------------
                if(player_absorb_amount >= dmg) {
                  action.destination.modStat('absorb', -Math.abs(dmg));
                  output_data.absorbed = dmg;
                  dmg = 0;
                }
                // ---- Partial absorb ---------------------------------------------------
                else {
                  action.destination.auras = []; // Test - remove later
                  var partial_absorb_amount;
                  dmg -= player_absorb_amount;
                  partial_absorb_amount = dmg_before_absorb - dmg;
                  action.destination.modStat("absorb", -Math.abs(partial_absorb_amount));
                  output_data.absorbed = partial_absorb_amount;
                }
            }
            //---- Health --- last line of defense --------------------------------------------------------------------------
        }
    
        //----- OUTPUT ----- Some output to the chat to spot errors ---------------------------------------------------------
        dbg_chat.addLine([       "-- EVENT TYPE -- ", action.damageSource,
                                    " -- SOURCE -- ", action.source,
                               " -- DESTINATION -- ", action.destination.name,
                             " -- DAMAGE AMOUNT -- ", dmg.toFixed(),
                                 " -- MITIGATED -- ", output_data.resisted.toFixed(),
                                  " -- ABSORBED -- ", output_data.absorbed.toFixed()].join(''));
    
        //----- APPLY THE DAMAGE --------- Change the health of the destination player. -------------------------------------
        action.destination.modStat("health", -Math.abs(dmg));
}

/*  Handle healing -- healing handler, not really sure what should happen here yet, but will figure it out.  */
function handleHealing(action) {
         // Todo: add error check if its a valid object with valid data
         
         var heal_amount = action.value;
    
         // -- Calculate versatality gain
         if(action.source.getEnhancement('healing_versatality')) {
            heal_amount *= action.source.getEnhancement('healing_versatality');
         }
    
         // -- Check for modifiers that increse healing taken
         if(action.destination.getEnhancement('healing_taken')) {
             heal_amount *= action.destination.getEnhancement('healing_taken');
         }
         // -- Check for overhealing -- //
         if((action.destination.a_stats.health + heal_amount) > action.destination.stats.maxHealth) {
            var overhealing = (action.destination.a_stats.health + heal_amount) - action.destination.stats.maxHealth;
            heal_amount = heal_amount - overhealing;
            
         }
        dbg_chat.addLine(" Healed " + action.destination.name + " for : " + heal_amount + "(O: " + overhealing + ")");
        action.destination.modStat("health", heal_amount);
    
}

/* Aura handling - 
    3 types of auras we definetly need.
    interval:
    duration:
    trigger: melee_damage_taken
    effect: 2313;
*/

function applyAura_absorb() {
    var action = {destination: playerControlledUnit.currentTarget};
    
    action.destination.auras.push({
        id: 0,
        effect: 'absorb',
        spellID: 17,
        duration: 12000,
        trigger: 0,
        amount: 130000,
        interval: 0,
        absorb_priority: 0
    });
    action.destination.a_stats.resistance.absorb += 130000;
    
}


function applyAura_trigger() {
    // ex. Earth Shield: It heals when the target recives melee attacks( melee attacks beeing the trigger)
}