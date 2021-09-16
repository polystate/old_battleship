const Ship = require('./ship');

//Game Board Factory Function

const gameBoard = () => {
    const gridArr = Array.from({length: 100}, (value, key) => key);
    
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

    const receiveAttack = (origin) => {
        if(!isNaN(gridArr[origin])) return "It missed!";
        return `It has been hit!`
    }


    

    return { gridArr, shipOrigin, placeShipVertical, placeShipHorizontal, receiveAttack };
}


module.exports = gameBoard;
