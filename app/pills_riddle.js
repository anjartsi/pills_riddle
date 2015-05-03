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
var addPills = function() {
	for(var i=1;i<numPills+1;i++){
		allPills[i] = new Pill(i);
		allPills[i].create();
	}
	pillsContainer.innerHTML+='<div class="clearBoth"></div>';
}
addPills();

// ==== DEFINE LISTENERS =====
var listeners = [];

//Easy way to access each pill element by its html ID
var pillID = function(num){
	return document.getElementById('pill_'+num);
}

//Creates event listeners for a given pill (mouseent, mouseleave, mousedown, and mouseup)
// listeners.push(function(pillNum){
// 	pillID(pillNum).addEventListener('mouseenter',function() {
// 		addClass(pillID(pillNum),'hovered');
// 	});
// });

// listeners.push(function(pillNum){
// 	pillID(pillNum).addEventListener('mouseleave',function() {
// 		removeClass(pillID(pillNum),'hovered');
// 		allPills[pillNum].unchoose();
// 	});
// });

// listeners.push(function(pillNum){
// 	pillID(pillNum).addEventListener('mousedown',function() {
// 		allPills[pillNum].choose();
// 	});
// });

// listeners.push(function(pillNum){
// 	pillID(pillNum).addEventListener('mouseup',function() {
// 		allPills[pillNum].unchoose();
// 	});
// });

// listeners.push(function(pillNum){
// 	pillID(pillNum).addEventListener('mousemove',function() {
// 		var x=event.movementX;
// 		var y=event.movementY;
// 		dragPill(pillNum,x,y);
// 	});
// });

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
	});
});

var dragEnterListener = function(e) {
	/*
		TODO: Drag enter is how we tell the browser that if the user drags something
		here, they can drop it here. We do this by preventing the default 
		behavior of the event which is to not allowing the drop.
	 */
};
group1.addEventListener('dragenter', dragEnterListener);
group2.addEventListener('dragenter', dragEnterListener);
group1.addEventListener('dragover', dragEnterListener);
group2.addEventListener('dragover', dragEnterListener);

var dropListener = function(e) {
	/*
		TODO: The user has decided to drop the data in this bucket. We 
		need to read the data in the event object to know which pill to 
		add into the bucket.
	 */
}
group1.addEventListener('drop', dropListener);
group2.addEventListener('drop', dropListener);

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


