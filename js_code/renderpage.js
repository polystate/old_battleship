const displayHTML = () => {
    const body = document.querySelector("body");
    const shipChoice = document.createElement("div");
    shipChoice.setAttribute("id","shipchoice");
    const mainGameplay = document.createElement("div");
    mainGameplay.setAttribute("id","maingameplay");
    body.appendChild(shipChoice);
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
                        stopGame();
                    }
                    checkComputerTurn();
                } 
            })
        })
    }

    const changeSquareColor = (board,square,squareID) => {
        if(board.myBoard.gridArr[squareID] === null){
            square.style = "background-color: black; opacity: 0.5";
        } else if(board.myBoard.gridArr[squareID] === false){
            square.style = "background-color: green; opacity: 0.75";
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
        stopGame();
    }
    }

    const stopGame = () => {
        p1DOMgrid.style = "pointer-events: none;"
        p2DOMgrid.style = "pointer-events: none;"
    }

    syncBoard(p1DOMgrid, player2Grid, playerGrid);
    syncBoard(p2DOMgrid, playerGrid, player2Grid);

    return { stopGame };
}

//Render page IIFE

const renderPage = (() => {
    displayHTML();
    gamePlay();
})();

// module.exports = renderGame;


