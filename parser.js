/* 

    parser.js 

*/
var clParser = (function(){
    clParser = {};
    
    clParser.testCombatLogSim = function() {
            clSimTest(clParser.parse());
    }
    
    /* parse() Takes a raw WoW combat log and parses it, returning an array of event-objects. */
    clParser.parse = function(rawcombatlog) {
        //---- Make an array where each index is a line in the combatlog. --------------------------------
        var combatlog = rawcombatlog.split('\n') || document.getElementById('cl_input').value.split('\n'),
        //---- Get the log start time from the first line of the combatlog array -------------------------
            logStartTime = HHMMSStoMS(combatlog[0].slice(6, 17)), 
            currentLine,
            parsedCL = [],
            line;
        //--- Cycle through every element in the combatlog array, and save the data to an object --------
        for (line in combatlog) {
            currentLine = combatlog[line];
            evt_data = currentLine.slice(20).split(',');
            event_obj = {
                id:            line,
                timestamp:     HHMMSStoMS(currentLine.slice(6, 17)) - logStartTime, // time since log start
                type:          evt_data[0],
                source_id:     evt_data[1],
                source_name:   evt_data[2],
                dest_id:       evt_data[5],
                dest_name:     evt_data[6],
                spell_school:  schoolNameFromId(+evt_data[8]),
                amount:        +evt_data[21] || 0,
                data:          evt_data
            };
            parsedCL.push(event_obj);
            dbg_chat.addLine([event_obj.id, " --- Timestamp(ms) --- ", event_obj.timestamp,
                                            " --- Event Type --- ", event_obj.type,
                                            " --- Source --- ", event_obj.source_name,
                                            " --- Destination--- ", event_obj.dest_name,
                                            " --- Value --- ", event_obj.amount     
                        ].join(''));
        }
        console.log("Parsing complete without error!");
        //--- Return the finished array of event objects. -------------------------------------------------
        return parsedCL;
    }
    
    function schoolNameFromId(schoolId) {
        switch (schoolId) {
            case 0x0:  return 'Physical'; // ?
            case 0x1:  return 'Physical'; // ?
            case 0x2:  return 'Holy';
            case 0x3:  return 'Holystrike';
            case 0x4:  return 'Holy';
            case 0x5:  return 'Flamestrike';
            case 0x6:  return 'Holyfire';
            case 0x8:  return 'Nature';
            case 0x9:  return 'Stormstrike';
            case 0xA:  return 'Holystorm';
            case 0xC:  return 'Firestorm';
            case 0xC:  return 'Firestorm';
            case 0x11: return 'Froststrike';
        }   
    }
    /* Messy test function to experiment with the parsed combat log data, it trys to replay the combatlog visually */
    function clSimTest(parsed_combat_log) {
        var instructPtr = 0,
            timeMS = 0,
            cl_events = parsed_combat_log,
            timer = setInterval(tick,100),
            CL_END = cl_events[instructPtr].length;

        function tick() {

            while(timeMS >= cl_events[instructPtr].timestamp){

                dbg_chat.addLine([                      cl_events[instructPtr].id, 
                              "--- Timestamp(ms) --- ", cl_events[instructPtr].timestamp,
                                 "--- Event Type --- ", cl_events[instructPtr].type,
                                   " --- Sender: --- ", cl_events[instructPtr].source_name,
                                    " --- Recive --- ", cl_events[instructPtr].dest_name,
                                    " --- Amount --- ", cl_events[instructPtr].amount].join(''));

                if ((cl_events[instructPtr].dest_name == '"Blome-TheMaelstrom"') && (cl_events[instructPtr].type == "SWING_DAMAGE")){
                    raid[0].currentHealth -= cl_events[instructPtr].amount;
                    mainChat.addLine(cl_events[instructPtr].source_name + " did " + cl_events[instructPtr].amount + " " + cl_events[instructPtr].spell_school 
                                     + " damage to "  + cl_events[instructPtr].dest_name);
                }
                else if (cl_events[instructPtr].type == "UNIT_DIED") {
                    mainChat.addLine(cl_events[instructPtr].dest_name + " dies.");
                }
                    instructPtr++;
            }

            if (instructPtr === CL_END) {
                console.log("--- End of combat log ---");
                clearInterval(timer);
                return;
            }
            timeMS += 100; // maybe this should happen first instead?
        }
    }
    
    // ----- Converts 'HH:MM:SS' timeformat to millisecs -----------------------------------------------
    function HHMMSStoMS(HHMMSS) {  
        var arr = HHMMSS.split(':');
        return arr[0]*60000*60000 + arr[1]*60000 + arr[2]*1000;
    }
    
    return clParser;
    
})();