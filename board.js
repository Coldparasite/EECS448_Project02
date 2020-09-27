/*

*/
contentLoaded = false;

var doc;
var docPos;

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

var gridA;
var gridB;

var testing = true;

document.addEventListener("DOMContentLoaded", function() {
	contentLoaded = true;
	updateCoords();
}, false);

function updateCoords() {
	if (contentLoaded) {
		doc = document.body.getBoundingClientRect();
		docPos = [doc.left, doc.top];

		A = document.getElementById("A11");
		B = document.getElementById("B11");

		gridStyle = getStyle(B);

		rectA = A.getBoundingClientRect();
		rectB = B.getBoundingClientRect();
	
		posA = [rectA.left+gridStyle.padding[0], rectA.top+gridStyle.padding[1]];
		posB = [rectB.left+gridStyle.padding[0], rectB.top+gridStyle.padding[1]];

		sampleCol = document.getElementById("sampleCol");
		rectCol = sampleCol.getBoundingClientRect();
	
		gridSize = [Math.abs(rectCol.right-rectCol.left), Math.abs(rectB.top-rectB.bottom)];
	
		gridA = {};
		gridB = {};

		for (var i = 0; i<numGrids[0]; i++) {
			for (var j = 0; j<numGrids[1]; j++) {
				gridA[[i, j]] = [posA[0] + gridSize[0]*i + gridStyle.border[0], posA[1] + gridSize[1]*j + gridStyle.border[1]];
				gridB[[i, j]] = [posB[0] + gridSize[0]*i + gridStyle.border[0], posB[1] + gridSize[1]*j + gridStyle.border[1]];
			}
		}

		makeFire(gridA[[3, 3]], 25);

		if (testing) {
			print(gridA);
			testing = false;
		}
	}
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
