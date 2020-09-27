var flamesColors = ["rgb(255, 0, 0)", "rgb(255, 100, 50)", "rgb(184, 15, 10)", "rgb(255, 100, 100)", "rgb(255, 50, 50)"];
var smokeColors = ["rgb(100, 100, 100)", "rgb(150, 150, 150)", "rgb(50, 50, 50)", "rgb(0, 0,0 )"];

var flames = new ParticleGroup([[-10, 10], [2, 7]], [5, 15], [[-0.5, 0.5], [-3, -1]], flamesColors, [50, 80], [[0, 0], [0.5, 1]], [[0, 0], [0, 0]], 1);
var smoke = new ParticleGroup([[-10, 10], [-10, -50]], [15, 20], [[-1, 1], [-2, -1]], smokeColors, [1, 10], [[0, 0], [-0.1, -0.3]], [[0.02, 0.02], [0.0005, 0.0005]], 1);
var fire = new ParticleSystem(["flames", flames, [0, 0]], ["smoke", smoke, [0, -50]]);
