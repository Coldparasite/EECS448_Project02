/**
 * Creates sound object.
 *
 * @param {path} src Path to sound file 
 */
function sound(src) {
	this.sound = document.createElement("audio");
	this.sound.src = src;
	this.sound.setAttribute("preload", "auto");
	this.sound.setAttribute("controls", "none");
	this.sound.style.display = "none";
	document.body.appendChild(this.sound);

	/**
	 * Plays sound
	 *
	 */
	this.play = function() {
		this.sound.play();
	}

	/**
	 * Pauses sound
	 */
	this.stop = function() {
		this.sound.pause();
	}

	/**
	 * Starts and plays sound, plays over previous instances of this sound that havn't terminated
	 *
	 */
	this.start = function() {
		this.sound.currentTime = 0;
		this.play();
	}
}

var boom;
var splashing;
var victory;

document.addEventListener("DOMContentLoaded", function() {
	boom = new sound("assets/sounds/explosion.wav");
	splashing = new sound("assets/sounds/splash.mp3");
	victory = new sound("assets/sounds/victory.wav");
}, false);
