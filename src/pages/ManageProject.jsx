import {
  CalendarOutlined,
  MoreOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  Layout,
  Menu,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Typography,
  Avatar,
  Tooltip,
  Modal,
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination/pagination";
import { toMomentDateTimeData } from "../helpers/format";
import {
  useGetData,
  useProjectStatusUpdate,
  useDeleteProject,
} from "../hooks/useProject";
import "../styles/ManageProject.css";
import Circleprogress from "../components/circle-progress/Circleprogress";
import ProjectDetail from "./ProjectDetail";
import CreateProject from "./projects/components/createProject";
import { Translation, useTranslation } from "react-i18next";
import { Breadcrumb } from "../components/beadcrumb/Breadcrumb";

const { Content } = Layout;
const { Search } = Input;

const settings = [
  {
    label: <Translation>{(t) => t("VIEW")}</Translation>,
    key: "view",
  },
  {
    label: <Translation>{(t) => t("DELETE")}</Translation>,
    key: "delete",
  },
];

const ManageProject = () => {
  const navigate = useNavigate();

  const { t } = useTranslation();

  const [table, setTable] = useState({
    page: 1,
    take: 3,
  });

  const [filters, setFilters] = useState("");
  const [status, setStatus] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const paginateOptions = {
    search: filters.name,
    status: status,
    page: table.page,
    take: table.take,
  };

  const { data: projects, isLoading, isError } = useGetData(paginateOptions);
  console.log(projects);

  const projectStatusUpdateMutation = useProjectStatusUpdate();

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await projectStatusUpdateMutation.mutateAsync({
        projectId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const handleSearch = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: value,
    }));
  };

  const showDeleteConfirm = (projectId) => {
    Modal.confirm({
      title: <Translation>{(t) => t("PROJECT.DELETE")}</Translation>,
      content: <Translation>{(t) => t("PROJECT.DELETECONTENT")}</Translation>,
      onOk: () => handleDeleteProject(projectId),
      onCancel: () => {},
      okText: "Yes",
      cancelText: "No",
    });
  };
  const projectDeleteProjectMutation = useDeleteProject();

  const handleDeleteProject = async (projectId) => {
    try {
      await projectDeleteProjectMutation.mutateAsync(projectId);
    } catch (error) {
      console.log("Error");
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFilter = (status) => {
    setActiveFilter(status);
    setStatus(status);
    setTable((prevTable) => ({
      ...prevTable,
      page: 1,
    }));
  };

  const breadcrumbItems = [{ key: "manageProjects" }];

  return (
    <Content className="content-project">
      <Breadcrumb items={breadcrumbItems} />
      <Space direction="horizontal" className="status-filter">
        <div className="status">
          <Button
            className={`status-button ${activeFilter === "" ? "active" : ""}`}
            type="secondary"
            onClick={() => handleFilter("")}
          >
            <Translation>{(t) => t("PROJECT.ALLSTATUS")}</Translation>
          </Button>
          <Button
            className={`status-button ${
              activeFilter === "pending" ? "active" : ""
            }`}
            type="secondary"
            onClick={() => handleFilter("pending")}
          >
            <Translation>{(t) => t("PROJECT.PENDING")}</Translation>
          </Button>
          <Button
            className={`status-button ${
              activeFilter === "on_progress" ? "active" : ""
            }`}
            type="secondary"
            onClick={() => handleFilter("on_progress")}
          >
            <Translation>{(t) => t("PROJECT.ONPROGRESS")}</Translation>
          </Button>
          <Button
            className={`status-button ${
              activeFilter === "done" ? "active" : ""
            }`}
            type="secondary"
            onClick={() => handleFilter("done")}
          >
            <Translation>{(t) => t("PROJECT.DONE")}</Translation>
          </Button>
        </div>
        <Search
          placeholder={t("PROJECT.NAME")}
          allowClear
          style={{
            width: 300,
          }}
          onSearch={handleSearch}
        />

        <div>
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            <PlusOutlined />{" "}
            <Translation>{(t) => t("PROJECT.NEW")}</Translation>
          </Button>
          <CreateProject
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            width="1000px"
            onCancel={handleCloseModal}
          />
        </div>
      </Space>
      {isLoading ? (
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
      ) : isError ? (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Typography.Title level={5}>{isError}</Typography.Title>
        </div>
      ) : projects?.data.length > 0 ? (
        <Row gutter={10} style={{ marginTop: 30 }}>
          {projects.data.map((project) => (
            <Col key={project.id} span={24}>
              <Card style={{ boxShadow: "1px 1px 8px #DCDCDC" }}>
                <Space direction="horizontal">
                  <Typography.Title level={5} style={{ color: "#67729D" }}>
                    #P-{project.id.slice(0, 8)}
                  </Typography.Title>
                </Space>
                <div className="project-items">
                  <Col span={8}>
                    <Typography.Title level={4} style={{ lineHeight: "45px" }}>
                      {project.name}
                    </Typography.Title>
                  </Col>

                  <Col span={4}>
                    <div className="project-owner">
                      <img
                        src={project.managerProject.avatar}
                        alt=""
                        style={{ width: 50, height: 50, borderRadius: 100 }}
                      />
                      <div className="project-title">
                        <Typography.Paragraph
                          type="secondary"
                          strong
                          style={{ margin: 0 }}
                        >
                          <Translation>
                            {(t) => t("PROJECT.MANAGER")}
                          </Translation>
                        </Typography.Paragraph>
                        <Typography.Text strong style={{ margin: 0 }}>
                          {project.managerProject.name}
                        </Typography.Text>
                      </div>
                    </div>
                  </Col>

                  <Col span={4}>
                    <div className="project-employee-avatar">
                      <div className="project-title">
                        <Typography.Paragraph
                          type="secondary"
                          strong
                          style={{ margin: 0 }}
                        >
                          <Translation>
                            {(t) => t("PROJECT.TEAMMEMBER")}
                          </Translation>
                        </Typography.Paragraph>
                      </div>
                      <Avatar.Group maxCount={2}>
                        {project.employee_project.map((employeeData) => (
                          <Tooltip key={employeeData.id}>
                            <Avatar
                              src={employeeData.employee.avatar}
                              style={{ backgroundColor: "#87D068" }}
                            ></Avatar>
                          </Tooltip>
                        ))}
                      </Avatar.Group>
                    </div>
                  </Col>

                  <Col span={4}>
                    <div
                      className="cirle-progress"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Circleprogress project={project} />
                    </div>
                  </Col>

                  <Col span={3}>
                    <Space wrap>
                      <Select
                        defaultValue={project.status}
                        style={{
                          width: 120,
                        }}
                        onChange={(newStatus) => {
                          handleStatusChange(project.id, newStatus);
                        }}
                        options={[
                          {
                            value: "pending",
                            label: (
                              <Translation>
                                {(t) => t("PROJECT.PENDING")}
                              </Translation>
                            ),
                          },
                          {
                            value: "on_progress",
                            label: (
                              <Translation>
                                {(t) => t("PROJECT.ONPROGRESS")}
                              </Translation>
                            ),
                          },
                          {
                            value: "done",
                            label: (
                              <Translation>
                                {(t) => t("PROJECT.DONE")}
                              </Translation>
                            ),
                          },
                          {
                            value: "closed",
                            label: (
                              <Translation>
                                {(t) => t("PROJECT.CLOSED")}
                              </Translation>
                            ),
                            disabled: true,
                          },
                        ]}
                      ></Select>
                    </Space>
                  </Col>

                  <Col span={1}>
                    <Space wrap>
                      <Dropdown
                        overlay={
                          <Menu>
                            {settings.map((item) => (
                              <Menu.Item key={item.key}>
                                {item.key === "delete" ? (
                                  <a
                                    onClick={() =>
                                      showDeleteConfirm(project.id)
                                    }
                                  >
                                    {item.label}
                                  </a>
                                ) : (
                                  <a
                                    onClick={() => {
                                      if (item.key === "view") {
                                        navigate(
                                          `/manageProjects/projectDetail/${project.id}`,
                                        );
                                      }
                                    }}
                                  >
                                    {item.label}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu>
                        }
                        trigger={["click"]}
                        placement="bottomLeft"
                      >
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <MoreOutlined />
                          </Space>
                        </a>
                      </Dropdown>
                    </Space>
                  </Col>
                </div>

                <Space direction="horizontal">
                  <CalendarOutlined />
                  <small
                    style={{
                      color: "grey",
                    }}
                  >
                    <Translation>{(t) => t("PROJECT.CREATEON")}</Translation>{" "}
                    {toMomentDateTimeData(project.createdAt)}
                  </small>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Typography.Title level={5}>
            <Translation>{(t) => t("PROJECT.NOPROJECT")}</Translation>
          </Typography.Title>
        </div>
      )}

      <Pagination items={projects} table={table} setTable={setTable} />
    </Content>
  );
};

export default ManageProject;
