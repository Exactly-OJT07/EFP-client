import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "../../styles/ManageEmployee.css";
import ReadEmployee from "./components/ReadEmployee";
import CreateEmployee from "./components/CreateEmployee";

function ManageEmployee() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div>
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          <PlusOutlined /> New Employee
        </Button>
        <CreateEmployee
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          width="1000px"
          onCancel={handleCloseModal}
        />
      </div>

      <ReadEmployee />
    </>
  );
}

export default ManageEmployee;
