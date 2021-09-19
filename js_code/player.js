// const Ship = require('./ship');
// const gameBoard = require('./gameBoard');



//Factory Function

const Player = (ships) => {
    const myBoard = gameBoard(ships);
    
    const attackEnemy = (enemy,origin) => {
        return enemy.myBoard.receiveAttack(origin);
    }

    let indices = Array.from({length: 100}, (value, key) => key);

    const randomAttack = (enemy) => {
        let randIndex = indices[Math.floor(Math.random() * indices.length)];
        indices.splice(indices.indexOf(randIndex),1);
        return enemy.myBoard.receiveAttack(randIndex);
    }
    return { myBoard, attackEnemy, randomAttack };
}



// module.exports = Player;

//Test manually

// let compBoard = Player(5);
// compBoard.myBoard.placeShipsRandom();

// let playerBoard = Player(5);
// playerBoard.myBoard.playerPlaceShip(5,20,'Carrier','horizontal');
// playerBoard.myBoard.playerPlaceShip(5,20,'dsfg','horizontal');
// playerBoard.myBoard.playerPlaceShip(3,0,'dsdsfgfg','vertical');
// playerBoard.myBoard.playerPlaceShip(3,8,'dshdsfgfg','horizontal');
// playerBoard.myBoard.playerPlaceShip(2,90,'dshdsfgfg','vertical');
// playerBoard.myBoard.playerPlaceShip(2,90,'dshdsfgfg','vertical');
// playerBoard.myBoard.playerPlaceShip(4,38,'Battleship','vertical');
// playerBoard.myBoard.playerPlaceShip(3,78,'Destroyer','horizontal');
// playerBoard.myBoard.playerPlaceShip(3,75,'Destroyer','horizontal');
// playerBoard.myBoard.playerPlaceShip(3,38,'Destfroyer','vertical');
// playerBoard.myBoard.playerPlaceShip(3,0,'Submarine','horizontal');
// playerBoard.myBoard.playerPlaceShip(2,0,'Submdfarine','vertical');
// playerBoard.myBoard.playerPlaceShip(3,98,'Subdmdfarine','horizontal');
// playerBoard.myBoard.playerPlaceShip(2,88,'Patrol Boat','horizontal');


// playerBoard.attackEnemy(compBoard,5);

// for(let i = 0; i < 100; i++){
//     playerBoard.attackEnemy(compBoard,i);
//     compBoard.attackEnemy(playerBoard,i);
//     // if(playerBoard.myBoard.isGameOver() || compBoard.myBoard.isGameOver()){
//     //     break;
//     // }
//     if(playerBoard.myBoard.isGameOver()){
//         console.log(`Computer wins. Computer had ${compBoard.myBoard.getCurrentCount()} ships remaining.`);
//         break;
//     } else if(compBoard.myBoard.isGameOver()){
//         console.log(`Player wins. Player had ${playerBoard.myBoard.getCurrentCount()} ships remaining.`);
//         break;
//     }
// }

// console.table(playerBoard.myBoard.gridArr);
// console.table(compBoard.myBoard.gridArr);


// console.table(playerBoard.myBoard.gridArr);

// for(let i = 0; i < 5; i++){
//     compBoard.randomAttack(playerBoard);
// }

// console.table(playerBoard.myBoard.gridArr);








