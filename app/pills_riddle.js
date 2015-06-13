// ~~ Clicking and/or dragging
var dragging = true;
var clicking = true;

// Moves a pill to a new pillBox
// First it checks to see if the move is allowed
var movePill = function(pillNum,toBox){
	var pillEl = pillID(pillNum); // HTML element of the pill
	var destination = toBox; // HTML element of the TO pillBox
	var origin = pillEl.parentElement; // HTML element of the FROM pillBox

	if(checkPBox(origin,destination,pillNum)){
		pillEl= pillEl.parentElement.removeChild(pillID(pillNum));
		destination.appendChild(pillEl);
	}	
}

// Variable outside the context of movePIll to avoid inf loops
// Used in the checkPBox function
var noInfLoop=0;

// Checks to see if destination pillBox of a movePill is full
// If the destination is full, tries to find another available destination
//		in the same set of pillBoxes
// If the destination is empty, it changes the attributes of the 2 pillBoxes
// 		and the moved pill accordingly
var checkPBox = function(fromBox,toBox,pillNum) {
	var fromEl = fromBox;
	var toEl = toBox;
	var fromObj =  pillBoxObject(fromEl);
	var toObj =  pillBoxObject(toEl);

	var contSize = allPillBoxes[toObj.cont].length-1;
	// The number of pillBoxes in the same group as toBox

	if(toObj.isFull){
	// If a pill is dragged onto an already full pillBox, 
	// It will be moved into the next available one in the same group
		if(noInfLoop<numPills+2){
				var x = toObj.num; //get the pillBox number of the original destination
				x=x%contSize+1; 
				var newDest=pillBoxID(toObj.cont,x); // Make the next pillBox the new destination
				noInfLoop++;
				return movePill(pillNum,newDest); // Try to move the pill to the new destination
			}
		else{return false;}
		// If all the pillBoxes in a group are full, then the pill won't be moved
	}

	else{
	// If toBox is indeed empty
		noInfLoop=0;
		 // Mark the old pillBox as empty
		fromObj.pill=0;
		fromObj.isFull=false;
		 // Mark the new pillBox as full
		toObj.pill=pillNum;
		toObj.isFull=true;
		// Change the status of the pill that is being moved
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
		var pillNum = parseInt((e.target).innerHTML,10); // the pillNum of the dragged pill
		allPills[pillNum].choose();
		var parentEl = pillID(pillNum).parentElement;
		var data = [parentEl.id,pillNum];
		// data[0] is the parent element (pillBox)
		// data[1] is the pillNum
		e.dataTransfer.setData("application/pill_number", data);
	}
}

// When a pill is hovered, slightly change its color
var pillHoverOn = function(e) {
	if(clicking){
		var pillNum = parseInt((e.target).innerHTML,10);//the pillNum of the dragged pill
		addClass(pillID(pillNum),'pillHover');
	}
}

// When a pill is unhovered, remove the color change
var pillHoverOff = function(e) {
	if(clicking){
		var pillNum = parseInt((e.target).innerHTML,10);//the pillNum of the dragged pill
		removeClass(pillID(pillNum),'pillHover');
		}	
}

// Choose or unchoose a pill
var pillClick = function(e) {
	if(clicking){
		var pillNum = parseInt((e.target).innerHTML,10);//the pillNum of the dragged pill
		if(allPills[pillNum].isChosen){
			allPills[pillNum].unchoose();
		}
		else if(!allPills[pillNum].isChosen){allPills[pillNum].choose();}	
	}
}

pillListeners.push(function(pillNum) {pillID(pillNum).addEventListener('dragstart',pillDragStart);});
pillListeners.push(function(pillNum) {pillID(pillNum).addEventListener('mouseover',pillHoverOn);});
pillListeners.push(function(pillNum) {pillID(pillNum).addEventListener('mouseleave',pillHoverOff);});
pillListeners.push(function(pillNum) {pillID(pillNum).addEventListener('mouseup',pillClick);});

var pbDragEnterListener = function(e) {
	// If some pills are clicked, and then dragged, the last pill gets added to chosenPills twice
	// this function will remove the second instance of that pill
	removeDuplicatesFromChosen(); 
	var info = e.dataTransfer.getData('application/pill_number');
	
	if(dragging){
		info = info.split(',');
		var pillNum = parseInt(info[1],10);
		var origin = document.getElementById(info[0]);
		// Check to see if the element being dragEnter'ed is a pillBox
		// Without this if statement, dragging a pill over another pill causes an error
		if(e.target.id.search('pillBox_')!=-1){
				var toBox = pillBoxObject(e.target); // pillBox Object
				var destination = pillBoxID(toBox.cont,toBox.num); //pillBox Element
				if(toBox.cont!=pillBoxObject(origin).cont){
					e.preventDefault();
					if(!hasClass(destination,'pillBoxHighlight'))
					addClass(destination,'pillBoxHighlight')}
		}
	}
}


var pbDragLeaveListener = function(e) {
	if(dragging){
		var toBox = pillBoxObject(e.currentTarget); // pillBox Object
		var destination = pillBoxID(toBox.cont,toBox.num); //pillBox Element

		// Sometimes a pillBox receives the pillBoxHighlight class more than once
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


pillBoxListeners.push(function(pbID){pbID.addEventListener('dragenter',pbDragEnterListener);});
pillBoxListeners.push(function(pbID){pbID.addEventListener('dragover',pbDragEnterListener);});
pillBoxListeners.push(function(pbID){pbID.addEventListener('dragleave',pbDragLeaveListener);});
pillBoxListeners.push(function(pbID){pbID.addEventListener('mouseleave',pbDragLeaveListener);});
pillBoxListeners.push(function(pbID){pbID.addEventListener('drop',pbDropListener);});
pillBoxListeners.push(function(pbID){pbID.addEventListener('click',pbClickDrop);});
	
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
