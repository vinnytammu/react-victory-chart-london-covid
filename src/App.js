import "./styles.css";
import React from "react";
import { csv } from "d3";
import { VictoryChart, VictoryLine } from "victory";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }
  componentDidMount() {}

  render() {
    return (
      <div className="App">
        <h1>London Covid Cases</h1>
        <br />
        <VictoryChart>
          <VictoryLine
            data={[
              { x: 1, y: 2 },
              { x: 2, y: 3 },
              { x: 3, y: 5 },
              { x: 4, y: 4 },
              { x: 5, y: 6 }
            ]}
          />
        </VictoryChart>
      </div>
    );
  }
}

export default App;

//   useEffect(() => {
//   fetch("https://data.london.gov.uk/api/table/s8c9t_j4fs2")
//   .then((response) => response.json())
//   .then((data) => {
//     setData(data);
//     console.log(data);
//   });
// }, []);
