const displayHTML = () => {
    const displayShipChoices = () => {
        const choices = ['Carrier Fleet','Battleship Fleet','Destroyer Fleet','Submarine Fleet','Patrol Fleet'];

        
        
        const createImg = (amount, orientation, className) => {
            let images = [];
            let display;
            (orientation === "vertical") ? display = "block" : display = "inline"; 
            for(let i = 0; i < amount; i++){
                images.push(`<img class='${className} choices' draggable='false' src='ship.png' style='display: ${display}';>`);
            }
            return images.join('');
        }

        const shipParts = [createImg(5,"horizontal",'carrier'),createImg(4,"horizontal",'battleship'),createImg(3,"horizontal",'destroyer'),createImg(3,"horizontal",'submarine'),createImg(2,"horizontal",'patrol-boat')];

        for(let i = 0; i < shipParts.length; i++){
            const ship = document.createElement("div");
            const shipIcons = document.createElement("div");
            ship.setAttribute("class", "shipChoice");
            ship.setAttribute("id", "ship-" + i);
            
            ship.innerHTML = choices[i] + "<br>" + `${shipParts[i]}`;
            ship.style = "cursor: ns-resize";
            
            dragShips.appendChild(ship);
            dragShips.appendChild(shipIcons);
        }
    }

    const body = document.querySelector("body");
    const decoration = document.createElement("div");
    decoration.setAttribute("id","decoration");
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
    body.appendChild(decoration);
    displayShipChoices();
    body.appendChild(dragShips);
    body.appendChild(playerTitles);
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
    const playerGrid = Player(5,"player");
    const choices = ['Carrier Fleet Length 5','Battleship Fleet Length 4','Destroyer Fleet Length 3','Submarine Fleet Length 3','Patrol Fleet Length 2'];
    let dragged;
    const ships = Array.from(document.getElementsByClassName('shipChoice'));
    const p1gridsquares = Array.from(document.getElementById("p1grid").childNodes);
    ships.forEach(ship => {
        ship.addEventListener('click',function(){
            const allShips = Array.from(document.getElementsByClassName("shipChoice"));
            allShips.forEach(ship => ship.style = "border: none");
            ship.style = "color: gold; font-weight: bolder; cursor: pointer";
            ship.setAttribute("draggable","true");
            const className = ship.childNodes[2].className.split(' ')[0];
            const shipIcons = Array.from(document.getElementsByClassName(className));
            shipIcons.forEach(icon => {
            icon.style.display === "inline" ? icon.style = "display: block; cursor: ew-resize" : icon.style = "display: inline; cursor: ns-resize";
            })
        })
        ship.addEventListener("dragstart",dragStart)
        // ship.addEventListener("drop", drop);
       
    })
    p1gridsquares.forEach(square => {
        square.addEventListener("dragover", dragOver);
        square.addEventListener("dragenter", dragEnter);
        square.addEventListener("dragleave", dragLeave);
        square.addEventListener("drop", drop);
    })

    function dragStart(event){
        event.target.style.opacity = .25;
        dragged = event.target;
        console.log(dragged);
        // setTimeout(() => {
        //     e.target.style = "display: none";
        // }, 1000);
        console.log(event.target.childNodes[2]);
        style = window.getComputedStyle(event.target.childNodes[2].display);
        event.dataTransfer.setData('text/plain', style);
    }

    function dragOver(event){
    event.preventDefault();
    // event.target.style = "background: url('ship.png')";
            // console.log(playerGrid.myBoard.playerPlaceShip);
            // playerPlaceShip = (length,origin,name,alignment)
            // playerGrid.myBoard.playerPlaceShip(length,squareNum,)
    }

    function dragEnter(event){
        console.log('entering ' + event.target.id)
    }

    function dragLeave(event){
        event.target.style = "background: url('water.png')";
    }

    function drop(event){
        console.log('dropped ' + event.target.id + ' ' + dragged.id);
        let alignment;
        console.log(event.dataTransfer.getData('text/plain'))
        currentDisplay = window.getComputedStyle(dragged).display;
        console.log(currentDisplay);
        if(currentDisplay == "block"){
            alignment = "vertical"
        } else if(currentDisplay == "inline"){
            alignment = "horizontal";
        }
        console.log(alignment);
        squareNum = event.target.id.substr(2);
        console.log(squareNum);
        shipPlaced = choices[dragged.id[dragged.id.length-1]].split(' ');
        console.log(shipPlaced);
        // playerGrid.myBoard.playerPlaceShip(Number(shipPlaced[shipPlaced.length-1]),squareNum,shipPlaced[0],alignment);
    }

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


