// GLOBAL HELPER FUNCTIONS
function addClass(el, cls) {
	var classes = el.className.split(' ');
	classes.push(cls);
	el.className = classes.join(' ');
}

function removeClass(el, cls) {
	el.className = el.className.replace(cls, '');
}


'use strict';

var numPills = 12;
var poison = parseInt(1+Math.random()*numPills);
var poisonWeight = 0.1;
if(Math.random()>0.5){poisonWeight = -0.1};

var allPills=[];//array of all the Pill objects 

var playing = null;

var actionWindow = document.getElementById('actionWindow');
var pillsContainer = document.getElementById('pillsContainer');
var group1 = document.getElementById('group1');
var group2 = document.getElementById('group2');
var pillBox = document.getElementsByClassName('pillBox')
var lSpace = document.getElementById('leftSpace');
var rSpace = document.getElementById('rightSpace');
//Create the pills in HTML
//using the Pill class defined in Pill_class.js
// allPills[0] is undefined, it starts from index 1
// so that the pill ID matches its index in allPills[]

var pillBoxCreator = function(container,name,count) {
	for (var i = 0; i <count ; i++) {
		container.innerHTML+='<div class="container pillBox" id="pillBox_'+name+(i+1)+'"></div>'; 
	}	
};

pillBoxCreator(pillsContainer,'A',12);
pillBoxCreator(group1,'B',6);
pillBoxCreator(group2,'C',6);

var makePills = function() {
	for(var i=1;i<numPills+1;i++){
		allPills[i] = new Pill(i);
		allPills[i].create(document.getElementById('pillBox_A'+i));
	}
}

makePills();


//Easy way to access each pill element by its html ID
var pillID = function(num){
	return document.getElementById('pill_'+num);
}

var pillBoxID = function(box,pbNum){
	return document.getElementById('pillBox_'+box+pbNum);
}


// Move a pill from wherever it waas to a new box
// toBox must be an element
var movePill = function(pillNum,toBox){
	var pillEl = pillID(pillNum).parentElement.removeChild(pillID(pillNum));
	var group = toBox;
	toBox.appendChild(pillEl);
}

// ~~~ Listeners ~~~
var pillBoxListeners=[];
var pillListeners = [];

//Pill Drag Start
pillListeners.push(function(pillNum) {
	pillID(pillNum).addEventListener('dragstart',function(e) {
		var parentEl = pillID(pillNum).parentElement;
		var data = [parentEl.id,pillNum];
		e.dataTransfer.setData("application/pill_number", data);
		/**
		data[0] is the parent element	
		data[1] is the pillNum
		**/
	});
});

var pbDragEnterListener = function(e) {
	//Can't add 2 pills to the same pillBox
	if(!e.currentTarget.innerHTML){
		e.preventDefault();
	}
}

var pbDropListener = function(e) {
	var data = e.dataTransfer.getData('application/pill_number');
	data = data.split(',');
	var parentEl = document.getElementById(data[0]);
	var pillNumber = parseInt(data[1],10);
	pillID(pillNumber).style.marginLeft='5px';
	
	movePill(pillNumber,e.currentTarget);
}

pillBoxListeners.push(function(pbNum){
	pillBox[pbNum].addEventListener('dragenter',pbDragEnterListener);
	pillBox[pbNum].addEventListener('dragover',pbDragEnterListener);
	pillBox[pbNum].addEventListener('drop',pbDropListener);
});

// ==== Extra Space for Pills
var spaceDragEnterListener = function(e) {
	e.preventDefault();
}


var spaceDropListener = function(e) {
	var data = e.dataTransfer.getData('application/pill_number');
	data = data.split(',');
	var parentEl = document.getElementById(data[0]);
	var pillNumber = parseInt(data[1],10);
	
	movePill(pillNumber,e.currentTarget);
	pillID(pillNumber).style.marginLeft='-15px';
}

lSpace.addEventListener('dragenter',spaceDragEnterListener);
lSpace.addEventListener('dragover',spaceDragEnterListener);
lSpace.addEventListener('drop',spaceDropListener);

rSpace.addEventListener('dragenter',spaceDragEnterListener);
rSpace.addEventListener('dragover',spaceDragEnterListener);
rSpace.addEventListener('drop',spaceDropListener);

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



for (var i=0;i<pillBox.length;i++){
	for (var j=0;j<pillBoxListeners.length;j++){
		pillBoxListeners[j](i);
	}
}

for (var i=1;i<numPills+1;i++){
	for (var j=0;j<pillListeners.length;j++){
		pillListeners[j](i);
	}
}
