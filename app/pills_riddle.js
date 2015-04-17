'use strict';

var numPills = 12;
var poison = parseInt(1+Math.random()*numPills);
var poisonWeight = 0.1;
if(Math.random()>0.5){poisonWeight = -0.1};

var allPills=[];//array of all the Pill objects 

var actionWindow = document.getElementById('actionWindow');
var pillsContainer = document.getElementById('pillsContainer');
var group1 = document.getElementById('group1');
var group2 = document.getElementById('group2');

//Create the pills in HTML
//using the Pill class defined in Pill_class.js
// allPills[0] is undefined, it starts from index 1
// so that the pill ID matches its index in allPills[]
var addPills = function() {
	for(var i=1;i<numPills+1;i++){
		allPills[i] = new Pill(i);
		allPills[i].create();
	}
	pillsContainer.innerHTML+='<div class="blank"></div>';
}
addPills();

//Easy way to access each pill element by its html ID
var pillID = function(num){
	return document.getElementById('pill_'+num);
}

//Creates an event listener for a given pill (mousedown and mouseup)
var pillMouseDown = function(pillNum){
	return pillID(pillNum).addEventListener('mousedown',function() {
		allPills[pillNum].choose();
	});
	// return pillID(pillNum).onmousedown=function(){allPills[pillNum].choose();}
}
var pillMouseUp = function(pillNum){
	return pillID(pillNum).addEventListener('mouseup',function() {
		allPills[pillNum].unchoose();
	});
	// return pillID(pillNum).onmouseup=function(){allPills[pillNum].unchoose();}
}
var pillClick = function(pillNum){
	return pillID(pillNum).addEventListener('click',function() {
		allPills[pillNum].unchoose();
		//this function seems necessary to fix a bug with the onmouseup and onmousedown events
		//when you click and drag the mouse out of the pill, it seems to get stuck on choose()
	});
}


// creates the MouseUp and MouseDown event listeners for all pills
for(var i=1;i<numPills+1;i++){
	pillClick(i);
	pillMouseDown(i);
	pillMouseUp(i);
}

// GLOBAL HELPER FUNCTIONS
function addClass(el, class) {
	var classes = el.className.split(' ');
	classes.push(class);
	el.className = classes.join(' ');
}

function removeClass(el, class) {
	el.className = el.className.replace(/(\s)?this-one(\s)?/g, '');
}

