import React from "react";
import { Table, Image as AntdImage } from "antd";

const columns = [
  {
    title: "Avatar",
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
    title: "Code",
    dataIndex: "code",
    key: "code",
    sorter: {
      compare: (a, b) => a.code.localeCompare(b.code),
      multiple: 2,
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 3,
    },
    defaultSortOrder: "ascend",
    sortDirections: ["ascend", "descend"],
    render: (name, record) => (
      <a href={`/manageEmployees/employeeDetail/${record.id}`}>{name}</a>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    sorter: {
      compare: (a, b) => a.email.localeCompare(b.email),
      multiple: 1,
    },
    responsive: ["lg"],
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Position",
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
        text: "User Experience",
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
          return "User Experience";
        default:
          return "";
      }
    },
  },
  {
    title: "Manager",
    dataIndex: "manager",
    key: "manager",
    render: (manager) => {
      if (manager) {
        return manager.name;
      } else return "No Manager";
    },
    responsive: ["lg"],
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    filters: [
      {
        text: "Active",
        value: "active",
      },
      {
        text: "Inactive",
        value: "inactive",
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    render: (status) => {
      if (status === "active") {
        return "Active";
      } else return "Inactive";
    },
    responsive: ["lg"],
  },
];

const ReadEmployee = ({ data }) => (
  <Table
    rowKey="id"
    columns={columns}
    dataSource={data?.data}
    pagination={false}
  />
);

export default ReadEmployee;
