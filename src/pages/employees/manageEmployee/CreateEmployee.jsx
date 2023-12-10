import React, { useState } from "react";
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
} from "antd";
import {
  CloudinaryContext,
  Image as CloudImage,
  Transformation,
} from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";
import moment from "moment";
import { createEmployeeAPI } from "../../../api/apiUrl";
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
  const [newCid, setNewCid] = useState("");
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

  const [newIsManager, setNewIsManager] = useState(false);
  const [newLineManager, setNewLineManager] = useState(null);

  const [newExp, setNewExp] = useState("");
  const newExperienceObject = { skill: newSkill, exp: newExp };

  const existingData = JSON.parse(localStorage.getItem("experienceData")) || [];
  existingData.push(newExperienceObject);
  localStorage.setItem("experienceData", JSON.stringify(existingData));

  const handleSubmit = async () => {
    try {
      setConfirmLoading(true);
      console.log("createEmployeeAPI:", createEmployeeAPI);
      const employeeData = {
        email: newEmail,
        code: newCode,
        name: newName,
        phone: newPhone,
        dateOfBirth: newDob.toISOString(),
        identityCard: newCid,
        gender: newGender,
        status: newStatus,
        position: newPosition,
        isManager: newIsManager,
        lineManager: newLineManager,
        description: newDescription,
        avatar: newAvatar,
        joinDate: newJoinDate.toISOString(),
        fireDate: newFireDate.toISOString(),
      };

      const createdEmployee = await createEmployeeAPI(employeeData);
      console.log("Employee created:", createdEmployee);
      setConfirmLoading(false);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating employee:", error);
      console.error("Detailed error response:", error.response);
      setConfirmLoading(false);
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
      >
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
              label="CID"
              style={{ width: "100%" }}
            >
              <Input
                value={newCid}
                onChange={(e) => setNewCid(e.target.value)}
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
                <Select.Option value="inactive">inactive</Select.Option>
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
                <Select.Option value="fe">Developer</Select.Option>
                <Select.Option value="be">Manager</Select.Option>
                <Select.Option value="fullstack">Developer</Select.Option>
                <Select.Option value="ba">Manager</Select.Option>
                <Select.Option value="qa">Developer</Select.Option>
                <Select.Option value="devops">Manager</Select.Option>
                <Select.Option value="ux_ui">Developer</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12} md={12} lg={6} xl={6}>
            <Form.Item
              name="isManager"
              label="IsManager"
              style={{ width: "100%" }}
            >
              <Radio.Group
                value={newIsManager}
                onChange={(e) => handleIsManagerChange(e.target.value)}
              >
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>

          {newIsManager === false && (
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="manager"
                label="LineManager"
                style={{ width: "100%" }}
              >
                <Select
                  value={newLineManager}
                  onChange={(value) => setNewLineManager(value)}
                >
                  <Select.Option value="listname">listname</Select.Option>
                  <Select.Option value="test">test</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          )}

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

          <Col
            xs={24}
            sm={12}
            md={12}
            lg={6}
            xl={6}
            span={8}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
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
                      <CloudImage publicId={imageUrl} width="95" height="93">
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

          <Col>
            <Form.Item name="JoinDate" label="JoinDate">
              <DatePicker
                style={{ width: "100%" }}
                value={moment(newJoinDate)}
                onChange={(date) => setNewJoinDate(date)}
              />
            </Form.Item>

            <Form.Item name="FireDate" label="FireDate">
              <DatePicker
                style={{ width: "100%" }}
                value={moment(newFireDate)}
                onChange={(date) => setNewFireDate(date)}
              />
            </Form.Item>
          </Col>
          <Button type="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Row>
      </Form>
    </>
  );
};

export default CreateEmployee;
