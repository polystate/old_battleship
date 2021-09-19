// const Ship = require('./ship');

//Game Board Factory Function

const gameBoard = (numships) => {
    const gridArr = Array.from({length: 100}, (value, key) => key);
    let shipCount = numships;
    let shipObjCount = 17;
    let recurseCount = 0;
    
    const shipOrigin = (length,origin,name) => {
        if(gridArr[origin] === undefined) return;
        if(isNaN(gridArr[origin])) return;
        gridArr[origin] = JSON.stringify(Ship(length,name,origin));
        return gridArr;
    }

    const placeShipVertical = (origin) => {

        if(!isNaN(gridArr[origin])){
            return;
        } 
        const length = JSON.parse(gridArr[origin]).shipLength;
        if((origin - 1) + (length * 10) > 99){
            gridArr[origin] = origin;
            return;
        } 
        for(let i = 10; i < length * 10; i+=10){
            if(isNaN(gridArr[origin + i])){
                gridArr[origin] = origin;
                return;
            } 
        }
        for(let i = 10; i < length * 10; i+=10){
            gridArr[origin + i] = gridArr[origin];
        }
        recurseCount++;
        return gridArr;
    }

    const placeShipHorizontal = (origin) => {
        if(!isNaN(gridArr[origin])) return;
        const length = JSON.parse(gridArr[origin]).shipLength;
        if(origin + (length-1) > rowEdgeCase(origin)){
            gridArr[origin] = origin;
            return;
        } 
        for(let i = 1; i < length; i++){
            if(isNaN(gridArr[origin + i])){
                gridArr[origin] = origin;
                return;
            } 
        }
        for(let i = 1; i < length; i++){
        gridArr[origin + i] = gridArr[origin];
        }
        recurseCount++;
        return gridArr;
    }

    const rowEdgeCase = (origin) => {
        let edgecases = [9,19,29,39,49,59,69,79,89,99];
        edgecases = edgecases.filter(edgecase => edgecase - origin <= 9);
        edgecases = edgecases[edgecases.length-1];
        return edgecases;
    }

    const playerPlaceShip = (length,origin,name,alignment) => {
        if(!shipOrigin(length,origin,name)) return;
        shipOrigin(length,origin,name);
        if(alignment === "vertical"){
        placeShipVertical(origin);
        } else if(alignment === "horizontal") {
            placeShipHorizontal(origin);
        } 
    };

    const placeShipsRandom = () => {
        const alignments = ['vertical','horizontal'];
        const lengthArr = [5, 4, 3, 3, 2];
        const nameArr = ['Carrier','Battleship','Destroyer','Submarine','Patrol Boat'];
        
        function placeOneShip(){
            let randAlignment = Math.floor(Math.random() * alignments.length);
            let unselectedOrigins = gridArr.filter(elem => typeof(elem) === "number");
            let randOrigin = unselectedOrigins[Math.floor(Math.random() * unselectedOrigins.length)];
            
            playerPlaceShip(lengthArr[recurseCount],randOrigin,nameArr[recurseCount],alignments[randAlignment]);
            
            if(recurseCount < 5){
                placeOneShip()
            }
        }

        placeOneShip();

        let currentShips = gridArr.filter(elem => typeof(elem) === "string");
        currentShips = new Set(currentShips);
        console.log(currentShips);
        // console.log(gridArr);
        

       return { gridArr, currentShips, recurseCount };
    };

    const receiveAttack = (origin,name) => {
        if(gridArr[origin] === false || gridArr[origin] === null) return;
        if(!isNaN(gridArr[origin])){
            gridArr[origin] = null;
            return gridArr;
        }
        for(let prop in gridArr){
            if(typeof(gridArr[prop]) === "string"){
                gridArr[prop] = JSON.parse(gridArr[prop]);
                name = gridArr[prop].shipName;
                if(gridArr[prop].shipName === name){
                gridArr[prop].shipLength = gridArr[prop].shipLength - 1;
                if(gridArr[prop].shipLength === 0) {
                    shipCount--;
                };
                }
                gridArr[prop] = JSON.stringify(gridArr[prop]);
            }
        }
        gridArr[origin] = false;
        shipObjCount--;
        return gridArr;
    }

    const getShipCount = () => {
        return shipCount;
    }

    const getCurrentCount = () => {
        return shipObjCount;
    }

    const isGameOver = () => {
        return (!getCurrentCount()) ? true : false;
    }

    return { gridArr, recurseCount, shipCount, getShipCount, shipOrigin, placeShipVertical, placeShipHorizontal, placeShipsRandom, receiveAttack, isGameOver, playerPlaceShip, getCurrentCount };
}


// module.exports = gameBoard;



//Array Symbol Map

//undefined being returned from a method or function means ship cannot be placed on array due to it overlapping with another ship object or it exceeding and going out of bounds with its length either vertically or horizontally, or it cannot fire a shot at a ship Obj that was already destroyed [false] or a place that was already misfired [null]
//  'null' being printed on array means that a shot was already fired there and that no ship was found. null represents missed fired attempts and cannot be fired on again since they were already attempted and no ship was there.
//   'false' being printed means that a ship obj was already there and has been destroyed, hence why [true, true] in Ship array representing its alive body parts. just like 'null' you cannot fire another shot at 'false.'
// if a ship dies, we should mark array with a falsey value, but something that's distinct from the of the values so we can easily do a gridArr element count and if that count for that element matches the amount of ships that the game started with then we know all of that player's ships have been sunk and the game is over.

//every time a ship is created shipCount++ for our gameBoard(). or we can use a getShipCount() method.





