/*

    Slags API vi bruka for å få data ut av spillet + legge til data. Blir vel mest bruk til interface. Tatt det meste fra wow sin API

*/



function unitAura(){


    /* returns:
    
    
    */

}

function unitHealth(unitID){


    /* Returns:
    
    health        Number - unit current health
    
    */

}

function getClassColorTxT(classId){
    var classColorsTxT = ["#C41F3B", "#FF7D0A", "#ABD473", "#69CCF0", "#00FF96","#F58CBA", "#FFFFFF", "#FFF569", "#0070DE", "#9482C9", "#C79C6E"
    ];
    
    return classColorsTxT[classId] || classColorsTxT[0] ;

}

function getClassColor(classId){
    var classColors = ["#8c162a", "#8c4406", "#678045", "#386c80", "#008c52", "#8c506a", "#8c8c8c", "#8c873a", "#00468c", "#675b8c", "#8c6e4d"];
    
    return classColors[classId] || classColors[0] ;
}

function getRaidRosterInfo(raidIndex) {    
    /* Returns:
      name        String  - Raid member's name
      subgroup    Integer - The raid party this character is currently a member of.
      level      
      class       String - 
      isDead      Boolean - Returns 1 if raid member is dead (hunters Feigning Death are considered alive), nil otherwise.
      role        String - The player's role within the raid ("maintank" or "mainassist").
    */
    
}

function setKeybind(key, spell) {
    
}