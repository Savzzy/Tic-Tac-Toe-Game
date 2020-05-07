import React, { useState, useEffect } from "react";
import Row from "../Row";
import "./index.scss";

const PlayBoard: React.FC = (): JSX.Element => {
  //Initialize states
  //let [gameActive, setGameActive] = useState(true);
  const gameStateIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let [xIsNext, setXIsNext] = useState(true);
  let [gameState, setGameState] = useState(Array(9).fill(null));
  let [winner, setWinner] = useState<null | string>(null);
  let [isDraw, setIsDraw] = useState(false);

  const onCellClick = (index: number) => {
    //get current state of cells
    let currentGameState = gameState.slice();

    //stop the game if board contains winning combination

    if (findWinner(currentGameState) || currentGameState[index]) {
      return;
    }

    //stop game if all th boxes are filled
    if (areAllCellsChecked(currentGameState) === true) {
      return;
    }

    //mark the box either "X" or "O"
    currentGameState[index] = xIsNext ? "X" : "O";

    setGameState(currentGameState);

    setXIsNext(!xIsNext);
  };

  const handleBoardRestart = () => {
    setGameState(Array(9).fill(""));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  const nextPlayerTurn = (): JSX.Element => {
    if (xIsNext === true && isDraw === false && winner === null) {
      return <div>Next player : X</div>;
    } else if (xIsNext === false && isDraw === false && winner === null) {
      return <div>Next player : O</div>;
    } else if (
      (xIsNext === false || xIsNext === true) &&
      isDraw === false &&
      winner !== null
    ) {
      return <div>Winner : {winner}</div>;
    } else if (xIsNext === true && isDraw === true && winner === null) {
      return <div>Tie!!</div>;
    } else {
      return <div></div>;
    }
  };
  //array of winning combination

  const findWinner = (gameState: string[]) => {
    const winLocations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winLocations.length; i++) {
      let [a, b, c] = winLocations[i];

      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        //setWinner(gameState[a]);
        return gameState[a]; //return winner
      }
    }
    return null;
  };

  const areAllCellsChecked = (gameState: string[]): boolean => {
    let count = 0;
    gameState.forEach((element) => {
      if (element !== "") {
        count++;
      }
    });
    if (count === 9) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    //Get Winner If any
    const winner = findWinner(gameState);

    //check if all boxes are filled/checked
    const isFilled = areAllCellsChecked(gameState);
    if (winner) {
      setWinner(winner);
    }
    if (isFilled) {
      setIsDraw(true);
    }
  }, [gameState]);

  useEffect(() => {
    handleBoardRestart();
  }, []);

  return (
    <div className="Playboard">
      <div className="game-status">{nextPlayerTurn()}</div>
      <Row
        gameState={gameState.slice(0, 3)}
        onCellClick={onCellClick}
        gameStateIndexes={gameStateIndexes.slice(0, 3)}
      />
      <Row
        gameState={gameState.slice(3, 6)}
        onCellClick={onCellClick}
        gameStateIndexes={gameStateIndexes.slice(3, 6)}
      />
      <Row
        gameState={gameState.slice(6, 9)}
        onCellClick={onCellClick}
        gameStateIndexes={gameStateIndexes.slice(6, 9)}
      />

      <div className="reset" onClick={handleBoardRestart}>
        RESTART GAME
      </div>
    </div>
  );
};

export default PlayBoard;
