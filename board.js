/*

*/
contentLoaded = false;

var doc;
var docPos;

var A; //right
var B; //left

var boardStyle;

var posA;
var posB;

var numGrids = 9;
var gridSize = null;

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

		boardStyle = getStyle(B);

		rectA = A.getBoundingClientRect();
		rectB = B.getBoundingClientRect();
	
		posA = [rectA.left+boardStyle.padding[0], rectA.top+boardStyle.padding[1]];
		posB = [rectB.left+boardStyle.padding[0], rectB.top+boardStyle.padding[1]];
	
		var sampleGrid = document.getElementById("B11").getBoundingClientRect();
		gridSize = [Math.abs(sampleGrid.right-sampleGrid.left), Math.abs(sampleGrid.top-sampleGrid.bottom)]
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
