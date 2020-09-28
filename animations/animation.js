/*
	Update mouse pos regularly instead of when mouse moves
*/

var particles = new ParticleSystem();
particles.deactivate();

animationLoop = function() {
	updateCoords();

	display.clearRect(0, 0, canvas.width, canvas.height);
	if (mouseDown) {
		makeFire(mousePos, 10);
	}
	if (getClick()) {
		print(mousePos);
	}
	particles.generate();
	particles.update();
	particles.draw(display);

	updatePeripherals();

	var img = document.getElementById("testAnimation");
	display.drawImage(img,0,0,64,64);
	window.requestAnimationFrame(animationLoop);
}

makeFire = function(pos, duration=1) {
	particles.add(pos, fire, pos, duration);
}

window.requestAnimationFrame(animationLoop);
