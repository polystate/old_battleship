//Imports
const gameBoard = require('../js_code/gameBoard');
const Ship = require('../js_code/ship');

//Helper functions for tests

function placeOrigin(length,origin,name){
    const playerGrid = gameBoard().gridArr;
    playerGrid[origin] = JSON.stringify(Ship(length,name,origin));
    return playerGrid;
}

function shipPlacementVertical(length,origin,name){
    let gridArr = gameBoard().gridArr;
    gridArr[origin] = JSON.stringify(Ship(length,name,origin));
    if((origin - 1) + (length * 10) > 99) return;
    for(let i = 10; i < length*10; i+=10){
        gridArr[origin + i] = gridArr[origin];
    }
    return gridArr;
}

function shipPlacementHorizontal(length,origin,name){
    let gridArr = gameBoard().gridArr;
    gridArr[origin] = JSON.stringify(Ship(length,name,origin));
    for(let i = 1; i < length; i++){
        gridArr[origin + i] = gridArr[origin];
        }
    return gridArr;
}

//Tests

    describe('select origin point of ship and return array with a single ship object at that origin', () => {
        test('place ship of length-1 at origin-3 for player', () => {
              expect(gameBoard().shipOrigin(gameBoard().gridArr,1,3)).toEqual(placeOrigin(1,3));
        });
        test('place ship of length-5 at origin-50 for player', () => {
            expect(gameBoard().shipOrigin(gameBoard().gridArr,5,50)).toEqual(placeOrigin(5,50));
      });
    })



    
    describe('{actually place} ship on origin with vertical alignment and length and return array', () => {
        test('place ship of length-3 at origin-8 vertically', () => {
            expect(gameBoard().placeShipVertical(gameBoard().shipOrigin(gameBoard().gridArr,3,8),8)).toEqual(shipPlacementVertical(3,8));
        })
        test('place ship of length-5 at origin-26 vertically', () => {
            expect(gameBoard().placeShipVertical(gameBoard().shipOrigin(gameBoard().gridArr,5,26),26)).toEqual(shipPlacementVertical(5,26));
        })
        test(`place ship of length-3 at origin 80 vertical should return undefined and nothing should happen because it is out of bounds`, () => {
            expect(gameBoard().placeShipVertical(gameBoard().shipOrigin(gameBoard().gridArr,3,80),80)).toEqual(undefined);
            expect(gameBoard().placeShipVertical(gameBoard().shipOrigin(gameBoard().gridArr,11,0),0)).toEqual(undefined);
            expect(gameBoard().placeShipVertical(gameBoard().shipOrigin(gameBoard().gridArr,2,90),90)).toEqual(undefined);
            expect(gameBoard().placeShipVertical(gameBoard().shipOrigin(gameBoard().gridArr,5,50),50)).not.toEqual(undefined);
            expect(gameBoard().placeShipVertical(gameBoard().shipOrigin(gameBoard().gridArr,10,0),0)).not.toEqual(undefined);
        })
    })

    

    describe('{actually place} ship on origin with horizontal alignment and length and return array', () => {
        test('place ship of length-4 at origin-2 horizontally', () => {
            
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,4,2),2)).toEqual(shipPlacementHorizontal(4,2));
        })
        test('place ship of length-2 at origin-10 horizontally', () => {
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,2,10),10)).toEqual(shipPlacementHorizontal(2,10));
        })
        test('place ship of length-10 at origin-20 horizontally', () => {
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,10,20),20)).toEqual(shipPlacementHorizontal(10,20));
        })
        test('any ship who exceeds the horizontal edgecases of any multiple of 9 to 99 [i.e. 9 for first origin row, 19 for second origin row, 29 for third origin row, etc.] has gone out of bounds horizontally and it should return undefined', () => {
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,8,6),6)).toEqual(undefined);
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,5,6),6)).toEqual(undefined);
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,3,6),6)).not.toEqual(undefined);
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,6,95),95)).toEqual(undefined);
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,5,25),25)).not.toEqual(undefined);
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,11,0),0)).toEqual(undefined);
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,1,59),59)).not.toEqual(undefined);
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,2,59),59)).toEqual(undefined);
        })
    })


    describe('place a ship at certain position and give it a name as well', () => {
        test('give the name [Courier] to ship placed at origin 12 with length of 3 horizontally', () => {
            expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,3,12,'Courier'),12,'horizontal','Courier')).toEqual(shipPlacementHorizontal(3,12,'Courier'));
        })
    })
    

    










