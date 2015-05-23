var scaleUses=3;
var difference=0;
var scaleOne=0;
var scaleTwo=0;
var scaleOnePills=[];
var scaleTwoPills=[];
var emptyContBoxes=[];
var difference;


var scaleOne = document.getElementById('scaleOne');
var scaleTwo = document.getElementById('scaleTwo');
var scaleOneFeedback = document.getElementById('scaleOneFeedback');
var scaleTwoFeedback = document.getElementById('scaleTwoFeedback');
var scaleComparison = document.getElementById('scaleComparison');
var weighButton = document.getElementById('weighButton');
var clearScale = document.getElementById('clearScale');
var clearLeft = document.getElementById('clearLeft');
var clearRight = document.getElementById('clearRight');
var answer = document.getElementById('answer');

var checkScalePills = function(){
	scaleOnePills.length=0;
	scaleTwoPills.length=0;
	emptyContBoxes.length=0;
	for (var i = 1; i < numPills+1; i++) {
		if(allPills[i].group==1){
			scaleOnePills.push(i);
			emptyContBoxes.push(i);
		}
		else if (allPills[i].group==2){
			scaleTwoPills.push(i);
			emptyContBoxes.push(i);
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
	else if(difference<0){scaleComparison.innerHTML+='weighs LESS THAN';	}
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
		removeClass(answer,'disabled');
		addClass(answer,'enabled');
		pillBoxCreator(answer,'ANS_',1);
		document.getElementById('pillBox_ANS_1').addEventListener('dragenter',pbDragEnterListener);
		document.getElementById('pillBox_ANS_1').addEventListener('dragover',pbDragEnterListener);
		document.getElementById('pillBox_ANS_1').addEventListener('dragleave',pbDragLeaveListener);
		document.getElementById('pillBox_ANS_1').addEventListener('drop',pbDropListener);
		document.getElementById('pillBox_ANS_1').addEventListener('drop',function(e){
			var data = e.dataTransfer.getData('application/pill_number');
			data = data.split(',');
			var parentEl = document.getElementById(data[0]);
			var pillNum = parseInt(data[1],10);
			if (allPills[pillNum].isPoison){alert ('Well Done');}
			else{alert("You're Dead!")}
		});
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
	ClearRightScale();
	clearLeftScale();

}
var ClearRightScale = function() {
	checkScalePills();
	if(scaleTwoPills.length>0){
		for(var i=0;i<scaleTwoPills.length;i++){
			var emptySpaceR=i+1;
			if(!pillBoxID('R',emptySpaceR).innerHTML==""){
				emptySpaceR++;
			}
			movePill(scaleTwoPills[i],pillBoxID('R',emptySpaceR));
		}
	}
}
var clearLeftScale = function() {
	checkScalePills();

	if(scaleOnePills.length>0){
		for(var i=0;i<scaleOnePills.length;i++){
			var emptySpaceL=i+1;
			if(!pillBoxID('L',emptySpaceL).innerHTML==""){emptySpaceL++;}
			movePill(scaleOnePills[i],pillBoxID('L',emptySpaceL));
		}
	}
}

var buttonEventListeners = function() {
	weighButton.addEventListener('mousedown',useScale);
	clearScale.addEventListener('mousedown',clearScales);
	clearLeft.addEventListener('mousedown',clearLeftScale);
	clearRight.addEventListener('mousedown',ClearRightScale);

}




buttonEventListeners();