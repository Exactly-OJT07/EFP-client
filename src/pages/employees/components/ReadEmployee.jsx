import React, { useState } from "react";
import { useGetClients } from "../../../hooks/useEmployee";
import { SearchOutlined } from "@ant-design/icons";
import { Space, Input, Spin, Table, Image as AntdImage, Button } from "antd";
import Pagination from "../../../components/pagination/pagination";

const columns = [
  {
    title: "",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar) => {
      return <AntdImage width={50} height={50} src={avatar} />;
    },
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
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
    ],
    onFilter: (value, record) => record.position.indexOf(value) === 0,
    render: (position) => {
      if (position === "fe") {
        return "Front-end Dev";
      } else if (position === "be") {
        return "Back-end Dev";
      } else return "";
    },
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
    onFilter: (value, record) => record.position.indexOf(value) === 0,
    render: (status) => {
      if (status === "active") {
        return "Active";
      } else return "Inactive";
    },
  },
];

const EmployeeList = ({ data }) => (
  <Table
    rowKey="id"
    columns={columns}
    dataSource={data?.data}
    pagination={false}
  />
);

const ReadEmployee = () => {
  const [table, setTable] = useState({
    page: 1,
    take: 6,
  });

  const [searchText, setSearchText] = useState("");
  const [searchNameText, setSearchNameText] = useState("");
  const [searchEmailText, setSearchEmailText] = useState("");

  const paginateOptions = {
    searchByName: searchText.name,
    searchByEmail: searchText.email,
    page: table.page,
    take: table.take,
  };

  const handleSearch = () => {
    setSearchText(() => ({
      name: searchNameText,
      email: searchEmailText,
    }));
  };

  const {
    data: employees,
    isLoading,
    isError,
  } = useGetClients(paginateOptions);
  return (
    <>
      <Space.Compact className="employee-search" size="large">
        <Input
          placeholder="Name"
          allowClear
          value={searchNameText}
          style={{
            width: 304,
          }}
          onChange={(e) => setSearchNameText(e.target.value)}
        />
        <Input
          placeholder="Email"
          allowClear
          value={searchEmailText}
          style={{
            width: 304,
          }}
          onChange={(e) => setSearchEmailText(e.target.value)}
        />
        <Button onClick={handleSearch}>
          <SearchOutlined />
        </Button>
      </Space.Compact>
      {isLoading ? (
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
      ) : isError ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Typography.Title level={5}>{isError}</Typography.Title>
        </div>
      ) : (
        <>
          <EmployeeList data={employees} />
          <div className="pagination">
            <Pagination items={employees} table={table} setTable={setTable} />
          </div>
        </>
      )}
    </>
  );
};

export default ReadEmployee;
