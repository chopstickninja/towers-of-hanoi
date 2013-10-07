var Hanoi = {
  tower1: [3,2,1],
  tower2: [],
  tower3: [],

  won: function() {
    if (this.tower2.length === 3 || this.tower3.length === 3) {
      $("#gameContent").append("You win!");
			$(".tower").off("click");
    }
  },

  move_valid: function(start_tower, end_tower) {
    if (start_tower.length == 0) {
      return false;
    } else if (end_tower.length == 0 ||
      start_tower[start_tower.length-1] < end_tower[end_tower.length - 1]) {
      return true;
    } else {
      return false;
    }
  },

  move: function(start_tower, end_tower) {
    end_tower.push(start_tower.pop());
  }
};

$(function(){
	draw();
});


function drawDiscs(hTower, divTower){
	for(var i = 0; i< hTower.length; i++){
		if( hTower[i] ){
			var slot = divTower.children()[2-i];
			$(slot).removeClass('emptySlot');
			$(slot).addClass( "disc"+(hTower[i]) );
		}
	}
}

function getTower(towerId){
	switch(towerId){
	case("1"):
		return Hanoi.tower1;
		break;
	case("2"):
		return Hanoi.tower2;
		break;
	case("3"):
		return Hanoi.tower3;
		break;
	}
}

function draw(){
	var gameDiv = $('#gameContent');
	gameDiv.empty();

	var tower1 = $('<div id=tower1>').addClass('tower')
		.append($('<div id=1>').toggleClass('emptySlot'))
		.append($('<div id=2>').toggleClass('emptySlot'))
		.append($('<div id=3>').toggleClass('emptySlot'));

	var tower2 = $('<div id=tower2>').addClass('tower')
		.append($('<div id=4>').toggleClass('emptySlot'))
		.append($('<div id=5>').toggleClass('emptySlot'))
		.append($('<div id=6>').toggleClass('emptySlot'));

	var tower3 = $('<div id=tower3>').addClass('tower')
		.append($('<div id=7>').toggleClass('emptySlot'))
		.append($('<div id=8>').toggleClass('emptySlot'))
		.append($('<div id=9>').toggleClass('emptySlot'));

	drawDiscs(Hanoi.tower1, tower1);
	drawDiscs(Hanoi.tower2, tower2);
	drawDiscs(Hanoi.tower3, tower3);

	gameDiv.append(tower1).append(tower2).append(tower3);


	$('.tower').on("click", function(){
		if($('.selected').length == 0){
			$(this).toggleClass('selected');
		} else{
			var fromId = $(".selected").first().attr("id").slice(-1);
			var toId = this.id.slice(-1);
					if(Hanoi.move_valid(getTower(fromId), getTower(toId))){
						Hanoi.move(getTower(fromId), getTower(toId));
						draw();
						Hanoi.won();
					} else{
						$(".selected").removeClass("selected");
					}
				//move, redraw
				//else removeClass selected
		}
	});
}