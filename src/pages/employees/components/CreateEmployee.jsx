import React, { useState } from "react";
import { PlusOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  Table,
  InputNumber,
  Button,
  Form,
  Input,
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
import { useGetManager } from "../../../hooks/useManager";
import { useCreateEmployee } from "../../../hooks/useEmployee";

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

const CreateEmployee = ({ isModalOpen, setIsModalOpen }) => {
  const [formCreate] = useForm();

  const [newCode, setNewCode] = useState("");
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

  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });

  const [confirmLoading, setConfirmLoading] = useState(false);

  const { data: managers } = useGetManager();

  const { mutate: createEmployee } = useCreateEmployee();

  const addToSkills = () => {
    const newEntry = {
      name: newSkill,
      exp: newExperience,
    };
    console.log(newEntry);

    setNewSkills([...newSkills, newEntry]);
    setNewSkill("");
    setNewExperience("");
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

  const handleCreateOk = async () => {
    const formData = await formCreate.validateFields();
    formData.skills = newSkills;
    formData.avatar = imageUrl;

    setConfirmLoading(true);
    createEmployee({
      ...formData,
    });
    formCreate.resetFields();
    setNewSkills([]);
    setConfirmLoading(false);
    setIsModalOpen(false);
  };

  const handleCreateCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Create"
        open={isModalOpen}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
        confirmLoading={confirmLoading}
        width="1000px"
      >
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
          <Col>
            <Form.Item
              label="Avatar"
              valuePropName="avatar"
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
              <Form.Item
                name="email"
                label="Email"
                style={{ width: "100%" }}
                rules={[{ required: true }]}
              >
                <Input
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="description"
                label="Description"
                style={{ width: "100%" }}
              >
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="dateOfBirth"
                label="Dob"
                style={{ width: "100%" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={moment(newDob)}
                  onChange={(date) => {
                    setNewDob(date.format("YYYY-MM-DD"));
                    console.log(date);
                  }}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="identityCard"
                label="IdentityCard"
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

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="joinDate" label="Join Date">
                <DatePicker
                  style={{ width: "100%" }}
                  value={moment(newJoinDate)}
                  onChange={(e) => {
                    setNewJoinDate(e ? e.format("YYYY-MM-DD") : null);
                    console.log(e);
                  }}
                  format="DD/MM/YYYY"
                />
              </Form.Item>
              <Form.Item name="fireDate" label="Fire Date">
                <DatePicker
                  style={{ width: "100%" }}
                  value={newFireDate ? moment(newFireDate) : null}
                  onChange={(e) =>
                    setNewFireDate(e ? e.format("YYYY-MM-DD") : null)
                  }
                  format="DD/MM/YYYY"
                  disabledDate={(current) => {
                    return current && current < moment(newJoinDate);
                  }}
                />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="skills" label="Skills" style={{ width: "100%" }}>
                <Table
                  rowKey="name"
                  dataSource={newSkills.map((skill) => ({
                    ...skill,
                    key: skill.skill,
                  }))}
                  columns={[
                    ...skills,
                    {
                      title: "Action",
                      render: (record) => (
                        <Button onClick={() => removeSkill(record.key)}>
                          Remove
                        </Button>
                      ),
                    },
                  ]}
                  pagination={false}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item label="Name" style={{ marginBottom: "8px" }}>
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Exp" style={{ marginBottom: "8px" }}>
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
                    addToSkills();
                  }}
                />
              </div>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};
export default CreateEmployee;
