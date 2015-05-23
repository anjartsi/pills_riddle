/*************************
 Pill Class
*************************/

var Pill = function(num) {
	this.num=num;
	this.isPoison = false;
	this.weight = 1;
	this.chosen = false;
	this.htmlString = '<div class="pill" id="pill_'+num+'" draggable="true">'+num+'<div class="vertCent"></div></div>';
	//Group number: should be either 1 or 2 depending on which side of the scale it's on
	this.group = 0;
} 

var zCounter=1;

//code for making a pill object. Also checks to see if it's the poison
Pill.prototype.create = function(el) {
	el.innerHTML+=this.htmlString;
	if (poison==this.num){
		this.isPoison=true;
		this.weight+=poisonWeight;
	}
};

