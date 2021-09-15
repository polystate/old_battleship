// const renderGame = () => {
//     const body = document.querySelector("body");
//     const shipChoice = document.createElement("div");
//     shipChoice.setAttribute("id","shipchoice");
//     const mainGameplay = document.createElement("div");
//     mainGameplay.setAttribute("id","maingameplay");
//     body.appendChild(shipChoice);
//     body.appendChild(mainGameplay);
    
//     //Create Board Grids
//     const createPlayerGrid = (id) => {
//         const playerGrid = document.createElement("div");
//         playerGrid.setAttribute("id",id);
//         playerGrid.setAttribute("class","gamegrid");
//         mainGameplay.appendChild(playerGrid);
//         for(let i = 0; i < 100; i++){
//         const square = document.createElement("div");
//         square.setAttribute("class",`square square-${id[1]}`);
//         square.setAttribute("id",`${id[1]}-${i}`);
//         playerGrid.appendChild(square);
//     }
//     }
//     createPlayerGrid("p1grid");
//     createPlayerGrid("p2grid");

// }

// //Render page IIFE

// const renderPage = (() => {
//     renderGame();

// })();

// module.exports = renderGame;