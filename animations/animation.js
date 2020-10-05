var global = new ParticleSystem();

var boards = {
				1: {"right": new ParticleSystem(), "left": new ParticleSystem()},
				2: {"right": new ParticleSystem(), "left": new ParticleSystem()},
			};

var particles = [boards[1]["right"], boards[1]["left"], boards[2]["right"], boards[2]["left"], global];

/**
 * Hides or shows boards particle effects based on turn
 *
 */
function updateParticleVisibility() {
	boards[player]["left"].activate();
	boards[player]["right"].deactivate();
	boards[3-player]["left"].deactivate();
	boards[3-player]["right"].activate();
}

/**
 * Hide all board particle effects
 *
 */
function hideBoardParticles() {
	boards[player]["left"].deactivate();
	boards[player]["right"].deactivate();
	boards[3-player]["left"].deactivate();
	boards[3-player]["right"].deactivate();
}

/**
 * Loop to constantly update particle effects
 *
 */
animationLoop = function() {
	updateCoords();
	display.clearRect(0, 0, canvas.width, canvas.height);

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
var vertical;
var shipLength;
var framePlaying;

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
		framePlaying = false;
	}
	else
	{
		start = undefined
		clearFrames()
		framePlaying = false;
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
	if(shipLength >-1)
	{
		if(vertical)
		{
			frame.style.transform = "rotate(0deg)";
			frame.style.left = posA[0] + ((x-1)*56) + "px";
			frame.style.top = posA[1] + ((y-1)*62) + "px";
		}
		else if (shipLength <=2) {
			frame.style.transform = "rotate(90deg)";
			frame.style.left = (posA[0] + ((x-1)*56)- (shipLength*14)) + "px";
			frame.style.top = (posA[1] + ((y-1)*62)+(shipLength*17)) + "px";

		}
		else if (shipLength == 3)
		{
			frame.style.transform = "rotate(90deg)";
			frame.style.left = (posA[0] + ((x-1)*56)- (shipLength*18)) + "px";
			frame.style.top = (posA[1] + ((y-1)*62)+(shipLength*20)) + "px";
		}
		else if (shipLength == 4)
		{
			frame.style.transform = "rotate(90deg)";
			frame.style.left = (posA[0] + ((x-1)*56)- (shipLength*21)) + "px";
			frame.style.top = (posA[1] + ((y-1)*62)+(shipLength*24)) + "px";
		}
		else
		{
			frame.style.transform = "rotate(90deg)";
			frame.style.left = (posA[0] + ((x-1)*56)- (shipLength*23)) + "px";
			frame.style.top = (posA[1] + ((y-1)*62)+(shipLength*27)) + "px";
		}
	}
	else
	{
		frame.style.left = posA[0] + ((x-1)*56) + "px";
		frame.style.top = posA[1] + ((y-1)*62) + "px";
	}
	frame.style.visibility = "visible";
}

/**
* Horizontal ships working
* 	1, 2 , 3 () 4 not working
* Vertical ships working
*		1, 2
*/
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
	framePlaying = true;
	frames = [];
	frames.push(document.getElementById("splash1"));
	frames.push(document.getElementById("splash2"));
	frames.push(document.getElementById("splash3"));
	frames.push(document.getElementById("splash4"));
	frames.push(document.getElementById("splash5"));

	curX = x;
	curY = y;
	frameTimeOut = 1249;
	vertical = true;
	shipLength = -1;
	window.requestAnimationFrame(renderFrame);
}

/**
* This function is the entry point to the hit animations
* @param {number} x The left position on the screen
* @param {number} y The top position on the screen
*/
function playHitAnimation(x,y)
{
	clearFrames();
	frames.push(document.getElementById("hit1"));
	frames.push(document.getElementById("hit2"));
	frames.push(document.getElementById("hit3"));
	frames.push(document.getElementById("hit4"));
	frames.push(document.getElementById("hit5"));
	frames.push(document.getElementById("hit6"));
	frames.push(document.getElementById("hit7"));
	frames.push(document.getElementById("hit8"));

	vertical = true;
	curX = x;
	curY = y;
	frameTimeOut = 1999;
	shipLength = -1;
	window.requestAnimationFrame(renderFrame);

}

/**
* This function plays the death animation of a ship once all it's hitpoints are gone
* @param {number} x The left position on the screen
* @param {number} y The top position on the screen
* @param {number} length How big the ship to be destroyed is
*/
function playSunkAnimation(x,y,length,rotation)
{
	vertical = rotation;
	shipLength = length;
	clearFrames();
	if(length == 1)
	{
		playHitAnimation(x+1,y+1);
	}
	else if (length == 2)
	{
		frames.push(document.getElementById("ship2death1"));
		frames.push(document.getElementById("ship2death2"));
		frames.push(document.getElementById("ship2death3"));
		frames.push(document.getElementById("ship2death4"));
		frames.push(document.getElementById("ship2death5"));
		frames.push(document.getElementById("ship2death6"));

		curX = x+1;
		curY = y+1;
		frameTimeOut = 1260;
		window.requestAnimationFrame(renderFrame);
	}
	else if (length == 3)
	{
		frames.push(document.getElementById("ship3death1"));
		frames.push(document.getElementById("ship3death2"));
		frames.push(document.getElementById("ship3death3"));
		frames.push(document.getElementById("ship3death4"));
		frames.push(document.getElementById("ship3death5"));
		frames.push(document.getElementById("ship3death6"));

		curX = x+1;
		curY = y+1;
		frameTimeOut = 1260;
		window.requestAnimationFrame(renderFrame);
	}
	else if (length == 4)
	{
		frames.push(document.getElementById("ship4death1"));
		frames.push(document.getElementById("ship4death2"));
		frames.push(document.getElementById("ship4death3"));
		frames.push(document.getElementById("ship4death4"));
		frames.push(document.getElementById("ship4death5"));
		frames.push(document.getElementById("ship4death6"));

		curX = x+1;
		curY = y+1;
		frameTimeOut = 1260;
		window.requestAnimationFrame(renderFrame);
	}
	else
	{
		frames.push(document.getElementById("ship5death1"));
		frames.push(document.getElementById("ship5death2"));
		frames.push(document.getElementById("ship5death3"));
		frames.push(document.getElementById("ship5death4"));
		frames.push(document.getElementById("ship5death5"));
		frames.push(document.getElementById("ship5death6"));

		curX = x+1;
		curY = y+1;
		frameTimeOut = 1260;
		window.requestAnimationFrame(renderFrame);
	}
}
