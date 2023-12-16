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
  Spin,
} from "antd";
import moment from "moment";
import DeleteEmployee from "./employeeDetail/DeleteEmployee";
import "../../styles/EmployeeDetail.css";
import TrackingHistory from "./employeeDetail/TrackingHistory";
import { Translation, useTranslation } from "react-i18next";
const { TextArea } = Input;
const EmployeeDetail = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const { id } = useParams();
  const { data: employee, isLoading, isError } = useGetOneEmployee(id);

  const { t } = useTranslation();

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
    description,
    joinDate,
    fireDate,
    manager,
  } = employee?.employee;

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Row gutter={32}>
        <Col align="middle" md={{ span: 24 }} lg={{ span: 8 }}>
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
                type="primary"
                style={{ margin: "10px" }}
                onClick={() => setIsTrackingModalOpen(true)}
              >
                <Translation>{(t) => t("EMPLOYEE.TRACKING")}</Translation>
              </Button>
              <TrackingHistory
                isTrackingModalOpen={isTrackingModalOpen}
                setIsTrackingModalOpen={setIsTrackingModalOpen}
                width="1000px"
              />
            </Col>
          </Row>
        </Col>
        <Col md={{ span: 24, align: "middle" }} lg={{ span: 16 }}>
          <Form layout="vertical">
            <Typography.Title level={3} style={{ lineHeight: "30px" }}>
              <Translation>{(t) => t("EMPLOYEE.DETAIL")}</Translation>
            </Typography.Title>
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
                  <Input
                    value={
                      manager?.name
                        ? manager.name
                        : (t) => t("EMPLOYEE.NOMANAGER")
                    }
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={<Translation>{(t) => t("EMPLOYEE.NAME")}</Translation>}
                >
                  <Input value={name} style={{ maxWidth: "300px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.EMAIL")}</Translation>
                  }
                >
                  <Input value={email} style={{ maxWidth: "300px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.PHONE")}</Translation>
                  }
                >
                  <Input value={phone} style={{ maxWidth: "300px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.IDENTITY")}</Translation>
                  }
                >
                  <Input value={identityCard} style={{ maxWidth: "300px" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.JOINDATE")}</Translation>
                  }
                >
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
                <Form.Item
                  label={<Translation>{(t) => t("EMPLOYEE.DOB")}</Translation>}
                >
                  <Input
                    value={moment(dateOfBirth).format("DD-MM-YYYY")}
                    style={{ maxWidth: "300px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.GENDER")}</Translation>
                  }
                >
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
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.POSITION")}</Translation>
                  }
                >
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
                <Form.Item
                  label={
                    <Translation>{(t) => t("EMPLOYEE.STATUS")}</Translation>
                  }
                >
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
                    value={description}
                    style={{ maxWidth: "680px" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.List name="skills" initialValue={skills}>
                  {() => (
                    <>
                      {!!skills?.length && (
                        <Row gutter={16}>
                          <Col span={12}>
                            <Typography.Text level={4}>
                              <Translation>
                                {(t) => t("EMPLOYEE.SKILL")}
                              </Translation>
                            </Typography.Text>
                          </Col>
                          <Col span={12}>
                            <Typography.Text level={4}>
                              <Translation>
                                {(t) => t("EMPLOYEE.EXP")}
                              </Translation>
                            </Typography.Text>
                          </Col>
                        </Row>
                      )}
                      {skills?.map(({ name, exp }) => (
                        <Row key={name} gutter={16}>
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
        <Translation>{(t) => t("EDIT")}</Translation>
      </Button>
      <Button type="primary" danger onClick={() => setIsDeleteModalOpen(true)}>
        <Translation>{(t) => t("DELETE")}</Translation>
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
