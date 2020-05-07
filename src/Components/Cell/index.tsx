import React, { useState } from "react";
import "../Cell/index.scss";
import classnames from "classnames";

type CellProps = {
  onCellClick: any;
  cellState: string;

  cellStateIndex: number;
};

const Cell: React.FC<CellProps> = (props): JSX.Element => {
  const [cellClick, setCellClick] = useState(false);

  const onClickHandler = (props: CellProps) => {
    setCellClick(true);
    props.onCellClick(props.cellStateIndex);
  };

  let cellClass = classnames({
    cell: true,
    "right-bottom-bordered":
      props.cellStateIndex === 0 ||
      props.cellStateIndex === 1 ||
      props.cellStateIndex === 3 ||
      props.cellStateIndex === 4,
    "right-bordered": props.cellStateIndex === 6 || props.cellStateIndex === 7,
    "bottom-bordered": props.cellStateIndex === 2 || props.cellStateIndex === 5,
  });

  return (
    <div
      className={cellClass}
      onClick={() => {
        onClickHandler(props);
      }}
    >
      {cellClick ? (
       <div className="cell-value">{props.cellState}</div> 
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Cell;
