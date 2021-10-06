const displayHTML = () => {
    const body = document.querySelector("body");
    const shipChoice = document.createElement("div");
    shipChoice.setAttribute("id","shipchoice");
    const mainGameplay = document.createElement("div");
    mainGameplay.setAttribute("id","maingameplay");
    const playerTitles = document.createElement("div");
    playerTitles.setAttribute("id","playerTitles");
    const dragShips = document.createElement("div");
    dragShips.setAttribute("id","dragShips");
    const playerTitle = document.createElement("p");
    const computerTitle = document.createElement('p');
    playerTitle.setAttribute("id","playerTitle");
    computerTitle.setAttribute("id","computerTitle");
    playerTitle.innerText = "Your Board";
    computerTitle.innerText = "Computer Board";
    playerTitles.appendChild(playerTitle);
    playerTitles.appendChild(computerTitle);
    body.appendChild(shipChoice);
    body.appendChild(playerTitles);
    body.appendChild(dragShips);
    body.appendChild(mainGameplay);
    
    
    //Create Board Grids
    const createPlayerGrid = (id) => {
        const playerGrid = document.createElement("div");
        playerGrid.setAttribute("id",id);
        playerGrid.setAttribute("class","gamegrid");
        mainGameplay.appendChild(playerGrid);
        for(let i = 0; i < 100; i++){
        const square = document.createElement("div");
        square.setAttribute("class",`square square-${id[1]}`);
        square.setAttribute("id",`${id[1]}-${i}`);
        playerGrid.appendChild(square);
    }
    }
    createPlayerGrid("p1grid");
    createPlayerGrid("p2grid");
}

const preGame = () => {

    return false;
}



const gamePlay = () => {
    const p1DOMgrid = document.getElementById("p1grid");
    const p2DOMgrid = document.getElementById("p2grid");
    const playerGrid = Player(5,"player");
    const player2Grid = Player(5,"computer","average");
    playerGrid.swapPlayerTurn();
    player2Grid.myBoard.placeShipsRandom();
    playerGrid.myBoard.placeShipsRandom();

    const syncBoard = (board,thisgrid,othergrid) => {
        board.childNodes.forEach(square => {
            square.addEventListener('click', function attackSquare(){
                if(thisgrid.getPlayerTurn() && thisgrid.playertype === "player"){
                    let squareID = square.id.substr(square.id.indexOf('-') + 1);
                    thisgrid.attackEnemy(othergrid, squareID);
                    changeSquareColor(othergrid, square, squareID);
                    square.removeEventListener('click',attackSquare);
                    thisgrid.swapPlayerTurn();
                    othergrid.swapPlayerTurn();
                    if(othergrid.myBoard.isGameOver()){
                        console.log("Computer has lost!");
                        stopGame("computer");
                    }
                    checkComputerTurn();
                } 
            })
        })
    }

    const changeSquareColor = (board,square,squareID) => {
        if(board.myBoard.gridArr[squareID] === null){
            square.style = "background-image: url('notfound.png'); background-repeat: no-repeat; background-size: cover; background-position: center center; background-color: black";
           
        } else if(board.myBoard.gridArr[squareID] === false){
            square.style = "background-image: url('ship.png'); background-repeat: no-repeat; background-size: cover; background-position: center center;";
        } 
    }

    const checkComputerTurn = () => {
    if(player2Grid.getPlayerTurn() && player2Grid.playertype === "computer"){
        let squareID = player2Grid.randomAttack(playerGrid);
        changeSquareColor(playerGrid,p1DOMgrid.childNodes[squareID],squareID);
        playerGrid.swapPlayerTurn();
        player2Grid.swapPlayerTurn();
    }
    
    if(playerGrid.myBoard.isGameOver()){
        console.log("Player 1 has lost!");
        stopGame("player1");
    }
    }

    const stopGame = (whoLost) => {
        playerTitle = document.getElementById("playerTitle");
        computerTitle = document.getElementById("computerTitle");
        if(whoLost === "player1"){
            computerTitle.style = "color: green";
            playerTitle.style = "color: red";
            computerTitle.innerText = "Computer wins!";
            playerTitle.innerText = "You lost!";
            p1DOMgrid.style = "pointer-events: none;";
            p2DOMgrid.style = "pointer-events: none; background-color: white";
        } else{
            computerTitle.style = "color: red";
            playerTitle.style = "color: green";
            playerTitle.innerText = "You win!";
            computerTitle.innerText = "Computer lost!";
            p1DOMgrid.style = "pointer-events: none; background-color: white";
            p2DOMgrid.style = "pointer-events: none;";
        }
    }

    syncBoard(p1DOMgrid, player2Grid, playerGrid);
    syncBoard(p2DOMgrid, playerGrid, player2Grid);

    return { stopGame };
}

//Render page IIFE

const renderPage = (() => {
    displayHTML();
    if(preGame()){
    gamePlay();
    }
})();

// module.exports = renderGame;


