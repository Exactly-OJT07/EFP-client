import React, { useState } from "react";
import "../../../styles/ManageEmployee.css";
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
        width: 500,
        height: 450,
        type: "rangeBar",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      colors: ["#EC7D31", "#36BDCB"],
      plotOptions: {
        bar: {
          horizontal: true,
          isDumbbell: true,
          dumbbellColors: [["#EC7D31", "#36BDCB"]],
        },
      },
      title: {
        text: "Tracking history",
      },
      fill: {
        type: "gradient",
        gradient: {
          gradientToColors: ["#36BDCB"],
          inverseColors: false,
          stops: [0, 100],
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

const TrackingHistory = () => {
  const { id } = useParams();
  const { data: employee } = useGetOneEmployee(id);

  const { tracking } = employee?.employee;

  const { projects } = tracking;

  return <TrackingTable projects={projects} />;
};

export default TrackingHistory;
