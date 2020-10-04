function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function() {
    this.sound.play();
	}
  this.stop = function() {
    this.sound.pause();
	}
  this.start = function() {
	
	this.stop();
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
