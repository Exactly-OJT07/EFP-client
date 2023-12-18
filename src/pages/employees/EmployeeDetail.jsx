import {
  Image as AntdImage,
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
  Typography,
  Table,
} from "antd";
import { DownloadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "../../components/beadcrumb/Breadcrumb";
import { useGetOneEmployee } from "../../hooks/useEmployee";
import { useGetManager } from "../../hooks/useManager";
import "../../styles/EmployeeDetail.css";
import DeleteEmployee from "./employeeDetail/DeleteEmployee";
import TrackingHistory from "./employeeDetail/TrackingHistory";

const { TextArea } = Input;

const EmployeeDetail = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: employee, isLoading, isError } = useGetOneEmployee(id);

  const { data: managers } = useGetManager();

  const [editAvatar, setEditAvatar] = useState("");
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editIdentity, setEditIdentity] = useState("");
  const [editDoB, setEditDoB] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editPosition, setEditPosition] = useState("");
  const [editJoinDate, setEditJoinDate] = useState("");
  const [editFireDate, setEditFireDate] = useState("");
  const [editManager, setEditManager] = useState("");
  const [editGender, setEditGender] = useState("");

  const [editSkills, setEditSkills] = useState([]);
  const [editSkill, setEditSkill] = useState("");
  const [editSkillExperience, setEditSkillExperience] = useState("");

  const [editLangFrames, setEditLangFrames] = useState([]);
  const [editLangFrame, setEditLangFrame] = useState("");
  const [editLangExperience, setEditLangExperience] = useState("");

  const [editTechs, setEditTechs] = useState([]);
  const [editTech, setEditTech] = useState("");
  const [editTechExperience, setEditTechExperience] = useState("");

  if (isLoading) {
    return (
      <Spin
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    );
  }

  if (isError || !employee) {
    return <div>Employee not found</div>;
  }

  const {
    avatar,
    name,
    code,
    email,
    phone,
    identityCard,
    dateOfBirth,
    gender,
    status,
    position,
    skills,
    langFrame,
    tech,
    address,
    description,
    joinDate,
    fireDate,
    manager,
  } = employee?.employee;

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
      title: t("EMPLOYEE.LANGFRAME"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: t("EMPLOYEE.EXPERIENCE"),
      dataIndex: "exp",
      key: "exp",
    },
  ];
  const skillss = [
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

  const addToSkills = () => {
    if (!editSkill || !editSkillExperience) {
      message.error(t("VALIDATE.ERROR_SKILL"));
      return;
    }
    const existingSkill = editSkills.find((skill) => skill.name === editSkill);

    if (existingSkill) {
      message.error(t("VALIDATE.EXIST_SKILL"));
      return;
    }
    const newEntry = {
      name: editSkill,
      exp: editSkillExperience,
    };
    setEditSkills([...editSkills, { ...newEntry, key: editSkills.length + 1 }]);
    setEditSkill("");
    setEditSkillExperience("");
  };
  const removeSkill = (key) => {
    const updatedSkills = editSkills.filter((skill) => skill.key !== key);
    setEditSkills(updatedSkills);
  };

  const addToLangFrame = () => {
    if (!editLangFrame || !editLangExperience) {
      message.error(t("VALIDATE.ERROR_LANGUAGE"));
      return;
    }
    const existingLangFrame = editLangFrames.find(
      (langFrame) => langFrame.name === editLangFrame,
    );

    if (existingLangFrame) {
      message.error("VALIDATE.EXIST_LANGFRAME");
      return;
    }
    const editLangEntry = {
      name: editLangFrame,
      exp: editLangExperience,
    };
    setEditLangFrames([
      ...editLangFrames,
      { ...editLangEntry, key: editLangFrame.length + 1 },
    ]);
    setEditLangFrame("");
    setEditLangExperience("");
  };
  const removeLangFrame = (key) => {
    const updatedLangFrames = editLangFrames.filter(
      (langFrame) => langFrame.key !== key,
    );
    setEditLangFrames(updatedLangFrames);
  };

  const addToTech = () => {
    if (!editTech || !editTechExperience) {
      message.error(t("VALIDATE.TECHNOLOGY"));
      return;
    }
    const existingTech = editTechs.find((tech) => tech.name === editTech);

    if (existingTech) {
      message.error("VALIDATE.EXIST_TECHNOLOGY");
      return;
    }
    const editTechEntry = {
      name: editTech,
      exp: editTechExperience,
    };
    setEditTechs([
      ...editTechs,
      { ...editTechEntry, key: editTech.length + 1 },
    ]);
    setEditTech("");
    setEditTechExperience("");
  };
  const removeTech = (key) => {
    const updatedTechs = editTechs.filter((tech) => tech.key !== key);
    setEditTechs(updatedTechs);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleEditOk = () => {};

  const breadcrumbItems = [
    { key: "manageEmployees" },
    { key: "", title: name },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography.Title level={3} style={{ lineHeight: "30px" }}>
          <Translation>{(t) => t("EMPLOYEE.DETAIL")}</Translation>
        </Typography.Title>
        <div>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => navigate("/manageEmployees")}
          >
            <Translation>{(t) => t("BACK")}</Translation>
          </Button>
        </div>
      </div>
      <Form layout="vertical">
        <Row gutter={32}>
          <Col align="middle" md={{ span: 24 }} lg={{ span: 12 }}>
            <Row gutter={32} layout="vertical">
              <Col span={24}>
                <AntdImage
                  width="200px"
                  height="200px"
                  style={{ borderRadius: "100%" }}
                  src={avatar}
                />
              </Col>
              <Col span={24}>
                <Button style={{ margin: "10px" }}>
                  <Translation>{(t) => t("EMPLOYEE.CHANGEAVATAR")}</Translation>
                </Button>
              </Col>
              <Col span={24}>
                <Button
                  icon={<DownloadOutlined />}
                  type="primary"
                  style={{ margin: "10px", background: "green" }}
                >
                  <Translation>{(t) => t("EMPLOYEE.EXPORT")}</Translation>
                </Button>
              </Col>
              <Col span={24}>
                <TrackingHistory />
              </Col>
            </Row>
          </Col>
          <Col md={{ span: 24, align: "middle" }} lg={{ span: 12 }}>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  label={<Translation>{(t) => t("EMPLOYEE.CODE")}</Translation>}
                >
                  <Input
                    value={code ? code : ""}
                    style={{ maxWidth: "300px" }}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.MANAGER")}</Translation>
                  }
                >
                  <Select
                    defaultValue={
                      manager?.name ? manager.name : t("EMPLOYEE.NOMANAGER")
                    }
                    onChange={(value, option) =>
                      setEditManager({ id: value, name: option.children })
                    }
                    style={{ maxWidth: "300px" }}
                  >
                    {(managers || []).map((manager) => (
                      <Select.Option key={manager.id} value={manager.id}>
                        {manager.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<Translation>{(t) => t("EMPLOYEE.NAME")}</Translation>}
                >
                  <Input
                    defaultValue={name}
                    onChange={(e) => {
                      setEditName(e.target.value);
                    }}
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.EMAIL")}</Translation>
                  }
                >
                  <Input
                    defaultValue={email}
                    onChange={(e) => {
                      setEditEmail(e.target.value);
                    }}
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.PHONE")}</Translation>
                  }
                >
                  <Input
                    defaultValue={phone}
                    onChange={(e) => {
                      setEditPhone(e.target.value);
                    }}
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.IDENTITY")}</Translation>
                  }
                >
                  <Input
                    defaultValue={identityCard}
                    onChange={(e) => {
                      setEditIdentity(e.target.value);
                    }}
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.JOINDATE")}</Translation>
                  }
                >
                  <DatePicker
                    style={{ width: "300px" }}
                    defaultValue={moment(joinDate)}
                    onChange={(e) => {
                      setEditJoinDate(e ? e.format("DD/MM/YYYY") : null);
                      console.log(e);
                    }}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Fire Date">
                  <DatePicker
                    style={{ width: "300px" }}
                    defaultValue={moment(fireDate)}
                    onChange={(e) => {
                      setEditFireDate(e ? e.format("DD/MM/YYYY") : null);
                      console.log(e);
                    }}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<Translation>{(t) => t("EMPLOYEE.DOB")}</Translation>}
                >
                  <DatePicker
                    style={{ width: "300px" }}
                    defaultValue={moment(dateOfBirth)}
                    onChange={(e) => {
                      setEditDoB(e ? e.format("DD/MM/YYYY") : null);
                      console.log(e);
                    }}
                    format="DD/MM/YYYY"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.GENDER")}</Translation>
                  }
                >
                  <Select
                    defaultValue={gender}
                    onChange={(value) => setEditGender(value)}
                    style={{ maxWidth: "300px" }}
                  >
                    <Select.Option value="male">Male</Select.Option>
                    <Select.Option value="female">Female</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.POSITION")}</Translation>
                  }
                >
                  <Select
                    defaultValue={position}
                    onChange={(value) => setEditPosition(value)}
                    style={{ maxWidth: "300px" }}
                  >
                    <Select.Option value="fe">Front-end Dev</Select.Option>
                    <Select.Option value="be">Back-end Dev</Select.Option>
                    <Select.Option value="fullstack">FullStack</Select.Option>
                    <Select.Option value="ba">Business Analysis</Select.Option>
                    <Select.Option value="qa">Quality Assurance</Select.Option>
                    <Select.Option value="devops">
                      DevOps Engineer
                    </Select.Option>
                    <Select.Option value="ux_ui">User Experience</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.STATUS")}</Translation>
                  }
                >
                  <Select
                    defaultValue={status}
                    onChange={(value) => setEditStatus(value)}
                    style={{ maxWidth: "300px" }}
                  >
                    <Select.Option value="inactive">Inactive</Select.Option>
                    <Select.Option value="active">Active</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.ADDRESS")}</Translation>
                  }
                >
                  <Input
                    rows={6}
                    placeholder={t("EMPLOYEE.ADDRESS")}
                    defaultValue={address}
                    onChange={(e) => {
                      setEditAddress(e.target.value);
                    }}
                    style={{ maxWidth: "680px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label={
                    <Translation>
                      {(t) => t("EMPLOYEE.DESCRIPTION")}
                    </Translation>
                  }
                >
                  <TextArea
                    rows={6}
                    placeholder="Description"
                    defaultValue={description}
                    onChange={(e) => {
                      setEditDescription(e.target.value);
                    }}
                    style={{ maxWidth: "680px" }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Row gutter={15}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item label={t("EMPLOYEE.SOFTSKILL")}>
                  <Select
                    value={editSkill}
                    onChange={(value) => setEditSkill(value)}
                    placeholder={t("VALIDATE.SKILL")}
                  >
                    {["Management", "Planning", "Team Work"].map((skill) => (
                      <Select.Option key={skill} value={skill}>
                        {skill}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item label={t("EMPLOYEE.EXPERIENCE")}>
                  <InputNumber
                    value={editSkillExperience}
                    onChange={(value) => setEditSkillExperience(value)}
                    style={{ width: "100%" }}
                    placeholder={t("VALIDATE.EXPERIENCE")}
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
                  {t("EMPLOYEE.ADDSKILL")}
                </Button>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item name="skills">
                  <Table
                    className="skills-table"
                    rowKey="name"
                    dataSource={editSkills?.map((skill) => ({
                      ...skill,
                      key: skill.key,
                    }))}
                    style={{
                      width: "100%",
                      maxHeight: "200px",
                      overflow: "auto",
                    }}
                    columns={[
                      ...skillss,
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
          </Col>
          <Col span={24}>
            <Row gutter={15}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label={t("EMPLOYEE.LANGFRAME")}
                  style={{ padding: 0, margin: 0 }}
                >
                  <Select
                    value={editLangFrame}
                    onChange={(value) => setEditLangFrame(value)}
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
                    value={editLangExperience}
                    onChange={(value) => setEditLangExperience(value)}
                    style={{ width: "100%" }}
                    placeholder={t("VALIDATE.EXPERIENCE")}
                    min={1}
                  />
                </Form.Item>
                <Button
                  style={{ marginTop: "20px" }}
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
                    dataSource={editLangFrames?.map((langFrame) => ({
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
          </Col>
          <Col span={24}>
            <Row gutter={15}>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item
                  label={t("EMPLOYEE.TECHNOLOGY")}
                  style={{ padding: 0, margin: 0 }}
                >
                  <Select
                    value={editTech}
                    onChange={(value) => setEditTech(value)}
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
                    value={editTechExperience}
                    onChange={(value) => setEditTechExperience(value)}
                    style={{ width: "100%" }}
                    placeholder={t("VALIDATE.EXPERIENCE")}
                    min={1}
                  />
                </Form.Item>
                <Button
                  style={{ marginTop: "20px" }}
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
                    dataSource={editTechs.map((tech) => ({
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
          </Col>
        </Row>
        <Button type="primary" style={{ margin: "5px" }} onClick={handleEditOk}>
          <Translation>{(t) => t("EDIT")}</Translation>
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <Translation>{(t) => t("DELETE")}</Translation>
        </Button>
        <DeleteEmployee
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          width="500px"
          onCancel={handleCloseDeleteModal}
        />
      </Form>
    </>
  );
};

export default EmployeeDetail;
