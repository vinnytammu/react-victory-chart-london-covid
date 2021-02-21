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
    this.isUnique = this.isUnique.bind(this);
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

  isUnique(value, index, selfArr) {
    return selfArr.indexOf(value) === index;
  }

  render() {
    const tempCovData = this.state.covidData;
    const updatedData = [];
    const tempDate = [];
    const tempCases = [];
    const tempArea = [];

    for (let obj of tempCovData) {
      tempArea.push(obj.area_name);
    }
    const areaName = tempArea.filter(this.isUnique);

    for (let obj of tempCovData) {
      let temp = obj.area_name;
      let tempCases = tempCovData.filter((obj) => obj.area_name === temp);
      updatedData.push(tempCases);
    }
    console.log(updatedData);

    const cleanData = updatedData.slice(0, areaName.length);
    console.log(cleanData);

    for (let objDate of tempCovData) {
      tempDate.push(objDate.date);
    }
    const dateTicks = tempDate.filter(this.isUnique);

    for (let objCases of tempCovData) {
      tempCases.push(objCases.total_cases);
    }
    const casesTicks = tempCases.filter(this.isUnique);
    //Math.max(...tempCases);
    console.log(casesTicks);

    return (
      <div className="App">
        <h1>London Covid Cases</h1>
        <VictoryChart>
          <VictoryAxis tickValues={dateTicks} />
          <VictoryAxis dependentAxis tickValues={casesTicks} />
          {cleanData.map((dataArr, index) => {
            return (
              <VictoryLine
                data={dataArr}
                key={index}
                x="date"
                y="total_cases"
              />
            );
          })}
        </VictoryChart>
      </div>
    );
  }
}

export default App;

//finding unique values: https://tinyurl.com/au9937u6
//forum about Victory Lables: https://tinyurl.com/2h45clbw
