import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../styles/ManageEmployee.css";
import ReadEmployee from "./manageEmployee/ReadEmployee";
import CreateEmployee from "./manageEmployee/CreateEmployee";

function ManageEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        style={{ display: "flex" }}
      >
        <PlusOutlined /> New Employee
      </Button>
      <CreateEmployee
        isModalOpen={isModalOpen}
        setIsModalOpen={() => setIsModalOpen}
        width="1000px"
        onCancel={handleCloseModal}
      />

      <ReadEmployee style={{ display: "flex" }} />
    </>
  );
}

export default ManageEmployee;
