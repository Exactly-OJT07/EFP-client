import React, { useState, useEffect } from "react";
import { PlusOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Table,
  InputNumber,
  Form,
  Input,
  Button,
  Modal,
  DatePicker,
  Select,
  Spin,
  Radio,
  Upload,
  Col,
  Row,
  Image as AntdImage,
  message,
} from "antd";
import {
  CloudinaryContext,
  Image as CloudImage,
  Transformation,
} from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";
import moment from "moment";
import {
  createEmployeeAPI,
  getManagers,
  checkDuplicateEmployeeAPI,
} from "../../../api/apiUrl";

import axios from "axios";

const { useForm } = Form;

const description = [
  {
    title: "Skill",
    dataIndex: "skill",
    key: "skill",
  },
  {
    title: "Experience",
    dataIndex: "experience",
    key: "experience",
  },
];

const CreateEmployee = ({ data }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { RangePicker } = DatePicker;
  const [formCreate] = useForm();
  const [newCode, setNewCode] = useState("");

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDob, setNewDob] = useState("");
  const [newIdentityCard, setNewIdentityCard] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [employeeData, setEmployeeData] = useState(data || []);
  const [newStatus, setNewStatus] = useState("");

  const [newEmail, setNewEmail] = useState("");
  const [newJoinDate, setNewJoinDate] = useState("");
  const [newFireDate, setNewFireDate] = useState("");
  const [newAvatar, setNewAvatar] = useState("");

  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState("");

  const [newDescription, setNewDescription] = useState([]);

  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
  const [managers, setManagers] = useState([]);
  const [newIsManager, setNewIsManager] = useState(false);
  const [newLineManager, setNewLineManager] = useState(null);

  const [newExp, setNewExp] = useState("");
  const newExperienceObject = { skill: newSkill, exp: newExp };

  const existingData = JSON.parse(localStorage.getItem("experienceData")) || [];
  existingData.push(newExperienceObject);
  localStorage.setItem("experienceData", JSON.stringify(existingData));

  const fetchManagers = async () => {
    try {
      const managersData = await getManagers();
      console.log("Managers data:", managersData);
      setManagers(managersData);
    } catch (error) {
      console.error("Error fetching managers:", error);
      console.log("Request config:", error.config); // Log request config
      console.log("Response data:", error.response.data); // Log response data
      console.log("Response status:", error.response.status); // Log response status
      console.log("Response headers:", error.response.headers); // Log response headers

      // Display a user-friendly error message
      message.error(
        "An error occurred while fetching managers. Please try again later.",
      );
    }
  };
  useEffect(() => {
    fetchManagers().catch((error) => {
      console.error("Unhandled promise rejection:", error);
    });
  }, []);

  const handleSubmit = async () => {
    try {
      const values = await formCreate.validateFields();
      setConfirmLoading(true);
      const requiredFields = [
        { name: "code", label: "Code" },
        { name: "name", label: "Name" },
        { name: "phone", label: "Phone" },
        { name: "email", label: "Email" },
        { name: "dateOfBirth", label: "Date of Birth" },
        { name: "identityCard", label: "Identity Card" },
        { name: "gender", label: "Gender" },
        { name: "status", label: "Status" },
        { name: "position", label: "Position" },
        { name: "isManager", label: "IsManager" },
        { name: "JoinDate", label: "Join Date" },
        { name: "FireDate", label: "Fire Date" },
      ];

      requiredFields.forEach((field) => {
        if (!values[field.name]) {
          throw new Error(`${field.label} is required`);
        }
      });
      const invalidFields = Object.keys(values).filter((fieldName) => {
        const fieldError = formCreate.getFieldError(fieldName);
        return fieldError.length > 0;
      });

      if (invalidFields.length > 0) {
        throw new Error(
          "Some fields are invalid. Please check the form and try again.",
        );
      }

      const employeeData = {
        email: values.email,
        code: values.code,
        name: values.name,
        phone: values.phone,
        dateOfBirth: newDob.toISOString(),
        identityCard: values.identityCard,
        gender: newGender,
        status: newStatus,
        position: newPosition,
        isManager: newIsManager,
        lineManager: values.isManager === false ? values.lineManager : null,
        description: newDescription,
        avatar: newAvatar,
        joinDate: newJoinDate.toISOString(),
        fireDate: newFireDate.toISOString(),
      };
      if (!/^[0-9]{10}$/.test(values.phone)) {
        throw new Error("Phone must be a 10-digit number.");
      }

      if (!/^[0-9]{9}$/.test(values.identityCard)) {
        throw new Error("Identity Card must be a 9-digit number.");
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        throw new Error("Invalid email format.");
      }
      const isDuplicate = await checkDuplicateEmployeeAPI(
        "code",
        values.code,
        "email",
        values.email,
        "phone",
        values.phone,
        "identityCard",
        values.identityCard,
      );
      console.log("Is Duplicate:", isDuplicate);

      if (isDuplicate) {
        throw new Error("Duplicate values found. Please check your input.");
      }

      const createdEmployee = await createEmployeeAPI(employeeData);
      console.log("Employee created:", createdEmployee);
      setConfirmLoading(true);
      setIsModalOpen(false);

      message.success("Employee created successfully!");
      setTimeout(() => {
        formCreate.resetFields();

        setNewCode("");
        setNewName("");
        setNewPhone("");
        setNewDob("");
        setNewIdentityCard("");
        setNewGender("");
        setNewPosition("");
        setNewSkill("");
        setNewExperience("");
        setImageUrl(null);
        setLoading(false);
        setNewDescription([]);
        setNewIsManager(false);
        setNewLineManager(null);
        setNewExp("");
        setNewEmail("");
        setNewJoinDate("");
        setNewFireDate("");
        setNewAvatar("");

        setIsModalOpen(false);
        setConfirmLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error creating employee:", error);

      message.error(error.message);

      setConfirmLoading(false);
    }
  };

  const checkDuplicateEmployeeAPI = async (fields) => {
    try {
      console.log("Checking duplicate:", fields);
      const response = await axios.post(
        `${API_URL.EMPLOYEE}/check-duplicate`,
        fields,
      );
      console.log("Duplicate check response:", response.data);
      return response.data.isDuplicate;
    } catch (error) {
      console.error("Error checking duplicate in database:", error);
      return false;
    }
  };

  const addToDescription = () => {
    const newEntry = {
      skill: newSkill,
      experience: newExperience,
    };

    setNewDescription([...newDescription, newEntry]);
    setNewSkill("");
    setNewExperience("");
    console.log(newDescription);
  };

  const handleIsManagerChange = (value) => {
    setNewIsManager(value);
    if (!value) {
      setNewLineManager(null);
    }
  };

  const disabledFireDate = (current) => {
    return current && current.isBefore(newJoinDate, "day");
  };

  const handleJoinDateChange = (date) => {
    setNewJoinDate(date);
    setNewFireDate(moment(date).add(1, "day"));
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      setImageUrl(info.file.response.secure_url);
      setNewAvatar(info.file.response.secure_url);
      setLoading(false);
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form
        form={formCreate}
        name="createEmployee"
        layout="vertical"
        autoComplete="off"
        validateMessages={{
          required: "Please enter ${label}!",
          types: {
            email: "Please enter a valid ${label}!",
          },
          pattern: {
            mismatch: "Please enter a valid ${label}!",
          },
        }}
      >
        <Col>
          <Form.Item
            label="Avatar"
            valuePropName="avatar"
            getValueFromEvent={normFile}
            value={newAvatar}
            onChange={(e) => setNewAvatar(e.target.value)}
          >
            <CloudinaryContext cloudName="dvm8fnczy" cld={cld}>
              <Upload
                listType="picture-card"
                maxCount={1}
                action={`https://api.cloudinary.com/v1_1/dvm8fnczy/image/upload`}
                data={{ upload_preset: "ackgbz0m" }}
                showUploadList={false}
                onChange={handleChange}
              >
                <Spin spinning={loading} tip="Uploading...">
                  {imageUrl ? (
                    <CloudImage publicId={imageUrl} width="108" height="108">
                      <Transformation crop="fill" />
                    </CloudImage>
                  ) : (
                    <div>
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                  )}
                </Spin>
              </Upload>
            </CloudinaryContext>
          </Form.Item>
        </Col>

        <Row gutter={10}>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="code" label="Code" style={{ width: "100%" }}>
              <Input
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="name" label="Name" style={{ width: "100%" }}>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="phone" label="Phone" style={{ width: "100%" }}>
              <Input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="email" label="Email" style={{ width: "100%" }}>
              <Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="dateOfBirth" label="Dob" style={{ width: "100%" }}>
              <DatePicker
                style={{ width: "100%" }}
                value={moment(newDob)}
                onChange={(date) => setNewDob(date)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item
              name="identityCard"
              label="IdentityCard"
              style={{ width: "100%" }}
            >
              <Input
                value={newIdentityCard}
                onChange={(e) => setNewIdentityCard(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="gender" label="Gender" style={{ width: "100%" }}>
              <Select
                value={newGender}
                onChange={(value) => setNewGender(value)}
              >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="status" label="Status" style={{ width: "100%" }}>
              <Select
                value={newStatus}
                onChange={(value) => setNewStatus(value)}
              >
                <Select.Option value="inactive">Inactive</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item
              name="position"
              label="Position"
              style={{ width: "100%" }}
            >
              <Select
                value={newPosition}
                onChange={(value) => setNewPosition(value)}
              >
                <Select.Option value="fe">Front-end Dev</Select.Option>
                <Select.Option value="be">Back-end Dev</Select.Option>
                <Select.Option value="fullstack">FullStack</Select.Option>
                <Select.Option value="ba">Business Analysis</Select.Option>
                <Select.Option value="qa">Quality Assurance</Select.Option>
                <Select.Option value="devops">DevOps Engineer</Select.Option>
                <Select.Option value="ux_ui">User Experience</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item name="JoinDate" label="JoinDate">
              <DatePicker
                style={{ width: "100%" }}
                value={newJoinDate}
                onChange={handleJoinDateChange}
              />
            </Form.Item>

            <Form.Item name="FireDate" label="FireDate">
              <DatePicker
                style={{ width: "100%" }}
                value={newFireDate}
                onChange={(date) => setNewFireDate(date)}
                disabledDate={disabledFireDate}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item
              name="description"
              label="Description"
              style={{ width: "100%" }}
            >
              <Table
                dataSource={newDescription}
                columns={description}
                pagination={false}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item label="Skill" style={{ marginBottom: "8px" }}>
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Experience" style={{ marginBottom: "8px" }}>
              <InputNumber
                value={newExperience}
                onChange={(value) => setNewExperience(value)}
                style={{ width: "100%" }}
                placeholder="Enter years"
                min={1}
              />
            </Form.Item>

            <div>
              <PlusCircleOutlined
                style={{ fontSize: "24px", marginRight: "8px" }}
                onClick={() => {
                  addToDescription();
                }}
              />
              <span
                onClick={() => {
                  addToDescription();
                }}
              >
                Add
              </span>
            </div>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item
              name="isManager"
              label="IsManager"
              style={{ width: "100%" }}
            >
              <Radio.Group
                value={newIsManager}
                onChange={(e) => setNewIsManager(e.target.value)}
              >
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item
              name="manager"
              label="LineManager"
              style={{ width: "100%" }}
            >
              {console.log("Managers:", managers)}
              <Select
                value={newLineManager}
                onChange={(value) => setNewLineManager(value)}
              >
                {Array.isArray(managers) && managers.length > 0 ? (
                  managers.map((manager) => (
                    <Select.Option key={manager.id} value={manager.id}>
                      {manager.name}
                    </Select.Option>
                  ))
                ) : (
                  <Select.Option value={null} disabled>
                    No managers available
                  </Select.Option>
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default CreateEmployee;
