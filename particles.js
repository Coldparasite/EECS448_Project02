/*

*/

<<<<<<< HEAD
console.log(document.getElementById("grantcheck"));
document.getElementById("grantcheck") = true;

=======
>>>>>>> a7fd4c6731bb06ec1d0e645c4c26c9e0c283f715
var mouseDown = false;
var mouseUp = true;

var mouseX = null;
var mouseY = null;

var display = null;
var canvas = document.getElementById("canvas");

canvas.style.left = "0px";
canvas.style.top = "0px";

<<<<<<< HEAD
class Particles extends Array {
	constructor() {
		super();
	};

	add(particle) {
		this.push(particle);
	};
=======
var width = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth);
var height = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
>>>>>>> a7fd4c6731bb06ec1d0e645c4c26c9e0c283f715

canvas.width = width;
canvas.height = height;

if (canvas.getContext) {
	display = canvas.getContext("2d");
}

function print(message) {
	console.log(message);
}

<<<<<<< HEAD


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

=======
function updatePeripherals() {
	mouseUp = !mouseDown;
}

function getMouseDown() {
	return mouseDown;
}
>>>>>>> a7fd4c6731bb06ec1d0e645c4c26c9e0c283f715

function getMouseUp() {
	return !mouseDown;
}

function getClick() {
	return !mouseDown && !mouseUp;
}

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

function randrange(range) {
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
<<<<<<< HEAD
=======

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
		drawCircle(this.pos, this.size, this.color, this.alpha);
	};

	update() {
		this.pos = [this.pos[0] + this.vel[0] + this.vel[0]*this.boost, this.pos[1] + this.vel[1] + this.vel[1]*this.boost];
		this.size -= this.sizeDecay[0]*this.size + this.sizeDecay[1];
		this.alpha -= this.alphaDecay[0]*this.alpha + this.alphaDecay[1];

	};
};

class ParticleGroup extends Array {
	constructor(posRange, sizeRange, velRange, colorGroup, alphaRange, sizeDecayRange, alphaDecayRange, density, shape="circle") {
		super();
		this.offset = [0, 0];
		this.active = true;
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

	resize(scale) {
		var s = scale/100;
		this.posRange = this.posRange.map(range => range.map(value => value*s));
		this.sizeRange = this.sizeRange.map(value => value*s);
		this.velRange = this.velRange.map(range => range.map(value => value*s));
		this.sizeDecayRange[1] = this.sizeDecayRange[1].map(value => value*s);
		this.alphaDecayRange[1] = this.alphaDecayRange[1].map(value => value*s);
		this.offset = this.offset.map(value => value*s);
	};

	draw() {
		if (this.active) {
			var particle;
			for (particle of this) {
				particle.draw();
			}
		}
	};

	update() {
		if (this.active) {
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
		}
	};

	generate(spawnPos) {
		if (this.active) {
			var i, pos, size, vel, color, alpha, sizeDecay, alphaDecay;
			for (i=0; i<this.density; i++) {
				pos = [randrange(this.posRange[0])+spawnPos[0], randrange(this.posRange[1])+spawnPos[1]];
				size =  randrange(this.sizeRange);
				vel = [randrange(this.velRange[0]), randrange(this.velRange[1])];
				color = randchoice(this.colorGroup);
				alpha = randrange(this.alphaRange)/100;
				sizeDecay = [randrange(this.sizeDecayRange[0]), randrange(this.sizeDecayRange[1])];
				alphaDecay = [randrange(this.alphaDecayRange[0]), randrange(this.alphaDecayRange[1])];
				this.add(new Particle(pos, size, vel, color, alpha, sizeDecay, alphaDecay, this.shape));
			}
		}
	};

	show() {
		this.active = true;
	};

	hide() {
		this.active = false;
	};
};

class ParticleSystem extends Array {
	constructor(particleObjs, scale=100) {
		super();
		this.offset = [0, 0];
		this.active = true;
		var particleObj;
		for (particleObj of particleObjs) {
			var newObj = clone(particleObj[0]);
			newObj.offset = particleObj[1];
			if (scale != 100 && scale > 0) {
				newObj.resize(scale);
			}
			this.add(newObj);
		}
	};

	add(particleObj) {
		this.push(particleObj);
	};

	resize(scale) {
		var particleObj;
		for (particleObj of this) {
			particleObj.resize(scale);
		}
		this.offset = this.offset.map(value => value*(scale/100));
	};

	draw() {
		if (this.active) {
			var particleObj;
			for (particleObj of this) {
				if (particleObj.active) {
					particleObj.draw();
				}
			}
		}
	};

	update() {
		if (this.active) {
			var particleObj;
			for (particleObj of this) {
				if (particleObj.active) {
					particleObj.update();
				}
			}
		}
	};

	generate(spawnPos) {
		if (this.active) {
			var particleObj;
			for (particleObj of this) {
				if (particleObj.active) {
					particleObj.generate([spawnPos[0]+particleObj.offset[0], spawnPos[1]+particleObj.offset[1]]);
				}
			}
		}
	};

	show() {
		this.active = true;
		var particleObj;
		for (particleObj of this) {
			particleObj.show();
		}
	};

	hide() {
		this.active = false;
		var particleObj;
		for (particleObj of this) {
			particleObj.hide();
		}
	};

};

var flamesColors = ["rgb(255, 0, 0)", "rgb(255, 100, 50)", "rgb(184, 15, 10)", "rgb(255, 100, 100)", "rgb(255, 50, 50)"];
var smokeColors = ["rgb(100, 100, 100)", "rgb(150, 150, 150)", "rgb(50, 50, 50)", "rgb(0, 0,0 )"];

var flames = new ParticleGroup([[-10, 10], [2, 7]], [5, 15], [[-0.5, 0.5], [-3, -1]], flamesColors, [50, 80], [[0, 0], [0.5, 1]], [[0, 0], [0, 0]], 2);
var smoke = new ParticleGroup([[-10, 10], [-10, -50]], [15, 20], [[-1, 1], [-2, -1]], smokeColors, [1, 10], [[0, 0], [-0.1, -0.3]], [[0.02, 0.02], [0.0005, 0.0005]], 1);

var fire = new ParticleSystem([[flames, [0, 0]], [smoke, [0, -50]]]);

var particles = new ParticleSystem([[fire, [0, 0]], [fire, [75, 50]], [fire, [-75, 50]]], 75);

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

>>>>>>> a7fd4c6731bb06ec1d0e645c4c26c9e0c283f715
