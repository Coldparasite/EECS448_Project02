/*

*/

var particles = new ParticleSystem();
particles.deactivate();

animationLoop = function() {
	display.clearRect(0, 0, canvas.width, canvas.height);
	particles.generate();
	particles.update();
	particles.draw(display);

	updatePeripherals();
	window.requestAnimationFrame(animationLoop);
}

addAnimations = function() {
	if (getClick()) {
		particles.add("Fire " + mouseX + ", " + mouseY, fire, [mouseX, mouseY]);
	}	
}

makeFire = function(pos) {
	particles.add(pos, fire, pos, 30);
}

window.requestAnimationFrame(animationLoop);
