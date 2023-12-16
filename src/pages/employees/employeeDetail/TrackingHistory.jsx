import React, { useState } from "react";
import "../../../styles/ManageEmployee.css";
import { Modal, Space, Typography } from "antd";
import { useParams } from "react-router";
import { useGetOneEmployee } from "../../../hooks/useEmployee";
import moment from "moment";
import ReactApexChart from "react-apexcharts";

const TrackingTable = ({ projects }) => {
  const projectSeries = projects.map((project) => {
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

  const [state, setState] = useState({
    series: projectSeries,

    options: {
      chart: {
        width: 880,
        height: 450,
        type: "rangeBar",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          barHeight: "100%",
        },
      },
      xaxis: {
        type: "datetime",
      },
      legend: {
        show: false,
      },
    },
  });

  return (
    <>
      {console.log(state)}
      <ReactApexChart
        options={state.options}
        series={state.series}
        type={state.options.chart.type}
        width={state.options.chart.width}
        height={state.options.chart.height}
      />
    </>
  );
};

const TrackingHistory = ({ isTrackingModalOpen, setIsTrackingModalOpen }) => {
  const { id } = useParams();
  const { data: employee } = useGetOneEmployee(id);

  const { tracking } = employee?.employee;

  const { joinDate, projects } = tracking;

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
