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
    createPlayerGrid("compgrid");

}

const connectBoards = () => {
    const p1DOMgrid = document.getElementById("p1grid");
    const compDOMgrid = document.getElementById("compgrid");
    const playerGrid = Player(5);
    const compGrid = Player(5);
    let changeTurn = true;
    compGrid.myBoard.placeShipsRandom();
    playerGrid.myBoard.placeShipsRandom();

    const syncBoard = (board,thisgrid,othergrid) => {
        board.childNodes.forEach(square => {
            square.addEventListener('click', function attackSquare(){
                let squareID = square.id.substr(square.id.indexOf('-') + 1);
                thisgrid.attackEnemy(othergrid, squareID);
                changeSquareColor(othergrid, square, squareID);
                square.removeEventListener('click',attackSquare);
            })
        })
    }

    const changeSquareColor = (board,square,squareID) => {
        if(board.myBoard.gridArr[squareID] === null){
            console.log(square);
            square.style = "background-color: black";
        } else if(board.myBoard.gridArr[squareID] === false){
            square.style = "background-color: green";
        } 
    }


    
    syncBoard(p1DOMgrid, compGrid, playerGrid);
    syncBoard(compDOMgrid, playerGrid, compGrid);

    

}

//Render page IIFE

const renderPage = (() => {
    displayHTML();
    connectBoards();

})();

// module.exports = renderGame;


