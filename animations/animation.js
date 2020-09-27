/*

*/

var particles = new ParticleSystem();
particles.deactivate();

animationLoop = function() {
	updateCoords();

	display.clearRect(0, 0, canvas.width, canvas.height);
	if (mouseDown) {
		makeFire(mousePos, 10);
	}
	particles.generate();
	particles.update();
	particles.draw(display);

	updatePeripherals();
	window.requestAnimationFrame(animationLoop);
}

makeFire = function(pos, duration=1) {
	particles.add(pos, fire, pos, duration);
}

window.requestAnimationFrame(animationLoop);

