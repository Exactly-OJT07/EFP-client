import { Col, Row, Space, Card, Typography } from "antd";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import "./Dashboard.css";
import {
  MoneyCollectOutlined,
  UserOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const [areaChartState, setAreaChartState] = useState({
    series: [
      {
        name: "series1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "series2",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false, // Set to false to hide the toolbar
        },
        zoom: {
          enabled: false, // Set to false to disable zooming
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });

  const circleChartState = {
    series: [44, 55, 67, 83],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w) {
                return 249; // Custom formatter example
              },
            },
          },
        },
      },
      labels: ["Apples", "Oranges", "Bananas", "Berries"],
    },
  };

  return (
    <div style={{ marginLeft: 20 }}>
      <Row gutter={10} style={{ marginBottom: 20 }}>
        <Col span={8}>
          <Space direction="horizontal">
            <Card
              style={{
                width: 370,
                background:
                  "linear-gradient(135deg, #ABDCFF 10%, #0396FF 100%)",
              }}
            >
              <Space direction="horizontal">
                <MoneyCollectOutlined />
                <small>Total Projects</small>
              </Space>
              <Typography.Title>123</Typography.Title>
            </Card>
          </Space>
        </Col>

        <Col span={8}>
          <Space direction="horizontal">
            <Card
              style={{
                width: 370,
                background:
                  "linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%)",
              }}
            >
              <Space direction="horizontal">
                <UserOutlined />
                <small>Total Employees</small>
              </Space>
              <Typography.Title>123</Typography.Title>
            </Card>
          </Space>
        </Col>

        <Col span={8}>
          <Space direction="horizontal">
            <Card
              style={{
                width: 370,
                background:
                  "linear-gradient( 135deg, #FFD3A5 10%, #FD6585 100%)",
              }}
            >
              <Space direction="horizontal">
                <CheckCircleOutlined />
                <small>Project Done</small>
              </Space>
              <Typography.Title>123</Typography.Title>
            </Card>
          </Space>
        </Col>
      </Row>

      <Row gutter={10}>
        <Col span={8}>
          <div id="circleChart">
            <ReactApexChart
              options={circleChartState.options}
              series={circleChartState.series}
              type="radialBar"
              height={350}
            />
          </div>
        </Col>

        <Col span={16}>
          <div id="chart">
            <ReactApexChart
              options={areaChartState.options}
              series={areaChartState.series}
              type="area"
              height={350}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
