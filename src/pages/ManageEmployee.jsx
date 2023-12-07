/* eslint-disable react/prop-types */
import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Input, Popconfirm, Space, Table } from "antd";
import { useState } from "react";
import { useGetClients } from "../hooks/useEmployee";
import "../styles/ManageEmployee.css";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Roles",
    key: "roles",
    dataIndex: "roles",
  },
  {
    title: "Hire Date",
    dataIndex: "hireDate",
    key: "hireDate",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          placement="bottomLeft"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <MoreOutlined />
            </Space>
          </a>
        </Dropdown>
      </>
    ),
  },
];

const { Search } = Input;
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    phone: "0987654321",
    roles: ["Intern", "Developer"],
    hireDate: "23/10/2023",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    phone: "0987654321",
    roles: ["Tester"],
    hireDate: "23/10/2023",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    phone: "0987654321",
    roles: ["Middle", "BA"],
    hireDate: "23/10/2023",
  },
  {
    key: "4",
    name: "John Brown",
    age: 32,
    phone: "0987654321",
    roles: ["Intern", "Developer"],
    hireDate: "23/10/2023",
  },
  {
    key: "5",
    name: "Jim Green",
    age: 42,
    phone: "0987654321",
    roles: ["Tester"],
    hireDate: "23/10/2023",
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    phone: "0987654321",
    roles: ["Middle", "BA"],
    hireDate: "23/10/2023",
  },
  {
    key: "7",
    name: "John Brown",
    age: 32,
    phone: "0987654321",
    roles: ["Intern", "Developer"],
    hireDate: "23/10/2023",
  },
  {
    key: "8",
    name: "Jim Green",
    age: 42,
    phone: "0987654321",
    roles: ["Tester"],
    hireDate: "23/10/2023",
  },
  {
    key: "9",
    name: "Joe Black",
    age: 32,
    phone: "0987654321",
    roles: ["Middle", "BA"],
    hireDate: "23/10/2023",
  },
  {
    key: "10",
    name: "John Brown",
    age: 32,
    phone: "0987654321",
    roles: ["Intern", "Developer"],
    hireDate: "23/10/2023",
  },
  {
    key: "11",
    name: "Jim Green",
    age: 42,
    phone: "0987654321",
    roles: ["Tester"],
    hireDate: "23/10/2023",
  },
  {
    key: "12",
    name: "Joe Black",
    age: 32,
    phone: "0987654321",
    roles: ["Middle", "BA"],
    hireDate: "23/10/2023",
  },
];
const EmployeeList = ({ data }) => (
  <Table
    columns={columns}
    dataSource={data?.data}
    pagination={{ defaultPageSize: 5 }}
  />
);
const items = [
  {
    key: "1",
    label: (
      <p>
        <EditOutlined />
        Edit
      </p>
    ),
  },
  {
    key: "2",
    label: (
      <Popconfirm
        title="Delete the user"
        description="Are you sure to delete this user?"
        okText="Yes"
        cancelText="No"
      >
        <p>
          <DeleteOutlined />
          Delete
        </p>
      </Popconfirm>
    ),
    danger: true,
  },
];

function ManageEmployee() {
  const [searchText, setSearchText] = useState("");

  const { data: employees } = useGetClients();

  console.log(employees);

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = data.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <Space className="status-filter" direction="horizontal">
        <div>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={handleSearch}
            style={{
              width: 304,
            }}
          />
        </div>
        <Button type="primary">
          <PlusOutlined />
          Add Employee
        </Button>
      </Space>
      <EmployeeList data={employees} />
    </>
  );
}

export default ManageEmployee;
