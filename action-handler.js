/* Actionhandler.js */




/* 
    ### DAMAGE HANDLER ###
    This should be able to handle any basic form of damage that exists in the game , and output the right amount.
    Replacing the Player.changeHealth function

*/ 

function handleDamage(actionObj) {
        var action = actionObj;
        var value = action.value;
        var avoided_damage = false;
        var output_data = {
            parry:false,
            dodge:false,
            blocked: 0,
            absorbed: 0,
            resisted: 0,
        }
        
        //AVOIDANCE
        if(action.damageSource === 'melee'){
            if(destination.getAvoidance('dodge')){avoided_damage === true}

            else if(destination.getAvoidance('parry')){avoided_damage === true}
            
            else if(destination.getAvoidance('miss')){avoided_damage === true}

            else if(destination.getAvoidance('block')){avoided_damage === true}
        }

        //RESISTANCE - happens if the damage was not avoided
        if(!avoided_damage){
            // Checks if player has any resistance to the thing happening to them. Armor goes under resitance aswell
            if(action.destination.getResist(action.school)){
                value *= action.destination.getResist(action.school);
            }
            // Checks if player has resistance to all types of damage
            if(action.destination.getResist("all")){ 
                value *= action.destination.getResist("all");
            }
            // Checks if any absorb is on the player
            if(action.destination.getResist('absorb')){
                var capture_absorbed_amount = value;
                value -= action.destination.getResist('absorb'); 
                capture_absorbed_amount = capture_absorbed_amount - value;
                output_data.absorbed = capture_absorbed_amount;
            }
        }
    
        //OUTPUT
        dbg_chat.addLine("Event type: [Damage]   Source: [" + action.source.name + "]   Dest: [" + action.destination.name + "]  Amount: [" + value +"]" + output_data);
        action.destination.modStat("health", -Math.abs(value));  // last but not least, change the health of the destination player.
}


function handleHealing(){
}