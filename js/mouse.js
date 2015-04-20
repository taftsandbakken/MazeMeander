/////////////////line of sight//////////////////////////////////
function updateLineOfSight(){
	if(mazeVisible){
		for (var Y = 0; Y < mazeSizeY; Y++) {			//removing all blackness
			for (var X = 0; X < mazeSizeX; X++) {
				var divTemp = "#" + X +'-'+ Y;
				$divTemp = $(divTemp);
				$divTemp.removeClass('dark');
				revealCats($divTemp);
			}
		}
	}
	//if(!mazeVisible){
	else{
		for (var Y = 0; Y < mazeSizeY; Y++) {			//setting the whole maze to black, except for what the mouse can see
			for (var X = 0; X < mazeSizeX; X++) {
				var divTemp = "#" + X +'-'+ Y;
				$divTemp = $(divTemp);
				hideCats($divTemp);
				//$divTemp.removeClass("fakeWall");		//an idea for making pipes look like walls from the side
			}
		}

		var divTemp = "#" + mouseLocationX +'-'+mouseLocationY;		//make mouse visible
		$divTemp = $(divTemp);
		$divTempOfMouse = $(divTemp);
		$divTemp.removeClass('dark');
		revealCats($divTemp);

		//////////////// look left
		var next = true;
		var up = mouseLocationY-1;
		var down = mouseLocationY+1;
		var lookLeft = mouseLocationX-1;
		if (lookLeft == -1)
			next = false;
		if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeLeft'))
			next = false;
		while(next){
			var divTemp = "#" + lookLeft +'-'+mouseLocationY;
			$divTemp = $(divTemp);
			$divTemp.removeClass('dark');

			revealCats($divTemp);

			// if($divTemp.hasClass('pipe') && !$divTemp.hasClass('pipeRight'))
			// 	$divTemp.addClass('fakeWall');

			if(!$divTemp.hasClass("wall") && !$divTemp.hasClass("pipe")){
				if(up != -1){
					var peripheral = "#" + lookLeft +'-'+ up;
					$peripheral = $(peripheral);
					if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
						$(peripheral).removeClass('dark');
					}
				}
				if(down != mazeSizeY){
					var peripheral = "#" + lookLeft +'-'+ down;
					$peripheral = $(peripheral);
					if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
						$(peripheral).removeClass('dark');
					}
				}
			}	
			if (lookLeft-1 == -1 || $divTemp.hasClass("wall"))
				next = false;
			else if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeRight") || !$divTemp.hasClass("pipeLeft")))
				next = false;
			else
				lookLeft--;
		}

		//////////////// look right
		var next = true;
		var lookRight = mouseLocationX +1;
		if (lookRight == mazeSizeX)
			next = false;
		if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeRight'))
			next = false;
		while(next){
			var divTemp = "#" + lookRight +'-'+mouseLocationY;
			$divTemp = $(divTemp);
			$divTemp.removeClass('dark');

			revealCats($divTemp);

			if(!$divTemp.hasClass("wall") && !$divTemp.hasClass("pipe")){
				if(up != -1){
					var peripheral = "#" + lookRight +'-'+ up;
					$peripheral = $(peripheral);
					if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
						$(peripheral).removeClass('dark');
					}
				}
				if(down != mazeSizeY){
					var peripheral = "#" + lookRight +'-'+ down;
					$peripheral = $(peripheral);
					if($peripheral.hasClass("wall") || $peripheral.hasClass('pipe')) {
						$(peripheral).removeClass('dark');
					}
				}
			}	
			if (lookRight+1 == mazeSizeX || $divTemp.hasClass("wall"))
				next = false;
			else if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeRight") || !$divTemp.hasClass("pipeLeft")))
				next = false;
			else
				lookRight++;
		}

		//////////////// look up
		var next = true;
		var noPipes = true;
		var left = mouseLocationX-1;
		var right = mouseLocationX+1;
		var look = mouseLocationY-1;
		var lookLeftMax = lookLeft; 			// how far the mouse can see to the left (the coordinate of the wall it can see)
		var lookRightMax = lookRight;
		if (look == -1)
			next = false;
		if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeUp'))
			next = false;
		while(next){
			left = mouseLocationX-1;
			right = mouseLocationX+1;
			var divTemp = "#" + mouseLocationX +'-'+look;
			$divTemp = $(divTemp);
			$divTemp.removeClass('dark');
			
			revealCats($divTemp);
		
			// look up to the left
			if($divTemp.hasClass("wall") || $divTemp.hasClass("pipe")){ //&& left <= lookLeftMax){
				lookLeftMax = mouseLocationX;
				lookRightMax = mouseLocationY;
				noPipes = false;
				nextPeripheralLeft = false;
				nextPeripheralRight = false;
			}
			else {
				nextPeripheralLeft = true;
				nextPeripheralRight = true;
			}
			while(nextPeripheralLeft && noPipes){
				if(left <= -1)
					break;
				var peripheral = "#" + left +'-'+ look;
				$peripheral = $(peripheral);
				if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe') || left-1 <= -1){
					$peripheral.removeClass('dark');
					revealCats($peripheral);
				}
				if(left > lookLeftMax){
					$peripheral.removeClass('dark');
					revealCats($peripheral);
					if(!$peripheral.hasClass('wall') && !$peripheral.hasClass('pipe')){
						var peripheralUp = "#" + left +'-'+ (look-1);
						$peripheralUp = $(peripheralUp);
						if($peripheralUp.hasClass('wall') || $peripheralUp.hasClass("pipe"))
							$peripheralUp.removeClass('dark');
					}
					else if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe')){
						lookLeftMax = left;
						nextPeripheralLeft = false;
					}
					left--;
				}
				else{
					nextPeripheralLeft = false;
				}
			}
			
			// look up to the right
			while(nextPeripheralRight && noPipes){
				if(right >= mazeSizeX)
					break;
				var peripheral = "#" + right +'-'+ look;
				$peripheral = $(peripheral);
				if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe') || right+1 >= mazeSizeX){
					$peripheral.removeClass('dark');
					revealCats($peripheral);
				}
				if(right < lookRightMax){
					$peripheral.removeClass('dark');
					revealCats($peripheral);
					if(!$peripheral.hasClass('wall') && !$peripheral.hasClass('pipe')){
						var peripheralUp = "#" + right +'-'+ (look-1);
						$peripheralUp = $(peripheralUp);
						if($peripheralUp.hasClass('wall') || $peripheralUp.hasClass("pipe"))
							$peripheralUp.removeClass('dark');
					}
					else if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe')){
						lookRightMax = right;
						nextPeripheralRight = false;
					}
					right++;
				}
				else{
					nextPeripheralRight = false;
				}
			}

				
				
			if (look-1 == -1 || $divTemp.hasClass("wall"))
				next = false;
			if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeDown") || !$divTemp.hasClass("pipeUp")))
				next = false;
			look--;
		}

		//////////////// look down
		next = true;
		noPipes = true;
		look = mouseLocationY+1;
		var lookLeftMax = lookLeft; 			// how far the mouse can see to the left (the coordinate of the wall it can see)
		var lookRightMax = lookRight;
		if (look == mazeSizeY)
			next = false;
		if($divTempOfMouse.hasClass('pipe') && !$divTempOfMouse.hasClass('pipeDown'))
			next = false;
		while(next){
			left = mouseLocationX-1;
			right = mouseLocationX+1;
			var divTemp = "#" + mouseLocationX +'-'+look;
			$divTemp = $(divTemp);
			$divTemp.removeClass('dark');

			revealCats($divTemp);

			// look down to the left
			if($divTemp.hasClass("wall") || $divTemp.hasClass("pipe")){ //&& left <= lookLeftMax){
				lookLeftMax = mouseLocationX;
				lookRightMax = mouseLocationY;
				noPipes = false;
				nextPeripheralLeft = false;
				nextPeripheralRight = false;
			}
			else{
				nextPeripheralLeft = true;
				nextPeripheralRight = true;
			}
			while(nextPeripheralLeft && noPipes){
				if(left <= -1)
					break;
				var peripheral = "#" + left +'-'+ look;
				$peripheral = $(peripheral);
				if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe') || left-1 <= -1){
					$peripheral.removeClass('dark');
					revealCats($peripheral);
				}
				if(left > lookLeftMax){
					$peripheral.removeClass('dark');
					revealCats($peripheral);
					if(!$peripheral.hasClass('wall') && !$peripheral.hasClass('pipe')){
						var peripheralDown = "#" + left +'-'+ (look+1);
						$peripheralDown = $(peripheralDown);
						if($peripheralDown.hasClass('wall') || $peripheralDown.hasClass("pipe"))
							$peripheralDown.removeClass('dark');
					}
					else if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe')){
						lookLeftMax = left;
						nextPeripheralLeft = false;
					}
					left--;
				}
				else{
					nextPeripheralLeft = false;
				}
			}
			
			// look down to the right
			while(nextPeripheralRight && noPipes){
				if(right >= mazeSizeX)
					break;
				var peripheral = "#" + right +'-'+ look;
				$peripheral = $(peripheral);
				if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe') || right+1 >= mazeSizeX){
					$peripheral.removeClass('dark');
					revealCats($peripheral);
				}
				if(right < lookRightMax){
					$peripheral.removeClass('dark');
					revealCats($peripheral);
					if(!$peripheral.hasClass('wall') && !$peripheral.hasClass('pipe')){
						var peripheralDown = "#" + right +'-'+ (look+1);
						$peripheralDown = $(peripheralDown);
						if($peripheralDown.hasClass('wall') || $peripheralDown.hasClass("pipe"))
							$peripheralDown.removeClass('dark');
					}
					else if($peripheral.hasClass('wall') || $peripheral.hasClass('pipe')){
						lookRightMax = right;
						nextPeripheralRight = false;
					}
					right++;
				}
				else{
					nextPeripheralRight = false;
				}
			}

			if (look+1 == mazeSizeY || $divTemp.hasClass("wall"))
				next = false;
			if($divTemp.hasClass('pipe') && (!$divTemp.hasClass("pipeUp") || !$divTemp.hasClass("pipeDown")))
				next = false;
			look++;
		}
	}
}





////////////////////////////////////////////////////////////////////////////////////


function revealCats($divTemp){
	if($divTemp.hasClass("cat1Eyes")){
		$divTemp.removeClass('cat1Eyes').addClass("cat1");
		$divTemp.css("background-image", "url(images/catOminous.jpg)");
	}
	if($divTemp.hasClass("cat2Eyes")) {
		$divTemp.removeClass('cat2Eyes').addClass("cat2");
		$divTemp.css("background-image", "url(images/catScary.jpg)");
	}
	if($divTemp.hasClass("cat3Eyes")) {
		$divTemp.removeClass('cat3Eyes').addClass("cat3");
		$divTemp.css("background-image", "url(images/catSeeker.jpg)");
	}
}

function hideCats($divTemp){
	if($divTemp.hasClass("cat1Eyes"))
		$divTemp.removeClass('dark');
	else if($divTemp.hasClass("cat1")){
		$divTemp.removeClass("cat1").addClass("cat1Eyes");
		$divTemp.css("background-image", "url(images/catEyesOminous.jpg)");
	}

	if($divTemp.hasClass("cat2Eyes"))
		$divTemp.removeClass('dark');
	else if($divTemp.hasClass("cat2")){
		$divTemp.removeClass("cat2").addClass("cat2Eyes");
		$divTemp.css("background-image", "url(images/catEyesScary.jpg)");
	}

	if($divTemp.hasClass("cat3Eyes"))
		$divTemp.removeClass('dark');
	else if($divTemp.hasClass("cat3")){
		$divTemp.removeClass("cat3").addClass("cat3Eyes");
		$divTemp.css("background-image", "url(images/catEyesSeeker.jpg)");
	}
	
	if(!$divTemp.hasClass("cat1Eyes") && !$divTemp.hasClass("cat2Eyes") && !$divTemp.hasClass("cat3Eyes"))
		$divTemp.addClass('dark');
}



////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// moving the mouse ///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////


function moveLeft(){
	var oldMouseLocation = "#" + mouseLocation;
	var $oldMouseLocation = $(oldMouseLocation);
	var lookAheadTemp = "#" + (mouseLocationX-1)+'-'+mouseLocationY;
	var $lookAheadTemp = $(lookAheadTemp);

	if(!checkForLock1($lookAheadTemp))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeRight'))	//checks so it won't enter a pipe from the wrong side
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeLeft'))	//checks so it won't leave a pipe except from an exit
		return;

	if(mouseLocationX-1 != -1 && !$lookAheadTemp.hasClass('inaccessibleByMouse')){
		$oldMouseLocation.removeClass("mouse");
		if(mazeVisible)
			$oldMouseLocation.addClass('trail');
		$oldMouseLocation.css("background-image", "none");    //.removeClass('rotate90').removeClass('rotate180').removeClass('rotate270');
		mouseLocationX--;
		var newMouseLocation = "#" + mouseLocationX+'-'+mouseLocationY;
		var $newMouseLocation = $(newMouseLocation);
		mouseLocation = mouseLocationX+'-'+mouseLocationY;
		$newMouseLocation.addClass("mouse");
		if(mazeVisible)
			$newMouseLocation.removeClass('trail');
		//$newMouseLocation.addClass('rotate90');
		$newMouseLocation.css("background-image", "url(images/mouseLeft.png)");
		checkSquare($oldMouseLocation, $newMouseLocation);
	}
}

function moveRight(){
	var oldMouseLocation = "#" + mouseLocation;
	var $oldMouseLocation = $(oldMouseLocation);
	var lookAheadTemp = "#" + (mouseLocationX+1)+'-'+mouseLocationY;
	var $lookAheadTemp = $(lookAheadTemp); 

	if(!checkForLock1($lookAheadTemp))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeLeft'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeRight'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationX+1 != mazeSizeX && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		$oldMouseLocation.removeClass("mouse");
		if(mazeVisible)
			$oldMouseLocation.addClass('trail');
		$oldMouseLocation.css("background-image", "none");
		mouseLocationX++;
		var newMouseLocation = "#" + mouseLocationX+'-'+mouseLocationY;
		var $newMouseLocation = $(newMouseLocation);
		mouseLocation = mouseLocationX+'-'+mouseLocationY;
		$newMouseLocation.addClass("mouse");
		if(mazeVisible)
			$newMouseLocation.removeClass('trail');
		$newMouseLocation.css("background-image", "url(images/mouseRight.png)");
		checkSquare($oldMouseLocation, $newMouseLocation);
	}
}

function moveUp(){
	var oldMouseLocation = "#" + mouseLocation;
	var $oldMouseLocation = $(oldMouseLocation);
	var lookAheadTemp = "#" + mouseLocationX+'-'+(mouseLocationY-1);
	var $lookAheadTemp = $(lookAheadTemp);

	if(!checkForLock1($lookAheadTemp))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeDown'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeUp'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationY-1 != -1 && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		$oldMouseLocation.removeClass("mouse");
		if(mazeVisible)
			$oldMouseLocation.addClass('trail');
		$oldMouseLocation.css("background-image", "none");
		mouseLocationY--;
		var newMouseLocation = "#" + mouseLocationX+'-'+mouseLocationY;
		var $newMouseLocation = $(newMouseLocation);
		mouseLocation = mouseLocationX+'-'+mouseLocationY;
		$newMouseLocation.addClass("mouse");
		if(mazeVisible)
			$newMouseLocation.removeClass('trail');
		$newMouseLocation.css("background-image", "url(images/mouseUp.png)");
		checkSquare($oldMouseLocation, $newMouseLocation);
	}
}

function moveDown(){
	var oldMouseLocation = "#" + mouseLocation;
	var $oldMouseLocation = $(oldMouseLocation);
	var lookAheadTemp = "#" + mouseLocationX+'-'+(mouseLocationY+1);
	var $lookAheadTemp = $(lookAheadTemp);

	if(!checkForLock1($lookAheadTemp))  //returns false if there's a lock and you have no key. so you'll get through the if statement if no locks hold you back. 
		return;
	if($lookAheadTemp.hasClass('pipe') && !$lookAheadTemp.hasClass('pipeUp'))
		return;
	if($oldMouseLocation.hasClass('pipe') && !$oldMouseLocation.hasClass('pipeDown'))	//checks so it won't leave a pipe except from an exit
		return;

	if (mouseLocationY+1 != mazeSizeY && !$lookAheadTemp.hasClass('inaccessibleByMouse')){ //check for ability to move
		$oldMouseLocation.removeClass("mouse");
		if(mazeVisible)
			$oldMouseLocation.addClass('trail');
		$oldMouseLocation.css("background-image", "none");
		mouseLocationY++;
		var newMouseLocation = "#" + mouseLocationX+'-'+mouseLocationY;
		var $newMouseLocation = $(newMouseLocation);
		mouseLocation = mouseLocationX+'-'+mouseLocationY;
		$newMouseLocation.addClass("mouse");
		if(mazeVisible)
			$newMouseLocation.removeClass('trail');
		$newMouseLocation.css("background-image", "url(images/mouseDown.png)");
		checkSquare($oldMouseLocation, $newMouseLocation);
	}
}



function checkSpotToFixPicAsMouse($oldLocation){
	if($oldLocation.hasClass("portalBlueWithMouse"))
		$oldLocation.removeClass('portalBlueWithMouse');
	if($oldLocation.hasClass("portalRedWithMouse"))
		$oldLocation.removeClass('portalRedWithMouse');
	if($oldLocation.hasClass("portalBlue"))
		$oldLocation.css("background-image", "url(images/portalBlue.jpg)");
	if($oldLocation.hasClass("portalRed"))
		$oldLocation.css("background-image", "url(images/portalRed.png)");
	if($oldLocation.hasClass("unlocked1"))
		$oldLocation.css("background-image", "url(images/unlocked1.png)");
	if($oldLocation.hasClass("unlocked1WithMouse"))
		$oldLocation.removeClass('unlocked1WithMouse');
	if($oldLocation.hasClass("pipeVert"))
		$oldLocation.css("background-image", "url(images/grayWallVertPipe.png)");
	if($oldLocation.hasClass("pipeCorner"))
		$oldLocation.css("background-image", "url(images/grayWallCornerPipe.png)");
}