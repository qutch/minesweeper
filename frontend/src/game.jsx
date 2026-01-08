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

// GRID SETUP

function generateGrid() {
    let GRID_HEIGHT = 10;
    let GRID_WIDTH = 10;
    let TILES = [];

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

    return TILES
}

function generateNewTiles() {
    return generateGrid();
}

// Generate initial grid
let GAME_TILES = generateGrid();

// TILE COMPONENT
function Tile({TileInstance, sendPlayingStatus}) {
    // Sets condition css class
    const [currentState, setState] = useState("neutral")

    // Currently just indicates bombs and safes
    if (TileInstance.isBomb) {TileInstance.setTileText("1")}
    else {TileInstance.setTileText("0")}

    // Handles tile being clicked
    function handleClick() {
        if (TileInstance.isBomb) {
            setState("explode");
            sendPlayingStatus(false);
        }
        else {
            setState("clear");
        }
    }

    return (
        <button class={currentState} onClick={handleClick}></button>
    )
}

function LoseScreen({sendResetState}) {

    function handleClick() {
        sendResetState(true)
    }

    return (
        <div className="overlay-container">
            <h1>YOU LOSE</h1>
            <button onClick={handleClick}>reset</button>
        </div>
    )
}

function StartScreen({sendStartState}) {
    function handleClick() {
        sendStartState(true)
    }
    return (
        <div className="overlay-container">
            <h1>WELCOME TO MINESWEEPER</h1>
            <button onClick={handleClick}>START GAME</button>
        </div>
    )
}

// GRID COMPONENT
export function GameGrid() {
    const [tiles, setTiles] = useState(GAME_TILES);
    const [isPlaying, setIsPlaying] = useState(true);
    const [hasStarted, setHasStarted] = useState(false);

    function handleReset(data) {
        setIsPlaying(data);
        setTiles(generateNewTiles());
    }

    function handleStart(data) {
        setHasStarted(data);
    }

    function handleMineExplosion(data) {
        setIsPlaying(data);
    }

    return (
        <div className="gameBoard">
            {!hasStarted && <StartScreen sendStartState={handleStart}/>}
            {
                hasStarted &&
                tiles.map((row, rowIdx) => (
                    row.map((tile, tileIdx) => {
                        return(
                            <Tile TileInstance={tile} sendPlayingStatus={handleMineExplosion}/>
                        )
                    })
                ))
            }
            {!isPlaying && <LoseScreen sendResetState={handleReset}/>}
        </div>
    )
}