/*

*/

console.log(document.getElementById("grantcheck"));
document.getElementById("grantcheck") = true;

var mouseDown = false;
var mouseUp = true;

var mouseX = null;
var mouseY = null;

var display = null;
var canvas = document.getElementById("canvas");

if (canvas.getContext) {
	display = canvas.getContext("2d");
}

class Particles extends Array {
	constructor() {
		super();
	};

	add(particle) {
		this.push(particle);
	};

	draw() {
		var particle;
		for (particle of this) {
			particle.draw();
		}
	};

	update() {
		var particle, i;
		var toRemove = [];
		for (particle of this) {
			particle.update();
			if (particle.radius <= 0 || particle.alpha <= 0) {
				toRemove.push(this.indexOf(particle));
			}
		}
		var offset = 0;
		for (i of toRemove) {
			this.splice(i-offset, 1);
			offset++;
		}
	};
};

class Particle {
	constructor(pos, radius, vel, decay, color, alpha, type) {
		this.pos = pos;
		this.radius = radius;
		this.vel = vel;
		this.decay = decay;
		this.color = color;
		this.alpha = alpha;
		this.type = type;
	};

	draw() {
		display.beginPath();
		display.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI*2);
		display.globalAlpha = this.alpha;
		display.fillStyle = this.color;
		display.fill();
	};

	update() {
		this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
		this.radius -= this.decay;
		this.alpha -= 0.02*this.alpha + 0.00025;

	};
};

var particles = new Particles();
var particles2 = new Particles();
var fire = ["rgb(255, 0, 0)", "rgb(255, 100, 50)", "rgb(184, 15, 10)", "rgb(255, 100, 100)", "rgb(255, 50, 50)"];
var smoke = ["rgb(100, 100, 100)", "rgb(150, 150, 150)", "rgb(50, 50, 50)", "rgb(0, 0,0 )"];

gameLoop = function() {
	display.clearRect(0, 0, display.width, display.height);
	drawBackground("rgb(0, 0, 0)");



	if (getMouseDown() && mouseX != null) {
		var i;
		for (i=0; i<2; i++) {

			particles.add(new Particle([mouseX+randint(-10, 10), mouseY-randint(2, 7)], randint(5, 15), [randint(0, 2), randint(-7, -1)], randint(8, 15)/10, randchoice(fire), randint(5,8)/10, "fire"));

		}
		var i;
		for (i=0; i<1; i++) {

			particles2.add(new Particle([mouseX+randint(-10, 10), mouseY-60-randint(0, 50)], randint(15, 20), [randint(-3, 3)/3, randint(-2, -1)/1.25], -randint(2, 5)/10, randchoice(smoke), 0.005 + randint(0,3)/10, "smoke"));
	}
	print(particles.length + particles2.length);

	}

	//print(getRandom(-5, 5));
	particles2.update();
	particles2.draw();
	particles.update();
	particles.draw();


	updatePeripherals();
	window.requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);

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
	mouseX = event.clientX;
	mouseY = event.clientY;
}

function print(message) {
	console.log(message);
}

function randint(start, end) {
	return (start + Math.floor(Math.random()*(end-start)));
}

function randchoice(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function updatePeripherals() {
	mouseUp = !mouseDown;
}

function getMouseDown() {
	return mouseDown;
}

function getMouseUp() {
	return !mouseDown;
}

function getClick() {
	return !mouseDown && !mouseUp;
}

function drawBackground(color) {
	display.globalAlpha = 1;
	display.fillStyle = color;
	display.fillRect(0, 0, canvas.width, canvas.height);
}

function drawRect(pos, size, color) {
	display.fillStyle = color;
	display.fillRect(pos[0], pos[1], size[0], size[1]);
}

function drawCircle(pos, radius, color) {
	display.beginPath();
	display.arc(pos[0], pos[1], radius, 0, Math.PI*2);
	display.fillStyle = color;
	display.fill();
}
