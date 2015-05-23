/*************************
 Pill Class
*************************/

var Pill = function(num) {
	this.num=num;
	this.isPoison = false;
	this.weight = 1;
	this.chosen = false;
<<<<<<< HEAD
	this.htmlString = '<div class="pill" id="pill_'+num+'" draggable="true">'+num+'<div class="vertCent"></div></div>';
=======
>>>>>>> origin/master
	//Group number: should be either 1 or 2 depending on which side of the scale it's on
	this.group = 0;
} 

<<<<<<< HEAD
var zCounter=1;

//code for making a pill object. Also checks to see if it's the poison
Pill.prototype.create = function(el) {
	el.innerHTML+=this.htmlString;
=======
//code for making a pill object. Also checks to see if it's the poison
Pill.prototype.create = function() {
	pillsContainer.innerHTML+='<div class="pill" id="pill_'+this.num+'">'+this.num+'<div class="vertCent"></div></div><div class="betweenPills"></div>';
>>>>>>> origin/master
	if (poison==this.num){
		this.isPoison=true;
		this.weight+=poisonWeight;
	}
};

<<<<<<< HEAD
=======
//Choose a pill (to add to either group on the scale)
//returns the className of the pill
Pill.prototype.choose = function() {
	var pillClass = pillID(this.num).className;
	var selectedClassIndex = pillID(this.num).className.search('selected');
	pillClass += ' selected';
	this.chosen = true;
	return pillID(this.num).className = pillClass;
}

Pill.prototype.unchoose = function() {
	var pillClass = pillID(this.num).className;
	var selectedClassIndex = pillID(this.num).className.search('selected');
	pillClass = pillClass.replace(' selected','');
	this.chosen = false;
	return pillID(this.num).className = pillClass;
}
>>>>>>> origin/master
