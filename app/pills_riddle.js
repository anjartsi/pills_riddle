// ~~ Clicking instead of dragging
var dragging = true;
var clicking = true;


//List of Elements as Variables
var actionWindow = document.getElementById('actionWindow');
var pillsContainer = document.getElementById('pillsContainer');
var scale1 = document.getElementById('scale1');
var scale2 = document.getElementById('scale2');
var lSpace = document.getElementById('leftSpace');
var rSpace = document.getElementById('rightSpace');



// Move a pill from wherever it waas to a new box
// toBox must be an HTML element
var movePill = function(pillNum,toBox){
	var pillEl = pillID(pillNum);
	var destination = toBox;
	var origin = pillEl.parentElement;
	if(chosenPills.length==0){return}
	if(checkPBox(origin,destination,pillNum)){
		pillEl= pillEl.parentElement.removeChild(pillID(pillNum));
		destination.appendChild(pillEl);
	}	
}

// Checks to see if destination pillBox of a movePill is full
// If the destination is empty, it changes the attributes of 
// the 2 pillBoxes accordingly

var noInfLoop=0; // Outside variable to make sure that 
var checkPBox = function(fromBox,toBox,pillNum) {
	var fromObj =  pillBoxObject(fromBox);
	var toObj =  pillBoxObject(toBox);
	var contSize = allPillBoxes[toObj.cont].length-1;
	// If a pill is dragged onto an already full pillBox, 
	// It will be moved into the next available one in the same group
	if(toObj.isFull){
		if(noInfLoop<numPills+2){
			// If al the pillBoxes in a group are full, then the pill won't be moved
				var x = toObj.num;
				x=x%contSize+1;
				var newDest=pillBoxID(toObj.cont,x); 
				noInfLoop++;
				return movePill(pillNum,newDest);
			}
		else{return false;}
		
	}
	else{
		noInfLoop=0;
		fromObj.pill=0;
		fromObj.isFull=false;
		toObj.pill=pillNum;
		toObj.isFull=true;
		allPills[pillNum].group=toObj.cont;
		allPills[pillNum].unchoose();
		return true;
	}
}


// ~~~ Listeners ~~~
var pillBoxListeners=[];
var pillListeners = [];

var pillDragStart = function(e) {
	if(dragging){
		var pillNum = parseInt((e.target).innerHTML,10);//the pillNum of the dragged pill
		allPills[pillNum].choose();
		var parentEl = pillID(pillNum).parentElement;
		var data = [parentEl.id,pillNum];
		// data[0] is the parent element (pillBox)
		// data[1] is the pillNum
		e.dataTransfer.setData("application/pill_number", data);
	}
}

var pillHoverOn = function(e) {
		var pillNum = parseInt((e.target).innerHTML,10);//the pillNum of the dragged pill
		addClass(pillID(pillNum),'pillHover')
}

var pillHoverOff = function(e) {

		var pillNum = parseInt((e.target).innerHTML,10);//the pillNum of the dragged pill
		removeClass(pillID(pillNum),'pillHover')	
}

var pillClick = function(e) {
		var pillNum = parseInt((e.target).innerHTML,10);//the pillNum of the dragged pill
		if(allPills[pillNum].isChosen){
			allPills[pillNum].unchoose();
		}
		else if(!allPills[pillNum].isChosen){allPills[pillNum].choose();}	

	}


pillListeners.push(function(pillNum) {
	pillID(pillNum).addEventListener('dragstart',pillDragStart);
	pillID(pillNum).addEventListener('mouseover',pillHoverOn);
	pillID(pillNum).addEventListener('mouseleave',pillHoverOff);
	pillID(pillNum).addEventListener('mouseup',pillClick);
});


var pbDragEnterListener = function(e) {
	removeDuplicatesFromChosen();

	if(dragging){
		var info = e.dataTransfer.getData('application/pill_number');
		info = info.split(',');
		var pillNum = parseInt(info[1],10);
		var origin = document.getElementById(info[0]);
		var toBox = pillBoxObject(e.currentTarget); // pillBox Object
		var destination = pillBoxID(toBox.cont,toBox.num); //pillBox Element
		if(toBox.cont!=pillBoxObject(origin).cont){
			e.preventDefault();
			if(!hasClass(destination,'pillBoxHighlight'))
			addClass(destination,'pillBoxHighlight')
		}
	}
}


var pbDragLeaveListener = function(e) {
	if(dragging){
		var toBox = pillBoxObject(e.currentTarget); // pillBox Object
		var destination = pillBoxID(toBox.cont,toBox.num); //pillBox Element
	do{
		removeClass(destination,'pillBoxHighlight');
	} while (hasClass(destination,'pillBoxHighlight'));
	}
}

var pbDropListener = function(e) {
	e.preventDefault();
	var info = e.dataTransfer.getData('application/pill_number');
	info = info.split(',');
	var pillNum = parseInt(info[1],10);
	var origin = document.getElementById(info[0]);
	var toBox = pillBoxObject(e.target); // pillBox Object
	var destination = pillBoxID(toBox.cont,toBox.num); //pillBox Element
	var chosenCount=chosenPills.length;
	if(dragging){
		if(toBox.cont!=pillBoxObject(origin).cont){
			for(var i=0;i<chosenCount;i++){
				movePill(chosenPills[0],destination);
				do{
					removeClass(destination,'pillBoxHighlight');
				} while (hasClass(destination,'pillBoxHighlight'));
			}
		}
	}
}

var pbClickDrop = function(e) {
	var destination = e.target;
	var chosenCount=chosenPills.length;

	if(hasClass(e.target,'pillBox')){
		if(clicking){
			for(var i=0;i<chosenCount;i++){
				movePill(chosenPills[0],destination);
			}	
		};
	}
}

// Change the group property of the pill to match the scale it's on



pillBoxListeners.push(function(pbID){
	pbID.addEventListener('dragenter',pbDragEnterListener);
	pbID.addEventListener('dragover',pbDragEnterListener);
	pbID.addEventListener('dragleave',pbDragLeaveListener);
	pbID.addEventListener('drop',pbDropListener);
	pbID.addEventListener('click',pbClickDrop);
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
	el.className = el.className.replace(cls,'');
}

function hasClass(el,cls) {
	return el.className.search(cls)!=-1
}


function toggleClass(el,cls) {
	if(hasClass(el,cls)){removeClass(el,cls)}
	else{addClass(el,cls)};
}
