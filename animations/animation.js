/*
	Update mouse pos regularly instead of when mouse moves
*/

var global = new ParticleSystem();

var boards = {
				"right": new ParticleSystem(),
				"left": new ParticleSystem(),
			}

//particles.deactivate();

var particles = [boards["right"], boards["left"], global];

animationLoop = function() {
	updateCoords();

	display.clearRect(0, 0, canvas.width, canvas.height);
	//if (mouseDown) {
	//	ignite([mouseX-difference[0], mouseY-difference[1]], 10);
	//}

	if (getClick()) {
		print(player);
		print("Board A: "+gridA[[0,0]]);
		print("Grid size: "+gridSize);
		print("Center of [0, 0]: "+getGridCenter(gridA[[0,0]]));
		print("Mouse: " + mousePos);
		print("\n");
	}

	//iteratively update particle systems
	global.generate(scale);
	global.update();
	global.draw(display);

	updatePeripherals();


	window.requestAnimationFrame(animationLoop);
}

window.requestAnimationFrame(animationLoop);
