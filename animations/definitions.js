//colors
var flamesColors = ["rgb(255, 0, 0)", "rgb(255, 100, 50)", "rgb(184, 15, 10)", "rgb(255, 100, 100)", "rgb(255, 50, 50)"];
var smokeColors = ["rgb(100, 100, 100)", "rgb(150, 150, 150)", "rgb(50, 50, 50)", "rgb(0, 0,0 )"];
var waterColors = ["rgb(0, 0, 255)", "rgb(0, 100, 255)", "rgb(50, 0, 255)", "rgb(50, 50, 255)"];

//particle objects
var flames = new ParticleGroup([[-10, 10], [2, 7]], [5, 15], [[-0.5, 0.5], [-3, -1]], flamesColors, [50, 80], [[0, 0], [0.5, 1]], [[0, 0], [0, 0]], 0.5);
var smoke = new ParticleGroup([[-10, 10], [-10, -50]], [15, 20], [[-1, 1], [-2, -1]], smokeColors, [1, 10], [[0, 0], [-0.1, -0.3]], [[0.02, 0.02], [0.0005, 0.0005]], 0.25);
var fire = new ParticleSystem(["flames", flames, [0, 0]], ["smoke", smoke, [0, -50]]);
fire.resize(75);

var water = new ParticleGroup([[-10, 10], [-10, 10]], [5, 10], [[-1.5, 1.5], [-1.5, 1.5]], waterColors, [100, 100], [[0, 0], [0.25, 0.5]], [[0, 0], [0.0001, 0.0001]], 1);
water.resize(150);

var explosion = new ParticleGroup([[-10, 10], [-10, 10]], [5, 10], [[-1.5, 1.5], [-1.5, 1.5]], flamesColors, [100, 100], [[0, 0], [0.375, 0.5]], [[0, 0], [0.0001, 0.0001]], 1);
explosion.resize(200);

//functions to create instances of particle objects
ignite = function(system, pos, duration=-1) {
	system.add(pos, fire, pos, duration);
}

splash = function(system, pos, duration=10) {
	system.add(pos, water, pos, duration);
}

explode = function(system, pos, duration=10) {
	system.add(pos, explosion, pos, duration);
}
