const Ship = require('./ship');

//Game Board Factory Function

const gameBoard = () => {
    const gridArr = Array.from({length: 100}, (value, key) => key);
    
    const shipOrigin = (arr,length,origin,name) => {
        arr[origin] = JSON.stringify(Ship(length,name));
        return arr;
    }

    const placeShip = (length,origin,alignment,name) => {
        const gridOrigin = shipOrigin(gridArr,length,origin,name);
        if(alignment === "vertical"){
            if((origin - 1) + (length * 10) > 99) return;
            for(let i = 10; i < length*10; i+=10){
                gridOrigin[origin + i] = gridOrigin[origin];
            }
        } else if(alignment === "horizontal"){
            const rowEdgeCase = () => {
                let edgecases = [9,19,29,39,49,59,69,79,89,99];
                edgecases = edgecases.filter(edgecase => edgecase - origin <= 9);
                edgecases = edgecases[edgecases.length-1];
                return edgecases;
            }
            if(origin + (length-1) > rowEdgeCase()){
                return;
            }
            for(let i = 1; i < length; i++){
            gridOrigin[origin + i] = gridOrigin[origin];
            }
        }
        return gridOrigin;
    }

    return { gridArr, shipOrigin, placeShip };
}

module.exports = gameBoard;