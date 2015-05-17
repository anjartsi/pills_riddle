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


//Create the pills in HTML
//using the Pill class defined in Pill_class.js
// allPills[0] is undefined, it starts from index 1
// so that the pill ID matches its index in allPills[]

var pillBoxCreator = function(el,name) {
	for (var i = 0; i <numPills ; i++) {
		el.innerHTML+='<div class="container pillBox" id="pillBox_'+name+(i+1)+'"></div>'; 
	}	
};

pillBoxCreator(pillsContainer,'A');
pillBoxCreator(group1,'B');
pillBoxCreator(group2,'C');

var makePills = function() {
	for(var i=1;i<numPills+1;i++){
		allPills[i] = new Pill(i);
		allPills[i].create(document.getElementById('pillBox_A'+i));
	}
}

makePills();

// ==== DEFINE LISTENERS =====
var listeners = [];

//Easy way to access each pill element by its html ID
var pillID = function(num){
	return document.getElementById('pill_'+num);
}

// listeners.push(function(pillNum,mousex,mousey) {
// 	if(allPills[pillNum].chosen){
// 		var newx;
// 		var newy;
// 		newx = mousex + parseInt(pillID(pillNum).style.left,10)||0;
// 		newy = mousey + parseInt(pillID(pillNum).style.top,10)||0;
// 		pillID(pillNum).style.left=(newx) + 'px';
// 		pillID(pillNum).style.top=(newy) +'px';
// 	}
// });

// ~~~ Drag and Drop Stuff ~~~

listeners.push(function(pillNum) {
	pillID(pillNum).addEventListener('dragstart', function(e) {
		/*
			TODO: This function will be called every time the user starts dragging
			a pill. Here is where we need to basically tell the browser what we are 
			dragging. We do this through the data transfer proporty on the event
			object
		 */
		 e.dataTransfer.setData("application/pill_number",pillNum);
	});
});

var pillContDragEnterListener = function(e){
	e.preventDefault();
}


var pillContDropListener = function(e){
	var pillNum = e.dataTransfer.getData("application/pill_number");
	var pillEl = pillID(pillNum).parentElement.removeChild(pillID(pillNum));
	var group = e.currentTarget;
	group.appendChild(pillEl);
}



pillsContainer.addEventListener('dragenter',pillContDragEnterListener);
pillsContainer.addEventListener('dragover',pillContDragEnterListener);
pillsContainer.addEventListener('drop',pillContDropListener);

var groupDragEnterListener = function(e) {
  	e.preventDefault();
};
group1.addEventListener('dragenter', groupDragEnterListener);
group2.addEventListener('dragenter', groupDragEnterListener);
group1.addEventListener('dragover', groupDragEnterListener);
group2.addEventListener('dragover', groupDragEnterListener);

var groupDropListener = function(e) {
 	var pillNum = e.dataTransfer.getData("application/pill_number");
	var pillEl = pillID(pillNum).parentElement.removeChild(pillID(pillNum));
	var group = e.currentTarget;
	group.appendChild(pillEl);
}
group1.addEventListener('drop', groupDropListener);
group2.addEventListener('drop', groupDropListener);

// creates the MouseUp and MouseDown event listeners for all pills
for(var i=1;i<numPills+1;i++){
	for(var j=0; j<listeners.length; j++) {
		listeners[j](i);
	}
}


// GLOBAL HELPER FUNCTIONS
function addClass(el, cls) {
	var classes = el.className.split(' ');
	classes.push(cls);
	el.className = classes.join(' ');
}

function removeClass(el, cls) {
	el.className = el.className.replace(cls, '');
}

