
var HG_TOOLS = ( function () {
    HG_TOOLS = {};
    
    //### Game tools module. ###########
    
    HG_TOOLS.isItCrit = function(chanceToCrit) {
        var rand_num = HG_TOOLS.rngFromTo(0, 100); //random number from 0 - 100

        if (rand_num <= chanceToCrit) 
            return true; // if the number is less than or equal to crit chance , then           its a crit.
        else 
            return false;
    
    };

    
    HG_TOOLS.rngFromTo = function(min, max) { // returns a random number between min & max
        var result = Math.random() * (max - min) + min;
        return result;
    };   
    
    HG_TOOLS.getClassIdFromName = function(className){ // get class id from name
        var sc_class_ids = {
            'warrior':      1,
            'paladin':      2,
            'hunter':       3,
            'rogue':        4,
            'priest':       5,
            'deathknight':  6,
            'shaman':       7,
            'mage':         8,
            'warlock':      9,
            'monk':        10,
            'druid':       11,
        };
        
        if(className != 'string'){
           console.log("input must be strong");
           return;
        }
        
        className = className.toLowerCase();
        return sc_class_ids(className) || console.log("no class id for that name");
    };
    
    
    HG_TOOLS.HHMMSStoMS = function(HHMMSS) {  // Converts 'HH:MM:SS' timeformat to millisecs 
        var arr = HHMMSS.split(':');
        return arr[0]*60000*60000 + arr[1]*60000 + arr[2]*1000;
    }; 
    
    
    HG_TOOLS.generatePlayerName = function() {
        var randomNames = "Tiondel, \
        Elynd, \
        Amyndil, \
        Anyriand, \
        Tal, \
        Vail, \
        Swra, \
        Jungwen, \
        Reijiicy, \
        Ellys, \
        Elella, \
        Lacla, \
        Gliliwen, \
        Qendawen, \
        Win, \
        Xantis, \
        Mardoclya, \
        Adrang, \
        Cawind, \
        Garine, \
        Kun, \
        Delorthian, \
        Grauno, \
        Eno, \
        Johero, \
        Traugh, \
        Eithaenn, \
        Kharzak, \
        Bronk, \
        Wildmane, \
        Toljo, \
        Hoofwhite, \
        Enyepada, \
        Cloudhorn, \
        Heftig, \
        Maldehm, \
        Baine, \
        Cougerfur, \
        Grimtorn, \
        Yorrick, \
        Nojha, \
        Taur, \
        Blackmane, \
        Gait, \
        Enan, \
        Longhorn, \
        Limjo, \
        Longknife, \
        Thunderhorn, \
        Fylyn, \
        Halrima, \
        Roikyla, \
        Thullana, \
        Toillane, \
        Gupyna, \
        Gyda, \
        Dokyla, \
        Pukela, \
        Thellana, \
        Tillena, \
        Elrioril, \
        Eowyr, \
        Elviol, \
        Araytha, \
        Ibaregan, \
        Unomalith, \
        Zerfall, \
        Unilajar, \
        Olaonwan, \
        Arauder, \
        Qae, \
        Halrik, \
        Zardorin, \
        Fraliwyr, \
        Thigovudd, \
        Gweann, \
        Higod, \
        Fedriric, \
        Brierid, \
        Wice, \
        Umeilith, \
        Ferraseth, \
        Eowiragan, \
        Wev, \
        Vilajan, \
        Grilinwan, \
        Rhonen, \
        Cendawyth, \
        Etardord, \
        Haeran, \
        Praesean, \
        Kedoabard, \
        Etaotha, \
        Acuwin, \
        Landazar, \
        Erigop, \
        Umilawin, \
        Goswin, \
        Siraldan, \
        Choi, \
        Pendash, \
        Lasko, \
        Crirawan, \
        Pendali, \
        Bie, \
        Prerrahar, \
        Onirew, \
        Ocyld, \
        Haldir, \
        Adol, \
        Galeannor, \
        Merek, \
        Prohawin, \
        Kalilath, \
        Umohasean, \
        Laroed, \
        Yboa, \
        Gwea, \
        Rhilild";
  		var nameArray = randomnames.split(",")
  		var x = Math.round(Math.random()*nameArray.length-1);
		return nameArray[x];

    }
    
    // ###############################
    return HG_TOOLS;
}());