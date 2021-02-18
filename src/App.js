import "./styles.css";
import React from "react";
import { VictoryChart, VictoryLine } from "victory";
import Papa from "papaparse";
import londonData from "./data/phe_cases_london_boroughs.csv";
//import Line from "./Line";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
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
      dynamicTyping: true,
      complete: this.updateData
    });
  }

  updateData(result) {
    const data = result.data;

    this.setState({ covidData: data });
  }

  render() {
    const updatedData = [];
    for (let obj of this.state.covidData) {
      let temp = obj.area_name;
      let tempCases = this.state.covidData.filter(
        (obj) => obj.area_name === temp
      );
      updatedData.push(tempCases);
    }
    console.log(updatedData);
    //todo: pass data as props to line component
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
