import { PlayerShip } from "./Ship";

export type PlayerShipStrategy = {
    hasPotentialASW: (ship: PlayerShip) => boolean;
};

const DDStrategy: PlayerShipStrategy = {
    hasPotentialASW: (ship: PlayerShip) => {
        return isMasterAswPositive(ship);
    }
};

const CLStrategy: PlayerShipStrategy = {
    hasPotentialASW: (ship: PlayerShip) => {
        return isMasterAswPositive(ship);
    }
}

const CLTStrategy: PlayerShipStrategy = {
    hasPotentialASW: (ship: PlayerShip) => {
        return isMasterAswPositive(ship);
    }
}

const CAStrategy: PlayerShipStrategy = {
    hasPotentialASW: (ship: PlayerShip) => {
        return false;
    }
}

const BBStrategy: PlayerShipStrategy = {
    hasPotentialASW: (ship: PlayerShip) => {
        return false;
    }
}

const BBVStrategy: PlayerShipStrategy = {
    hasPotentialASW: (ship: PlayerShip) => {
        return false;
    }
}

/**
 * 艦の素の対潜値が1以上か判定して返す
 * @param ship 
 * @returns 
 */
function isMasterAswPositive(ship: PlayerShip): boolean {
    return ship.naked_status.asw >= 1;
}