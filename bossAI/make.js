



function main(){





	var input = document.getElementById("inputt").value;
	var numOfLines = 0;
	var timedEvents = [];
	var bossEvents = [];
	var command = '';

	for(x = 0; x < input.length; x++){


		if(input[x] === '\n'){
			timedEvents.push(command);
			command = '';
			x++;
		
		}

		command += input[x];
	
		
	}

	

	parseCommands();
	
	start();

	function parseCommands(){


		var events = [];
		var data = '';

		for(c = 0; c < timedEvents.length; c++){

			for(d = 0; d < timedEvents[c].length; d++){

				if (timedEvents[c][d] === ' '){
					console.log(d);
					events.push(data);
					data = '';
					d++; // Jump over the space
					
				}

				data += timedEvents[c][d];

				if (d === timedEvents[c].length-1){
					events.push(data);
					data = '';
					
				}


				
				



			}

			bossEvents.push(events);
			events = [];
			


		}


    
	}

	function start(){
		var instructionPtr = 0;
		var encounterLength = 90000;
		var nextInstructionTime = bossEvents[instructionPtr][0];
		console.log(nextInstructionTime);
		var timeElapsed = 0; //ms
		var clock = setInterval(tick,100);
		var output = document.getElementById("feedback");
		var clockOutput = document.getElementById("timer");
		function tick(){
			
			timeElapsed += 100;
       		
       		clockOutput.innerHTML = timeElapsed + " ms";
			
			if(timeElapsed == nextInstructionTime){
				console.log(bossEvents[instructionPtr]);
				output.innerHTML += "<br>" + bossEvents[instructionPtr] + "   has happened!";
				instructionPtr++;
				nextInstructionTime = bossEvents[instructionPtr][0];
			}
			if(bossEvents[instructionPtr] === undefined){
				console.log("end of instructions");
				
			}

			if(timeElapsed === encounterLength){
				console.log("encounter over");
				clearTimeout(clock);
			}

		}
	}
	

	function printCommands(){
		var output = document.getElementById("feedback");
		
		output.innerHTML += "<br>" + bossEvents;

	}
}