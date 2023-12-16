import { PlusOutlined } from "@ant-design/icons";
import { Button, Input, Space, Spin } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Pagination from "../../components/pagination/pagination";
import { useGetClients } from "../../hooks/useEmployee";
import "../../styles/ManageEmployee.css";
import ReadEmployee from "./manageEmployee/ReadEmployee";
import { Translation, useTranslation } from "react-i18next";

function ManageEmployee() {
  const navigate = useNavigate();
  const { t } = useTranslation();
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

  console.log(<Translation>{(t) => t("EMPLOYEE.NAME")}</Translation>);

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
          placeholder={<Translation>{(t) => t("EMPLOYEE.EMAIL")}</Translation>}
          value={searchEmailText}
          style={{
            width: 304,
          }}
          onChange={(e) => {
            setSearchEmailText(e.target.value);
          }}
        />
        <Button type="primary" onClick={() => navigate("create")}>
          <PlusOutlined /> New Employee
        </Button>
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
