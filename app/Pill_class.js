/*************************
 Pill Class
*************************/

var Pill = function(num) {
	this.num=num;
	this.isPoison = false;
	this.weight = 10;
	this.htmlString = '<button class="pill" id="pill_'+num+'" draggable="true">'+num+'</button>';

	this.isChosen = false;

	//Group number: should be either 1 or 2 depending on which side of the scale it's on
	this.group = 0;
} 

//code for making a pill object. Also checks to see if it's the poison
Pill.prototype.create = function(el) {
	el.innerHTML+=this.htmlString;
	if (poison==this.num){
		this.isPoison=true;
		this.weight+=poisonWeight;
	}
};

Pill.prototype.choose = function(){
	addClass(pillID(this.num),'pillClicked');
	this.isChosen = true;
	chosenPills.push(this.num);
}
	

Pill.prototype.unchoose = function() {
	do{
		removeClass(pillID(this.num),'pillClicked');
	} while (hasClass(pillID(this.num),'pillClicked'));
	this.isChosen = false;
	removeFromChosen(this.num);
}


//Easy way to access each pill element by its html ID
var pillID = function(num){
	return document.getElementById('pill_'+num);
}

/*************************
 PillBox Class
*************************/

var PillBox = function(cont,num) {
	this.cont = cont;
	this.num = num;
	this.pill = 0; // the pillNum of the pill that is in this pillBox
	this.isFull = false; 
	this.htmlString = '<div class="container pillBox" id="pillBox_'+cont+'_'+num+'"></div>';

}

PillBox.prototype.create = function(el){
	el.innerHTML+=this.htmlString;
}

// Easy way to access each pillBox element by its html ID
var pillBoxID = function(pbIndex,pbNum){
	return document.getElementById('pillBox_'+pbIndex+'_'+pbNum);
}

// Input: HTML ID of a pillBox
// Output: corresponding pillBox object
var pillBoxObject = function(pbEl){
	var pBox = pbEl.id;
	if(pBox.search('pillBox_')!=-1){
		var underscore=pBox.indexOf('_');
		var pbCont = pBox[underscore+1];
		var pbNum=pBox.substr(underscore+3);
		return allPillBoxes[pbCont][pbNum];	
	}
};



// ~~~~chosen
var chosenPills= [];

//Removes Duplicates from Chosen
var removeDuplicatesFromChosen = function() {
	for(var i=1;i<chosenPills.length;i++){
		if(chosenPills[i-1]==chosenPills[i]){chosenPills.splice(i,1);}
	}
}

// Removes a selected pill from the chosenPills
var removeFromChosen = function (pillNum) {
	for (var i=0;i<chosenPills.length;i++) {
		if(chosenPills[i]==pillNum){chosenPills.splice(i,1);}
	}
}