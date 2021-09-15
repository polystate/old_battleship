//Ship Factory Function

const Ship = (length,name) => {
    //Main attributes
    const shipBody = new Array(length).fill(true);
    const shipName = name;

    //Methods
    const getHit = (target) => {
        shipBody[target] = false;
    }
    const isSunk = () => {
        if(shipBody.every(target => !target)){
            return true;
        } else return false;
    }

    return { shipBody, shipName, getHit, isSunk };
}

module.exports = Ship;










