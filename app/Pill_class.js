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
}
	

Pill.prototype.unchoose = function() {
	removeClass(pillID(this.num),'pillClicked');
	this.isChosen = false;
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

