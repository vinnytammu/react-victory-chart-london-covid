import "./styles.css";
import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryGroup,
  VictoryLabel,
  VictoryScatter,
  createContainer,
  VictoryAxis,
  VictoryTooltip
} from "victory";
import Papa from "papaparse";
import londonData from "./data/phe_cases_london_boroughs.csv";
import randomColor from "randomcolor";
import Line from "./Line";

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

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

    const casesTicks = Math.max(...tempCases);
    console.log(casesTicks);

    return (
      <div className="App">
        <h1>London Covid Cases</h1>
        <VictoryChart containerComponent={<VictoryZoomVoronoiContainer />}>
          <VictoryAxis tickValues={dateTicks} fixLabelOverlap={true} />
          <VictoryAxis dependentAxis tickValues={casesTicks} />
          {cleanData.map((dataArr, index) => {
            return (
              <VictoryGroup>
                <VictoryLine
                  style={{ data: { stroke: randomColor() } }}
                  data={dataArr}
                  key={index}
                  x="date"
                  y="total_cases"
                />
                <VictoryScatter
                  style={{ data: { fill: randomColor() } }}
                  size={({ active }) => (active ? 4 : 2)}
                  data={dataArr}
                  key={index}
                  x="date"
                  y="total_cases"
                  labels={(datum) => `total cases=${datum.x}`}
                  labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
                />
              </VictoryGroup>
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
//zoom and scrub example: https://codesandbox.io/s/line-end-labels-7zxju?from-embed=&file=/src/index.js
