import React from "react";
import Cell from "../Cell";
import "./index.scss";

type RowProps = {
  gameState: string[];
  onCellClick: any;
  gameStateIndexes: number[];
};

const Row: React.FC<RowProps> = (props: RowProps): JSX.Element => {
  const createRowArray = (): any => {
    let rows = [];
    let loop = 0;
    while (loop < 3) {
      rows.push(
        <Cell
          cellState={props.gameState[loop]}
          onCellClick={props.onCellClick}
          cellStateIndex={props.gameStateIndexes[loop]}
        />
      );
      loop++;
    }
    return rows;
  };

  return <div className="row">{createRowArray()}</div>;
};

export default Row;
