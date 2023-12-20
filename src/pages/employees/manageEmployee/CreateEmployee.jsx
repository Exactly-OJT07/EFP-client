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
import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createJourneyCode } from "../../../helpers/code";
import { useCreateEmployee } from "../../../hooks/useEmployee";
import { useGetManager } from "../../../hooks/useManager";
import "../../../styles/ManageEmployee.css";
import { Translation, useTranslation } from "react-i18next";
import { Breadcrumb } from "../../../components/beadcrumb/Breadcrumb";
const { useForm } = Form;

const CreateEmployee = () => {
  const { t } = useTranslation();

  const [formCreate] = useForm();
  const [newCode, setNewCode] = useState(createJourneyCode());
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newDob, setNewDob] = useState("");
  const [newIdentityCard, setNewIdentityCard] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newJoinDate, setNewJoinDate] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIsManager, setNewIsManager] = useState(false);
  const [newManager, setNewManager] = useState("");

  const [newSkills, setNewSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [newExperience, setNewExperience] = useState("");

  const [newLangFrames, setNewLangFrames] = useState([]);
  const [newLangFrame, setNewLangFrame] = useState("");
  const [newLangExperience, setNewLangExperience] = useState("");

  const [newTechs, setNewTechs] = useState([]);
  const [newTech, setNewTech] = useState("");
  const [newTechExperience, setNewTechExperience] = useState("");

  const techs = [
    {
      title: t("EMPLOYEE.TECHNOLOGY"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("EMPLOYEE.EXPERIENCE"),
      dataIndex: "exp",
      key: "exp",
    },
  ];
  const langFrames = [
    {
      title: t("EMPLOYEE.LANGUAGE"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("EMPLOYEE.EXPERIENCE"),
      dataIndex: "exp",
      key: "exp",
    },
  ];
  const skills = [
    {
      title: t("EMPLOYEE.SOFTSKILL"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("EMPLOYEE.EXPERIENCE"),
      dataIndex: "exp",
      key: "exp",
    },
  ];

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
      message.error(t("VALIDATE.ERRORSKILL"));
      return;
    }
    const existingSkill = newSkills.find((skill) => skill.name === newSkill);

    if (existingSkill) {
      message.error(t("VALIDATE.EXISTSKILL"));
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
  //language and Framework
  const addToLangFrame = () => {
    if (!newLangFrame || !newLangExperience) {
      message.error(t("VALIDATE.ERRORLANGUAGE"));
      return;
    }
    const existingLangFrame = newLangFrames.find(
      (langFrame) => langFrame.name === newLangFrame,
    );

    if (existingLangFrame) {
      message.error(t("VALIDATE.EXISTLANGUAGE"));
      return;
    }
    const newLangEntry = {
      name: newLangFrame,
      exp: newLangExperience,
    };
    setNewLangFrames([
      ...newLangFrames,
      { ...newLangEntry, key: newLangFrame.length + 1 },
    ]);
    setNewLangFrame("");
    setNewLangExperience("");
  };
  const removeLangFrame = (key) => {
    const updatedLangFrames = newLangFrames.filter(
      (langFrame) => langFrame.key !== key,
    );
    setNewLangFrames(updatedLangFrames);
  };
  //Technology
  const addToTech = () => {
    if (!newTech || !newTechExperience) {
      message.error(t("VALIDATE.ERRORTECH"));
      return;
    }
    const existingTech = newTechs.find((tech) => tech.name === newTech);

    if (existingTech) {
      message.error(t("VALIDATE.EXISTTECHNOLOGY"));
      return;
    }
    const newTechEntry = {
      name: newTech,
      exp: newTechExperience,
    };
    setNewTechs([...newTechs, { ...newTechEntry, key: newTech.length + 1 }]);
    setNewTech("");
    setNewTechExperience("");
  };
  const removeTech = (key) => {
    const updatedTechs = newTechs.filter((tech) => tech.key !== key);
    setNewTechs(updatedTechs);
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
      formData.langFrame = newLangFrames;
      formData.tech = newTechs;
      formData.avatar = imageUrl;
      formData.code = newCode;
      setConfirmLoading(true);
      createEmployee({
        ...formData,
      });
    } catch (error) {
      message.error(t("VALIDATE.ERROREMPLOYEE"));
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

  const breadcrumbItems = [
    { key: "manageEmployees" },
    { key: "", title: t("EMPLOYEE.CREATE") },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
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
          <Typography.Title level={3}>{t("EMPLOYEE.PROFILE")}</Typography.Title>
          <div>
            <Button
              style={{
                marginRight: "10px",
                borderRadius: "50px",
                height: "35px",
              }}
              onClick={() => navigate("/manageEmployees")}
            >
              {t("BACK")}
            </Button>
            <Button
              style={{
                marginRight: "10px",
                borderRadius: "50px",
                height: "35px",
              }}
              type="primary"
              loading={confirmLoading}
              onClick={handleCreateOk}
            >
              {t("SAVE")}
            </Button>
          </div>
        </div>
        <Row gutter={15}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              label={t("EMPLOYEE.AVATAR")}
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
              label={t("EMPLOYEE.CODE")}
              style={{ width: "100%" }}
              required
            >
              <Input defaultValue={newCode} value={newCode} disabled />
            </Form.Item>

            <Form.Item
              name="name"
              label={t("EMPLOYEE.NAME")}
              style={{ width: "100%" }}
              rules={[{ required: true, message: t("VALIDATE.NAME") }]}
            >
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label={t("EMPLOYEE.PHONE")}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  pattern: /^0[0-9]{9}$/,
                  message: t("VALIDATE.PHONE"),
                },
              ]}
            >
              <Input
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              name="address"
              label={t("EMPLOYEE.ADDRESS")}
              style={{ width: "100%" }}
              rules={[{ required: true, message: t("VALIDATE.ADDRESS") }]}
            >
              <Input
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="email"
              label={t("EMPLOYEE.EMAIL")}
              style={{ width: "100%" }}
              rules={[
                { required: true, message: t("VALIDATE.EMAIL") },
                {
                  type: "email",
                  message: t("VALIDATE.VALIDEMAIL"),
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
              label={t("EMPLOYEE.DOB")}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: t("VALIDATE.DOB"),
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={moment(newDob)}
                placeholder={t("EMPLOYEE.SELECTDOBDATE")}
                onChange={(date) => {
                  setNewDob(date.format("DD/MM/YYYY"));
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) => {
                  const eighteenYearsAgo = moment().subtract(18, "years");
                  return current && current > eighteenYearsAgo.endOf("day");
                }}
              />
            </Form.Item>
            <Form.Item
              name="identityCard"
              label={t("EMPLOYEE.IDENTITY")}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  pattern: /^[0-9]{9,12}$/,
                  message: t("VALIDATE.IDENTITY"),
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
              label={t("EMPLOYEE.GENDER")}
              style={{ width: "100%" }}
              rules={[{ required: true, message: t("VALIDATE.GENDER") }]}
            >
              <Select
                value={newGender}
                onChange={(value) => setNewGender(value)}
              >
                <Select.Option value="male">{t("DATA.MALE")}</Select.Option>
                <Select.Option value="female">{t("DATA.FEMALE")}</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              label={t("EMPLOYEE.DESCRIPTION")}
              style={{ width: "100%" }}
            >
              <Input.TextArea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Typography.Title level={3}>{t("EMPLOYEE.STAFF")}</Typography.Title>
        <Row gutter={15}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="status"
              label={t("EMPLOYEE.STATUS")}
              style={{ width: "100%" }}
              rules={[{ required: true, message: t("VALIDATE.STATUS") }]}
            >
              <Select
                value={newStatus}
                onChange={(value) => setNewStatus(value)}
              >
                <Select.Option value="inactive">
                  {t("DATA.INACTIVE")}
                </Select.Option>
                <Select.Option value="active">{t("DATA.ACTIVE")}</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="position"
              label={t("EMPLOYEE.POSITION")}
              style={{ width: "100%" }}
              rules={[{ required: true, message: t("VALIDATE.POSITION") }]}
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
              label={t("EMPLOYEE.JOINDATE")}
              rules={[{ required: true, message: t("VALIDATE.JOINDATE") }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={moment(newJoinDate)}
                placeholder={t("EMPLOYEE.SELECTJOINDATE")}
                onChange={(e) => {
                  setNewJoinDate(e ? e.format("DD/MM/YYYY") : null);
                }}
                format="DD/MM/YYYY"
                disabledDate={(current) => {
                  return current && current > moment().endOf("day");
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              name="isManager"
              label={t("EMPLOYEE.ISMANAGER")}
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: t("VALIDATE.MANAGER"),
                },
              ]}
            >
              <Radio.Group
                value={newIsManager}
                onChange={(e) => setNewIsManager(e.target.value)}
              >
                <Radio value={true}>{t("DATA.TRUE")}</Radio>
                <Radio value={false}>{t("DATA.FALSE")}</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="managerId" label={t("EMPLOYEE.MANAGER")}>
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
        <Divider />
        <Typography.Title level={3}>{t("EMPLOYEE.LANGFRAME")}</Typography.Title>
        <Row gutter={15}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              label={t("EMPLOYEE.LANGFRAME")}
              style={{ padding: 0, margin: 0 }}
            >
              <Select
                value={newLangFrame}
                onChange={(value) => setNewLangFrame(value)}
                placeholder={t("VALIDATE.LANGUAGE")}
              >
                {[
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "React",
                  "Node.js",
                  "Express",
                  "NestJs",
                  "Python",
                  "C#",
                  "C++",
                  "Java",
                  "Ruby",
                  "PHP",
                ].map((langFrame) => (
                  <Select.Option key={langFrame} value={langFrame}>
                    {langFrame}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={t("EMPLOYEE.EXPERIENCE")}
              style={{ marginBottom: "8px" }}
              rules={[
                {
                  required: true,
                  message: t("VALIDATE.EXPERIENCE"),
                },
              ]}
            >
              <InputNumber
                value={newLangExperience}
                onChange={(value) => setNewLangExperience(value)}
                style={{ width: "100%" }}
                placeholder={t("VALIDATE.EXPERIENCE")}
                min={1}
              />
            </Form.Item>
            <Button
              style={{
                marginTop: "20px",
                borderRadius: "50px",
                height: "35px",
              }}
              type="primary"
              onClick={() => {
                addToLangFrame();
              }}
            >
              {t("EMPLOYEE.ADDLANGUAGE")}
            </Button>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item name="langFrames">
              <Table
                className="skills-table"
                rowKey="name"
                dataSource={newLangFrames.map((langFrame) => ({
                  ...langFrame,
                  key: langFrame.key,
                }))}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  overflow: "auto",
                }}
                columns={[
                  ...langFrames,
                  {
                    title: t("EMPLOYEE.ACTION"),
                    width: 50,
                    render: (record) => (
                      <CloseCircleOutlined
                        type="link"
                        onClick={() => {
                          removeLangFrame(record.key);
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
        <Divider />
        <Typography.Title level={3}>
          {t("EMPLOYEE.TECHNOLOGY")}
        </Typography.Title>
        <Row gutter={15}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              label={t("EMPLOYEE.TECHNOLOGY")}
              style={{ padding: 0, margin: 0 }}
            >
              <Select
                value={newTech}
                onChange={(value) => setNewTech(value)}
                placeholder={t("VALIDATE.TECHNOLOGY")}
              >
                {[
                  "Docker",
                  "Git/GitHub",
                  "Jira",
                  "AWS",
                  "K8S",
                  "Tailwind",
                  "MongoDB",
                  "PostgreSQL",
                  "SQL Server",
                  "Redis",
                ].map((tech) => (
                  <Select.Option key={tech} value={tech}>
                    {tech}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={t("EMPLOYEE.EXPERIENCE")}
              style={{ marginBottom: "8px" }}
              rules={[
                {
                  required: true,
                  message: t("VALIDATE.EXPERIENCE"),
                },
              ]}
            >
              <InputNumber
                value={newTechExperience}
                onChange={(value) => setNewTechExperience(value)}
                style={{ width: "100%" }}
                placeholder={t("VALIDATE.EXPERIENCE")}
                min={1}
              />
            </Form.Item>
            <Button
              style={{
                marginTop: "20px",
                borderRadius: "50px",
                height: "35px",
              }}
              type="primary"
              onClick={() => {
                addToTech();
              }}
            >
              {t("EMPLOYEE.ADDTECHNOLOGY")}
            </Button>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item name="techs">
              <Table
                className="skills-table"
                rowKey="name"
                dataSource={newTechs.map((tech) => ({
                  ...tech,
                  key: tech.key,
                }))}
                style={{
                  width: "100%",
                  maxHeight: "200px",
                  overflow: "auto",
                }}
                columns={[
                  ...techs,
                  {
                    title: t("EMPLOYEE.ACTION"),
                    width: 50,
                    render: (record) => (
                      <CloseCircleOutlined
                        type="link"
                        onClick={() => {
                          removeTech(record.key);
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
        <Divider />
        <Typography.Title level={3}>{t("EMPLOYEE.SOFTSKILL")}</Typography.Title>
        <Row gutter={15}>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item
              label={t("EMPLOYEE.SOFTSKILL")}
              style={{ padding: 0, margin: 0 }}
            >
              <Select
                value={newSkill}
                onChange={(value) => setNewSkill(value)}
                placeholder={t("VALIDATE.SKILL")}
              >
                {["Management", "Planning", "Team Work"].map((skill) => (
                  <Select.Option key={skill} value={skill}>
                    {skill}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label={t("EMPLOYEE.EXPERIENCE")}
              style={{ marginBottom: "8px" }}
              rules={[
                {
                  required: true,
                  message: t("VALIDATE.EXPERIENCE"),
                },
              ]}
            >
              <InputNumber
                value={newExperience}
                onChange={(value) => setNewExperience(value)}
                style={{ width: "100%" }}
                placeholder={t("VALIDATE.EXPERIENCE")}
                min={1}
              />
            </Form.Item>
            <Button
              style={{
                marginTop: "20px",
                borderRadius: "50px",
                height: "35px",
              }}
              type="primary"
              onClick={() => {
                addToSkills();
              }}
            >
              {t("EMPLOYEE.ADDSKILL")}
            </Button>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Form.Item name="skills">
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
                    title: t("EMPLOYEE.ACTION"),
                    width: 50,
                    style: { whiteSpace: "nowrap" },
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
