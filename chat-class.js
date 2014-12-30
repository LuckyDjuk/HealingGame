
/*
    Chat Class
    HealingGame
*/


function Chat(nameString){ // constructor
         this.name = nameString;
         this.data = [''];
         

}

Chat.prototype.addLine = function(string){
         if(typeof string === 'string'){
            this.data.push(string);
         }
         else{
            console.log('Error in Chat.addLine: input not string');
         }
}


Chat.prototype.getAllData = function() {

         return this.data;
   
};

Chat.prototype.getLastEntries = function(numberOfLinesToBeReturned){ 

               var howMany = numberOfLinesToBeReturned || 5;
               var returnPack = [];

               for(c = 1; c < howMany+1; c++){

                    // Replace with blank if anything else than string
                    if(typeof this.data[this.data.length-c] != 'string'){  
                        returnPack.push(''); 
                        continue;
                    }


                   returnPack.push([this.data[this.data.length-c]]);
               }

               return returnPack;

}