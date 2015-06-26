var numPills = 12;
var poison=0;
var poisonWeight=0;

var randomizePoison = function() {
	// Randomly make one of the pills the poisoned one
	poison = parseInt(1+Math.random()*numPills);
	// Make the poisoned pill either heavier or lighter
	poisonWeight = 1;
	if(Math.random()>0.5){poisonWeight = -1};
}


//List of Elements as Variables
var actionWindow = document.getElementById('actionWindow');
var pillsContainer = document.getElementById('pillsContainer');
var scale1 = document.getElementById('scale1');
var scale2 = document.getElementById('scale2');
var lSpace = document.getElementById('leftSpace');
var rSpace = document.getElementById('rightSpace');var clickButton = document.getElementById('clickButton');
var scaleLeft = document.getElementById('scaleLeft');
var scaleRight = document.getElementById('scaleRight');
var scaleOneFeedback = document.getElementById('scaleOneFeedback');
var scaleTwoFeedback = document.getElementById('scaleTwoFeedback');
var scaleComparison = document.getElementById('scaleComparison');
var answer = document.getElementById('answer');

// Buttons
var weighButton = document.getElementById('weighButton');
var dragButton = document.getElementById('dragButton');
var clickButton = document.getElementById('clickButton');
var checkAnswer = document.getElementById('checkAnswer');
var resetButton = document.getElementById('resetButton');
var clearScaleButton = document.getElementById('clearScaleButton');
var clearLeftButton = document.getElementById('clearLeftButton');
var clearRightButton = document.getElementById('clearRightButton');
var checkAnswerButton = document.getElementById('checkAnswerButton');

var allPills=[];//array of all the Pill objects 

/** allPillBoxes
Array of all the different areas where pillBoxes will be formed
Each container of pillboxes will have its own index
For example: allPillBoxes[0] will hold the 12 pillBoxes in
in the pillsContainer div
**/ 
var allPillBoxes=[];


// Create a given number of pillBoxes in a given HTML element 
var pillBoxCreator = function(containerID,count) {
	var pbCont=[];
	var pbIndex=allPillBoxes.length;
	for (var i = 1; i <1+count ; i++) {
		pbCont[i]= new PillBox(pbIndex,i);
		pbCont[i].create(containerID);
	}
	allPillBoxes.push(pbCont);
};

// Creates 12 pills and places each in a pillBox in the pillsContainer div
var pillCreator = function() {
	for(var i=1;i<numPills+1;i++){
		allPills[i] = new Pill(i);
		allPills[i].create(pillBoxID(0,i));
	}
}

// Create all the pillBoxes and all the pills
pillBoxCreator(pillsContainer,12);
pillBoxCreator(scale1,6);
pillBoxCreator(scale2,6);
pillBoxCreator(lSpace,12);
pillBoxCreator(rSpace,12);
pillBoxCreator(answerPB,1);

randomizePoison()
pillCreator();
var pillBox = document.getElementsByClassName('pillBox');


// GLOBAL HELPER FUNCTIONS
function addClass(el, cls) {
	var classes = el.className.split(' ');
	classes.push(cls);
	el.className = classes.join(' ');
}

function removeClass(el, cls) {
	el.className = el.className.replace(cls,'');
}

function hasClass(el,cls) {
	return el.className.search(cls)!=-1
}


function toggleClass(el,cls) {
	if(hasClass(el,cls)){removeClass(el,cls)}
	else{addClass(el,cls)};
}
