/*
    RESTO SHAMAN

    Eventually want this to be possible to "import" into the Player class
    Lets say, if the Player class is resto shaman. Then all these spells should be imported into that.
    Not sure how yet. But i've started hardcoding the spells anyway.
    
    MASTERY        - Complete
    HEALING SURGE  - Complete
    CHAIN HEAL     - Missing
    HEALING RAIN   - Missing
    TOTEMS         - Missing
    RIPTIDE        - Missing
    HEALING WAVE   - Missing
    EARTH SHIELD   - Missing
    

*/

function resto_shaman_mastery() {
    
    return ((1 - (raid[this._target].getHealthPercent() / 100)) * this.mastery) + 1;
}
    

function resto_shaman_healing_surge(caster, target) { // Resto Shaman Healing Spell 1
    
    if(!target.isAlive){ return console.log("Target is dead. resto_shaman_healing_surge"); }

        
    var amount = 0;
    
    var spell_scaling = getScaleData('SPELL_SCALING','shaman',this.level); 

   // needs to be updated for WoD ( spell scaling is gone in wod, only spellpower matters )
    var delta = 0.1330000013,
        average = 11.2329998016,
        coefficiant = 1.1349999905,
        max = (average * spell_scaling) * (1 - delta / 2),
        min = (average * spell_scaling) * (1 + delta / 2);
    
    amount = rngFromTo(min, max) + (coefficiant * caster.spellpower);
   
    amount *= 1.20; // all resto shamans have passive 20% more healing

    if(target.hasAura('riptide') ){ // healing surge heals for 25% more if Riptide is on the target.
            amount *= 1.25;
    }

    // You get a passive 25% increase in all healing when specced as resto shaman;
    amount *= 1.25;


    // Get Mastery Gain(Deep Healing) Resto shamans heal more if the target has lower hp.
    amount *= caster.calcMastery();

    
    if ( caster.hasAura('tidal_wave') ) { // need to add 20% more crit if caster has Tidal Wave aura
        if(isItACrit(caster.stats.crit + 20)){
        amount = amount * 2; // crit doubles the heal amount
        }
    }
    
    else if(isItACrit(caster.stats.crit)){
        amount = amount * 2;
    }

    return amount;

}


function isItACrit(chanceToCrit) {

    var rand_num = rngFromTo(0, 100); //random number from 0 - 100

    if (rand_num <= chanceToCrit) return true; // if the number is less than or equal to crit chance , then its a crit.

    else return false;
}



function rngFromTo(min, max) { // returns a random number between min & max

    var result = Math.random() * (max - min) + min;
    return result;
}
