import { useState } from "react"
import "../src/game.css"


// TILE CLASS
class GameTile {
    constructor(position, isBomb, isClicked) {
        this.position = position;
        this.isBomb = isBomb;
        this.isClicked = isClicked;
        this.neighbors = 0;
        this.tileText = "";
    }
    
    setNeighbors(num) {
        this.neighbors = num;
    }

    setTileText(text) {
        this.tileText = text;
    }
}

const GRID_HEIGHT = 10;
const GRID_WIDTH = 10;
const TILES = [];
for (let y = 0; y < GRID_HEIGHT; y++) {
    var ROW = [];
    for (let x = 0; x < GRID_WIDTH; x++) {

        // Logic to see if bomb or not
        let bombStatus
        if (Math.random() > 0.8) {
            bombStatus = true
        } else {
            bombStatus = false
        }
        ROW.push(new GameTile({x, y}, bombStatus, false))
    }
    TILES.push(ROW);
    ROW = [];
}

// TILE COMPONENT
function Tile({TileInstance}) {
    // Sets condition css class
    const [currentState, setState] = useState("neutral")

    // Currently just indicates bombs and safes
    if (TileInstance.isBomb) {TileInstance.setTileText("1")}
    else {TileInstance.setTileText("0")}

    // Handles tile being clicked
    const handleClick = () => {
        if (TileInstance.isBomb) {setState("explode")}
        else {setState("clear")}
    }

    return (
        <button class={currentState} onClick={handleClick}>{TileInstance.tileText}</button>
    )
}

// GRID COMPONENT
export function GameGrid() {
    const [tiles] = useState(TILES)
    return (
        <div className="gameBoard">
            {
                tiles.map((row, rowIdx) => (
                    row.map((tile, tileIdx) => {
                        return(
                            <Tile TileInstance={tile}/>
                        )
                    })
                ))
            }
        </div>
    )
}