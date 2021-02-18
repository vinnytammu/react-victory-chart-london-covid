import React from "react";
import { VictoryLine } from "victory";

function Line(props) {
  return (
    <VictoryLine
      data={[
        { x: 1, y: 2 },
        { x: 2, y: 3 },
        { x: 3, y: 5 },
        { x: 4, y: 4 },
        { x: 5, y: 6 }
      ]}
    />
  );
}

export default Line;
