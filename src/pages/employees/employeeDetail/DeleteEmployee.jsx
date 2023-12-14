import { Modal, Typography } from "antd";
import React from "react";
import { useDeleteEmployee } from "../../../hooks/useEmployee";
import { useParams } from "react-router-dom";

const DeleteEmployee = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
  const { id } = useParams();
  console.log(id);
  const deleteEmployeeMutation = useDeleteEmployee();
  const handleDeleteOk = async (employeeId) => {
    try {
      await deleteEmployeeMutation.mutateAsync(employeeId);
    } catch (error) {
      console.log("Error");
    }
    return (window.location = "/manageEmployees");
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <Modal
      open={isDeleteModalOpen}
      title="Delete Employee"
      onOk={() => handleDeleteOk(id)}
      onCancel={handleDeleteCancel}
    >
      <Typography.Title level={3} style={{ margin: "5px" }}>
        Do you really want to delete is employee ?
      </Typography.Title>
    </Modal>
  );
};

export default DeleteEmployee;
