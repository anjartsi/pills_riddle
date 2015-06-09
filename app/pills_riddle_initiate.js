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
var clickButton = document.getElementById('clickButton');
var dragButton = document.getElementById('dragButton');




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

