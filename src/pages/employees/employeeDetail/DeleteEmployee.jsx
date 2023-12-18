import { Modal, Typography } from "antd";
import React, { useState } from "react";
import {
  useDeleteEmployee,
  useGetClients,
  useGetOneEmployee,
} from "../../../hooks/useEmployee";
import { useParams } from "react-router-dom";
import { Translation, useTranslation } from "react-i18next";

const DeleteEmployee = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
  const [isFinalDeleteModalOpen, setIsFinalDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: employee } = useGetOneEmployee(id);
  const { employee_project } = employee.employee;

  const deleteEmployeeMutation = useDeleteEmployee();
  const handleDeleteFinalOk = async (employeeId) => {
    try {
      await deleteEmployeeMutation.mutateAsync(employeeId);
    } catch (error) {
      console.log("Error");
    }
    return (window.location = "/manageEmployees");
  };

  const handleDeleteFinalCancel = () => {
    setIsFinalDeleteModalOpen(false);
  };

  const handleDeleteOk = () => {
    if (employee_project != []) {
      handleDeleteFinalOk(id);
    }
    setIsDeleteModalOpen(false);
    setIsFinalDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Modal
        open={isDeleteModalOpen}
        title={t("EMPLOYEE.DELETE")}
        onOk={() => {
          handleDeleteOk();
        }}
        onCancel={handleDeleteCancel}
      >
        <Typography.Title level={3} style={{ margin: "5px" }}>
          <Translation>{(t) => t("EMPLOYEE.DELETECONTENT")}</Translation>
        </Typography.Title>
      </Modal>

      <Modal
        open={isFinalDeleteModalOpen}
        title={t("EMPLOYEE.DELETE")}
        onOk={() => {
          handleDeleteFinalOk(id);
        }}
        onCancel={handleDeleteFinalCancel}
      >
        <Typography.Title level={3} style={{ margin: "5px" }}>
          <Translation>{(t) => t("EMPLOYEE.DELETEFINALCONTENT")}</Translation>
        </Typography.Title>
      </Modal>
    </>
  );
};

export default DeleteEmployee;
