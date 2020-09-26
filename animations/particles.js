/*

*/

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

	draw(ctx) {
		drawCircle(ctx, this.pos, this.size, this.color, this.alpha);
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
		this.frameCount = -1;
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

	draw(ctx) {
		if (this.active) {
			var particle;
			for (particle of this) {
				particle.draw(ctx);
			}
		}
	};

	update() {
		var toRemove = [];
		for (var particle of this) {
			particle.update();
			if (particle.size <= 0 || particle.alpha <= 0) {
				toRemove.push(this.indexOf(particle));
			}
		}
		var offset = 0;
		for (var i of toRemove) {
			this.splice(i-offset, 1);
			offset++;
		}	
	};

	generate(spawnPos) {
		if (this.active && this.frameCount == -1 || this.frameCount > 0) {
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
			if (this.frameCount > 0) {
				this.frameCount--;
			}
		}
	};

	setFrameCount(frames) {
		this.frameCount = frames;
	}

	activate() {
		this.active = true;
	};

	deactivate() {
		this.active = false;
		this.frameCount = 0;
	};
};

class ParticleSystem {
	constructor(scale, ...particleObjs) {
		this.particles = {};
		this.offset = [0, 0];
		this.active = true;

		for (var particleObj of particleObjs) {
			this.add(scale, particleObj) 
		}
		
	};

	add(scale, particleObj) {
		var newObj = deepClone(particleObj[1]);
		newObj.offset = particleObj[2];
		newObj.resize(scale);
		
		this.particles[particleObj[0]] = newObj;
	};

	resize(scale) {
		if (scale != 100 && scale > 0) {
			for (var particleObj in this.particles) {
				this.particles[particleObj].resize(scale);
			}
			this.offset = this.offset.map(value => value*(scale/100));
		}
	};

	draw(ctx) {
		if (this.active) {
			for (var particleObj in this.particles) {
				this.particles[particleObj].draw(ctx);
			}
		}
	};

	update() {
		for (var particleObj in this.particles) {
			this.particles[particleObj].update();
		}
	};

	generate(spawnPos) {
		if (this.active) {
			for (var particleObj in this.particles) {
				this.particles[particleObj].generate([spawnPos[0]+this.particles[particleObj].offset[0], spawnPos[1]+this.particles[particleObj].offset[1]]);
			}
		}
	};

	setFrameCount(frames) {
		if (this.active) {
			for (var particleObj in this.particles) {
				this.particles[particleObj].setFrameCount(frames);
			}
		}
	}

	activate(key=null) {
		if (key == null) {
			this.active = true;
			for (var particleObj in this.particles) {
				this.particles[particleObj].activate();
			}
		}
		else {
			this.particles[key].activate();
		}
	};

	deactivate(key=null) {
		if (key == null) {
			this.active = false;
			for (var particleObj in this.particles) {
				this.particles[particleObj].deactivate();
			}
		}
		else {
			this.particles[key].deactivate();
		}
	};

};

//utility
function sigmoid(x, k=10) {
    return 1 / (1 + Math.exp(-x/k));
}

function deepClone(obj) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}
	var props = Object.getOwnPropertyDescriptors(obj);
	for (var prop in props) {
		props[prop].value = deepClone(props[prop].value);
	}
	return Object.create(Object.getPrototypeOf(obj), props);
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

function drawRect(ctx, pos, size, color, alpha) {
	ctx.globalAlpha = alpha;
	ctx.fillStyle = color;
	ctx.fillRect(pos[0], pos[1], size[0], size[1]);
}

function drawCircle(ctx, pos, radius, color, alpha) {
	ctx.beginPath();
	ctx.arc(pos[0], pos[1], radius, 0, Math.PI*2);
	ctx.globalAlpha = alpha;
	ctx.fillStyle = color;
	ctx.fill();
}
