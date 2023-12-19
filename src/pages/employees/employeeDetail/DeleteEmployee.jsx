import { Modal, Typography } from "antd";
import React, { useState } from "react";
import {
  useDeleteEmployee,
  useGetOneEmployee,
} from "../../../hooks/useEmployee";
import { useParams } from "react-router-dom";
import { Translation, useTranslation } from "react-i18next";

const DeleteEmployee = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
  const [isFinalDeleteModalOpen, setIsFinalDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: employee } = useGetOneEmployee(id);
  const employee_project = employee.employee.employee_project;

  const isManagerEmp = employee.employee && employee.employee.isManager;
  const employeeId = employee.employee.id;

  const deleteEmployeeMutation = useDeleteEmployee();
  const handleDeleteFinalOk = async (employeeId) => {
    try {
      await deleteEmployeeMutation.mutateAsync(employeeId);
    } catch (error) {
      console.log("Error");
    }
  };

  const handleDeleteFinalCancel = () => {
    setIsFinalDeleteModalOpen(false);
  };

  const handleChangeConfirm = () => {
    if (employee_project.length === 0 && isManagerEmp === false) {
      return handleDeleteFinalOk(id);
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
          handleChangeConfirm();
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
        okButtonProps={{ style: { display: isManagerEmp ? "none" : "" } }}
        onOk={() => {
          handleDeleteFinalOk(id);
        }}
        onCancel={handleDeleteFinalCancel}
      >
        {isManagerEmp ? (
          <>
            <Typography.Title level={3} style={{ margin: "5px" }}>
              <Translation>
                {(t) => t("EMPLOYEE.MANAGERDELETIONCONTENT")}
              </Translation>
            </Typography.Title>
          </>
        ) : (
          <Typography.Title level={3} style={{ margin: "5px" }}>
            <Translation>{(t) => t("EMPLOYEE.DELETEFINALCONTENT")}</Translation>
          </Typography.Title>
        )}
      </Modal>
    </>
  );
};

export default DeleteEmployee;
