import "./styles.css";
import React from "react";
import { VictoryChart, VictoryLine, VictoryLabel, VictoryAxis } from "victory";
import Papa from "papaparse";
import londonData from "./data/phe_cases_london_boroughs.csv";
import Line from "./Line";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      covidData: []
    };
    this.updateData = this.updateData.bind(this);
    this.isUniqueDate = this.isUniqueDate.bind(this);
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

  isUniqueDate(value, index, selfArr) {
    return selfArr.indexOf(value) === index;
  }

  render() {
    const updatedData = [];
    const tempDate = [];
    for (let obj of this.state.covidData) {
      let temp = obj.area_name;
      let tempCases = this.state.covidData.filter(
        (obj) => obj.area_name === temp
      );
      updatedData.push(tempCases);
    }
    console.log(updatedData);

    for (let objDate of this.state.covidData) {
      tempDate.push(objDate.date);
    }
    const dateTicks = tempDate.filter(this.isUniqueDate);

    return (
      <div className="App">
        <h1>London Covid Cases</h1>
        <VictoryChart>
          <VictoryAxis tickValues={dateTicks} />
          {updatedData.map((dataArray) => (
            <VictoryLine />
          ))}
        </VictoryChart>
      </div>
    );
  }
}

export default App;

//finding unique values: https://tinyurl.com/au9937u6
//forum about Victory Lables: https://tinyurl.com/2h45clbw
