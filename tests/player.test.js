//Imports
const Player = require('../js_code/player')
const gameBoard = require('../js_code/gameBoard');
const Ship = require('../js_code/ship');

//Variables
const mockComp = Player(5);
const mockPlayer = Player(5);

//Helper Functions
function playerPlaceShip(player,length,origin,name,alignment){
    player.myBoard.shipOrigin(length,origin,name);
    if(alignment === "vertical"){
    player.myBoard.placeShipVertical(origin);
    } else player.myBoard.placeShipHorizontal(origin);
}

//Tests

describe('Player factory function is created and each player gets their own separate gameBoard', () => {
    test('gameBoard initialized with player with zero ships on count', () => {
        expect(mockPlayer.myBoard.getShipCount()).toBe(5);
        expect(mockPlayer.pickEnemyTarget(2)).toBe(2);
    })
    test('Player should have access to enemy gameboard in one of arguments', () => {
        expect(mockPlayer.pickEnemyTarget(mockComp)).toEqual(mockComp);
        expect(mockPlayer.pickEnemyTarget(mockComp.myBoard.gridArr)).toEqual(mockComp.myBoard.gridArr);
    })
})

describe('Player should be able to place their five ships on the grid', () => {
        playerPlaceShip(mockPlayer,5,35,'Carrier','vertical');
        playerPlaceShip(mockPlayer,4,50,'Battleship','horizontal');
        playerPlaceShip(mockPlayer,3,1,'Destroyer','horizontal');
        playerPlaceShip(mockPlayer,3,7,'Submarine','vertical');
        playerPlaceShip(mockPlayer,2,23,'Patrol Boat','horizontal');
        expect(mockPlayer.myBoard.getShipCount()).toBe(5);
})

// describe('Player or computer should be able to place their five ships randomly on the grid... run test a bunch of times to make sure', () => {
//     test('Test', () => {
//     expect(mockComp.myBoard.recurseCount).toBe(0);
//     })
//     test('test 2', () => {
      

//     })
    
// })

// describe('Player or computer should be able to place their five ships randomly on the grid... run test a bunch of times to make sure', () => {
//     test
//     console.log(mockComp.myBoard.placeShipsRandom());
    
    
// })