import React, { useState } from "react";
import { Button, Form, DatePicker, Modal } from "antd";
import "../../styles/ManageEmployee.css";
import ReadEmployee from "./components/ReadEmployee";
import CreateEmployee from "./components/CreateEmployee";
import { useCreateEmployee } from "../../hooks/useEmployee";
import { Cloudinary } from "@cloudinary/url-gen";
import handleSubmit from "./components/CreateEmployee";

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
      try {
        handleSubmit();
        console.log("Create OK");
      } catch (error) {
        console.log(error);
      }

      setTimeout(() => {
        setIsModalOpen(false);
        setConfirmLoading(false);
      }, 2000);
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
    </>
  );
}

export default ManageEmployee;
