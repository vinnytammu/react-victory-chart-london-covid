import "./styles.css";
import React from "react";
import {
  VictoryChart,
  VictoryLine,
  createContainer,
  VictoryAxis,
  VictoryTooltip
} from "victory";
import Papa from "papaparse";
import londonData from "./data/phe_cases_london_boroughs.csv";
import randomColor from "randomcolor";

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
      let cases = tempCovData.filter((obj) => obj.area_name === temp);
      updatedData.push(cases);
    }

    const cleanData = updatedData.slice(0, areaName.length);

    for (let objDate of tempCovData) {
      tempDate.push(objDate.date);
    }
    const dateTicks = tempDate.filter(this.isUnique);

    for (let objCases of tempCovData) {
      tempCases.push(objCases.total_cases);
    }

    const casesTicks = Math.max(...tempCases);

    return (
      <div className="App">
        <h1>London Covid-19 Cases </h1>
        <VictoryChart containerComponent={<VictoryZoomVoronoiContainer />}>
          <VictoryAxis tickValues={dateTicks} fixLabelOverlap={true} />
          <VictoryAxis dependentAxis tickValues={casesTicks} />
          {cleanData.map((dataArr, index) => {
            return (
              <VictoryLine
                style={{ data: { stroke: randomColor() } }}
                key={index}
                data={dataArr}
                x="date"
                y="total_cases"
                labels={({ datum }) =>
                  `${datum.area_name}: (date: ${datum.date}, total cases: ${datum.total_cases}, new cases: ${datum.new_cases})`
                }
                labelComponent={<VictoryTooltip style={{ fontSize: 10 }} />}
              />
            );
          })}
        </VictoryChart>
        <p>Brush and Zoom Capable. Try panning and zooming</p>
      </div>
    );
  }
}

export default App;

//finding unique values: https://tinyurl.com/au9937u6
//forum about Victory Lables: https://tinyurl.com/2h45clbw
//zoom and scrub example: https://codesandbox.io/s/line-end-labels-7zxju?from-embed=&file=/src/index.js
//todo: optimize zoom on large datasets https://formidable.com/open-source/victory/guides/zoom-on-large-datasets
