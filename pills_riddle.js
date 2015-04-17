var numPills=12;
var poison = parseInt(Math.random()*numPills+1);	
var poisonWeight=0.0;
var selectedWeight=0.0;
var selectedPills=[];
var indexSelected;
var group1Weight=0;
var group2Weight=0;
var difference=0;
var scaleUses=3;

if(Math.random()>0.5){poisonWeight+=0.1}
	else{poisonWeight-=0.1};

$(document).ready(function() {
	//fill the page with 12 divs (class='pill') each with a unique id (id='pill_1')
	for (var i = 1; i < numPills+1; i++){
		$('#pillsContainer').append('<button class="pill" id="pill_'+i+'">'+i+'<hr></button>');
	}
	$('#pill_'+poison).addClass('poison');
	initEventListeners();
});


// When a pill is clicked, its weight gets added to the "selected" class
// If the selected pill is the poison pill, its weight adjust the "selected" class accordingly
var selectPill = function() {
	if($(this).hasClass('selected')){
		$(this).removeClass('selected');
		selectedWeight--;
		if ($(this).hasClass('poison')) {selectedWeight-=poisonWeight;};
		indexSelected=selectedPills.indexOf($(this).attr('id'));
		selectedPills.splice(indexSelected,1);
	}

	else{
		$(this).addClass('selected');
		selectedWeight++;
		if ($(this).hasClass('poison')) {selectedWeight+=poisonWeight;};
		selectedPills.splice(selectedPills.length,1,$(this).attr('id'));
	};
}

var addGroup1 = function() {
	$('.selected').addClass('group1');
	$('.selected').removeClass('selected');
	group1Weight+=selectedWeight;
	selectedWeight=0;
	$('#group1Container').append(selectedPills[0]);		
	for (var i = 1; i < selectedPills.length; i++) {
	$('#group1Container').append(', '+selectedPills[i]);		
	};
	selectedPills=[];
};

var addGroup2 = function() {
	$('.selected').addClass('group2');
	$('.selected').removeClass('selected');
	group2Weight+=selectedWeight;
	selectedWeight=0;
	$('#group2Container').append(selectedPills[0]);		
	for (var i = 1; i < selectedPills.length; i++) {
	$('#group2Container').append(', '+selectedPills[i]);		
	};

	selectedPills=[];
	
};

var weigh = function() {
	if(scaleUses==0){
		$('#numScales').html('You can\'t use the scale anymore. Which pill is poisoned?');
	}
		else if(group1Weight==0 || group2Weight==0){
			$('#numScales').html('Make sure you have something on both sides of the scale.')	
			$('#numScales').append('<br>You can use the scale '+scaleUses+' more times<br>')
		}
		else{
			scaleUses--;
			difference = group2Weight - group1Weight;
			group1Weight=0;
			group2Weight=0;
			$('.pill').removeClass('group1');
			$('.pill').removeClass('group2');
			$('.pill').removeClass('selected');
			
			if(difference>0){
				$('#numScales').html('You can use the scale '+scaleUses+' more times');
				$('#group2Container').append(' <br>This weighs MORE <br><br>');
				$('#group1Container').append(' <br>This weighs LESS <br><br>');
			}
				else if(difference<0){

					$('#numScales').html('You can use the scale '+scaleUses+' more times')
					$('#group1Container').append(' <br>This weighs MORE <br><br>');
					$('#group2Container').append(' <br>This weighs LESS <br><br>');
				}
				else{
					$('#numScales').html('You can use the scale '+scaleUses+' more times');
					$('#group2Container').append(' <br>This weighs THE SAME <br><br>');
					$('#group1Container').append(' <br>This weighs THE SAME <br><br>');
				};
		};
	}

var checkAnswer = function() {
	if(parseInt($('#answer').val())==poison){
		$('#rightOrWrong').html('Correct! You get to live! (for now)');
	}
	else{
		$('#rightOrWrong').html('Wrong! You are dead!');
	};
};
	
var shine = function() {
	$(this).css('opacity', '0.8');
};
var unshine = function() {
	$(this).css('opacity', '1.0');
};

var initEventListeners = function() {
	$('.pill').click(selectPill);
	$('#group1Button').click(addGroup1);
	$('#group2Button').click(addGroup2);
	$('#weigh').click(weigh);
	$('button').hover(shine,unshine);
	$('#checkButton').click(checkAnswer);
	};