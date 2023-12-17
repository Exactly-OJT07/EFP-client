import React, { useState } from "react";
import { Modal, Form, Input, Select, Row, Col, DatePicker, Space } from "antd";
import moment from "moment";
import { createProjectAPI } from "../../../api/apiUrl";
import { useGetManager } from "../../../hooks/useManager";
import { useCreateProject } from "../../../hooks/useProject";

const { Option } = Select;

const CreateProject = ({ isModalOpen, setIsModalOpen }) => {
  const [formCreate] = Form.useForm();
  const [newName, setNewName] = useState("");
  const [newManager, setNewManager] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [newSpecification, setNewSpecification] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLangFrame, setNewLangFrame] = useState("");
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const [confirmLoading] = useState(false);

  const { mutate: createProject } = useCreateProject();

  const handleCreateOk = async () => {
    const formData = await formCreate.validateFields();
    console.log(formData);
    createProject({
      ...formData,
    });
    setIsModalOpen(false);
  };

  const { data: managers } = useGetManager();

  const handleCreateCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      title="Create Project"
      visible={isModalOpen}
      onOk={handleCreateOk}
      onCancel={handleCreateCancel}
      confirmLoading={confirmLoading}
      width="1000px"
    >
      <Form
        form={formCreate}
        name="createProject"
        layout="vertical"
        autoComplete="off"
        onFinish={handleCreateOk}
      >
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <Form.Item name="name" label="Name">
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
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

            <Form.Item name="technology" label="Technology">
              <Select
                mode="multiple"
                placeholder="Please select"
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

            <Form.Item name="specification" label="Specification">
              <Input
                value={newSpecification}
                onChange={(e) => setNewSpecification(e.target.value)}
              />
            </Form.Item>
          </Col>

          <Col xs={24} lg={12}>
            <Form.Item name="description" label="Description">
              <Input
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
              />
            </Form.Item>

            <Form.Item name="langFrame" label="LangFrame">
              <Select
                mode="multiple"
                placeholder="Please select"
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

            <Row>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item name="startDate" label="StartDate">
                  <DatePicker
                    value={newStartDate ? moment(newStartDate) : null}
                    onChange={(e) =>
                      setNewStartDate(
                        e ? e.format("YYYY-MM-DD HH:mm:ss") : null,
                      )
                    }
                    showTime={{ format: "HH:mm:ss" }}
                    format="DD/MM/YYYY HH:mm:ss"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                <Form.Item name="endDate" label="EndDate">
                  <DatePicker
                    value={newEndDate ? moment(newEndDate) : null}
                    onChange={(e) =>
                      setNewEndDate(e ? e.format("YYYY-MM-DD HH:mm:ss") : null)
                    }
                    showTime={{ format: "HH:mm:ss" }}
                    format="DD/MM/YYYY HH:mm:ss"
                    disabledDate={(current) => {
                      return current && current < moment(newStartDate);
                    }}
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
