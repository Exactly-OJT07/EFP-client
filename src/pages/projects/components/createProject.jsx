import React, { useState } from "react";
import { PlusCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  DatePicker,
  Table,
  Tag,
} from "antd";
import moment from "moment";
import { useGetManager } from "../../../hooks/useManager";
import { useCreateProject } from "../../../hooks/useProject";
import { useGetClients } from "../../../hooks/useEmployee";
import { Translation, useTranslation } from "react-i18next";

const { Option } = Select;

const CreateProject = ({ isModalOpen, setIsModalOpen, setIsAssign }) => {
  const [formCreate] = Form.useForm();
  const [newName, setNewName] = useState("");
  const [newManager, setNewManager] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [newSpecification, setNewSpecification] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLangFrame, setNewLangFrame] = useState("");
  const [newAssign, setNewAssign] = useState("");
  const [newRoles, setNewRoles] = useState([]);
  const [newAssigns, setNewAssigns] = useState([]);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const [confirmLoading] = useState(false);

  const { mutate: createProject } = useCreateProject();
  const { t } = useTranslation();
  const handleCreateOk = async () => {
    const formData = await formCreate.validateFields();
    formData.employee_project = newAssigns;
    console.log(formData, "formData");
    createProject({
      ...formData,
    });
    formCreate.resetFields();
    setNewAssigns([]);
    setIsModalOpen(false);
    setIsAssign(true);
  };

  const { data: assignedMembers } = useGetClients({
    page: 1,
    take: 100,
  });

  const roles = [
    {
      title: t("PROJECT.MEMBER"),
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: t("PROJECT.ROLES"),
      dataIndex: "roles",
      key: "roles",
    },
  ];

  const addToAssign = () => {
    const a = assignedMembers.data.find((member) => {
      if (member.id === newAssign) return member;
    });
    console.log(newAssigns, "abs");

    const newEntry = {
      employeeId: newAssign,
      roles: newRoles,
    };
    console.log(newEntry);
    setNewAssigns([
      ...newAssigns,
      { ...newEntry, employeeName: a.name, key: newAssigns.length + 1 },
    ]);
    setNewAssign("");
    setNewRoles([]);
  };

  const removeAssign = (employeeName) => {
    const updatedAssigns = newAssigns.filter(
      (assign) => assign.employeeName !== employeeName,
    );
    setNewAssigns(updatedAssigns);
  };

  const { data: managers } = useGetManager();

  const handleCreateCancel = () => {
    setIsModalOpen(false);
    formCreate.resetFields();
  };

  return (
    <Modal
      title={t("PROJECT.NEWPROJECT")}
      visible={isModalOpen}
      onOk={handleCreateOk}
      onCancel={handleCreateCancel}
      okButtonProps={{
        style: {
          borderRadius: "50px",
          height: "35px",
        },
      }}
      cancelButtonProps={{
        style: {
          borderRadius: "50px",
          height: "35px",
        },
      }}
      confirmLoading={confirmLoading}
      width="1200px"
    >
      <Form
        form={formCreate}
        name="createProject"
        layout="vertical"
        autoComplete="off"
        onFinish={handleCreateOk}
      >
        <Row gutter={16}>
          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="name"
              label={t("PROJECT.NAMEPROJECT")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTNAME") }]}
            >
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder={t("PROJECT.MANAGER")}
              />
            </Form.Item>

            <Form.Item
              name="managerId"
              label={t("PROJECT.MANAGER")}
              rules={[
                { required: true, message: t("VALIDATE.DATAINPUTMANAGER") },
              ]}
            >
              <Select
                value={newManager.id}
                onChange={(value, option) =>
                  setNewManager({ id: value, name: option.children })
                }
                placeholder={t("PROJECT.MANAGER")}
              >
                {(managers || []).map((manager) => (
                  <Select.Option key={manager.id} value={manager.id}>
                    {manager.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="technology"
              label={t("PROJECT.TECH")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTTECH") }]}
            >
              <Select
                mode="multiple"
                placeholder={t("PROJECT.TECH")}
                value={newTechnology}
                onChange={(selectedValues) => setNewTechnology(selectedValues)}
                style={{
                  width: "100%",
                }}
              >
                {[
                  "IntelliJ IDEA",
                  "Sublime Text",
                  "Xcode",
                  "Microsoft Visual Studio",
                  "Visual Studio Code",
                  "IDE",
                  "Github",
                  "Docker",
                  "Postman",
                ].map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="specification"
              label={t("PROJECT.SPEC")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTSPEC") }]}
            >
              <Input
                value={newSpecification}
                onChange={(e) => setNewSpecification(e.target.value)}
                placeholder={t("PROJECT.SPEC")}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Form.Item
              name="description"
              label={t("PROJECT.DES")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTDES") }]}
            >
              <Input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder={t("PROJECT.DES")}
              />
            </Form.Item>

            <Form.Item
              name="langFrame"
              label={t("PROJECT.LANGFRAME")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTLANG") }]}
            >
              <Select
                mode="multiple"
                placeholder={t("PROJECT.LANGFRAME")}
                value={newLangFrame}
                onChange={(selectedValues) => setNewLangFrame(selectedValues)}
                style={{
                  width: "100%",
                }}
              >
                {[
                  "Java",
                  "JavaScript",
                  "Python",
                  "PHP",
                  "C#",
                  "C++",
                  "Ruby",
                  "Pascal",
                  "Swift",
                  "SQL",
                ].map((option) => (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="startDate"
              label={t("PROJECT.STARTDATE")}
              rules={[
                { required: true, message: t("VALIDATE.DATAINPUTSTART") },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={newStartDate ? moment(newStartDate) : null}
                onChange={(e) =>
                  setNewStartDate(e ? e.format("YYYY-MM-DD HH:mm:ss") : null)
                }
                showTime={{ format: "HH:mm:ss" }}
                format="DD/MM/YYYY HH:mm:ss"
                placeholder={t("PROJECT.STARTDATE")}
              />
            </Form.Item>

            <Form.Item
              name="endDate"
              label={t("PROJECT.ENDDATE")}
              rules={[{ required: true, message: t("VALIDATE.DATAINPUTEND") }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                value={newEndDate ? moment(newEndDate) : null}
                onChange={(e) =>
                  setNewEndDate(e ? e.format("YYYY-MM-DD HH:mm:ss") : null)
                }
                showTime={{ format: "HH:mm:ss" }}
                format="DD/MM/YYYY HH:mm:ss"
                disabledDate={(current) => {
                  return current && current < moment(newStartDate);
                }}
                placeholder={t("PROJECT.ENDDATE")}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={8}>
            <Row>
              <Col span={11}>
                <Form.Item
                  label={t("PROJECT.MEMBER")}
                  style={{ marginBottom: "8px" }}
                  rules={[
                    { required: true, message: t("VALIDATE.DATAINPUTMEM") },
                  ]}
                >
                  <Select
                    value={newAssign}
                    onChange={(value) => setNewAssign(value)}
                    placeholder={t("PROJECT.MEMBER")}
                    style={{
                      width: "100%",
                    }}
                  >
                    {assignedMembers?.data
                      .filter((member) => member.id !== newManager.id) // Filter out the manager
                      .filter(
                        (member) =>
                          !newAssigns.some(
                            (assign) => assign.employeeId === member.id,
                          ),
                      )
                      .map((member) => (
                        <Select.Option key={member.id} value={member.id}>
                          {member.name}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={11}>
                <Form.Item
                  label={t("PROJECT.ROLES")}
                  style={{ marginBottom: "8px" }}
                  rules={[
                    { required: true, message: t("VALIDATE.DATAINPUTROLE") },
                  ]}
                >
                  <Select
                    mode="multiple"
                    value={newRoles}
                    onChange={(values) => setNewRoles(values)}
                    placeholder={t("PROJECT.ROLES")}
                    style={{ width: "100%" }}
                  >
                    {[
                      "fe",
                      "be",
                      "ba",
                      "qa",
                      "ux_ui",
                      "devops",
                      "fullstack",
                    ].map((option) => (
                      <Select.Option key={option} value={option}>
                        {option}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <PlusCircleOutlined
                style={{
                  fontSize: "24px",
                  paddingTop: "24px",
                  marginLeft: "7px",
                }}
                onClick={() => {
                  addToAssign();
                }}
              />

              <Col span={24}>
                <Form.Item
                  name="employee_project"
                  label={t("PROJECT.ASSIGN")}
                  style={{ width: "100%" }}
                >
                  <Table
                    rowKey="employeeId"
                    dataSource={newAssigns.map((assign) => ({
                      ...assign,
                      employeeId: assign.employeeName,
                      roles: assign.roles.join(", "),
                      key: assign.assign,
                    }))}
                    columns={[
                      ...roles,
                      {
                        title: t("EMPLOYEE.ACTION"),
                        render: (record) => (
                          <CloseCircleOutlined
                            style={{ color: "black" }}
                            onClick={() => removeAssign(record.employeeName)}
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
      </Form>
    </Modal>
  );
};

export default CreateProject;
