import { Image as AntdImage, Table, Typography } from "antd";
import React from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const EmployeeName = ({ name, record }) => {
  const navigate = useNavigate();

  return (
    <Typography.Text
      onClick={() => {
        navigate(`/manageEmployees/employeeDetail/${record.id}`);
      }}
      style={{ color: "blue", cursor: "pointer" }}
    >
      {name}
    </Typography.Text>
  );
};

const columns = [
  {
    title: <Translation>{(t) => t("EMPLOYEE.AVATAR")}</Translation>,
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => {
      return (
        <AntdImage
          width={50}
          height={50}
          style={{ borderRadius: "50px" }}
          src={avatar}
        />
      );
    },
  },
  {
    title: <Translation>{(t) => t("EMPLOYEE.CODE")}</Translation>,
    dataIndex: "code",
    key: "code",
    sorter: {
      compare: (a, b) => a.code.localeCompare(b.code),
      multiple: 2,
    },
  },
  {
    title: <Translation>{(t) => t("EMPLOYEE.NAME")}</Translation>,
    dataIndex: "name",
    key: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
    sortDirections: ["ascend", "descend"],
    render: (name, record) => <EmployeeName record={record} name={name} />,
  },
  {
    title: <Translation>{(t) => t("EMPLOYEE.EMAIL")}</Translation>,
    dataIndex: "email",
    key: "email",
    sorter: {
      compare: (a, b) => a.email.localeCompare(b.email),
      multiple: 1,
    },
  },
  {
    title: <Translation>{(t) => t("EMPLOYEE.PHONE")}</Translation>,
    dataIndex: "phone",
    key: "phone",
    responsive: ["lg"],
  },
  {
    title: <Translation>{(t) => t("EMPLOYEE.POSITION")}</Translation>,
    dataIndex: "position",
    key: "position",
    filters: [
      {
        text: "Front-end Dev",
        value: "fe",
      },
      {
        text: "Back-end Dev",
        value: "be",
      },
      {
        text: "Fullstack Dev",
        value: "fullstack",
      },
      {
        text: "Business Analyst",
        value: "ba",
      },
      {
        text: "Quality Assurance",
        value: "qa",
      },
      {
        text: "DevOps Engineer",
        value: "devops",
      },
      {
        text: "UX-UI",
        value: "ux-ui",
      },
    ],
    onFilter: (value, record) => record.position.indexOf(value) === 0,
    render: (position) => {
      switch (position) {
        case "fe":
          return "Front-end Dev";
        case "be":
          return "Back-end Dev";
        case "fullstack":
          return "FullStack Dev";
        case "ba":
          return "Business Analyst";
        case "qa":
          return "Quality Assurance";
        case "devops":
          return "DevOps Engineer";
        case "ux_ui":
          return "UX-UI";
        default:
          return "";
      }
    },
  },
  {
    title: <Translation>{(t) => t("EMPLOYEE.MANAGER")}</Translation>,
    dataIndex: "manager",
    key: "manager",
    render: (manager) => {
      if (manager) {
        return manager.name;
      } else return <Translation>{(t) => t("EMPLOYEE.NOMANAGER")}</Translation>;
    },
    responsive: ["lg"],
  },
  {
    title: <Translation>{(t) => t("EMPLOYEE.STATUS")}</Translation>,
    dataIndex: "status",
    key: "status",
    filters: [
      {
        text: <Translation>{(t) => t("EMPLOYEE.ACTIVE")}</Translation>,
        value: "active",
      },
      {
        text: <Translation>{(t) => t("EMPLOYEE.INACTIVE")}</Translation>,
        value: "inactive",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (status) => {
      if (status === "active") {
        return <Translation>{(t) => t("EMPLOYEE.ACTIVE")}</Translation>;
      } else return <Translation>{(t) => t("EMPLOYEE.INACTIVE")}</Translation>;
    },
    responsive: ["lg"],
  },
];

const ReadEmployee = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={data?.data}
      pagination={false}
      bac="custom-table"
    />
  );
};

export default ReadEmployee;
