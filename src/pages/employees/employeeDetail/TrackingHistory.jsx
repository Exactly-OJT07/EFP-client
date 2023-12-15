import React, { useState } from "react";
import "../../../styles/ManageEmployee.css";
import { Modal, Space, Typography } from "antd";
import { useParams } from "react-router";
import { useGetOneEmployee } from "../../../hooks/useEmployee";
import moment from "moment";
import ReactApexChart from "react-apexcharts";

const TrackingTable = () => {
  const [state, setState] = useState({
    series: [
      {
        data: [
          {
            x: "Code",
            y: [
              new Date("2019-03-02").getTime(),
              new Date("2019-03-04").getTime(),
            ],
          },
          {
            x: "Test",
            y: [
              new Date("2019-03-04").getTime(),
              new Date("2019-03-08").getTime(),
            ],
          },
          {
            x: "Validation",
            y: [
              new Date("2019-03-08").getTime(),
              new Date("2019-03-12").getTime(),
            ],
          },
          {
            x: "Deployment",
            y: [
              new Date("2019-03-12").getTime(),
              new Date("2019-03-18").getTime(),
            ],
          },
        ],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "rangeBar",
        toolbar: {
          show: false, // Set to false to hide the toolbar
        },
        zoom: {
          enabled: false, // Set to false to disable zooming
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      xaxis: {
        type: "datetime",
      },
    },
  });

  return (
    <Space id="chart">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="rangeBar"
        height={350}
        width={750}
      />
    </Space>
  );
};

const TrackingHistory = ({ isTrackingModalOpen, setIsTrackingModalOpen }) => {
  const { id } = useParams();
  const { data: employee } = useGetOneEmployee(id);

  const { tracking } = employee?.employee;

  const { joinDate, fireDate, projects } = tracking;

  return (
    <>
      <Modal
        title="Tracking History"
        open={isTrackingModalOpen}
        onOk={() => setIsTrackingModalOpen(false)}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        width="1000px"
      >
        <Typography.Title level={4}>Info</Typography.Title>
        <Typography.Title level={5}>
          {moment(joinDate).format("DD-MM-YYYY")}
        </Typography.Title>
        <Typography.Title level={5}>
          {fireDate ? moment(fireDate).format("DD-MM-YYYY") : "No Fire Date"}
        </Typography.Title>
        {projects?.map((project, index) => (
          <React.Fragment key={index}>
            <Typography.Title level={4}>Project</Typography.Title>
            <Typography.Title level={5}>
              {"Project Start Date: " +
                moment(project.projectStartDate).format("DD-MM-YYYY")}
            </Typography.Title>
            <Typography.Title level={5}>
              {project.projectEndDate
                ? "Project End Date: " +
                  moment(project.projectEndDate).format("DD-MM-YYYY")
                : "No Project End Date"}
            </Typography.Title>
            <Typography.Title level={5}>
              {"Join Date: " + moment(project.joinDate).format("DD-MM-YYYY")}
            </Typography.Title>
            <Typography.Title level={5}>
              {project.doneDate
                ? "Done Date: " + moment(project.doneDate).format("DD-MM-YYYY")
                : "No Project Done Date"}
            </Typography.Title>
          </React.Fragment>
        ))}
        <TrackingTable />
      </Modal>
    </>
  );
};

export default TrackingHistory;
