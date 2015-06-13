var scaleUses=3;
var difference=0;
var scaleOne=0;
var scaleTwo=0;
var pillsOnScale=[[],[]];
var emptyContBoxes=[];
var difference;

// Returns the combined weight of all the pills in a group of pillBoxes
// Each pill in that group gets added to teh corresponding array of pillsOnScale
var weigh = function(cont) {
	var weight = 0;
	for (var i=1;i<allPillBoxes[cont].length;i++){
		var pillNum=allPillBoxes[cont][i].pill;
		if(pillNum>0){
			weight+= allPills[pillNum].weight;
			pillsOnScale[cont-1].push(pillNum);
		}
	}
	return weight;
}

var calculateDifference = function() {
	difference = 0;
	pillsOnScale[0].length=0;
	pillsOnScale[1].length=0;
	return difference = weigh(1)-weigh(2);
}

// Print which pills were weighed
var printRecords = function(){
	for(var i=0;i<pillsOnScale[0].length;i++){
		scaleOneFeedback.innerHTML+='Pill#'+pillsOnScale[0][i];
		if(i+1<pillsOnScale[0].length){scaleOneFeedback.innerHTML+=' , '}
	}
	for(var i=0;i<pillsOnScale[1].length;i++){
		scaleTwoFeedback.innerHTML+='Pill#'+pillsOnScale[1][i];
		if(i+1<pillsOnScale[1].length){scaleTwoFeedback.innerHTML+=', '}
	}
	if(scaleUses>0){
		scaleOneFeedback.innerHTML+='<hr>';
		scaleTwoFeedback.innerHTML+='<hr>';		
	}
}

// Print which side of the scale was heavier
var printComparison = function() {
	if(difference>0){scaleComparison.innerHTML+='<p><span>&#8678</span> HEAVIER</p>';	}
		else if(difference<0){scaleComparison.innerHTML+='<p>HEAVIER <span>&#8680<span></p>';	}
		else{scaleComparison.innerHTML+='<p>SAME WEIGHT</p>';}
}

// What happens when the scale is used 3 times
var scaleDead = function() {
	// Disable the WeighButton
	weighButton.disabled=true;
	weighButton.style.color='#777777';

	// Enable the answer div
	removeClass(answer,'disabled');
	addClass(answer,'enabled');
	removeClass(checkAnswerButton,'disabled');
	addClass(checkAnswerButton,'enabled');
}

var checkAnswer = function() {
	var pb = pillBoxObject(document.getElementById('pillBox_5_1'));
	var pillNum = pb.pill;
	if(pb.isFull){
		if (allPills[pillNum].isPoison){alert( 'Well Done');}
		else{alert("You're Dead!")}
	}
}


var useScale = function() {
	if(scaleUses>0){
		scaleUses--;
		calculateDifference();
		printRecords();
		printComparison();
	}
	if(scaleUses==0){
		scaleDead();
	}
	// Print scaleUses on the Weigh Button
	weighButton.innerHTML='Weigh (&times '+scaleUses+')';
}

var clearLeftScale = function() {
	weigh(1);
	for(var i=0;i<pillsOnScale[0].length;i++){
		movePill(pillsOnScale[0][i],pillBoxID(3,1))
	}
	pillsOnScale[0].length=0;
}

var clearRightScale = function() {
	weigh(2);
	for(var i=0;i<pillsOnScale[1].length;i++){
		movePill(pillsOnScale[1][i],pillBoxID(4,1))
	}
	pillsOnScale[1].length=0;
}

var clearScales = function() {
	clearRightScale();
	clearLeftScale();
}

var toggleDragging = function() {
	toggleClass(dragButton,'disableDragClick');
	dragging = (!dragging);
	if(dragging){
		dragButton.innerHTML='Dragging Enabled';
	}
	else{
		dragButton.innerHTML='Dragging Disabled';
	}
}

var toggleClicking = function() {
	toggleClass(clickButton,'disableDragClick');
	clicking = (!clicking);
	if(clicking){
		clickButton.innerHTML='Clicking Enabled';
	}
	else{
		clickButton.innerHTML='Clicking Disabled';
	}
}

var resetProblem = function() {
	// The old poison pill is no longer the poison pill
	allPills[poison].isPoison=false;
	allPills[poison].weight=10;
	// Pick a new poison pill
	randomizePoison();
	// Set the atributes of the new poison pill
	allPills[poison].isPoison=true;
	allPills[poison].weight+=poisonWeight;
	
	// Move all the pills to their starting location
	for(var i=1;i<numPills+1;i++){
		movePill(i,pillBoxID(3,i));	
	}
	for(var i=1;i<numPills+1;i++){
		movePill(i,pillBoxID(0,i));	
	}
	// Reset the scale
	scaleUses=3;
	weighButton.innerHTML='Weigh (&times '+scaleUses+')';
	// Enable the WeighButton
	weighButton.disabled=false;
	weighButton.style.color='';

	// Disable the answer div
	removeClass(answer,'enabled');
	addClass(answer,'disabled');
	removeClass(checkAnswerButton,'enabled');
	addClass(checkAnswerButton,'disabled');

	// Clear scale feedback
	scaleOneFeedback.innerHTML='';
	scaleTwoFeedback.innerHTML='';
	scaleComparison.innerHTML='';
}

var buttonEventListeners = function() {
	weighButton.addEventListener('mousedown',useScale);
	clearScaleButton.addEventListener('mousedown',clearScales);
	clearLeftButton.addEventListener('mousedown',clearLeftScale);
	clearRightButton.addEventListener('mousedown',clearRightScale);
	dragButton.addEventListener('mousedown',toggleDragging);
	clickButton.addEventListener('mousedown',toggleClicking);
	resetButton.addEventListener('mousedown',resetProblem);
	checkAnswerButton.addEventListener('click', checkAnswer);

}

buttonEventListeners();