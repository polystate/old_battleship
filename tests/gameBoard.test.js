//Imports
const gameBoard = require('../js_code/gameBoard');
const Ship = require('../js_code/ship');

//Test Variables

const testOriginBoard = gameBoard(6);

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

function attackShip(arr,origin,name){
    for(let prop in arr){
        if(typeof(arr[prop]) === "string"){
            arr[prop] = JSON.parse(arr[prop]);
            if(arr[prop].shipName === name){
            arr[prop].shipLength = arr[prop].shipLength - 1;
            if(arr[prop].shipLength === 0) {
                arr.shipCount--;
            };
            arr[prop].shipBody = new Array(arr[prop].shipLength).fill(true);
            }
            arr[prop] = JSON.stringify(arr[prop]);
        }
    }
    arr[origin] = false;
    return arr;
}





//Tests

    describe('select origin point of ship and return array with a single ship object at that origin', () => {
       
        test('place ship of length-3 at origin-3 for player', () => {
              expect(testOriginBoard.shipOrigin(3,3,'Johnny')).toEqual(placeOrigin(testOriginBoard.gridArr,3,3));
        });
        test('place ship of length-5 at origin-50 for player', () => {
            expect(testOriginBoard.shipOrigin(5,50,'Omega')).toEqual(placeOrigin(testOriginBoard.gridArr,5,50));
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
            expect(testOriginBoard.placeShipVertical(3)).toEqual(shipPlacementVertical(testOriginBoard.gridArr,3,3,'Johnny'));
        })
        test('stretch ship of length-5 at origin-50 vertically', () => {
            expect(testOriginBoard.placeShipVertical(50)).toEqual(shipPlacementVertical(testOriginBoard.gridArr,5,50,'Omega'));
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
            testOriginBoard.shipOrigin(3,7,'Chuckie');
            expect(testOriginBoard.placeShipHorizontal(7)).toEqual(shipPlacementHorizontal(testOriginBoard.gridArr,3,7,'Chuckie'));
        })
        test('place ship of length-4 at origin-33 horizontally', () => {
            testOriginBoard.shipOrigin(4,33,"Octo");
            expect(testOriginBoard.placeShipHorizontal(33)).toEqual(shipPlacementHorizontal(testOriginBoard.gridArr,4,33,"Octo"));
        })
        test('place ship of length-2 at origin-18 horizontally', () => {
            testOriginBoard.shipOrigin(2,18,"Deuce");
            expect(testOriginBoard.placeShipHorizontal(18)).toEqual(shipPlacementHorizontal(testOriginBoard.gridArr,2,18,"Deuce"));
            
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
        })
    })


    describe('place a ship at certain position and give it a name as well', () => {
        test('give the name [Courier] to ship placed at origin 27 with length of 3 horizontally', () => {
            testOriginBoard.shipOrigin(3,27,'Courier');
            expect(testOriginBoard.placeShipHorizontal(27)).toEqual(shipPlacementHorizontal(testOriginBoard.gridArr,3,27,'Courier'))
        })
    })

    describe('receiveAttack function takes a position on the array, and if a Ship object is present there, it should send a hit function to the correct ship based on its name, or record the coordinates of the missed shot and log that it missed, it should also mark the missed shot with[null] or something at the proper array origin to keep tabs', () => {
        test('receiveAttack receives origin 0 and tells us there is no ship there and that it missed, marking [null] on origin 0 in gridArr', () => {
            let testOriginBoardClone = JSON.parse(JSON.stringify(testOriginBoard));
            testOriginBoardClone.gridArr[0] = null;
            expect(testOriginBoard.receiveAttack(0)).toEqual(testOriginBoardClone.gridArr);
            testOriginBoardClone.gridArr[63] = null;
            expect(testOriginBoard.receiveAttack(63)).toEqual(testOriginBoardClone.gridArr);
        })
        test('receiveAttack receives origin 7 and shipName Chuckie and tells us there is a ship of length 3 there and that it has hit, marking origin 7 as [false] and getting rid of the ship Obj that was there', () => {
            let testOriginBoardClone = JSON.parse(JSON.stringify(testOriginBoard));
            testOriginBoardClone.gridArr[7] = false;
            testOriginBoardClone.gridArr[8] = JSON.stringify({"shipBody":[true,true],"shipLength":2,"shipName":"Chuckie","shipOrigin":7});
            testOriginBoardClone.gridArr[9] = JSON.stringify({"shipBody":[true,true],"shipLength":2,"shipName":"Chuckie","shipOrigin":7});
            expect(testOriginBoard.receiveAttack(7,"Chuckie")).toEqual(testOriginBoardClone.gridArr);
        })
        test('receiveAttack receives origin 9 and shipName Chuckie and tells us there is a ship of length 2 there (same ship as previous but now has length 2) marking origin 9 as [false] and getting rid of ship Obj that was there', () => {
            let testOriginBoardClone = JSON.parse(JSON.stringify(testOriginBoard));
            testOriginBoardClone.gridArr[7] = false;
            testOriginBoardClone.gridArr[8] = JSON.stringify({"shipBody":[true],"shipLength":1,"shipName":"Chuckie","shipOrigin":7});
            testOriginBoardClone.gridArr[9] = false;
            expect(testOriginBoard.receiveAttack(9,"Chuckie")).toEqual(testOriginBoardClone.gridArr);
        })
        test('receiveAttack receives origin 8 and kills shipName Chuckie as his shipLength moves to 0, leaving {status: ShipName has died!} behind. Our test gameBoard() should have 6 ships placed on it before Chuckie was killed and our gameBoards shipCount should now read as 5', () => {
            let testOriginBoardClone = JSON.parse(JSON.stringify(testOriginBoard));
            // const shipDeathName = JSON.parse(testOriginBoardClone.gridArr[8]).shipName;
            testOriginBoardClone.gridArr[7] = false;
            testOriginBoardClone.gridArr[8] = false;
            testOriginBoardClone.gridArr[9] = false;
            expect(testOriginBoard.receiveAttack(8,"Chuckie")).toEqual(testOriginBoardClone.gridArr);
            expect(testOriginBoard.getShipCount()).toBe(5);
            
            testOriginBoardClone.gridArr[3] = JSON.stringify({"shipBody":[true,true],"shipLength":2,"shipName":"Johnny","shipOrigin":3});
            testOriginBoardClone.gridArr[13] = false;
            testOriginBoardClone.gridArr[23] = JSON.stringify({"shipBody":[true,true],"shipLength":2,"shipName":"Johnny","shipOrigin":3});
            expect(testOriginBoard.receiveAttack(13,"Johnny")).toEqual(testOriginBoardClone.gridArr);
            testOriginBoardClone.gridArr[3] = JSON.stringify({"shipBody":[true],"shipLength":1,"shipName":"Johnny","shipOrigin":3});
            testOriginBoardClone.gridArr[13] = false;
            testOriginBoardClone.gridArr[23] = false;
            expect(testOriginBoard.receiveAttack(23,"Johnny")).toEqual(testOriginBoardClone.gridArr);
            testOriginBoardClone.gridArr[3] = false;
            testOriginBoardClone.gridArr[13] = false;
            testOriginBoardClone.gridArr[23] = false;
            expect(testOriginBoard.receiveAttack(3,"Johnny")).toEqual(testOriginBoardClone.gridArr);
            expect(testOriginBoard.getShipCount()).toBe(4);
            
        })
    })

    describe('firing a shot at a place you already fired - [null] or a ship obj place that was previously destroyed - [false] should return undefined and nothing should happen', () => {
        test('firing a shot at origin-23 returns undefined because a previous ship obj was already destroyed there -[false]', () => {
            expect(testOriginBoard.receiveAttack(23)).toBe(undefined);
            expect(testOriginBoard.receiveAttack(3)).toBe(undefined);
        })
        test('firing a shot at origin 63 - [null], which was a place that was already fired, should return undefined and nothing should happen', () => {
            expect(testOriginBoard.receiveAttack(63)).toBe(undefined);
            expect(testOriginBoard.receiveAttack(0)).toBe(undefined);
        })
    })

    describe('if all of the gameBoard ships are destroyed it will report it back', () => {
        test('use loop to destroy all of the ships on our real array', () => {
            for(let i = 50; i <= 90; i+=10){
            testOriginBoard.receiveAttack(i,'Omega');
            }
            expect(testOriginBoard.getShipCount()).toBe(3);
            for(let i = 27; i <= 29; i++){
                testOriginBoard.receiveAttack(i,'Courier');
            }
            expect(testOriginBoard.getShipCount()).toBe(2);
            expect(testOriginBoard.isGameOver()).toBe(false);
            for(let i = 33; i <= 36; i++){
                testOriginBoard.receiveAttack(i,'Octo');
            }
            expect(testOriginBoard.getShipCount()).toBe(1);
            testOriginBoard.receiveAttack(18,"Deuce");
            testOriginBoard.receiveAttack(19,"Deuce");
            expect(testOriginBoard.getShipCount()).toBe(0);
            expect(testOriginBoard.isGameOver()).toBe(true);
        })
    })

    