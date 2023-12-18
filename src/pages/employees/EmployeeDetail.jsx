import { DownloadOutlined } from "@ant-design/icons";
import {
  Image as AntdImage,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Typography,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Breadcrumb } from "../../components/beadcrumb/Breadcrumb";
import { useCVExport, useGetOneEmployee } from "../../hooks/useEmployee";
import { useGetManager } from "../../hooks/useManager";
import "../../styles/EmployeeDetail.css";
import DeleteEmployee from "./employeeDetail/DeleteEmployee";
import TrackingHistory from "./employeeDetail/TrackingHistory";

const { TextArea } = Input;
const EmployeeDetail = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const { id } = useParams();
  const { data: employee, isLoading, isError } = useGetOneEmployee(id);
  const { data: managers } = useGetManager();
  const { mutate: exportCv } = useCVExport();

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

  const [editLangFrames, setEditLangFrames] = useState([]);
  const [editLangFrame, setEditLangFrame] = useState("");
  const [editLangExperience, setEditLangExperience] = useState("");

  const [editTechs, setEditTechs] = useState([]);
  const [editTech, setEditTech] = useState("");
  const [editTechExperience, setEditTechExperience] = useState("");

  const navigate = useNavigate();
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
          </Row>
        </Col>
        <Col md={{ span: 24, align: "middle" }} lg={{ span: 16 }}>
          <Form layout="vertical">
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
                    onChange={(value) => setNewPosition(value)}
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
                    onChange={(value) => setNewStatus(value)}
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
