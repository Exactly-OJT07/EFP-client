import { Card, Col, Row, Typography } from "antd";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import increase from "../assets/increase.svg";

const data = [
  ["Income", "Life Expectancy", "Population", "Country", "Year"],
  [0, 0, 10, "Australia", 1800],
  [0, 0, 1230, "Canada", 1800],
  [0, 0, 10, "China", 1800],
  [100, 0, 230, "Australia", 1950],
  [250, 0, 40, "Canada", 1950],
  [615, 0, 10, "China", 1950],
  [815, 0, 50, "Australia", 2021],
  [1314, 0, 310, "Canada", 2021],
  [985, 0, 10, "China", 2021],
  [900, 0, 110, "Australia", 2022],
  [1414, 0, 120, "Canada", 2022],
  [1085, 0, 120, "China", 2022],
  [900, 0, 110, "Australia", 2023],
  [1414, 0, 120, "Canada", 2023],
  [1085, 0, 120, "China", 2023],
  [900, 0, 110, "Australia", 2024],
  [1414, 0, 120, "Canada", 2024],
  [1085, 0, 120, "China", 2024],
  [900, 0, 110, "Australia", 2025],
  [1414, 0, 120, "Canada", 2025],
  [1085, 0, 120, "China", 2025],
  [900, 0, 110, "Australia", 2026],
  [1414, 0, 120, "Canada", 2026],
  [1085, 0, 120, "China", 2026],
  [900, 0, 110, "Australia", 2027],
  [1414, 0, 120, "Canada", 2027],
  [1085, 0, 120, "China", 2027],
  [900, 0, 110, "Australia", 2028],
  [1414, 0, 120, "Canada", 2028],
  [1085, 0, 120, "China", 2028],
  [900, 0, 110, "Australia", 2029],
  [1414, 0, 120, "Canada", 2029],
  [1085, 0, 120, "China", 2029],
  [900, 0, 110, "Australia", 2030],
  [1414, 0, 120, "Canada", 2030],
  [1085, 0, 120, "China", 2030],
];

const Dashboard = () => {
  function run(data) {
    const countries = ["Australia", "Canada", "China"];
    const datasetWithFilters = [];
    const seriesList = [];
    echarts.util.each(countries, function (country) {
      var datasetId = "dataset_" + country;
      datasetWithFilters.push({
        id: datasetId,
        fromDatasetId: "dataset_raw",
        transform: {
          type: "filter",
          config: {
            and: [
              { dimension: "Year", gte: 1800 },
              { dimension: "Country", "=": country },
            ],
          },
        },
      });
      seriesList.push({
        type: "line",
        datasetId: datasetId,
        showSymbol: false,
        name: country,
        endLabel: {
          show: true,
          formatter: function (params) {
            return params.value[3] + ": " + params.value[0];
          },
        },
        labelLayout: {
          moveOverlap: "shiftY",
        },
        emphasis: {
          focus: "series",
        },
        encode: {
          x: "Year",
          y: "Income",
          label: ["Country", "Income"],
          itemName: "Year",
          tooltip: ["Income"],
        },
      });
    });

    return {
      animationDuration: 10000,
      dataset: [
        {
          id: "dataset_raw",
          source: data,
        },
        ...datasetWithFilters,
      ],
      title: {
        text: "Income of Germany and France since 1950",
      },
      tooltip: {
        order: "valueDesc",
        trigger: "axis",
      },
      xAxis: {
        type: "category",
        nameLocation: "middle",
      },
      yAxis: {
        name: "Income",
      },
      grid: {
        right: 140,
      },
      series: seriesList,
    };
  }

  const [opts, setOtps] = useState({});

  useEffect(() => {
    const options = run(data);
    if (options) {
      setOtps(options);
    }
  }, data);

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <Card>
            <Row justify="space-between">
              <Col>
                <Typography>
                  <strong>Total Employees</strong>
                </Typography>
                <Row>
                  <img src={increase} alt="" />
                  <Typography style={{ display: "flex", alignItems: "center" }}>
                    150 %
                  </Typography>
                </Row>
              </Col>
              <Col style={{ display: "flex", alignItems: "center" }}>
                <Typography.Title style={{ margin: 0 }} level={3}>
                  250
                </Typography.Title>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <Card>adad</Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <Card>adad</Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={6}>
          <Card>adad</Card>
        </Col>
      </Row>

      <ReactEcharts
        option={opts}
        style={{ width: "600px", height: "300px" }}
      ></ReactEcharts>
    </>
  );
};

export default Dashboard;
