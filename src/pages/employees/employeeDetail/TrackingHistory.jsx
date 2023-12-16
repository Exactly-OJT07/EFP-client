import React, { useState } from "react";
import "../../../styles/ManageEmployee.css";
import { Modal, Space, Typography } from "antd";
import { useParams } from "react-router";
import { useGetOneEmployee } from "../../../hooks/useEmployee";
import moment from "moment";
import ReactApexChart from "react-apexcharts";
import { Translation, useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
  const { data: employee } = useGetOneEmployee(id);

  const { tracking } = employee?.employee;

  const { projects } = tracking;

  return (
    <>
      <Modal
        title={<Translation>{(t) => t("EMPLOYEE.TRACKING")}</Translation>}
        open={isTrackingModalOpen}
        onOk={() => setIsTrackingModalOpen(false)}
        okText={<Translation>{(t) => t("CLOSE")}</Translation>}
        closable={false}
        cancelButtonProps={{ style: { display: "none" } }}
        width="1000px"
      >
        <TrackingTable projects={projects} />
      </Modal>
    </>
  );
};

export default TrackingHistory;
