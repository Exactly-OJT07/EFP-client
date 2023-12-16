import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Cloudinary } from "@cloudinary/url-gen";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Spin,
  Table,
  Typography,
  Upload,
  message,
} from "antd";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createJourneyCode } from "../../../helpers/code";
import { useCreateEmployee } from "../../../hooks/useEmployee";
import { useGetManager } from "../../../hooks/useManager";
import "../../../styles/ManageEmployee.css";
const { useForm } = Form;

const skills = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Exp",
    dataIndex: "exp",
    key: "exp",
  },
];

const CreateEmployee = () => {
  const [formCreate] = useForm();
  const [newCode, setNewCode] = useState(createJourneyCode());
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDob, setNewDob] = useState("");
  const [newIdentityCard, setNewIdentityCard] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newJoinDate, setNewJoinDate] = useState("");
  const [newFireDate, setNewFireDate] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIsManager, setNewIsManager] = useState(false);
  const [newManager, setNewManager] = useState("");
  const [newSkills, setNewSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
  );
  const [loading, setLoading] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
  const navigate = useNavigate();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data: managers } = useGetManager();
  const { mutate: createEmployee, isError, error } = useCreateEmployee();

  const addToSkills = () => {
    if (!newSkill || !newExperience) {
      message.error("Please enter skill name and years of experience.");
      return;
    }
    const existingSkill = newSkills.find((skill) => skill.name === newSkill);

    if (existingSkill) {
      message.error("Skill already exists. Please choose a different skill.");
      return;
    }
    const newEntry = {
      name: newSkill,
      exp: newExperience,
    };
    setNewSkills([...newSkills, { ...newEntry, key: newSkills.length + 1 }]);
    setNewSkill("");
    setNewExperience("");
  };
  const removeSkill = (key) => {
    const updatedSkills = newSkills.filter((skill) => skill.key !== key);
    setNewSkills(updatedSkills);
  };

  const defaultImageUrl =
    "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp";

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      setImageUrl(info.file.response.secure_url);
      setNewAvatar(info.file.response.secure_url);
      message.success(`uploaded successfully`);
      setLoading(false);
    } else {
      setImageUrl(defaultImageUrl);
      setNewAvatar(null);
      setLoading(false);
    }
  };

  const handleCreateOk = async () => {
    try {
      const formData = await formCreate.validateFields();
      formData.skills = newSkills;
      formData.avatar = imageUrl;
      formData.code = newCode;
      setConfirmLoading(true);
      createEmployee({
        ...formData,
      });
    } catch (error) {
      message.error("Error creating employee. Please check the form.");
    }
  };

  useEffect(() => {
    formCreate.setFields([{ name: "email", errors: [] }]);

    if (isError) {
      formCreate.setFields([
        {
          name: "email",
          errors: [error.response.data.message],
        },
      ]);
    }
  }, [isError]);

  return (
    <>
      <Form
        form={formCreate}
        name="createEmployee"
        layout="vertical"
        autoComplete="off"
        validateMessages={{
          required: "Please input ${label}!",
          types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!",
          },
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography.Title level={3}>Personal</Typography.Title>
          <div>
            <Button
              style={{ marginRight: "10px" }}
              onClick={() => navigate("/manageEmployees")}
            >
              Back
            </Button>
            <Button type="primary" onClick={handleCreateOk}>
              Save
            </Button>
          </div>
        </div>
        <Row gutter={15}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              label="Avatar"
              valuePropName="avatar"
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CloudinaryContext cloudName="dvm8fnczy" cld={cld}>
                  <div style={{ marginTop: "10px" }}>
                    <Upload
                      listType="picture-circle"
                      maxCount={1}
                      action={`https://api.cloudinary.com/v1_1/dvm8fnczy/image/upload`}
                      data={{ upload_preset: "ackgbz0m" }}
                      showUploadList={false}
                      onChange={handleChange}
                    >
                      <Spin spinning={loading} tip="Uploading...">
                        {imageUrl ? (
                          <div className="rounded-image-container">
                            <CloudImage
                              publicId={imageUrl}
                              style={{
                                width: "100px",
                                paddingTop: "5px",
                                borderRadius: "100%",
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            <PlusOutlined />
                          </div>
                        )}
                      </Spin>
                    </Upload>
                  </div>
                </CloudinaryContext>
              </div>
            </Form.Item>
            <Form.Item
              name="code"
              label="Code"
              style={{ width: "100%" }}
              required
            >
              <Input defaultValue={newCode} value={newCode} disabled />
            </Form.Item>

            <Form.Item
              name="name"
              label="Name"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please enter a Name!" }]}
            >
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{10}$/,
                  message: "Phone must be 10 digits",
                },
              ]}
            >
              <Input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="email"
              label="Email"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Please input your email!" },
                {
                  type: "email",
                  message: "Please enter a valid email address!",
                },
              ]}
            >
              <Input
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="dateOfBirth"
              label="Dob"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please select the date of birth!",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={moment(newDob)}
                onChange={(date) => {
                  setNewDob(date.format("DD/MM/YYYY"));
                  console.log(date);
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) => {
                  // Disable dates after today
                  return current && current > moment().endOf("day");
                }}
              />
            </Form.Item>
            <Form.Item
              name="identityCard"
              label="IdentityCard"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{9}$/,
                  message: "IdentityCard must be 9 digits",
                },
              ]}
            >
              <Input
                value={newIdentityCard}
                onChange={(e) => setNewIdentityCard(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="gender"
              label="Gender"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please select a Gender!" }]}
            >
              <Select
                value={newGender}
                onChange={(value) => setNewGender(value)}
              >
                <Select.Option value="male">Male</Select.Option>
                <Select.Option value="female">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              style={{ width: "100%" }}
            >
              <Input.TextArea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={3}>Staff Infomation</Typography.Title>
        <Row gutter={15}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="status"
              label="Status"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please select a Status!" }]}
            >
              <Select
                value={newStatus}
                onChange={(value) => setNewStatus(value)}
              >
                <Select.Option value="inactive">Inactive</Select.Option>
                <Select.Option value="active">Active</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="position"
              label="Position"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please select a Position!" }]}
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
            <Form.Item
              name="joinDate"
              label="Join Date"
              rules={[
                { required: true, message: "Please select a Join Date!" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={moment(newJoinDate)}
                onChange={(e) => {
                  setNewJoinDate(e ? e.format("DD/MM/YYYY") : null);
                  console.log(e);
                }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="isManager"
              label="IsManager"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Please select whether the employee is a manager!",
                },
              ]}
            >
              <Radio.Group
                value={newIsManager}
                onChange={(e) => setNewIsManager(e.target.value)}
              >
                <Radio value={true}>True</Radio>
                <Radio value={false}>False</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="managerId" label="Manager">
              <Select
                value={newManager.id}
                onChange={(value, option) =>
                  setNewManager({ id: value, name: option.children })
                }
              >
                {(managers || []).map((manager) => (
                  <Select.Option key={manager.id} value={manager.id}>
                    {manager.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={3}>Skill</Typography.Title>
        <Row gutter={15}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item label="Name" style={{ padding: 0, margin: 0 }}>
              <Select
                value={newSkill}
                onChange={(value) => setNewSkill(value)}
                placeholder="Please select a skill"
              >
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Express",
                  "MongoDB",
                  "Python",
                  "Django",
                  "Flask",
                ].map((skill) => (
                  <Select.Option key={skill} value={skill}>
                    {skill}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Exp"
              style={{ marginBottom: "8px" }}
              rules={[
                {
                  required: true,
                  message: "Please enter the years of experience!",
                },
              ]}
            >
              <InputNumber
                value={newExperience}
                onChange={(value) => setNewExperience(value)}
                style={{ width: "100%" }}
                placeholder="Enter years"
                min={1}
              />
            </Form.Item>
            <Button
              style={{ marginTop: "20px" }}
              type="primary"
              onClick={() => {
                addToSkills();
              }}
            >
              Add skill
            </Button>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item name="skills" label="Skills">
              <Table
                className="skills-table"
                rowKey="name"
                dataSource={newSkills.map((skill) => ({
                  ...skill,
                  key: skill.key,
                }))}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  overflow: "auto",
                }}
                columns={[
                  ...skills,
                  {
                    title: "Action",
                    width: 50,
                    render: (record) => (
                      <CloseCircleOutlined
                        type="link"
                        onClick={() => {
                          removeSkill(record.key);
                        }}
                      />
                    ),
                  },
                ]}
                pagination={false}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default CreateEmployee;
