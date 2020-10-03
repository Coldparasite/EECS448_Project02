/*
	Update mouse pos regularly instead of when mouse moves
*/

var particles = new ParticleSystem();
//particles.deactivate();

animationLoop = function() {
	updateCoords();

	display.clearRect(0, 0, canvas.width, canvas.height);
	//if (mouseDown) {
	//	ignite([mouseX-difference[0], mouseY-difference[1]], 10);
	//}

	//if (getClick()) {
	//	print(gridA);
	//	print(mousePos);
	//	print(difference);
	//}

	particles.generate(difference);
	particles.update();
	particles.draw(display);

	updatePeripherals();


	window.requestAnimationFrame(animationLoop);
}

ignite = function(pos, duration=-1) {
	particles.add(pos, fire, pos, duration);
}

window.requestAnimationFrame(animationLoop);
