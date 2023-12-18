import {
  CheckCircleOutlined,
  FallOutlined,
  MoneyCollectOutlined,
  RiseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Select, Space, Spin, Typography } from "antd";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useGetEmployeeTotal } from "../../hooks/useGetEmployeeTotal";
import { useGetProjectTotal } from "../../hooks/useGetProjectTotal";
import "./Dashboard.css";
import { Breadcrumb } from "../../components/beadcrumb/Breadcrumb";

const { Option } = Select;

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("year");
  const handlePeriodChange = (value) => {
    setSelectedPeriod(value);
  };

  const period = {
    period: "year",
  };
  const { data: employeeTotal } = useGetEmployeeTotal({
    period: selectedPeriod,
  });
  const { data: projectTotal } = useGetProjectTotal({
    period: selectedPeriod,
  });

  const [areaChartState, setAreaChartState] = useState({
    series: [
      {
        name: "Projects",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Employees",
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
      title: {
        text: "Area Chart",
        align: "center",
      },
    },
  });

  const circleChartState = {
    series: [
      projectTotal?.donePercentage?.toFixed(2) || 0,
      projectTotal?.onProgressPercentage?.toFixed(2) || 0,
      projectTotal?.pendingPercentage?.toFixed(2) || 0,
    ],
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
              formatter: function () {
                return projectTotal ? projectTotal?.total : 0;
              },
            },
          },
        },
      },
      labels: ["Done", "On Progress", "Pending"],
      title: {
        text: "Current Project Status",
        align: "center",
      },
    },
  };

  const isPositiveProjectPercentageChange =
    projectTotal?.percentageProjectChange > 0;
  const isPositiveEmployeePercentageChange =
    employeeTotal?.percentageChange > 0;
  const isPositiveProjectDonePercentageChange =
    projectTotal?.percentageDoneChange > 0;

  const breadcrumbItems = [{ key: "dashboard" }];

  return (
    <>
      {projectTotal ? (
        <div style={{ marginLeft: 20 }}>
          <Breadcrumb items={breadcrumbItems} />
          <Row justify="end">
            <Select
              defaultValue={selectedPeriod}
              onChange={handlePeriodChange}
              style={{ width: 120, marginRight: 10, marginBottom: 10 }}
            >
              <Option value="year">Year</Option>
              <Option value="month">Month</Option>
            </Select>
          </Row>
          <Row gutter={10} style={{ marginBottom: 20 }}>
            <Col span={8}>
              <Space direction="horizontal">
                <Card
                  style={{
                    width: 370,
                    background: "#f5f5f5",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <Space direction="horizontal">
                    <MoneyCollectOutlined />
                    <strong style={{ color: "#383838" }}>Total Projects</strong>
                  </Space>
                  <div className="card-infor">
                    <Typography.Title>{projectTotal?.total}</Typography.Title>
                    <Space direction="horizontal">
                      {isPositiveProjectPercentageChange ? (
                        <RiseOutlined style={{ color: "green" }} />
                      ) : (
                        <FallOutlined style={{ color: "red" }} />
                      )}
                      <Typography.Title level={5}>
                        {projectTotal?.percentageProjectChange.toFixed()}%
                      </Typography.Title>
                    </Space>
                  </div>
                </Card>
              </Space>
            </Col>

            <Col span={8}>
              <Space direction="horizontal">
                <Card
                  style={{
                    width: 370,
                    background: "#f5f5f5",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <Space direction="horizontal">
                    <UserOutlined />
                    <strong style={{ color: "#383838" }}>
                      Total Employees
                    </strong>
                  </Space>
                  <div className="card-infor">
                    <Typography.Title>{employeeTotal?.total}</Typography.Title>
                    <Space direction="horizontal">
                      {isPositiveEmployeePercentageChange ? (
                        <RiseOutlined style={{ color: "green" }} />
                      ) : (
                        <FallOutlined style={{ color: "red" }} />
                      )}
                      <Typography.Title level={5}>
                        {employeeTotal?.percentageChange.toFixed()}%
                      </Typography.Title>
                    </Space>
                  </div>
                </Card>
              </Space>
            </Col>

            <Col span={8}>
              <Space direction="horizontal">
                <Card
                  style={{
                    width: 370,
                    background: "#f5f5f5",
                    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                  }}
                >
                  <Space direction="horizontal">
                    <CheckCircleOutlined />
                    <strong style={{ color: "#383838" }}>Project Done</strong>
                  </Space>
                  <div className="card-infor">
                    <Typography.Title>
                      {projectTotal?.currentDoneCount}
                    </Typography.Title>
                    <Space direction="horizontal">
                      {isPositiveProjectDonePercentageChange ? (
                        <RiseOutlined style={{ color: "green" }} />
                      ) : (
                        <FallOutlined style={{ color: "red" }} />
                      )}
                      <Typography.Title level={5}>
                        {projectTotal?.percentageDoneChange.toFixed()}%
                      </Typography.Title>
                    </Space>
                  </div>
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
      ) : (
        <Spin
          size="large"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      )}
    </>
  );
};

export default Dashboard;
