//Imports
const gameBoard = require('../js_code/gameBoard');
const Ship = require('../js_code/ship');

//Helper functions for tests

function placeOrigin(arr,length,origin,name){
    arr[origin] = JSON.stringify(Ship(length,name,origin));
    return arr;
}

function shipPlacementVertical(arr,length,origin,name){
    arr[origin] = JSON.stringify(Ship(length,name,origin));
    if((origin - 1) + (length * 10) > 99) return;
    for(let i = 10; i < length*10; i+=10){
        arr[origin + i] = arr[origin];
    }
    return arr;
}

function shipPlacementHorizontal(arr,length,origin,name){
    arr[origin] = JSON.stringify(Ship(length,name,origin));
    for(let i = 1; i < length; i++){
        arr[origin + i] = arr[origin];
        }
    return arr;
}

//Test Variables
const testOriginBoard = gameBoard();



//Tests

    describe('select origin point of ship and return array with a single ship object at that origin', () => {
       
        test('place ship of length-3 at origin-3 for player', () => {
              expect(testOriginBoard.shipOrigin(3,3)).toEqual(placeOrigin(testOriginBoard.gridArr,3,3));
        });
        test('place ship of length-5 at origin-50 for player', () => {
            expect(testOriginBoard.shipOrigin(5,50)).toEqual(placeOrigin(testOriginBoard.gridArr,5,50));
      });
        test('placing ship on origin-3 returns undefined as there is already a ship there', () => {
            expect(testOriginBoard.shipOrigin(3,3)).toBe(undefined);
        })
        test('placing ship on origin-50 returns undefined as there is already a ship there', () => {
            expect(testOriginBoard.shipOrigin(5,50)).toBe(undefined);
        })
    })


    

    describe('{actually place} ship on origin with vertical alignment and length and return array', () => {
        test('stretch ship of length-3 at origin-3 vertically', () => {
            expect(testOriginBoard.placeShipVertical(3)).toEqual(shipPlacementVertical(testOriginBoard.gridArr,3,3));
        })
        test('stretch ship of length-5 at origin-50 vertically', () => {
            expect(testOriginBoard.placeShipVertical(50)).toEqual(shipPlacementVertical(testOriginBoard.gridArr,5,50));
        })
        // test('random tests', () => {
        //     testOriginBoard.shipOrigin(5,0);
            
        //     expect(testOriginBoard.placeShipVertical(0)).toEqual(shipPlacementVertical(testOriginBoard.gridArr,5,0));
        //     console.log(testOriginBoard);
            
        // })
        test(`place ship of length-3 at origin 85 vertical should return undefined and nothing should happen because it is out of bounds`, () => {
            testOriginBoard.shipOrigin(3,85);
            expect(testOriginBoard.placeShipVertical(85)).toEqual(undefined);
            testOriginBoard.shipOrigin(2,92);
            expect(testOriginBoard.placeShipVertical(92)).toEqual(undefined);
            testOriginBoard.shipOrigin(11,0);
            expect(testOriginBoard.placeShipVertical(0)).toEqual(undefined);
            testOriginBoard.shipOrigin(8,40);
            expect(testOriginBoard.placeShipVertical(40)).toEqual(undefined);
        })
        test('place ship of length-3 at origin 40 vertical should return undefined because it overlaps with a ship object that is already there', () => {
            testOriginBoard.shipOrigin(3,40);
            expect(testOriginBoard.placeShipVertical(40)).toEqual(undefined);
            testOriginBoard.shipOrigin(6,0);
            expect(testOriginBoard.placeShipVertical(0)).toEqual(undefined);
        })
    })

    

    describe('{actually place} ship on origin with horizontal alignment and length and return array', () => {
        test('place ship of length-3 at origin-7 horizontally', () => {
            testOriginBoard.shipOrigin(3,7);
            expect(testOriginBoard.placeShipHorizontal(7)).toEqual(shipPlacementHorizontal(testOriginBoard.gridArr,3,7));
        })
        test('place ship of length-4 at origin-33 horizontally', () => {
            testOriginBoard.shipOrigin(4,33);
            expect(testOriginBoard.placeShipHorizontal(33)).toEqual(shipPlacementHorizontal(testOriginBoard.gridArr,4,33));
        })
        test('place ship of length-2 at origin-18 horizontally', () => {
            testOriginBoard.shipOrigin(2,18);
            expect(testOriginBoard.placeShipHorizontal(18)).toEqual(shipPlacementHorizontal(testOriginBoard.gridArr,2,18));
            
        })
        test('any ship who exceeds the horizontal edgecases of any multiple of 9 to 99 [i.e. 9 for first origin row, 19 for second origin row, 29 for third origin row, etc.] has gone out of bounds horizontally and it should return undefined', () => {
           testOriginBoard.shipOrigin(3,28);
           expect(testOriginBoard.placeShipHorizontal(28)).toEqual(undefined);
           testOriginBoard.shipOrigin(2,99);
           expect(testOriginBoard.placeShipHorizontal(99)).toEqual(undefined);
           testOriginBoard.shipOrigin(4,37);
           expect(testOriginBoard.placeShipHorizontal(37)).toEqual(undefined);
           
        })
        test('any ship who is stretched horizontally and overlaps with another existing ship object should return undefined', () => {
            testOriginBoard.shipOrigin(3,31);
            expect(testOriginBoard.placeShipHorizontal(31)).toEqual(undefined);
            
            testOriginBoard.shipOrigin(4,20);
            expect(testOriginBoard.placeShipHorizontal(20)).toEqual(undefined);
            console.log(testOriginBoard);
        })
    })


    // describe('place a ship at certain position and give it a name as well', () => {
    //     test('give the name [Courier] to ship placed at origin 12 with length of 3 horizontally', () => {
    //         expect(gameBoard().placeShipHorizontal(gameBoard().shipOrigin(gameBoard().gridArr,3,12,'Courier'),12,'horizontal','Courier')).toEqual(shipPlacementHorizontal(3,12,'Courier'));
    //     })
    // })

    // describe('receiveAttack function takes a position on the array, and if a Ship object is present there, it should send a hit function to the correct ship based on its name, or record the coordinates of the missed shot and log that it missed', () => {
    //     test('receiveAttack receives origin 0 and tells us there is no ship there and that it missed', () => {
    //         expect(gameBoard().receiveAttack(gameBoard().gridArr,0)).toBe("It missed!");
    //     })
    //     test('receiveAttack receives origin 7 and tells us there is a ship of length 1 there and that it has hit', () => {
    //         expect(gameBoard().receiveAttack(gameBoard().shipOrigin(gameBoard().gridArr,1,7,'Courier'),7)).toBe(`It has been hit!`);
    //     })
    // })
