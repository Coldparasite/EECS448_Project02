/*

*/

var mouseDown = false;
var mouseUp = true;

var mouseX = null;
var mouseY = null;

var display = null;
var canvas = document.getElementById("canvas");

canvas.style.left = "0px";
canvas.style.top = "0px";

var width = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
var height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);

canvas.width = width;
canvas.height = height;

if (canvas.getContext) {
	display = canvas.getContext("2d");
}

function print(message) {
	console.log(message);
}

function randint(range) {
	if (range[0] == range[1]) {
		return range[0]; 
	}
	else {
		var rawResult;
		var placeholder = 0;
		var start = range[0];
		var end = range[1];

		while ((Math.abs(start) != Math.trunc(Math.abs(start)) && start != 0) || (Math.abs(end) != Math.trunc(Math.abs(end)) && end != 0)) {
			start = start*10;
			end = end*10;
			placeholder++;
		}
		rawResult = start + Math.floor(Math.random()*(end-start));
		return rawResult / Math.pow(10, placeholder);
	}
}

function randchoice(arr) {
	return arr[Math.floor(Math.random()*arr.length)];
}

function sigmoid(x) {
	var c = 10;
    return 1 / (1 + Math.exp(-x/c));
}

function clone(obj) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
	var props = Object.getOwnPropertyDescriptors(obj);
	for (var prop in props) {
		props[prop].value = clone(props[prop].value);
	}
	return Object.create(Object.getPrototypeOf(obj), props);
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

function drawRect(pos, size, color, alpha) {
	display.globalAlpha = alpha;
	display.fillStyle = color;
	display.fillRect(pos[0], pos[1], size[0], size[1]);
}

function drawCircle(pos, radius, color, alpha) {
	display.beginPath();
	display.arc(pos[0], pos[1], radius, 0, Math.PI*2);
	display.globalAlpha = alpha;
	display.fillStyle = color;
	display.fill();
}

class Particle {
	constructor(pos, size, vel, color, alpha, sizeDecay, alphaDecay, shape) {
		this.pos = pos;
		this.size = size;
		this.vel = vel;
		this.color = color;
		this.alpha = alpha;
		this.sizeDecay = sizeDecay;
		this.alphaDecay = alphaDecay;
		this.shape = shape;
		this.boost = 10*(1-sigmoid(this.size))/this.size;
	};

	draw() {
		if (this.shape == "rect") {
			drawRect(this.pos, [this.size, this.size], this.color, this.alpha);
		}
		else {
			drawCircle(this.pos, this.size, this.color, this.alpha);
		}
	};

	update() {
		this.pos = [this.pos[0] + this.vel[0] + this.vel[0]*this.boost, this.pos[1] + this.vel[1] + this.vel[1]*this.boost];
		this.size -= this.sizeDecay[0]*this.size + this.sizeDecay[1];
		this.alpha -= this.alphaDecay[0]*this.alpha + this.alphaDecay[1];

	};
};

class ParticleGroup extends Array {
	constructor(posRange, sizeRange, velRange, colorGroup, alphaRange, sizeDecayRange, alphaDecayRange, density, shape) {
		super();
		this.posRange = posRange;
		this.sizeRange = sizeRange;
		this.velRange = velRange;
		this.colorGroup = colorGroup;
		this.alphaRange = alphaRange;
		this.sizeDecayRange = sizeDecayRange;
		this.alphaDecayRange = alphaDecayRange;
		this.density = density;
		this.shape = shape;
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
			if (particle.size <= 0 || particle.alpha <= 0) {
				toRemove.push(this.indexOf(particle));
			}
		}
		var offset = 0;
		for (i of toRemove) {
			this.splice(i-offset, 1);
			offset++;
		}
	};

	generate(spawnPos) {
		var i, pos, size, vel, color, alpha, sizeDecay, alphaDecay;
		for (i=0; i<this.density; i++) {
			pos = [randint(this.posRange[0])+spawnPos[0], randint(this.posRange[1])+spawnPos[1]];
			size =  randint(this.sizeRange);
			vel = [randint(this.velRange[0]), randint(this.velRange[1])];
			color = randchoice(this.colorGroup);
			alpha = randint(this.alphaRange)/100;
			sizeDecay = [randint(this.sizeDecayRange[0]), randint(this.sizeDecayRange[1])];
			alphaDecay = [randint(this.alphaDecayRange[0]), randint(this.alphaDecayRange[1])];
			this.add(new Particle(pos, size, vel, color, alpha, sizeDecay, alphaDecay, this.shape));
		}
	};
};

class ParticleSystem extends Array {
	constructor(particleGroups) {
		super();
		var particleGroup;
		for (particleGroup of particleGroups) {
			this.add(particleGroup);
		}
	};

	add(particleGroup) {
		this.push([clone(particleGroup[0]), particleGroup[1]]);
	};

	draw() {
		var particleGroup;
		for (particleGroup of this) {
			particleGroup[0].draw();
		}
	};

	update() {
		var particleGroup;
		for (particleGroup of this) {
			particleGroup[0].update();
		}
	};

	generate(spawnPos) {
		var particleGroup;
		for (particleGroup of this) {
			particleGroup[0].generate([spawnPos[0]+particleGroup[1][0], spawnPos[1]+particleGroup[1][1]]);
		}
	};

};

var flamesColors = ["rgb(255, 0, 0)", "rgb(255, 100, 50)", "rgb(184, 15, 10)", "rgb(255, 100, 100)", "rgb(255, 50, 50)"];
var smokeColors = ["rgb(100, 100, 100)", "rgb(150, 150, 150)", "rgb(50, 50, 50)", "rgb(0, 0,0 )"];

var flames = new ParticleGroup([[-10, 10], [2, 7]], [5, 15], [[-0.5, 0.5], [-3, -1]], flamesColors, [50, 80], [[0, 0], [0.5, 1]], [[0, 0], [0, 0]], 2);
var smoke = new ParticleGroup([[-10, 10], [-10, -50]], [15, 20], [[-1, 1], [-2, -1]], smokeColors, [1, 10], [[0, 0], [-0.1, -0.3]], [[0.02, 0.02], [0.0005, 0.0005]], 1);

var fire = new ParticleSystem([[flames, [0, 0]], [smoke, [0, -50]]]);

var particles = new ParticleSystem([[fire, [0, 0]], [fire, [75, 50]], [fire, [-75, 50]]]);

gameLoop = function() {
	display.clearRect(0, 0, canvas.width, canvas.height);	

	if (getMouseDown() && mouseX != null) {
		particles.generate([mouseX, mouseY]);
	}
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

