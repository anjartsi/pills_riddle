// GLOBAL HELPER FUNCTIONS
function addClass(el, cls) {
	var classes = el.className.split(' ');
	classes.push(cls);
	el.className = classes.join(' ');
}

function removeClass(el, cls) {
	el.className = el.className.replace(cls, '');
}

var numPills = 12;
var poison = parseInt(1+Math.random()*numPills);
var poisonWeight = 0.1;
if(Math.random()>0.5){poisonWeight = -0.1};

var allPills=[];//array of all the Pill objects 

//List of Elements as Variables
var actionWindow = document.getElementById('actionWindow');
var pillsContainer = document.getElementById('pillsContainer');
var scale1 = document.getElementById('scale1');
var scale2 = document.getElementById('scale2');
var lSpace = document.getElementById('leftSpace');
var rSpace = document.getElementById('rightSpace');
var pillBox = document.getElementsByClassName('pillBox')

var pillBoxCreator = function(container,name,count) {
	for (var i = 0; i <count ; i++) {
		container.innerHTML+='<div class="container pillBox" id="pillBox_'+name+(i+1)+'"></div>'; 
	}	
};

pillBoxCreator(pillsContainer,'Cont_',12);
pillBoxCreator(scale1,'S1_',6);
pillBoxCreator(scale2,'S2_',6);
pillBoxCreator(lSpace,'L_',9);
pillBoxCreator(rSpace,'R_',9);

//Easy way to access each pill element by its html ID
var pillID = function(num){
	return document.getElementById('pill_'+num);
}

var pillBoxID = function(box,pbNum){
	return document.getElementById('pillBox_'+box+'_'+pbNum);
}

var makePills = function() {
	for(var i=1;i<numPills+1;i++){
		allPills[i] = new Pill(i);
		// allPills[i].create(document.getElementById('pillBox_Cont_'+i));
		allPills[i].create(pillBoxID('Cont',i));
	}
}

makePills();




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
		e.currentTarget.style.backgroundColor="#112233";
		e.currentTarget.style.opacity="0.6";
	}
}

var pbDragLeaveListener = function(e) {
	e.currentTarget.style.backgroundColor='';
		e.currentTarget.style.opacity="1";
}

var pbDropListener = function(e) {
	var data = e.dataTransfer.getData('application/pill_number');
	data = data.split(',');
	var parentEl = document.getElementById(data[0]);
	var pillNum = parseInt(data[1],10);
	
	movePill(pillNum,e.currentTarget);
	e.currentTarget.style.backgroundColor='';
	e.currentTarget.style.opacity="1";

	// Change the group property of the pill to match the scale it's on
	var parent =e.currentTarget.parentElement;
	if (parent.id=='scale1'){
		allPills[pillNum].group=1;
	}
	else if (parent.id=='scale2'){
		allPills[pillNum].group=2;
	}
	else {
		allPills[pillNum].group=0;
	}
}

pillBoxListeners.push(function(pbNum){
	pillBox[pbNum].addEventListener('dragenter',pbDragEnterListener);
	pillBox[pbNum].addEventListener('dragover',pbDragEnterListener);
	pillBox[pbNum].addEventListener('dragleave',pbDragLeaveListener);
	pillBox[pbNum].addEventListener('drop',pbDropListener);
});


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