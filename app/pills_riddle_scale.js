var scaleUses=3;
var difference=0;
var scaleOne=0;
var scaleTwo=0;
var pillsOnScale=[[],[]];
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
var dragButton = document.getElementById('dragButton');
var clickButton = document.getElementById('clickButton');
var actionWindow = document.getElementById('actionWindow');
var pillsContainer = document.getElementById('pillsContainer');
var scale1 = document.getElementById('scale1');
var scale2 = document.getElementById('scale2');
var lSpace = document.getElementById('leftSpace');
var rSpace = document.getElementById('rightSpace');
var checkAnswer = document.getElementById('checkAnswer');

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
		scaleOneFeedback.innerHTML+='Pill_'+pillsOnScale[0][i];
		if(i+1<pillsOnScale[0].length){scaleOneFeedback.innerHTML+=', '}
	}
	for(var i=0;i<pillsOnScale[1].length;i++){
		scaleTwoFeedback.innerHTML+='Pill_'+pillsOnScale[1][i];
		if(i+1<pillsOnScale[1].length){scaleTwoFeedback.innerHTML+=', '}
	}
	if(scaleUses>0){
		scaleOneFeedback.innerHTML+='<hr>';
		scaleTwoFeedback.innerHTML+='<hr>';		
	}
}

// Print which side of the scale was heavier
var printComparison = function() {
	if(difference>0){scaleComparison.innerHTML+='is HEAVIER THAN';	}
		else if(difference<0){scaleComparison.innerHTML+='is LIGHTER THAN';	}
		else{scaleComparison.innerHTML+='weighs THE SAME AS';}
	if(scaleUses>0){scaleComparison.innerHTML+='<hr>';}
}

// What happens when the scale is used 3 times
var scaleDead = function() {
	// Disable the WeighButton
	weighButton.disabled=true;
	weighButton.style.color='#777777';

	// Enable the answer div
	removeClass(answer,'disabled');
	addClass(answer,'enabled');
	removeClass(checkAnswer,'disabled');
	addClass(checkAnswer,'enabled');

	// Create pillBox in answer div
	pillBoxCreator(answerPB,1);
	document.getElementById('pillBox_5_1').addEventListener('dragenter', pbDragEnterListener);
	document.getElementById('pillBox_5_1').addEventListener('dragover', pbDragEnterListener);
	document.getElementById('pillBox_5_1').addEventListener('dragleave', pbDragLeaveListener);
	document.getElementById('pillBox_5_1').addEventListener('drop', pbDropListener);
	document.getElementById('pillBox_5_1').addEventListener('mousedown', pbClickDrop);
	document.getElementById('checkAnswer').addEventListener('click', function(e){
		var pb = pillBoxObject(document.getElementById('pillBox_5_1'));
		if(allPills[pb]){
			if (allPills[pb.pill].isPoison){alert ('Well Done');}
			else{alert("You're Dead!")}
			
		}
	});
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


var buttonEventListeners = function() {
	weighButton.addEventListener('mousedown',useScale);
	clearScale.addEventListener('mousedown',clearScales);
	clearLeft.addEventListener('mousedown',clearLeftScale);
	clearRight.addEventListener('mousedown',clearRightScale);
	dragButton.addEventListener('mousedown',toggleDragging);
	clickButton.addEventListener('mousedown',toggleClicking);

}

buttonEventListeners();