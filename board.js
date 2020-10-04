/*

*/

var doc;
var docPos;

var defaultAPos;
var defaultBPos;

var A; //right
var B; //left

var gridStyle;

var sampleCol;
var colStyle;

var gridStyle;

var posA;
var posB;

var numGrids = [9, 9];
var gridSize = null;

var gridRight;
var gridLeft;

var scale;

var contentLoaded = false;
var init = true;

var music;
document.addEventListener("DOMContentLoaded", function() {
	print("Loaded");
	contentLoaded = true;
	updateCoords();
	music = document.getElementById("backGroundMusic");
	music.volume = .50;

}, false);

/**
* This function is the handler for the playMusicButton once clicked the backGroundMusic
* will begin to play and if clicked again it shall pause the music and repeat upon multiple
* clicks.
*/
function startBackgroundMusic()
{
	if(music.paused == true)
	{
		document.getElementById("playMusicButton").innerHTML = "Pause Music";
		music.play();
		music.loop = true;
	}
	else
	{
			music.pause();
			document.getElementById("playMusicButton").innerHTML = "Play Music";
	}
}

function updateCoords() {
	if (contentLoaded) {
		doc = document.body.getBoundingClientRect();
		docPos = [doc.left, doc.top];

		A = document.getElementById("A11");
		B = document.getElementById("B11");

		gridStyle = getStyle(B);

		rectA = A.getBoundingClientRect();
		rectB = B.getBoundingClientRect();


		posA = [rectA.left+gridStyle.padding[0] + window.pageXOffset,rectA.top+gridStyle.padding[1] + window.pageYOffset];
		posB = [rectB.left+gridStyle.padding[0] + window.pageXOffset, rectB.top+gridStyle.padding[1] + window.pageYOffset];

		sampleCol = document.getElementById("sampleCol");
		rectCol = sampleCol.getBoundingClientRect();

		gridSize = [Math.abs(rectCol.right-rectCol.left), Math.abs(rectB.top-rectB.bottom)];

		gridRight = {};
		gridLeft = {};

		for (var i = 0; i<numGrids[0]; i++) {
			for (var j = 0; j<numGrids[1]; j++) {
				gridRight[[i, j]] = [posA[0] + gridSize[0]*i + gridStyle.border[0] + window.pageXOffset, posA[1] + gridSize[1]*j + gridStyle.border[1] + window.pageYOffset];
				gridLeft[[i, j]] = [posB[0] + gridSize[0]*i + gridStyle.border[0] + window.pageXOffset, posB[1] + gridSize[1]*j + gridStyle.border[1] + window.pageYOffset];
			}
		}

		if (init) {
			defaultAPos = posA;
			defaultBPos = posB;
			init = false;
		}

		scale = [posA[0]-defaultAPos[0], posA[1]-defaultAPos[1]];

	}
}

function gridCenter(pos) {
	return [pos[0]+gridSize[0]/2, pos[1]+gridSize[1]/2];
}

function getStyle(element) {
	var style = element.currentStyle || window.getComputedStyle(element);
	var attributes = {
			size: [style.width, style.height],
			margin: [parseFloat(style.marginLeft), parseFloat(style.marginTop)],
			padding: [parseFloat(style.paddingLeft), parseFloat(style.paddingTop)],
			border: [parseFloat(style.borderLeftWidth), parseFloat(style.borderTopWidth)],
	};
	return attributes;
}
