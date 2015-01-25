

/* 
    Spells.
    We could just hardcode spells(example below), at least to begin with - much easier than the alternative.
    
    Below is an example of how it could look like.
*/


function resto_shaman_healing_surge(caster, target) {
    var amount = 0;
    var spell_scaling = getScaleData('SPELL_SCALING','shaman',this.level); 
    // needs to be updated for WoD ( spell scaling is gone in wod, only spellpower matters )
    var delta = 0.1330000013,
        average = 11.2329998016,
        coefficiant = 1.1349999905,
        max = (average * spell_scaling) * (1 - delta / 2),
        min = (average * spell_scaling) * (1 + delta / 2);
    
    if(!target.isAlive){
        return console.log("Target is dead. resto_shaman_healing_surge"); 
    }
    
    amount = HG_TOOLS.rngFromTo(min, max) + (coefficiant * caster.spellpower);
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
    else if(HG_TOOLS.isItCrit(caster.stats.crit)){
        amount = amount * 2;
    }
    return amount;
}

function resto_shaman_mastery() {    
    return ((1 - (raid[this._target].getHealthPercent() / 100)) * this.mastery) + 1;
}
