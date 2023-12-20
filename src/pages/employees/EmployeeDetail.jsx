import { CloseCircleOutlined, DownloadOutlined } from "@ant-design/icons";
import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import {
  Image as AntdImage,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Spin,
  InputNumber,
  Row,
  Select,
  Table,
  Typography,
  Card,
  Radio,
  message,
  message as AntdMessage,
} from "antd";
import moment from "moment";
import React, { useEffect, useState, useRef } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "../../components/beadcrumb/Breadcrumb";
import {
  useCVExport,
  useGetOneEmployee,
  useUpdateEmployee,
} from "../../hooks/useEmployee";
import { useGetManager } from "../../hooks/useManager";
import "../../styles/EmployeeDetail.css";
import TrackingHistory from "./employeeDetail/TrackingHistory";
import { edit } from "@cloudinary/url-gen/actions/animated";
import DeleteEmployee from "./employeeDetail/DeleteEmployee";

const { TextArea } = Input;

const EmployeeDetail = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: managers } = useGetManager();
  const { data: employee } = useGetOneEmployee(id);
  const { mutate: exportCv } = useCVExport();
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

  const [imageUrl, setImageUrl] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
  const fileInputRef = useRef();
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
    avatar: employee?.employee.avatar ?? "",
    code: employee?.employee.code ?? "",
    description: employee?.employee.description ?? "",
    email: employee?.employee.email ?? "",
    identityCard: employee?.employee.identityCard ?? "",
    name: employee?.employee.name ?? "",
    phone: employee?.employee.phone ?? "",
    manager: employee?.employee.managerId ?? "",
    isManager: employee?.employee.isManager ?? "",
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
    if (imageUrl) {
      value.avatar = imageUrl;
    }
    value.skills = editSkills;
    value.langFrame = editLangs;
    value.tech = editTechs;
    console.log(value);
    try {
      // Assuming your useUpdateEmployee hook handles the mutation logic
      await EmployeeUpdateMutation.mutateAsync({
        employeeId: id,
        data: value,
      });
      console.log(initialValues.skills);
      console.log(editSkills);
      //       if (initialValues.skills !== editSkills) {
      // setEditSkills([]);
      //       }
      setEditSkills([]);
      setEditLangs([]);
      setEditTechs([]);
      // Optionally: Handle success, navigate, or perform other actions on successful mutation
    } catch (error) {
      console.error("Error updating employee data:", error);
      // Optionally: Handle error, show error message, or perform other actions on failed mutation
    }
  };
  //langFrame
  const addToLangFrame = () => {
    if (!editLang || !editLangExperience) {
      message.error(t("VALIDATE.ERRORLANGUAGE"));
      return;
    }
    const existingLangFrame = editLangs.find(
      (langFrame) => langFrame.name === editLang,
    );

    if (existingLangFrame) {
      message.error(t("VALIDATE.EXISTLANGUAGE"));
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
  //technology
  const addToTech = () => {
    if (!editTech || !editTechExperience) {
      message.error(t("VALIDATE.TECHNOLOGY"));
      return;
    }
    const existingTech = editTechs.find((tech) => tech.name === editTech);
    if (existingTech) {
      message.error(t("VALIDATE.EXISTTECHNOLOGY"));
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

  const addToSkills = () => {
    if (!editSkill || !editSkillExperience) {
      message.error(t("VALIDATE.ERRORSKILL"));
      return;
    }
    const existingSkill = editSkills.find((skill) => skill.name === editSkill);

    if (existingSkill) {
      message.error(t("VALIDATE.EXISTSKILL"));
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
  const handleFileChange = async (file) => {
    setLoadingAvatar(true);
    const formData = new FormData();
    if (file instanceof FileList) {
      for (const individualFile of file) {
        formData.append("file", individualFile);
        formData.append("upload_preset", "ackgbz0m");

        try {
          const res = await axios.post(
            "https://api.cloudinary.com/v1_1/dvm8fnczy/image/upload",
            formData,
          );
          setImageUrl(res.data.secure_url);
          AntdMessage.success(
            "Avatar uploaded successfully, Click change to apply ",
          );
        } finally {
          setLoadingAvatar(false);
        }

        formData.delete("file");
      }
    } else {
      formData.append("file", file);
      formData.append("upload_preset", "ackgbz0m");

      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dvm8fnczy/image/upload",
          formData,
        );

        setImageUrl(res.data.secure_url);
      } catch (err) {
        console.error(err.response.data);
      }
    }
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
                  <img
                    name="avatar"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "100%",
                    }}
                    src={
                      imageUrl ||
                      (newAvatar
                        ? URL.createObjectURL(newAvatar)
                        : employee.employee.avatar)
                    }
                    alt="Employee Avatar"
                  />
                  {loadingAvatar && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(255, 255, 255, 0.8)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 999,
                      }}
                    >
                      <Spin size="large" />
                    </div>
                  )}
                </Col>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                  style={{ display: "none" }}
                  ref={fileInputRef}
                />
                <Col span={24}>
                  <Button
                    style={{ margin: "10px" }}
                    onClick={() => fileInputRef.current.click()}
                  >
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
                    onClick={() => exportCv(id)}
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
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="manager"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.MANAGER")}</Translation>
                    }
                  >
                    <Select>
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
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.EMAIL")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.PHONE")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="identityCard"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.IDENTITY")}</Translation>
                    }
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="joinDate"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.JOINDATE")}</Translation>
                    }
                  >
                    <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="dateOfBirth"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.DOB")}</Translation>
                    }
                  >
                    <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="gender"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.GENDER")}</Translation>
                    }
                  >
                    <Select>
                      <Select.Option value="male">
                        {t("DATA.MALE")}
                      </Select.Option>
                      <Select.Option value="female">
                        {t("DATA.FEMALE")}
                      </Select.Option>
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
                    <Select>
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
                    <Select>
                      <Select.Option value="inactive">
                        {t("EMPLOYEE.INACTIVE")}
                      </Select.Option>
                      <Select.Option value="active">
                        {t("EMPLOYEE.ACTIVE")}
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="isManager"
                    label={
                      <Translation>
                        {(t) => t("EMPLOYEE.ISMANAGER")}
                      </Translation>
                    }
                  >
                    <Radio.Group>
                      <Radio value={true}>{t("DATA.TRUE")}</Radio>
                      <Radio value={false}>{t("DATA.FALSE")}</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="address"
                    label={
                      <Translation>{(t) => t("EMPLOYEE.ADDRESS")}</Translation>
                    }
                  >
                    <Input rows={6} placeholder={t("EMPLOYEE.ADDRESS")} />
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
                      placeholder={t("EMPLOYEE.DESCRIPTION")}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <Card
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{ margin: "10px 0px" }}
            title={t("EMPLOYEE.LANGFRAME")}
          >
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
          </Card>
          <Card
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{ margin: "10px 0px" }}
            title={t("EMPLOYEE.TECHNOLOGY")}
          >
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
          </Card>
          <Card
            xs={24}
            sm={24}
            md={24}
            lg={24}
            xl={24}
            style={{ margin: "10px 0px" }}
            title={t("EMPLOYEE.SOFTSKILL")}
          >
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
          </Card>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ margin: "5px" }}>
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
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default EmployeeDetail;
