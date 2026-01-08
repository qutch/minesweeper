import { useState } from "react";

class GameTile {
    constructor(position, isBomb, isClicked) {
        this.position = position;
        this.isBomb = isBomb;
        this.isClicked = isClicked;
        this.neighbors = 0;
    }

    setNeighbors(num) {
        this.neighbors = num;
    }
}

function Tile({TileInstance}) {
    return (
        <button/>
    )
}