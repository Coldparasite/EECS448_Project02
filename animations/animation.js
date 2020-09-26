var particles = new ParticleSystem(100, ["center", fire, [0, 0]], ["right", fire, [75, 50]], ["left", fire, [-75, 50]]);
particles.deactivate();

animationLoop = function() {
	display.clearRect(0, 0, canvas.width, canvas.height);

	particles.generate([mouseX, mouseY]);

	particles.update();
	particles.draw(display);

	updatePeripherals();
	window.requestAnimationFrame(animationLoop);
}

window.requestAnimationFrame(animationLoop);
