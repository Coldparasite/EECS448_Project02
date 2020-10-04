/*
	Update mouse pos regularly instead of when mouse moves
*/

var global = new ParticleSystem();

var boards = {
				1: {"right": new ParticleSystem(), "left": new ParticleSystem()},
				2: {"right": new ParticleSystem(), "left": new ParticleSystem()},
			};

//particles.deactivate();

var particles = [boards[1]["right"], boards[1]["left"], boards[2]["right"], boards[2]["left"], global];

function updateParticleVisibility() {
	boards[player]["left"].activate();
	boards[player]["right"].deactivate();
	boards[3-player]["left"].deactivate();
	boards[3-player]["right"].activate();
}

function hideBoardParticles() {
	boards[player]["left"].deactivate();
	boards[player]["right"].deactivate();
	boards[3-player]["left"].deactivate();
	boards[3-player]["right"].deactivate();
}

animationLoop = function() {
	updateCoords();
	display.clearRect(0, 0, canvas.width, canvas.height);

	//if (mouseDown) {
	//	ignite([mouseX-difference[0], mouseY-difference[1]], 10);
	//}

	if (getClick()) {
		//print("Mouse: " + mousePos);
		//print("Scale: " + scale);
		//print([window.pageXOffset, window.pageYOffset]);
		print(player+" left: " + boards[player]["left"].active + ", " + boards[player]["left"].length());
		print(player+" right: " + boards[player]["right"].active + ", " + boards[player]["right"].length());
		print((3-player) + " left: " + boards[3-player]["left"].active + ", " + boards[3-player]["left"].length());
		print((3-player) + " right: " + boards[3-player]["right"].active + ", " + boards[3-player]["right"].length());
		print(boards[1]["left"]);
		print(boards[2]["left"]);
		//print("Global: " + global.active);
		//for (var particle in global.particles) {
			//for (var p in global.particles[particle].particles) {
				//print(p+": "+global.particles[particle].particles[p].duration);
			//}
		//}
		//print(player);
		//print("Board A: "+gridA[[0,0]]);
		//print("Grid size: "+gridSize);
		//print("Center of [0, 0]: "+getGridCenter(gridA[[0,0]]));
		//print("Mouse: " + mousePos);
		print("\n");
	}

	//iteratively update particle systems
	for (var system of particles) {
		system.generate(scale);
		system.update();
		system.draw(display);
	}

	updatePeripherals();


	window.requestAnimationFrame(animationLoop);
}

window.requestAnimationFrame(animationLoop);

let start;
var currentFrame;
var curX;
var curY;
var frameTimeOut;
var frames;

/**
*	This function handles the rending of images within the variable frames
* @param {mumber} timestamp The current time within the animation cycle.
*/
function renderFrame(timestamp)
{
	if(start === undefined)
	{
		start = timestamp;
	}
	const elapsed = timestamp-start;
	currentFrame = Math.floor(elapsed / 250);

	if(elapsed < frameTimeOut && waitForSwitch)
	{
		playFrame(curX,curY,frames[currentFrame]);
		window.requestAnimationFrame(renderFrame);
		if(currentFrame > 0)
			frames[currentFrame-1].style.visibility = "hidden";
	}
	else if(!waitForSwitch) {
		start = undefined
		clearFrames()
	}
	else
	{
		start = undefined
		clearFrames()
	}
}

/**
* This function makes the currentFrame within frames visible along with placing it
* correctly on the screen.
* @param {number} x The left coordinate on the screen
* @param {number} y The top coordinate on the screen
* @param {image} frame the current frame to be displayed on the screen
*/
function playFrame(x,y,frame)
{
	frames[currentFrame].style.visibility = "visible";
	frame.style.left = posA[0] + ((x-1)*56) + "px";
	frame.style.top = posA[1] + ((y-1)*62) + "px";
	console.log("Frame Complete");
}

/**
* This function resets the frames list and makes all images within frames visibility
* set to hidden
*/
function clearFrames()
{
	for(i = 0; i<frames.length;i++)
	{
		frames[i].style.visibility = "hidden";
	}
	frames = [];
}

/**
* This function plays the miss animation
* @param {number} x This is the left position on the screen
* @param {number} y This is the top position on the screen
*/
function playMissAnimation(x,y)
{
	frames = [];
	frames.push(document.getElementById("splash1"));
	frames.push(document.getElementById("splash2"));
	frames.push(document.getElementById("splash3"));
	frames.push(document.getElementById("splash4"));
	frames.push(document.getElementById("splash5"));

	curX = x;
	curY = y;
	frameTimeOut = 1249;
	window.requestAnimationFrame(renderFrame);
}

/**
* This function is the entry point to the hit animations
* @param {number} x The left position on the screen
* @param {number} y The top position on the screen
*/
function playHitAnimation(x,y)
{
	frames = []
	frames.push(document.getElementById("hit1"));
	frames.push(document.getElementById("hit2"));
	frames.push(document.getElementById("hit3"));
	frames.push(document.getElementById("hit4"));
	frames.push(document.getElementById("hit5"));
	frames.push(document.getElementById("hit6"));
	frames.push(document.getElementById("hit7"));
	frames.push(document.getElementById("hit8"));

	curX = x;
	curY = y;
	frameTimeOut = 1999;
	window.requestAnimationFrame(renderFrame);

}

/**
* This function plays the death animation of a ship once all it's hitpoints are gone
* @param {number} x The left position on the screen
* @param {number} y The top position on the screen
* @param {number} length How big the ship to be destroyed is
*/
function playSunkAnimation(x,y,length)
{
	if(length == 1)
	{
		playHitAnimation(x+1,y+1);
	}
	else if (length == 2)
	{
		frames = []
		frames.push(document.getElementById("ship2death1"));
		frames.push(document.getElementById("ship2death2"));
		frames.push(document.getElementById("ship2death3"));
		frames.push(document.getElementById("ship2death4"));
		frames.push(document.getElementById("ship2death5"));
		frames.push(document.getElementById("ship2death6"));

		curX = x+1;
		curY = y+1;
		frameTimeOut = 1249;
		window.requestAnimationFrame(renderFrame);
	}
	else if (length == 3)
	{
		frames = []
		frames.push(document.getElementById("ship3death1"));
		frames.push(document.getElementById("ship3death2"));
		frames.push(document.getElementById("ship3death3"));
		frames.push(document.getElementById("ship3death4"));
		frames.push(document.getElementById("ship3death5"));
		frames.push(document.getElementById("ship3death6"));

		curX = x+1;
		curY = y+1;
		frameTimeOut = 1249;
		window.requestAnimationFrame(renderFrame);
	}
	else if (length == 4)
	{
		frames = []
		frames.push(document.getElementById("ship4death1"));
		frames.push(document.getElementById("ship4death2"));
		frames.push(document.getElementById("ship4death3"));
		frames.push(document.getElementById("ship4death4"));
		frames.push(document.getElementById("ship4death5"));
		frames.push(document.getElementById("ship4death6"));

		curX = x+1;
		curY = y+1;
		frameTimeOut = 1249;
		window.requestAnimationFrame(renderFrame);
	}
	else
	{
		frames = []
		frames.push(document.getElementById("ship5death1"));
		frames.push(document.getElementById("ship5death2"));
		frames.push(document.getElementById("ship5death3"));
		frames.push(document.getElementById("ship5death4"));
		frames.push(document.getElementById("ship5death5"));
		frames.push(document.getElementById("ship5death6"));

		curX = x+1;
		curY = y+1;
		frameTimeOut = 1249;
		window.requestAnimationFrame(renderFrame);
	}
	console.log("Entered animation sunk");
}
