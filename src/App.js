import "./styles.css";
import React from "react";
import { VictoryChart, VictoryLine } from "victory";
import Papa from "papaparse";
import londonData from "./data/phe_cases_london_boroughs.csv";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      covidData: []
    };
    this.updateData = this.updateData.bind(this);
  }

  componentDidMount() {
    var csvFilePath = londonData;
    Papa.parse(csvFilePath, {
      header: true,
      download: false,
      skipEmptyLines: true,
      // Here this is also available. So we can call our custom class method
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;
    // Here this is available and we can call this.setState (since it's binded in the constructor)
    this.setState({ loading: false, covidData: data }); // or shorter ES syntax: this.setState({ data });
    //console.log(this.state.covidData);
  }

  render() {
    const loadingText = this.state.loading
      ? "loading..."
      : "London Covid Cases";
    console.log(this.state.covidData);
    return (
      <div className="App">
        <h1>{loadingText}</h1>
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
