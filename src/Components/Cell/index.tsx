import React, { useState } from "react";
import "../Cell/index.scss";


type CellProps = {
  onCellClick: any;
  cellState: string;

  cellStateIndex: number;
};

const Cell: React.FC<CellProps> = (props): JSX.Element => {
  const [cellClick, setCellClick] = useState(false);

  const onClickHandler = (props: CellProps) => {
    console.log("clicked, ", props.cellStateIndex);
    setCellClick(true);
    props.onCellClick(props.cellStateIndex);
  };

  return (
    <div
      className="cell"
      onClick={() => {
        onClickHandler(props);
      }}
    >
      {cellClick ? <div>{props.cellState}</div> : <div></div>}
    </div>
  );
};
export default Cell;
