/*
	Update mouse pos regularly instead of when mouse moves
*/

var global = new ParticleSystem();

var boards = {
				"right": new ParticleSystem(),
				"left": new ParticleSystem(),
			};

//particles.deactivate();

var particles = [boards["right"], boards["left"], global];

animationLoop = function() {
	updateCoords();
	display.clearRect(0, 0, canvas.width, canvas.height);
	//if (mouseDown) {
	//	ignite([mouseX-difference[0], mouseY-difference[1]], 10);
	//}

	/*
	if (getClick()) {
		print(player);
		print("Board A: "+gridA[[0,0]]);
		print("Grid size: "+gridSize);
		print("Center of [0, 0]: "+getGridCenter(gridA[[0,0]]));
		print("Mouse: " + mousePos);
		print("\n");
	}
	*/

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
		frames[currentFrame].style.visibility = "hidden";
	}
	else
	{
		start = undefined
		frames[currentFrame-1].style.visibility = "hidden";
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


function playMissAnimation(x,y)
{
	frames = []
	frames.push(document.getElementById("splash1"));
	frames.push(document.getElementById("splash2"));
	frames.push(document.getElementById("splash3"));
	frames.push(document.getElementById("splash4"));
	frames.push(document.getElementById("splash5"));

	curX = x;
	curY = y;
	frameTimeOut = 1249;
	window.requestAnimationFrame(renderFrame);
	console.log("Miss");
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

function playSunkAnimation()
{
	console.log("Sunk");
}
