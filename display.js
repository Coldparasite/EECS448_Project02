var mouseDown = false;
var mouseUp = true;

var mousePos = null;
var mouseX = null;
var mouseY = null;

var display = null;
var canvas = null;

document.addEventListener("DOMContentLoaded", function() {
	canvas = document.getElementById('canvas');
	canvas.style.left = "0px";
	canvas.style.top = "0px";

	var width = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth, window.innerWidth);
	var height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);

	canvas.width = width;
	canvas.height = height;

	if (canvas.getContext) {
		display = canvas.getContext("2d");
	}
	
}, false);

document.onmousedown = function(event) {
	var button = event.button;
	if (button == 0) {
		mouseDown = true;
	}
}

document.onmouseup = function(event) {
	var button = event.button;
	if (button == 0) {
		mouseDown = false;
	}
}

document.onmousemove = function(event) {
	mouseX = event.clientX + window.pageXOffset;
	mouseY = event.clientY + window.pageYOffset;
	mousePos = [mouseX, mouseY];
}

/**
 * Returns whether or not left click is pressed
 *
 * @return {bool} if mouse is down
 */
function getMouseDown() {
	return mouseDown;
}

/**
 * Returns whether or not left click is not pressed
 *
 * @return {bool} if mouse is not down
 */
function getMouseUp() {
	return !mouseDown;
}

/**
 * Updates state of mouse to allow for falling edge detection
 *
 */
function updatePeripherals() {
	mouseUp = !mouseDown;
}

/**
 * Returns a singular click has ocurred
 *
 * @return {bool} if singular click has ocurred
 */
function getClick() {
	return !mouseDown && !mouseUp;
}
