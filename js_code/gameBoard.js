const Ship = require('./ship');

//Game Board Factory Function

const gameBoard = (numships) => {
    const gridArr = Array.from({length: 100}, (value, key) => key);
    let shipCount = numships;
    
    const shipOrigin = (length,origin,name) => {
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
        return gridArr;
    }

    const rowEdgeCase = (origin) => {
        let edgecases = [9,19,29,39,49,59,69,79,89,99];
        edgecases = edgecases.filter(edgecase => edgecase - origin <= 9);
        edgecases = edgecases[edgecases.length-1];
        return edgecases;
    }

    const playerPlaceShip = (length,origin,name,alignment) => {
        shipOrigin(length,origin,name);
        if(alignment === "vertical"){
        placeShipVertical(origin);
        } else if(alignment === "horizontal") {
            placeShipHorizontal(origin);
        } else{
            console.log("neither of these were ran");
        }
        
    }

    const placeShipsRandom = () => {
        const alignments = ['vertical','horizontal'];
        const lengthArr = [5,4,3,3,2];
        const nameArr = ['Carrier','Battleship','Destroyer','Submarine','Patrol Boat'];
        count = 0;
        
        function placeOneShip(length,name){
            // if(count === 5) return;
            let randOrigin = Math.floor(Math.random()*100);
            let alignment = alignments[Math.floor(Math.random() * 2)];
            playerPlaceShip(length,randOrigin,name,alignment);
            // if(isNaN(gridArr[randOrigin])){
            //     count++;
            // } else {
            //     return placeOneShip(length,name);
            // }
            if(isNaN(gridArr[randOrigin])){
                return placeOneShip(length,name);
            } else count++;
            // if(typeof(gridArr[randOrigin]) === "string"){
            //     console.log(typeof(gridArr[randOrigin]));
            //     return placeOneShip(length,name);
            // } else if(typeof(gridArr[randOrigin]) === "number"){
            //     console.log(typeof(gridArr[randOrigin]));
            //     count++;
            // }
        }

        for(let i = 0; i < 5; i++){
            placeOneShip(lengthArr[i],nameArr[i]);
        }

        let currentShips = gridArr.filter(elem => typeof(elem) === "string");
        currentShips = new Set(currentShips);

        //Loop through your lengthArr, nameArr, etc.
        //Each loop, generate a random number 1, 100 for randOrigin
        //First loop-through should attempt to place 'Carrier', length of 5 with random alignment. 
        //If it succeeds, increment count++, if it fails, restart that particular instance of loop with 'Carrier' and length of 5 until it succeeds 
        //Once it succeeds it should keep going until all five ships are placed

        ///////

        //The main question of the bug is. Why is one of them running two times and we are getting 4 instead of 5 for our unique values? It's forcing itself to print one of them twice to complete the for(loop) for some reason

        //Possible explanation. There's a bug with our placeOrigin code. So basically we place a ship there, and if we place another ship there and if we attempt to put another ship there and it returns undefined, it being undefined interferes with our recursion somehow

       return {count, gridArr, currentShips};
    }

    const receiveAttack = (origin,name) => {
        if(gridArr[origin] === false || gridArr[origin] === null) return;
        if(!isNaN(gridArr[origin])){
            gridArr[origin] = null;
            return gridArr;
        }
        for(let prop in gridArr){
            if(typeof(gridArr[prop]) === "string"){
                gridArr[prop] = JSON.parse(gridArr[prop]);
                if(gridArr[prop].shipName === name){
                gridArr[prop].shipLength = gridArr[prop].shipLength - 1;
                if(gridArr[prop].shipLength === 0) {
                    shipCount--;
                };
                gridArr[prop].shipBody = new Array(gridArr[prop].shipLength).fill(true);
                }
                gridArr[prop] = JSON.stringify(gridArr[prop]);
            }
        }
        gridArr[origin] = false;
        return gridArr;
    }

    const getShipCount = () => {
        return shipCount;
    }

    const isGameOver = () => {
        return (!shipCount) ? true : false;
    }

    return { gridArr, getShipCount, shipOrigin, placeShipVertical, placeShipHorizontal, placeShipsRandom, receiveAttack, isGameOver };
}


module.exports = gameBoard;



//Array Symbol Map

//undefined being returned from a method or function means ship cannot be placed on array due to it overlapping with another ship object or it exceeding and going out of bounds with its length either vertically or horizontally, or it cannot fire a shot at a ship Obj that was already destroyed [false] or a place that was already misfired [null]
//  'null' being printed on array means that a shot was already fired there and that no ship was found. null represents missed fired attempts and cannot be fired on again since they were already attempted and no ship was there.
//   'false' being printed means that a ship obj was already there and has been destroyed, hence why [true, true] in Ship array representing its alive body parts. just like 'null' you cannot fire another shot at 'false.'
// if a ship dies, we should mark array with a falsey value, but something that's distinct from the of the values so we can easily do a gridArr element count and if that count for that element matches the amount of ships that the game started with then we know all of that player's ships have been sunk and the game is over.

//every time a ship is created shipCount++ for our gameBoard(). or we can use a getShipCount() method.





