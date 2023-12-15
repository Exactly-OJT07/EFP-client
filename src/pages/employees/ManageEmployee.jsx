import React, { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useGetClients } from "../../hooks/useEmployee";
import "../../styles/ManageEmployee.css";
import ReadEmployee from "./manageEmployee/ReadEmployee";
import CreateEmployee from "./manageEmployee/CreateEmployee";
import { Space, Input, Spin, Button } from "antd";
import Pagination from "../../components/pagination/pagination";

function ManageEmployee() {
  const [searchNameText, setSearchNameText] = useState("");
  const [searchEmailText, setSearchEmailText] = useState("");
  const [table, setTable] = useState({
    page: 1,
    take: 5,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const paginateOptions = {
    searchByName: searchNameText,
    searchByEmail: searchEmailText,
    page: table.page,
    take: table.take,
  };

  const {
    data: employees,
    isLoading,
    isError,
  } = useGetClients(paginateOptions);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Space className="employee-search" size="large">
        <Input
          placeholder="Name"
          value={searchNameText}
          style={{
            width: 304,
          }}
          onChange={(e) => {
            setSearchNameText(e.target.value);
          }}
        />
        <Input
          placeholder="Email"
          value={searchEmailText}
          style={{
            width: 304,
          }}
          onChange={(e) => {
            setSearchEmailText(e.target.value);
          }}
        />
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          <PlusOutlined /> New Employee
        </Button>
        <CreateEmployee
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          width="1000px"
          onCancel={handleCloseModal}
        />
      </Space>

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
          <ReadEmployee data={employees} />
          <div className="pagination">
            <Pagination items={employees} table={table} setTable={setTable} />
          </div>
        </>
      )}
    </>
  );
}

export default ManageEmployee;
