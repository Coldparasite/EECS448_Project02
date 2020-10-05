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
	/**
	 * calls draw circle
	 * @param {context} ctx place to draw on.
	 */
	draw(ctx) {
		drawCircle(ctx, this.pos, this.size, this.color, this.alpha);
	};
	/**
	 * updates particle content
	 */
	update() {
		this.pos = [this.pos[0] + this.vel[0] + this.vel[0]*this.boost, this.pos[1] + this.vel[1] + this.vel[1]*this.boost];
		this.size -= this.sizeDecay[0]*this.size + this.sizeDecay[1];
		this.alpha -= this.alphaDecay[0]*this.alpha + this.alphaDecay[1];
	};
};

class ParticleGroup extends Array {
	/**
	 * particleGroup constructor. Initialies variables
	 * @param {array} posRange Range to choose a random position from
	 * @param {array} sizeRange Range to choose a size
	 * @param {array} velRange Range to choose a velocity
	 * @param {array} colorGroup group of RGB colors to chose from
	 * @param {array} alphaRange Range to choose a random alpha from
	 * @param {array} sizeDecayRange Range of decrease in size to chose from
	 * @param {array} alphaDecayRange Range of decrease in alpha to chose from
	 * @param {number} density density of the shape
	 * @param {string} shape type of the shape
	 */
	constructor(posRange, sizeRange, velRange, colorGroup, alphaRange, sizeDecayRange, alphaDecayRange, density, shape="circle") {
		super();
		this.offset = [0, 0];
		this.active = true;
		this.duration = -1;
		this.savedDuration = this.duration;
		this.cycle = 1;
		this.counter = 0;
		this.partial = (density<1);
		
		this.posRange = posRange;
		this.sizeRange = sizeRange;
		this.velRange = velRange;
		this.colorGroup = colorGroup;
		this.alphaRange = alphaRange;
		this.sizeDecayRange = sizeDecayRange;
		this.alphaDecayRange = alphaDecayRange;
		this.density = density;
		this.shape = shape;

		if (this.density < 1) {
			this.cycle = Math.ceil((1/this.density));
			this.density = 1;
 		}
	
	};
	/**
	 * adds a particle object to the particle group
	 * @param {object} particle particle object
	 */
	add(particle) {
		this.push(particle);
	};
	/**
	 * resize the particle
	 * @param {number} scale scales the group of particles
	 */
	resize(scale) {
		var s = scale/100;
		this.posRange = this.posRange.map(range => range.map(value => value*s));
		this.sizeRange = this.sizeRange.map(value => value*s);
		this.velRange = this.velRange.map(range => range.map(value => value*s));
		this.sizeDecayRange[1] = this.sizeDecayRange[1].map(value => value*s);
		this.alphaDecayRange[1] = this.alphaDecayRange[1].map(value => value*s);
		this.offset = this.offset.map(value => value*s);
	};
	/**
	 * calls draw the particle
	 * @param {context} ctx place to draw on.
	 */
	draw(ctx) {
		if (this.active) {
			var particle;
			for (particle of this) {
				particle.draw(ctx);
			}
		}
	};
	/**
	 * updates the particle position and state
	 */
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
	/**
	 * generate creates the different particle 
	 * @param {array} spawnPos sets the postion of the spawn
	 */
	generate(spawnPos) {
		
		if (this.active && spawnPos[0] != null && spawnPos[1] != null && (this.duration == -1 || this.duration > 0)) {
			if (this.counter%this.cycle == 0) {
				var i, numParticles, pos, size, vel, color, alpha, sizeDecay, alphaDecay;
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
				this.counter = 0;
			}
			if (this.duration > 0) {
				this.duration--;
			}
			if (this.cycle != 1) {
				this.counter++;
			}
			if (this.duration == 0) {
				this.counter = this.cycle;
			}
			
		}
		
	};
	/**
	 * set the duration of the particle
	 * @param {number} duration how long particle system should be aactive for
	 */
	setDuration(duration) {
		this.duration = duration;
	}
	/**
	 * activates the particle action 
	 */
	activate() {
		this.active = true;
		this.duration = this.savedDuration;
		if (this.partial) {
			this.cycle = Math.ceil((1/this.density));
		}
		else {
			this.cycle = 1;
		}
		this.counter = 0;
	};
	/**
	 * deactivates the particle action
	 */
	deactivate() {
		this.active = false;
		this.savedDuration = this.duration;
		this.duration = -2;
	};
	/**
	 * 	checks if its dead based on length and counter
	 *  @returns {bool} whether it is dead or not
	 */
	dead() {
		return (this.length == 0 && this.counter == this.cycle);
	};
};

class ParticleSystem {
	constructor(...particleObjs) {
		this.particles = {};
		this.offset = [0, 0];
		this.active = true;

		for (var particleObj of particleObjs) {
			this.add(particleObj[0], particleObj[1], particleObj[2]); 
		}
	};
	/**
	 * adds a new particle to the particle system
	 * @param {*} name an ID
	 * @param {ParticleGroup} type either particle group of particle system
	 * @param {number} offset sets an offset to the particles
	 * @param {number} duration duration of how long the particle system stays active
	 * @param {number} scale scales the system of particles
	 */
	add(name, type, offset, duration=-1, scale=100) {
		if (!(name in this.particles)) {
			var newObj = deepClone(type);
			newObj.offset = offset;
			newObj.resize(scale);
			newObj.setDuration(duration);
			this.particles[name] = newObj;
		}
	};
	/**
	 * reoves a particle from the particle system
	 * @param {number} key index of particle to remove
	 */
	remove(key) {
		delete this.particles[key];
	};
	/**
	 * looks for element in the particle system
	 * @param {particle} key element to look for
	 * @returns {bool} returns if the particle are in the particle system
	 */
	contains(key) {
		return (key in this.particles);
	};
	/**
	 * changes the size of the particle system
	 * @param {number} scale scales the particle system
	 * @param {bool} relative 
	 */
	resize(scale, relative=false) {
		if (scale != 100 && scale > 0) {
			for (var particleObj in this.particles) {
				this.particles[particleObj].resize(scale, relative);
			}
			if (relative) {
				this.offset = this.offset.map(value => value*(scale/100));
			}
		}
	};
	/**
	 * calls draw the particle
	 * @param {context} ctx place to draw on.
	 */
	draw(ctx) {
		if (this.active) {
			for (var particleObj in this.particles) {
				this.particles[particleObj].draw(ctx);
			}
		}
	};
	/**
	 *  updates the particle position and state
	 */
	update() {
		for (var particleObj in this.particles) {
			this.particles[particleObj].update();
			if (this.particles[particleObj].dead()) {		
				this.remove(particleObj);
			}
		}
	};
	/**
	 * generate creates the different particle 
	 * @param {array} spawnPos sets the postion of the spawn
	 */
	generate(spawnPos=[0, 0]) {
		if (this.active && spawnPos[0] != null && spawnPos[1] != null) {
			for (var particleObj in this.particles) {
				this.particles[particleObj].generate([spawnPos[0]+this.particles[particleObj].offset[0], spawnPos[1]+this.particles[particleObj].offset[1]]);
			}
		}
	};
	/**
	 * set the duration of the particle
	 * @param {number} duration how long particle system should be aactive for
	 */
	setDuration(duration) {
		if (this.active) {
			for (var particleObj in this.particles) {
				this.particles[particleObj].setDuration(duration);
			}
		}
	}
	/**
	 * activates the particle action 
	 * @param {particle} key particle to be activated
	 */
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
	/**
	 * deactivates the particle system
	 * @param {particle} key particle to be deactivated
	 */
	deactivate(key=null) {
		if (key == null) {
			if (this.active) {
				this.active = false;
				for (var particleObj in this.particles) {
					this.particles[particleObj].deactivate();
				}
			}
		}
		else {
			this.particles[key].deactivate();
		}
	};
	/**
	 * switching between activating and deactivating 
	 */
	toggleActive() {
		if (this.active) {
			this.deactivate();
		}
		else {
			this.activate();
		}
	};
	/**
	 * checks if its dead based on length and counter
	 * @returns {bool} whether it is dead or not
	 */
	dead() {
		var isDead = true;
		for (var particleObj in this.particles) {
			if (!this.particles[particleObj].dead()) {
				isDead = false;
			}
		}
		return isDead;
	};

	length() {
		var length = 0;
		for (var particleObj in this.particles) {
			length += particleObj.length;
		}
		return length;
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
