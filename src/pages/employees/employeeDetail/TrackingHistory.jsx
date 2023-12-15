import React, { useState } from "react";
import "../../../styles/ManageEmployee.css";
import { Modal, Space, Typography } from "antd";
import { useParams } from "react-router";
import { useGetOneEmployee } from "../../../hooks/useEmployee";
import moment from "moment";
import ReactApexChart from "react-apexcharts";

const TrackingTable = ({ projects }) => {
  const projectSeries = projects.map((project, index) => {
    return {
      data: [
        {
          x: project.projectName,
          y: [
            new Date(
              moment(project.projectStartDate).format("YYYY-MM-DD"),
            ).getTime(),
            new Date(
              moment(project.projectFireDate).format("YYYY-MM-DD"),
            ).getTime(),
          ],
        },
      ],
    };
  });

  const [state] = useState({
    series: projectSeries,
    options: {
      chart: {
        height: 300,
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
        height={500}
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
          Employee Hire Date: {moment(joinDate).format("DD-MM-YYYY")}
        </Typography.Title>
        <TrackingTable projects={projects} />
      </Modal>
    </>
  );
};

export default TrackingHistory;
