import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOneEmployee } from "../../hooks/useEmployee";
import {
  Form,
  Input,
  Image as AntdImage,
  Row,
  Col,
  Typography,
  Button,
} from "antd";
import moment from "moment";
import DeleteEmployee from "./employeeDetail/DeleteEmployee";
const { TextArea } = Input;
const EmployeeDetail = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { id } = useParams();
  const { data: employee, isLoading, isError } = useGetOneEmployee(id);
  if (isLoading) {
    return <div>Loading...</div>;
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
    description,
    joinDate,
    fireDate,
    manager,
  } = employee;

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Row gutter={32}>
        <Col span={8} align="middle">
          <Row gutter={32} layout="vertical">
            <Col span={24}>
              <AntdImage
                width="164px"
                height="164px"
                style={{ borderRadius: "100%" }}
                src={avatar}
              />
            </Col>
            <Col span={24}>
              <Button style={{ marginTop: "15px" }}>Edit Image</Button>
            </Col>
            <Col span={24}>
              <Button type="primary" style={{ marginTop: "15px" }}>
                Tracking History
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={16}>
          <Form layout="vertical">
            <Typography.Title level={3} style={{ lineHeight: "30px" }}>
              Personal Info
            </Typography.Title>
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item label="Employee Code">
                  <Input value={code} style={{ maxWidth: "300px" }} disabled />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Manager Name">
                  <Input
                    value={manager?.name ? manager.name : "No Manager"}
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Name">
                  <Input value={name} style={{ maxWidth: "300px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email">
                  <Input value={email} style={{ maxWidth: "300px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number">
                  <Input value={phone} style={{ maxWidth: "300px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Identity Card">
                  <Input value={identityCard} style={{ maxWidth: "300px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Join Date">
                  <Input
                    value={moment(joinDate).format("DD-MM-YYYY")}
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Fire Date">
                  <Input
                    value={
                      fireDate ? moment(fireDate).format("DD-MM-YYYY") : ""
                    }
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="DoB">
                  <Input
                    value={moment(dateOfBirth).format("DD-MM-YYYY")}
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Gender">
                  <Input
                    value={
                      {
                        male: "Male",
                        female: "Female",
                      }[gender] || ""
                    }
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Position">
                  <Input
                    value={
                      {
                        fe: "Front-end Dev",
                        be: "Back-end Dev",
                        fullstack: "FullStack",
                        ba: "Business Analysis",
                        qa: "Quality Assurance",
                        devops: "DevOps Engineer",
                        ux_ui: "User Experience",
                      }[position] || ""
                    }
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Status">
                  <Input
                    value={
                      {
                        active: "Active",
                        inactive: "Inactive",
                      }[status] || ""
                    }
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Description">
                  <TextArea
                    rows={4}
                    placeholder="Description"
                    value={description}
                    style={{ maxWidth: "680px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.List label="Skills" name="skills" initialValue={skills}>
                  {() => (
                    <>
                      {!!skills.length && (
                        <Row>
                          <Col span={12}>
                            <Typography.Text level={4}>Skill</Typography.Text>
                          </Col>
                          <Col span={12}>
                            <Typography.Text level={4}>
                              Experience
                            </Typography.Text>
                          </Col>
                        </Row>
                      )}
                      {skills.map(({ name, exp }) => (
                        <Row key={name}>
                          <Col span={12}>
                            <Form.Item>
                              <Input
                                value={name}
                                style={{ maxWidth: "300px" }}
                              />
                            </Form.Item>
                          </Col>
                          <Col span={12}>
                            <Form.Item>
                              <Input
                                value={exp}
                                style={{ maxWidth: "300px" }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      ))}
                    </>
                  )}
                </Form.List>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Button type="primary" style={{ margin: "5px" }}>
        Edit
      </Button>
      <Button type="primary" danger onClick={() => setIsDeleteModalOpen(true)}>
        Delete
      </Button>
      <DeleteEmployee
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        width="500px"
        onCancel={handleCloseDeleteModal}
      />
    </>
  );
};

export default EmployeeDetail;
