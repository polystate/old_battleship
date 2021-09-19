const Ship = require('./ship');
const gameBoard = require('./gameBoard');



//Factory Function

const Player = (ships) => {
    const myBoard = gameBoard(ships);
    
    // const myShips = [{shipName: 'Carrier', shipLength: 5}, {shipName: 'Battleship', shipLength: 4}, {shipName: 'Destroyer', shipLength: 3}, {shipName: 'Submarine', shipLength: 3}, {shipName: 'Patrol Boat', shipLength: 2}];

    

    const pickEnemyTarget = (enemy) => {
        
        return enemy;
    }

    
    
    
    return { myBoard, pickEnemyTarget };
}



module.exports = Player;