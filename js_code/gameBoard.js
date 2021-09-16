const Ship = require('./ship');

//Game Board Factory Function

const gameBoard = () => {
    const gridArr = Array.from({length: 100}, (value, key) => key);
    
    const shipOrigin = (arr,length,origin,name) => {
        arr[origin] = JSON.stringify(Ship(length,name,origin));
        return arr;
    }

    const placeShipVertical = (arr,origin) => {
        const length = JSON.parse(arr[origin]).shipLength;
        if((origin - 1) + (length * 10) > 99) return;
        for(let i = 10; i < length * 10; i+=10){
            arr[origin + i] = arr[origin];
        }
        return arr;
    }

    const placeShipHorizontal = (arr,origin) => {
        const length = JSON.parse(arr[origin]).shipLength;
        if(origin + (length-1) > rowEdgeCase(origin)) return;
        for(let i = 1; i < length; i++){
        arr[origin + i] = arr[origin];
        }
        return arr;
    }

    const rowEdgeCase = (origin) => {
        let edgecases = [9,19,29,39,49,59,69,79,89,99];
        edgecases = edgecases.filter(edgecase => edgecase - origin <= 9);
        edgecases = edgecases[edgecases.length-1];
        return edgecases;
    }
    

    return { gridArr, shipOrigin, placeShipVertical, placeShipHorizontal };
}

module.exports = gameBoard;