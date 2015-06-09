var numPills = 12;
// Randomly make one of the pills the poisoned one
var poison = parseInt(1+Math.random()*numPills);
// Make the poisoned pill either heavier or lighter
var poisonWeight = 1;
if(Math.random()>0.5){poisonWeight = -1};



//List of Elements as Variables
var actionWindow = document.getElementById('actionWindow');
var pillsContainer = document.getElementById('pillsContainer');
var scale1 = document.getElementById('scale1');
var scale2 = document.getElementById('scale2');
var lSpace = document.getElementById('leftSpace');
var rSpace = document.getElementById('rightSpace');
var pillBox = document.getElementsByClassName('pillBox');

var allPills=[];//array of all the Pill objects 

/** allPillBoxes
Array of all the different areas where pillBoxes will be formed
Each container of pillboxes will have its own index
For example: allPillBoxes[0] will hold the 12 pillBoxes in
in the pillsContainer div
**/ 
var allPillBoxes=[];


// Make a certain number of pillBoxes in a specified container
var pillBoxCreator = function(container,count) {
	var pbCont=[];
	var pbIndex=allPillBoxes.length;
	for (var i = 1; i <1+count ; i++) {
		pbCont[i]= new PillBox(pbIndex,i);
		pbCont[i].create(container);
	}
	allPillBoxes.push(pbCont);
};

// Easy way to access each pillBox element by its html ID
var pillBoxID = function(pbIndex,pbNum){
	return document.getElementById('pillBox_'+pbIndex+'_'+pbNum);
}

// Input: HTML ID of a pillBox
// Output: corresponding pillBox object
var pillBoxObject = function(pbEl){
	var pBox = pbEl.id;
	var underscore=pBox.indexOf('_');
	var pbCont = pBox[underscore+1];
	var pbNum=pBox.substr(underscore+3);
	return allPillBoxes[pbCont][pbNum];
};

//Easy way to access each pill element by its html ID
var pillID = function(num){
	return document.getElementById('pill_'+num);
}

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

pillCreator();
pillBox = document.getElementsByClassName('pillBox');


// Move a pill from wherever it waas to a new box
// toBox must be an HTML element
var movePill = function(pillNum,toBox){
	var pillEl = pillID(pillNum);
	var destination = toBox;
	var origin = pillEl.parentElement;

	if(checkPBox(origin,destination,pillNum)){
		pillEl= pillEl.parentElement.removeChild(pillID(pillNum));
		destination.appendChild(pillEl);
	}

}

// Checks to see if destination pillBox of a movePill is full
// If the destination is empty, it changes the attributes of 
// the 2 pillBoxes accordingly
var checkPBox = function(fromBox,toBox,pillNum) {
	var from =  pillBoxObject(fromBox);
	var to =  pillBoxObject(toBox);
	// If a pill is dragged onto an already full pillBox, 
	// It will be moved into the next available one in the same group
	if(to.isFull){
		// If al the pillBoxes in a group are full, then the pill won't be moved
		if (to.num+1<allPillBoxes[to.cont].length){
			var newDest=pillBoxID(to.cont,to.num+1); 
			return movePill(pillNum,newDest);
		}
		else{
			return false;
		}

	}
	else{
		from.pill=0;
		from.isFull=false;
		to.pill=pillNum;
		to.isFull=true;
		allPills[pillNum].group=to.cont;
		return true;
	}
}


// ~~~ Listeners ~~~
var pillBoxListeners=[];
var pillListeners = [];

//Pill Drag Start
pillListeners.push(function(pillNum) {
	pillID(pillNum).addEventListener('dragstart',function(e) {
		var parentEl = pillID(pillNum).parentElement;
		var data = [parentEl.id,pillNum];
		// data[0] is the parent element (pillBox)
		// data[1] is the pillNum
		e.dataTransfer.setData("application/pill_number", data);

	});
});

var pbDragEnterListener = function(e) {
	var toBox = pillBoxObject(e.currentTarget); // pillBox Object
	var destination = pillBoxID(toBox.cont,toBox.num); //pillBox Element

	e.preventDefault();
	destination.style.backgroundColor="#112233";
	destination.style.opacity="0.6";
}

var pbDragLeaveListener = function(e) {
	var toBox = pillBoxObject(e.currentTarget); // pillBox Object
	var destination = pillBoxID(toBox.cont,toBox.num); //pillBox Element

	destination.style.backgroundColor='';
	destination.style.opacity="1";
}

var pbDropListener = function(e) {
	var info = e.dataTransfer.getData('application/pill_number');
	info = info.split(',');
	var pillNum = parseInt(info[1],10);
	var origin = document.getElementById(info[0]);
	var toBox = pillBoxObject(e.currentTarget); // pillBox Object
	var destination = pillBoxID(toBox.cont,toBox.num); //pillBox Element

	movePill(pillNum,destination);
	destination.style.backgroundColor='';
	destination.style.opacity="1";

	// Change the group property of the pill to match the scale it's on


}

pillBoxListeners.push(function(pbID){
	pbID.addEventListener('dragenter',pbDragEnterListener);
	pbID.addEventListener('dragover',pbDragEnterListener);
	pbID.addEventListener('dragleave',pbDragLeaveListener);
	pbID.addEventListener('drop',pbDropListener);
});


var currentPill;
for (var i=0;i<allPillBoxes.length;i++) {
	for (var j=1;j<allPillBoxes[i].length;j++){
		currentPill=allPillBoxes[i][j];
		for(var k=0;k<pillBoxListeners.length;k++){
			pillBoxListeners[k](pillBoxID(currentPill.cont,currentPill.num));
		}
	}
}

for (var i=1;i<numPills+1;i++){
	for (var j=0;j<pillListeners.length;j++){
		pillListeners[j](i);
	}
}

// Note to Pierre,
// The only reason I made pillBoxListeners and pillListeners as arrays is because I 
// saw your code did that in an earlier version. 

// Is there an advantage to making pillBoxListeners and pillListeners arrays?
// Why not add all the listeners together? wouldn't that save time if the number of 
// listeners got bigger and bigger ? If arrays are better, then use the following:
/****
pillBoxListeners.push(function(pbNum){
	pillBox[pbNum].addEventListener('dragenter',pbDragEnterListener);
	});
pillBoxListeners.push(function(pbNum){
	pillBox[pbNum].addEventListener('dragover',pbDragEnterListener);
});
pillBoxListeners.push(function(pbNum){
	pillBox[pbNum].addEventListener('drop',pbDropListener);
});
****/

// GLOBAL HELPER FUNCTIONS
function addClass(el, cls) {
	var classes = el.className.split(' ');
	classes.push(cls);
	el.className = classes.join(' ');
}

function removeClass(el, cls) {
	el.className = el.className.replace(cls, '');
}
