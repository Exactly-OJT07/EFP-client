import { CloseCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import {
  Image as AntdImage,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Table,
  Typography,
  message,
} from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "../../components/beadcrumb/Breadcrumb";
import { useCVExport, useGetOneEmployee, useUpdateEmployee } from "../../hooks/useEmployee";
import { useGetManager } from "../../hooks/useManager";
import "../../styles/EmployeeDetail.css";
import TrackingHistory from "./employeeDetail/TrackingHistory";
import { edit } from "@cloudinary/url-gen/actions/animated";

const { TextArea } = Input;

const EmployeeDetail = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: managers } = useGetManager();
  const { data: employee } = useGetOneEmployee(id);
  console.log(employee);

  const [editLangs, setEditLangs] = useState([]);
  const [editLang, setEditLang] = useState("");
  const [editLangExperience, setEditLangExperience] = useState("");

  const [editTechs, setEditTechs] = useState([]);
  const [editTech, setEditTech] = useState("");
  const [editTechExperience, setEditTechExperience] = useState("");

  const [editSkills, setEditSkills] = useState([]);
  const [editSkill, setEditSkill] = useState("");
  const [editSkillExperience, setEditSkillExperience] = useState("");

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

  const initialValues = {
    code: employee?.employee.code ?? "",
    description: employee?.employee.description ?? "",
    email: employee?.employee.email ?? "",
    identityCard: employee?.employee.identityCard ?? "",
    name: employee?.employee.name ?? "",
    phone: employee?.employee.phone ?? "",
    manager: employee?.employee.managerId ?? "",
    joinDate: moment(employee?.employee.joinDate),
    dateOfBirth: moment(employee?.employee.dateOfBirth),
    gender: employee?.employee.gender,
    position: employee?.employee.position,
    status: employee?.employee.status,
    address: employee?.employee.address,
    langFrame: employee?.employee.langFrame,
    tech: employee?.employee.tech,
    skills: employee?.employee.skills,
  };

  // useEffect(() => {
  //   setEditTechs([...editTechs, initialValues.tech]);
  // }, [initialValues.tech])

  useEffect(() => {
    if (initialValues.langFrame) {
      const newLangEntries = initialValues.langFrame.map((langFrame) => ({
        name: langFrame.name,
        exp: langFrame.exp,
        key: langFrame.key,
      }));

      setEditLangs([...editLangs, ...newLangEntries]);
    }
    if (initialValues.tech) {
      const newTechEntries = initialValues.tech.map((tech) => ({
        name: tech.name,
        exp: tech.exp,
        key: tech.key,
      }));

      setEditTechs([...editTechs, ...newTechEntries]);
    }
    if (initialValues.skills) {
      const newSkillEntries = initialValues.skills.map((skill) => ({
        name: skill.name,
        exp: skill.exp,
        key: skill.key,
      }));

      setEditSkills([...editSkills, ...newSkillEntries]);
    }
  }, [initialValues.langFrame, initialValues.tech, initialValues.skills]);

  const EmployeeUpdateMutation = useUpdateEmployee(id);

  const onFinish = async (value) => {
    value.skills = editSkills;
    value.langFrame = editLangs;
    value.tech = editTechs;
    console.log(value);
    console.log(id);
    try {
      // Assuming your useUpdateEmployee hook handles the mutation logic
      await EmployeeUpdateMutation.mutateAsync({
        employeeId: id,
        data: value,
      });
      setEditSkills([]);
      setEditLangs([]);
      setEditTechs([]);
      // Optionally: Handle success, navigate, or perform other actions on successful mutation
    } catch (error) {
      console.error("Error updating employee data:", error);
      // Optionally: Handle error, show error message, or perform other actions on failed mutation
    }
  };

  const addToLangFrame = () => {
    if (!editLang || !editLangExperience) {
      message.error(t("VALIDATE.ERROR_LANGUAGE"));
      return;
    }
    const existingLangFrame = editLangs.find(
      (langFrame) => langFrame.name === editLang,
    );

    if (existingLangFrame) {
      message.error(t("VALIDATE.EXIST_LANGFRAME"));
      return;
    }
    const editLangEntry = {
      name: editLang,
      exp: editLangExperience,
    };
    setEditLangs([
      ...editLangs,
      { ...editLangEntry, key: editLang.length + 1 },
    ]);
    setEditLang("");
    setEditLangExperience("");
  };
  const removeLangFrame = (key) => {
    const updatedLangFrames = editLangs.filter(
      (langFrame) => langFrame.key !== key,
    );
    setEditLangs(updatedLangFrames);
  };

  const addToTech = () => {
    if (!editTech || !editTechExperience) {
      message.error(t("VALIDATE.TECHNOLOGY"));
      return;
    }
    // const existingTech = editTechs.find((tech) => tech.name === editTech);

    // if (existingTech) {
    //   message.error("VALIDATE.EXIST_TECHNOLOGY");
    //   return;
    // }
    const editTechEntry = {
      name: editTech,
      exp: editTechExperience,
      key: editTechs.length + 1,
    };
    setEditTechs([...editTechs, editTechEntry]);
    form.setFieldsValue({
      techs: [...initialValues.tech, editTechEntry],
    });
    setEditTech("");
    setEditTechExperience("");
  };
  const removeTech = (key) => {
    const updatedTechs = editTechs.filter((tech) => tech.key !== key);
    setEditTechs(updatedTechs);
  };

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

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const breadcrumbItems = [
    { key: "manageEmployees" },
    { key: "", title: employee?.employee.name },
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
      {employee && (
        <Form
          form={form}
          initialValues={initialValues}
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={32}>
            <Col align="middle" md={{ span: 24 }} lg={{ span: 12 }}>
              <Row gutter={32} layout="vertical">
                <Col span={24}>
                  <AntdImage
                    width="200px"
                    height="200px"
                    style={{ borderRadius: "100%" }}
                    src={employee.employee.avatar}
                  />
                </Col>
                <Col span={24}>
                  <Button style={{ margin: "10px" }}>
                    <Translation>
                      {(t) => t("EMPLOYEE.CHANGEAVATAR")}
                    </Translation>
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
                    name="code"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.CODE")}</Translation>
                    }
                  >
                    <Input style={{ maxWidth: "300px" }} disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="manager"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.MANAGER")}</Translation>
                    }
                  >
                    <Select style={{ maxWidth: "300px" }}>
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
                    name="name"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.NAME")}</Translation>
                    }
                  >
                    <Input style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.EMAIL")}</Translation>
                    }
                  >
                    <Input style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.PHONE")}</Translation>
                    }
                  >
                    <Input style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="identityCard"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.IDENTITY")}</Translation>
                    }
                  >
                    <Input style={{ maxWidth: "300px" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="joinDate"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.JOINDATE")}</Translation>
                    }
                  >
                    <DatePicker
                      style={{ width: "300px" }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateOfBirth"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.DOB")}</Translation>
                    }
                  >
                    <DatePicker
                      style={{ width: "300px" }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="gender"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.GENDER")}</Translation>
                    }
                  >
                    <Select style={{ maxWidth: "300px" }}>
                      <Select.Option value="male">Male</Select.Option>
                      <Select.Option value="female">Female</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="position"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.POSITION")}</Translation>
                    }
                  >
                    <Select style={{ maxWidth: "300px" }}>
                      <Select.Option value="fe">Front-end Dev</Select.Option>
                      <Select.Option value="be">Back-end Dev</Select.Option>
                      <Select.Option value="fullstack">FullStack</Select.Option>
                      <Select.Option value="ba">
                        Business Analysis
                      </Select.Option>
                      <Select.Option value="qa">
                        Quality Assurance
                      </Select.Option>
                      <Select.Option value="devops">
                        DevOps Engineer
                      </Select.Option>
                      <Select.Option value="ux_ui">
                        User Experience
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="status"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.STATUS")}</Translation>
                    }
                  >
                    <Select style={{ maxWidth: "300px" }}>
                      <Select.Option value="inactive">Inactive</Select.Option>
                      <Select.Option value="active">Active</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="address"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.ADDRESS")}</Translation>
                    }
                  >
                    <Input
                      rows={6}
                      placeholder={t("EMPLOYEE.ADDRESS")}
                      style={{ maxWidth: "680px" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label={
                      <Translation>
                        {(t) => t("EMPLOYEE.DESCRIPTION")}
                      </Translation>
                    }
                  >
                    <TextArea
                      rows={6}
                      placeholder="Description"
                      style={{ maxWidth: "680px" }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label={t("EMPLOYEE.LANGFRAME")}
                style={{ padding: 0, margin: 0 }}
              >
                <Select
                  value={editLang}
                  onChange={(value) => setEditLang(value)}
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
              <Form.Item name="langFrame">
                <Table
                  className="skills-table"
                  rowKey="name"
                  dataSource={editLangs.map((langFrame) => ({
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
          <Row gutter={16}>
            <Col span={24}>
              <Row gutter={15}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Form.Item
                    label={t("EMPLOYEE.TECHNOLOGY")}
                    style={{ padding: 0, margin: 0 }}
                  >
                    <Select
                      placeholder={t("VALIDATE.TECHNOLOGY")}
                      value={editTech}
                      onChange={(value) => setEditTech(value)}
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
                  <Form.Item name="tech">
                    <Table
                      className="skills-table"
                      rowKey="name"
                      dataSource={
                        editTechs.length === 0
                          ? []
                          : editTechs?.map((item) => ({ ...item }))
                      }
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
          <Row gutter={15}>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                label={t("EMPLOYEE.SOFTSKILL")}
                style={{ padding: 0, margin: 0 }}
              >
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
                  dataSource={editSkills.map((skill) => ({
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
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ margin: "5px" }}>
              <Translation>{(t) => t("EDIT")}</Translation>
            </Button>
          </Form.Item>
          <Button
            type="primary"
            danger
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <Translation>{(t) => t("DELETE")}</Translation>
          </Button>
        </Form>
      )}
    </>
  );
};

export default EmployeeDetail;
