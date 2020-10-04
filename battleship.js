var gameOver = false;
var player = 1;
var board1 = [];
var board2 = [];
var numShips = 0;

var waitForSwitch = false;
var horizontal = true;
var placing = true;
var placingNum = 1;
var placingFinished = false;
var playerTwoPlacementReady = false;
var playerOneShips = [];
var playerTwoShips = [];
var difficulty = "";
var isAI= false;
var classifications = ['empty', 'red', 'grey', 'miss', 'sunk'];

function print(message) {
	console.log(message);
}

/* * = empty
    M = Miss
    H = Hit
    @ = Ship
*/

/**
 * Sets the number of ships to be placed for this game.
 * @param {number} num The number of ships to play with this game
 */
function AIChoice(num){
    if(num == 1){
        document.getElementById("playerChoice").remove();
        for (let i = 1; i < 3; i++){
            document.getElementById(i + "Button").remove();
        }
        document.getElementById("visibleButtons").style= "display: block";
        document.getElementById("AIDifficulty").style= "visibility: visible";
        isAI = true;
    }
    else{
        document.getElementById("playerChoice").remove();
        for (let i = 1; i < 3; i++){
            document.getElementById(i + "Button").remove();
        }
        document.getElementById("numShips").style= "display: block";
        document.getElementById("visibleButtons2").style= "visibility: visible";
    }
}

function AILevel(num){
    if(num == 1){
        document.getElementById("AIDifficulty").remove();
        for (let i = 1; i < 4; i++){
            document.getElementById(i + "Difficulty").remove();
        }
        document.getElementById("numShips").style= "visibility: visible";
        document.getElementById("visibleButtons2").style= "visibility: visible";
        difficulty = "Easy";
    }
    else if(num == 2){
        document.getElementById("AIDifficulty").remove();
        for (let i = 1; i < 4; i++){
            document.getElementById(i + "Difficulty").remove();
        }
        document.getElementById("numShips").style= "visibility: visible";
        document.getElementById("visibleButtons2").style= "visibility: visible";
        difficulty = "Medium";
    }
    else{
        document.getElementById("AIDifficulty").remove();
        for (let i = 1; i < 4; i++){
            document.getElementById(i + "Difficulty").remove();
        }
        document.getElementById("numShips").style= "visibility: visible";
        document.getElementById("visibleButtons2").style= "visibility: visible";
        difficulty = "Hard";
    }
}

function handleHard()
{
    let pos = false;
    for(let i = 0; i < 9; i++)
    {
        for(let j = 0; j < 9; j++)
        {
           if(board1[i][j].startsWith('@'))
           {
               checkForShip(i+1, j+1);
               pos = true;
               break;
           }
        }
        if(pos)
        {
            break;
        }
    }
}

function numShipFunction(num) {
    document.getElementById('ships').innerHTML = 'Place your ' + placingNum + '-length ship on your board';
    numShips = num;
    document.getElementById("numShips").remove();
    for (var i = 1; i < 6; i++) {
        document.getElementById(i + "Ship").remove();
    }
};

/**
* Shows the ship currently being placed on the screen.
* @param {x} num The x coordinate on the grid.
* @param {y} num The y coordinate on the grid.
*/
function displayShip(x,y)
{
	//playAction(0,0);
  if(placingNum == 1)      {ship = document.getElementById("firstShip");}
  else if(placingNum == 2) {ship = document.getElementById("secondShip");}
  else if(placingNum == 3) {ship = document.getElementById("thirdShip");}
  else if(placingNum == 4) {ship = document.getElementById("fourthShip");}
  else if(placingNum == 5) {ship = document.getElementById("fifthShip");}
  if(playerOneShips.length < numShips)
  {
		if(horizontal)
		{
    	ship.style.left = (posB[0] + (x-1)*56) + "px";
    	ship.style.top = (posB[1] + (y-1) *62)  + "px";
			ship.style.transform = "rotate(0deg)";
		}
		else
		{
			ship.style.left = (posB[0] + ((x-1)*56)-((placingNum-1)*28)) + "px";
			ship.style.top = (posB[1] + ((y-1) *62)+(placingNum-1)*31)   + "px";
			ship.style.transform = "rotate(90deg)";
		}
		ship.style.visibility = "visible";
  }
  else if (playerTwoPlacementReady)
  {
		if(horizontal)
		{
			ship.style.left = (posB[0] + (x-1)*56) + "px";
			ship.style.top = (posB[1] + (y-1) *62)  + "px";
			ship.style.transform = "rotate(0deg)";
		}
		else
		{
			ship.style.left = (posB[0] + ((x-1)*56)-((placingNum-1)*28)) + "px";
			ship.style.top = (posB[1] + ((y-1) *62)+(placingNum-1)*31)   + "px";
			ship.style.transform = "rotate(90deg)";
		}
		ship.style.visibility = "visible";
	}
}

/**
* Places the ships on the screen at the start of each players turn or hides them
* at the end of the turn.
* @param {flag} boolean determines if the ships are supposed to be on screen.
*/
function switchShips(flag)
{
  if(flag && !(placing))
  {
		updateCoords();
    for(i = 0; i<numShips;i++)
    {
      if(i == 0)      {ship = document.getElementById("firstShip");}
      else if(i == 1) {ship = document.getElementById("secondShip");}
      else if(i == 2) {ship = document.getElementById("thirdShip");}
      else if(i == 3) {ship = document.getElementById("fourthShip");}
      else if(i == 4) {ship = document.getElementById("fifthShip");}
      if(player == 1)
			{
				if(playerOneShips[i][2])
				{
					ship.style.left = (posB[0] + (playerOneShips[i][0])*56) + "px";
					ship.style.top = (posB[1] + (playerOneShips[i][1]) *62)  + "px";
					ship.style.transform = "rotate(0deg)";
				}
				else
				{
					ship.style.left = (posB[0] + ((playerOneShips[i][0])*56)-(i)*28) + "px";
					ship.style.top = (posB[1] + ((playerOneShips[i][1])*62)+(i)*31)   + "px";
					ship.style.transform = "rotate(90deg)";
				}
				ship.style.visibility = "visible";
			}
			else
			{
				if(playerTwoShips[i][2])
				{
					ship.style.left = (posB[0] + (playerTwoShips[i][0])*56) + "px";
					ship.style.top = (posB[1] + (playerTwoShips[i][1]) *62)  + "px";
					ship.style.transform = "rotate(0deg)";
				}
				else
				{
					ship.style.left = (posB[0] + ((playerTwoShips[i][0])*56)-((i)*28)) + "px";
					ship.style.top = (posB[1] + ((playerTwoShips[i][1]) *62)+(i)*31)   + "px";
					ship.style.transform = "rotate(90deg)";
				}
				ship.style.visibility = "visible";
			}
    }
  }
  else
  {
      document.getElementById("firstShip").style.visibility = "hidden";
      document.getElementById("secondShip").style.visibility = "hidden";
      document.getElementById("thirdShip").style.visibility = "hidden";
      document.getElementById("fourthShip").style.visibility = "hidden";
      document.getElementById("fifthShip").style.visibility = "hidden";
  }
}

/**
* Hides the ships when the mouse is no longer over a cell during the placement
* of ships.
*/
function hideShip()
{
    if(placing && !placingFinished)
    {
      if(placingNum == 1)      {ship = document.getElementById("firstShip");}
      else if(placingNum == 2) {ship = document.getElementById("secondShip");}
      else if(placingNum == 3) {ship = document.getElementById("thirdShip");}
      else if(placingNum == 4) {ship = document.getElementById("fourthShip");}
      else if(placingNum == 5) {ship = document.getElementById("fifthShip");}
      ship.style.visibility = "hidden";
    }
}

/**
 * Toggle the direction of the ship placement between Horizontal and Vertical.
 */
function toggleDirection() {
    horizontal = !horizontal;

    let place_dir = "";
		if(!placingFinished)
		{
	    if (horizontal) {
	        place_dir = "Horizontally";
	    } else {
	        place_dir = "Vertically";
	    }
		}

    document.getElementById('toggleDir').innerHTML = 'Placing ' + place_dir;
}

/**
 * Place a ship on the given board based on length.
 *
 * @param {number} row The row of the board in which to place the ship
 * @param {number} col The column of the board in which to place the ship
 * @param {Array} board The board for the current player
 * @param {number} length The length of the ship to be placed
 * @param {bool} horizontal Flag to place ship horizontally or otherwise vertically
 * @returns {bool} Successfully placed ship.
 */
function placeShip(row, col, board, length, horizontal) {
    if (checkPlacement(row, col, board, length, horizontal)) {
        if(playerOneShips.length < numShips)
				{
					playerOneShips[length-1] = [col,row,horizontal];
					if(playerOneShips.length == numShips){placingFinished = true;}
				}
        else if(playerOneShips.length == numShips && playerTwoShips.length <= numShips)
        {
          playerTwoShips[length-1] = [col,row,horizontal];
          if(!placingFinished && placingNum == numShips)
					{
						placingFinished = true;
						playerTwoPlacementReady = false;
					}
        }
        for (i = 0; i < length; i++) {
            if (horizontal) {
                board[row][col + i] = "@" + length;
            } else {
                board[row + i][col] = "@" + length;
            }
        }
        if (isAI ==false || player == 1)
        {
            drawPlayerBoard(board);
        }
        return true;
    } else {
        return false;
    }
}

/**
 * Check if a ship can be placed at the given point on the board.
 *
 * @param {number} row The row of the board in which to place the ship
 * @param {number} col The column of the board in which to place the ship
 * @param {Array} board The board for the current player
 * @param {number} length The length of the ship to be placed
 * @param {bool} horizontal Flag to place ship horizontally or otherwise vertically
 * @returns {bool} Placement is valid.
 */
function checkPlacement(row, col, board, length, horizontal) {
    let valid = true;
    if (horizontal) {
        if (9 < (col + length)) {
            valid = false;
        }
        else {
            for (let i = 0; i < length; i++) {
                if (board[row][col + i] != "*") {
                    valid = false;
                    break;
                }
            }
        }
    } else {
        if (9 < (row + length)) {
            valid = false;
        }
        else {
            for (let i = 0; i < length; i++) {
                if (board[row + i][col] != "*") {
                    valid = false;
                    break;
                }
            }
        }
    }
    return valid;
}

/**
 * Initialize the player boards to their default empty values (*).
 */
function createBoards() {
    //console.log("the boards were created");
    for (i = 0; i < 9; i++) {
        board1[i] = [];
        board2[i] = [];
        for (j = 0; j < 9; j++) {
            board1[i][j] = "*";
            board2[i][j] = "*";
        }
    }
}

/**
 * Handle clicks on the boards in the HTML.
 *
 * @param {number} board_num The number of the board that was clicked.
 * @param {number} col The column that was clicked.
 * @param {number} row The row that was clicked.
 */
function clickCheck(board_num, col, row) {
    //console.log(board_num, row, col);
    if (placing && !waitForSwitch) {
        if (numShips == 0 || board_num !== 2) {
            // Have not selected number of ships or clicked wrong board
            return;
        }
        if (placingNum <= numShips) {
            if (placeShip(row - 1, col - 1, getBoard(), placingNum, horizontal)) {
                placingNum++;
            }
        }
        if (isAI==false)
        {
            if (placingNum > numShips) {
                document.getElementById('ready').style.display = 'none';
                if (player == 1) {
                    placingNum = 1;
                    waitForSwitch = true;
                } else {
                    placing = false;
                    waitForSwitch = true;
                    document.getElementById('toggleDir').style.display = 'none';
                }
            }
        }
        else
        {
            if (placingNum > numShips) {
                document.getElementById('ready').style.display = 'none';
                if (player == 1) {
                    placingNum = 1;
                    waitForSwitch = true;
                    //placing = true;
                    document.getElementById('toggleDir').style.display = 'none';

                }
            }
        }
        if (placing) {
            if (waitForSwitch) {
                document.getElementById('ships').innerHTML = 'Click Switch Players';
            } else {
                document.getElementById('ships').innerHTML = 'Place your ' + placingNum + '-length ship on your board';
            }
        } else {
            document.getElementById('ships').innerHTML = 'Click Switch Players';
        }
    }
    else if (board_num == 1 && !waitForSwitch) {
        waitForSwitch = checkForShip(row, col);
        document.getElementById('ready').style.display = 'none';
    }
}
/**
 * Randomly place ships for AI
 * @param {number} num The number of ships that need to be placed.
 */
function placeAIship(num)
{
    let length =placingNum;
    do
    {
        let row = 10;
        let col = 10;
        let hori = true;
        let orientation= 0;
        do{
            row = Math.floor(Math.random()*9)+1;
            col = Math.floor(Math.random()*9)+1;
            orientation =  Math.floor(Math.random()*2);
            if(orientation == 0)
            {
                hori= false;
            }
            else{
                hori =true;
            }
            //2 ship works 5 do not

        }while(!(checkPlacement(row-1, col-1, getBoard(), length, hori)));

        if (placeShip(row - 1, col - 1, getBoard(), placingNum, hori)) {
            placingNum++;
        }
    }while (placingNum <= numShips);
}
/**
 * Get the current player board or by number.
 *
 * @param {number} num The number of board to return. Returns current board if NaN.
 * @returns {Array} The board of the current player or passed number.
 */
function getBoard(num = NaN) {
    if (isNaN(num)) {
        num = player;
    }
    if (num === 1) {
        return board1;
    }
    else {
        return board2;
    }
}

/**
 * Check if the turn is over and then switch the current player.
 */
function switchPlayer() {
    if (waitForSwitch) {
        if(isAI==false)
        {
            if(placing && placingFinished)
            {
            playerTwoPlacementReady = true;
            placingFinished = false;
            }
            if (player == 1) {
                player = 2;
                hideBoards();
				hideBoardParticles();
				print("Hiding");
                drawGuessBoard(board1);
                drawPlayerBoard(board2);
                document.querySelector("#playersTurn").innerText = " It is now Player 2's turn! ";
            }
            else {
                player = 1;
                hideBoards();
				hideBoardParticles();
				print("Hiding");
                drawGuessBoard(board2);
                drawPlayerBoard(board1);
                document.querySelector("#playersTurn").innerText = " It is now Player 1's turn! ";
            }
            document.getElementById('ships').innerHTML = 'Click Ready';
            horizontal = true;
            waitForSwitch = false;
            document.getElementById('ready').style.display = 'inline-block';
            document.querySelector("#result").innerText = "  ";
        }
        else
        {
            if (player == 1) {
                player = 2;
                hideBoards();

                drawGuessBoard(board2);
                drawPlayerBoard(board1);
                document.querySelector("#playersTurn").innerText = " It is now Player 2's turn! ";
				hideBoardParticles();
				print("Hiding");
                if(placing)
                {
                    placeAIship(numShips);
                    placing=false;
                }
                else{
                    if(difficulty == "Easy")
                    {
                        handleEasy();
                    }
                    else if (difficulty == "Medium")
                    {
                        handleMedium();
                    }
                    else{
                        handleHard();
                    }
                }
                if(!checkForWinner())
                {
                    player = 1;
                    hideBoards();
                    drawGuessBoard(board2);
                    drawPlayerBoard(board1);
                    document.querySelector("#playersTurn").innerText = " It is now Player 1's turn! ";
					hideBoardParticles();
					print("Hiding");
                }
            }
            document.getElementById('ships').innerHTML = 'Click Ready';
            horizontal = true;
                    toggleDirection();
            waitForSwitch = false;
            document.getElementById('ready').style.display = 'inline-block';
            document.querySelector("#result").innerText = "  ";
        }
    }
    else {
        document.querySelector("#result").innerText = " Turn not finished! ";
                switchShips(true);
    }
    checkForWinner();
}
/**
 * Handles AI functionality when difficulty is Easy
 */
function handleEasy()
{
    let row = 0;
    let col = 0;
    do{
        row = Math.floor(Math.random()*9)+1;
        col = Math.floor(Math.random()*9)+1;
    }while(!(checkForShip(row, col)));
}

/**
 * Handles AI functionality when difficulty is Medium
*/
var pr = -1;
var pc = -1;

function handleMedium()
{
	if(pr == -1 && pc == -1)
	{
    guessed = false;
		while(!guessed)
		{
			pr = Math.floor(Math.random() * 9);
			pc = Math.floor(Math.random() * 9);
			if(checkForShip(pr+1, pc+1))
			{
        if(!board1[pr][pc].startsWith("H"))
        {
          pr = -1;
          pc = -1;
        }
        guessed = true;
			}
		}
	}
	else
	{
    //retrieve ship value from board and if not sunk, check surrounding squares. When sunk, reset pr and pc
    if(checkSunk(board1, board1[pr][pc][1])) //in the event the ship is sunk
		{
			pr = -1;
			pc = -1;
			handleMedium();
			return;
		}

		//these medium helper functions make use of the CheckForShip function, so we input the row and columns an integer larger
		if(mediumCheckLeft(pr+1,pc+1))
		{
			return;
		}
		if(mediumCheckRight(pr+1,pc+1))
		{
			return;
		}
		if(mediumCheckUp(pr+1,pc+1))
		{
			return;
		}
		if(mediumCheckDown(pr+1,pc+1))
		{
			return;
		}
	}
}


function mediumCheckLeft(r,c)
{
	if(c > 1)
	{
    if(checkForShip(r,c-1))
    {
      return true;
    }
    else
		{
			if(board1[r-1][c-2].startsWith("H"))
    	{
      	return mediumCheckLeft(r,c-1);
    	}
			else
			{
				return false;
			}
		}
	}
	else //c being 1 would be left side of board
	{
		return false;
	}
}

function mediumCheckRight(r,c)
{
	if(c < 8)
	{
		if(checkForShip(r,c+1))
  	{
    	return true;
  	}
  	else
		{
			if(board1[r-1][c].startsWith("H"))
  		{
    		return mediumCheckRight(r,c+1);
  		}
			else
			{
				return false;
			}
		}
	}
	else
	{
		return false;
	}
}

function mediumCheckUp(r,c)
{
  if(r > 1)
  {
		console.log(r);
		console.log(c);
    if(checkForShip(r-1,c))
    {
      return true;
    }
    else
		{
			if(board1[r-2][c-1].startsWith("H"))
    	{
      	return mediumCheckUp(r-1,c);
    	}
			else
			{
				return false;
			}
		}
  }
	else
	{
		return false;
	}
}

function mediumCheckDown(r,c)
{
  if(r < 9)
  {
    if(checkForShip(r+1,c))
    {
      return true;
    }
    else
		{
			if(board1[r][c-1].startsWith("H"))
    	{
      	return mediumCheckDown(r+1,c);
    	}
    	else
    	{
      	return false;
  		}
		}
	}
	else
	{
		return false;
	}
}

/**
 * Set the boards to visible.
 */
function drawBoards() {
	updateParticleVisibility();
	print("Updating");
    document.getElementsByClassName('grid-container boardA')[0].style.visibility = 'visible';
    document.getElementsByClassName('grid-container boardB')[0].style.visibility = 'visible';
    document.getElementsByClassName('boardSeparator')[0].style.visibility = 'visible';
    document.getElementsByClassName('boardSeparator')[1].style.visibility = 'visible';
    document.getElementById('switch').style.display = 'inline-block';
    document.getElementById('ready').style.display = 'none';

    if (placing) {
        document.getElementById('ships').innerHTML = 'Place your ' + placingNum + '-length ship on your board';
    } else {
        document.getElementById('ships').innerHTML = 'Choose where to shoot on enemy\'s board';
    }
		switchShips(true);
}

/**
 * Set the boards to invisible.
 */
function hideBoards() {
    document.getElementsByClassName('grid-container boardA')[0].style.visibility = 'hidden';
    document.getElementsByClassName('grid-container boardB')[0].style.visibility = 'hidden';
    document.getElementsByClassName('boardSeparator')[0].style.visibility = 'hidden';
    document.getElementsByClassName('boardSeparator')[1].style.visibility = 'hidden';
    document.getElementById('switch').style.display = 'none';
		switchShips(false);
}

/**
 * Draw the given player board to the guess board so that ships are hidden.
 *
 * @param {Array} newBoard The player board to be drawn
 */
function drawGuessBoard(newBoard) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            clearCellLabel(i + 1, j + 1, 'A');
            if (newBoard[i][j].startsWith('H')) {
                let shipNum = newBoard[i][j][1];
                if (checkSunk(newBoard, shipNum)) {
                    labelCell(i+1, j+1, shipNum, 'A');
                    colorCell('A', (i + 1), (j + 1), 'sunk');
                } else {
                    colorCell('A', (i + 1), (j + 1), 'red');
                }
            }
            else if (newBoard[i][j] == 'M') {
                colorCell('A', (i + 1), (j + 1), 'miss');
            }
            else {
                colorCell('A', (i + 1), (j + 1), 'empty');
            }
        }
    }
}


/**
 * Draw the given player board to the displayed player board so that ships are visible.
 *
 * @param {Array} newBoard The player board to be drawn
 */
function drawPlayerBoard(newBoard) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            clearCellLabel(i+1, j+1, 'B');
            if (newBoard[i][j].startsWith('H')) {
                let shipNum = newBoard[i][j][1];
                if (checkSunk(newBoard, shipNum)) {
                    colorCell('B', (i + 1), (j + 1), 'sunk');
                } else {
                    colorCell('B', (i + 1), (j + 1), 'red');
                }
                labelCell((i + 1), (j + 1), newBoard[i][j][1]);
            }
            else if (newBoard[i][j] == 'M') {
                colorCell('B', (i + 1), (j + 1), 'miss');
            }
            else if (newBoard[i][j].startsWith('@')) {
                colorCell('B', (i + 1), (j + 1), 'grey');
                labelCell((i + 1), (j + 1), newBoard[i][j][1]);
            }
            else {
                colorCell('B', (i + 1), (j + 1), 'empty');
            }

        }
    }
}


/**
 * Draw a ship's number to a cell.
 *
 * @param {number} row The row of the ship to label.
 * @param {number} col The column of the ship to label.
 * @param {string} shipNumber The ship's number.
 * @param {string} boardLetter The letter of the board to update.
 */
function labelCell(row, col, shipNumber, boardLetter='B') {
    document.getElementById(boardLetter + col + row).innerText = shipNumber;
}

/**
 * Label every ship of a given number.
 *
 * @param {Array} board The board to search for the shipNumber.
 * @param {string} shipNumber The ship's number.
 * @param {string} boardLetter The letter of the board to update.
 */
function labelShip(board, shipNumber, boardLetter='B') {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let value = board[i][j];
            if (value.startsWith('@') || value.startsWith('H')) {
                let num = board[i][j][1];
                if (num == shipNumber) {
                    document.getElementById(boardLetter + col + row).innerText = shipNumber;
                }
            }
        }
    }
}

/**
 * Clear the label for the given cell.
 *
 * @param {number} row The row of the label to clear.
 * @param {number} col The column of the label to clear.
 * @param {string} boardLetter The letter of the board to update.
 */
function clearCellLabel(row, col, boardLetter='B') {
    document.getElementById(boardLetter + col + row).innerText = "";
}

/**
 * Color a cell based on the given classification.
 *
 * @param {string} boardLetter The letter of the board to update ('A' or 'B')
 * @param {number} row The number of the row to color.
 * @param {number} col The number of the column to color.
 * @param {string} classification The class of object in the cell ('empty', 'miss', 'red', 'sunk', or 'grey')
 */
function colorCell(boardLetter, row, col, classification) {
    let cellId = boardLetter + col + row;
    for (cls of classifications) {
        document.getElementById(cellId).classList.remove(cls);
    }

    document.getElementById(cellId).classList.add(classification);
}


/**
 * Check if a given ship has been sunk on the given board.
 *
 * @param {Array} board The board to check for sunken ship.
 * @param {string} shipNum The number which identifies the ship to check for.
 * @returns {bool} Shipnum has been sunk on this board.
 */
function checkSunk(board, shipNum) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let value = board[i][j];
            if (value.startsWith("@")) {
                if (value[1] == shipNum) {
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * Check for a ship on the enemy's board at the given location and color the cell accordingly.
 *
 * @param {number} row The row to check.
 * @param {number} col The column to check.
 * @returns {bool} Spot was not already chosen.
 */
function checkForShip(row, col) {
    let board = board2;
    let otherBoard = board1;
    if (player == 2) {
        board = board1;
        otherBoard = board2;
    }

    if (board[row - 1][col - 1] == '*') {
        board[row - 1][col - 1] = 'M';
        document.querySelector("#result").innerText = " MISS ";
				playMissAnimation(col,row);
				splash(global, [gridCenter(gridRight[[col-1, row-1]])[0], gridCenter(gridRight[[col-1, row-1]])[1]-gridSize[0]/2]);
    }
    else if (board[row - 1][col - 1].startsWith('@')) {
        let shipNum = board[row - 1][col - 1][1];
        board[row - 1][col - 1] = 'H' + shipNum;
		ignite(boards[3-player]["left"], [gridCenter(gridLeft[[col-1, row-1]])[0], gridCenter(gridLeft[[col-1, row-1]])[1]-gridSize[0]/2]);
        if (checkSunk(board, shipNum)) {
            document.querySelector("#result").innerText = " SUNK! ";
						for(i = 0; i < numShips; i ++)
						{
							if(player == 2)
							{
								var colCheck = ((playerOneShips[i][0] <= (col-1)) && ((col-1) <= playerOneShips[i][0]+i));
								var rowCheck = ((playerOneShips[i][1] <= (row-1)) && ((row-1) <= playerOneShips[i][1]+i));
								if (colCheck && rowCheck)
								{
									// Weird bug sends wrong location?
									console.log("This is what i is : " + i);
									playSunkAnimation(playerOneShips[i][0],playerOneShips[i][1],(i+1),playerOneShips[i][2]);
									break;
								}
							}
							else
							{
								var colCheck = ((playerTwoShips[i][0] <= (col-1)) && ((col-1) <= playerTwoShips[i][0]+i));
								var rowCheck = ((playerTwoShips[i][1] <= (row-1)) && ((row-1) <= playerTwoShips[i][1]+i));
								if (colCheck && rowCheck)
								{
									playSunkAnimation(playerTwoShips[i][0],playerTwoShips[i][1],(i+1),playerTwoShips[i][2]);
									break;
								}
							}
						}
        } else {
            document.querySelector("#result").innerText = " HIT ";
						boom.play();
						playHitAnimation(col,row);
						explode(global, [gridCenter(gridRight[[col-1, row-1]])[0], gridCenter(gridRight[[col-1, row-1]])[1]-gridSize[1]/2]);
        }
    }
    else {
        document.querySelector("#result").innerText = " You have already guessed here, please try again. ";
				switchShips(true);
        return false;
    }
    drawGuessBoard(board);
    drawPlayerBoard(otherBoard);
    document.getElementById('ships').innerHTML = 'Click Switch Players';
		switchShips(true);
    return true;
}

/**
 * Check if all ships have been hit.
 * @returns {bool} Whether or not someone has won.
 */
function checkForWinner() {
    var won = false;
    var numH = 0;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (player == 1) {
                if (board1[i][j].startsWith('H')) {
                    numH++;
                }
            }
            if (player == 2) {
                if (board2[i][j].startsWith('H')) {
                    numH++;
                }
            }
        }
    }
    if (numShips == 1 && numH == 1) {
        won = true;
    }
    if (numShips == 2 && numH == 3) {
        won = true;
    }
    if (numShips == 3 && numH == 6) {
        won = true;
    }
    if (numShips == 4 && numH == 10) {
        won = true;
    }
    if (numShips == 5 && numH == 15) {
        won = true;
    }
    if (won) {
        let winner = 1;
        if (player == 1) {
            winner = 2;
        }
        gameOver = true;
        document.getElementById('ships').innerText = " Congrats! Player " + winner + " won! Refresh to play again. "
        document.querySelector("#playersTurn").innerText = "";
        hideBoards();
        document.getElementById('ready').style.display = 'none';
    }
    return won;
}

/**
 * Setup the game on page load.
 */
document.addEventListener("DOMContentLoaded", () => {
    createBoards();
});
