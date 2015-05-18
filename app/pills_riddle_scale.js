var scaleUses=3;
var difference=0;
var scaleOne=0;
var scaleTwo=0;
var scaleOnePills=[];
var scaleTwoPills=[];
var emptyBoxes=[];
var difference;


var scaleOne = document.getElementById('scaleOne');
var scaleTwo = document.getElementById('scaleTwo');
var scaleOneFeedback = document.getElementById('scaleOneFeedback');
var scaleTwoFeedback = document.getElementById('scaleTwoFeedback');
var scaleComparison = document.getElementById('scaleComparison');
var weighButton = document.getElementById('weighButton');
var clearScale = document.getElementById('clearScale');

var checkScalePills = function(){
	scaleOnePills.length=0;
	scaleTwoPills.length=0;
	emptyBoxes.length=0;
	for (var i = 1; i < numPills+1; i++) {
		if(allPills[i].group==1){
			scaleOnePills.push(i);
			emptyBoxes.push(i);
		}
		else if (allPills[i].group==2){
			scaleTwoPills.push(i);
			emptyBoxes.push(i);
		}
	}
}

var calculateDifference = function() {
	difference = 0;
	scaleOne = 0;
	scaleTwo = 0;
	checkScalePills();
	for(var i=0;i<scaleOnePills.length;i++){
		scaleOne+=allPills[scaleOnePills[i]].weight;
	}
	for(var i=0;i<scaleTwoPills.length;i++){
		scaleTwo+=allPills[scaleTwoPills[i]].weight;
	}
	return difference = scaleOne-scaleTwo;
}

var printFeedback = function() {
	// Print scaleOneFeedback and ScaleTwoFeedback. 
	// Each pill is followed by a comma (except the last pill in each group)
	for(var i=0;i<scaleOnePills.length;i++){
		scaleOneFeedback.innerHTML+='Pill_'+scaleOnePills[i];
		if(i+1<scaleOnePills.length){scaleOneFeedback.innerHTML+=', '}
	}
	for(var i=0;i<scaleTwoPills.length;i++){
		scaleTwoFeedback.innerHTML+='Pill_'+scaleTwoPills[i];
		if(i+1<scaleTwoPills.length){scaleTwoFeedback.innerHTML+=', '}
	}

	// Print the Comparison
	if(difference>0){scaleComparison.innerHTML+='weighs MORE THAN';	}
	else if(difference>0){scaleComparison.innerHTML+='weighs LESS THAN';	}
	else{scaleComparison.innerHTML+='weighs THE SAME AS';}

	// Add a white line to scaleOneFeedback, scaleTwoFeedback, and scaleComparison
	if(scaleUses>0){
		scaleOneFeedback.innerHTML+='<hr>';
		scaleTwoFeedback.innerHTML+='<hr>';
		scaleComparison.innerHTML+='<hr>';
	}

	//Decrement the weighButton output
	weighButton.innerHTML='Weigh (&times '+scaleUses+')';
	if(scaleUses==0){
		weighButton.disabled=true;
		weighButton.style.color='#777777';
	}
}


var useScale = function() {
	if(scaleUses>0){
		scaleUses--;
		calculateDifference();
		printFeedback();
	}
}

var clearScales = function() {
	checkScalePills();

	var usedPills=scaleOnePills.concat(scaleTwoPills);
	if(usedPills.length>0){
		for(var i=0;i<usedPills.length;i++){
			movePill(usedPills[i],pillBoxID('Cont',emptyBoxes[i]));
		}
	}
}

var buttonEventListeners = function() {
	weighButton.addEventListener('mousedown',useScale);
	clearScale.addEventListener('mousedown',clearScales);

}




buttonEventListeners();