import React, { useState } from "react";
import { Button, Form, DatePicker, Modal } from "antd";
import "../../styles/ManageEmployee.css";
import ReadEmployee from "./components/ReadEmployee";
import CreateEmployee from "./components/CreateEmployee";
import { useCreateEmployee } from "../../hooks/useEmployee";
import { createEmployeeAPI } from "../../api/apiUrl";
import { Cloudinary } from "@cloudinary/url-gen";
import moment from "moment";

function ManageEmployee() {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { RangePicker } = DatePicker;
  const createEmployeeMutation = useCreateEmployee();
  const [employeeData, setEmployeeData] = useState([]);

  const [newCode, setNewCode] = useState("");

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDob, setNewDob] = useState("");
  const [newCid, setNewCid] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newPosition, setNewPosition] = useState("");

  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
  const [newDescription, setNewDescription] = useState([]);

  const [newIsManager, setNewIsManager] = useState(false);
  const [newLineManager, setNewLineManager] = useState(null);

  const [newExp, setNewExp] = useState("");
  const newExperienceObject = { skill: newSkill, exp: newExp };
  const [newEmail, setNewEmail] = useState("");
  const [newJoinDate, setNewJoinDate] = useState("");
  const [newFireDate, setNewFireDate] = useState("");
  const [newAvatar, setNewAvatar] = useState("");

  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleOpenOk = async () => {
    try {
      console.log("Create OK");
      setConfirmLoading(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setConfirmLoading(false);
      }, 2000);
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    console.log("Create Cancel");
    setIsModalOpen(false);
  };

  const handleViewOk = () => {
    console.log("View OK");
    setConfirmLoading(true);

    setTimeout(() => {
      setViewModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleViewCancel = () => {
    console.log("View Cancel");
    setViewModalOpen(false);
  };

  const [formView] = Form.useForm();

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Employee
      </Button>

      <Modal
        title="Add Employee"
        open={isModalOpen}
        onOk={handleOpenOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        height={1000}
      >
        <CreateEmployee />
      </Modal>

      <ReadEmployee />
      <Modal
        title="New"
        open={viewModalOpen}
        onOk={handleViewOk}
        confirmLoading={confirmLoading}
        onCancel={handleViewCancel}
      >
        <Form
          form={formView}
          name="viewProject"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="timeLine" label="Timeline">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageEmployee;
