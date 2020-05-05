import React, { useState, useEffect } from "react";
import Row from "../Row";
import "./index.scss";

const PlayBoard: React.FC = (): JSX.Element => {
  //Initialize states
  //let [gameActive, setGameActive] = useState(true);
  const gameStateIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  let [xIsNext, setXIsNext] = useState(true);
  let [gameState, setGameState] = useState(Array(9).fill(null));
  let [history, setHistory] = useState<string[]>([]);
  let [winner, setWinner] = useState<null|string>(null);
  let [isDraw, setIsDraw] = useState(false);

  const onCellClick = (index: number) => {
    //get current state of cells
    let currentGameState = gameState.slice();

    //current state of history
    let lastMove = history;

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

    //add the move to history
    lastMove.push(xIsNext ? "X" : "O");

    setGameState(currentGameState);
    setHistory(lastMove);
    setXIsNext(!xIsNext);
  };

  const handleBoardRestart = () => {
    setGameState(Array(9).fill(""));
    setHistory([]);
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

 
  const nextPlayerTurn = () => {
      if(xIsNext === true && isDraw === false && winner === null){
          return  "Next player: X"
      }else if (xIsNext === false && isDraw === false && winner === null){
        return "Next player: O"
      }else {
          return 
      }
  }
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

  useEffect(()=>{
    handleBoardRestart();
  },[])

  const MatchStatus = (winner: string|null, isDraw: boolean) => {
    if (winner !== null && isDraw === false) {
      return <div>`Winner is {winner}`</div>;
    } else if (isDraw === true && winner === null) {
      return <div>It's a Tie</div>;
    } else {
      return <div></div>;
    }
  };
  
  return (
    <div className="Playboard">
      <div>{nextPlayerTurn()}</div>
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
      <div>{MatchStatus(winner,isDraw)}</div>
      <div className="reset" onClick={handleBoardRestart}>
        RESTART GAME
      </div>
    </div>
  );
};

export default PlayBoard;
