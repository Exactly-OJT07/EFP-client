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
import React, { useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "../../components/beadcrumb/Breadcrumb";
import { useGetOneEmployee } from "../../hooks/useEmployee";
import { useGetManager } from "../../hooks/useManager";
import "../../styles/EmployeeDetail.css";
import TrackingHistory from "./employeeDetail/TrackingHistory";

const { TextArea } = Input;

const EmployeeDetail = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { data: managers } = useGetManager();
  const { data: employee, isLoading, isError } = useGetOneEmployee(id);
  console.log(employee);

  const [editTechs, setEditTechs] = useState(employee?.employee.tech || []);
  const [editTech, setEditTech] = useState("");
  const [editTechExperience, setEditTechExperience] = useState("");

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
    tech: employee?.employee.tech,
  };

  const onFinish = (value) => {
    console.log(value);
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
    setEditTechs([...initialValues.tech, ...editTechs, editTechEntry]);
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
                  <Form.Item name="techs">
                    <Table
                      className="skills-table"
                      rowKey="name"
                      dataSource={
                        editTechs.length === 0
                          ? initialValues.tech.map((item) => ({ ...item }))
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
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ margin: "5px" }}>
              <Translation>{(t) => t("EDIT")}</Translation>
            </Button>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
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
