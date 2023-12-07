import {
  CalendarOutlined,
  MoreOutlined,
  PlusOutlined,
  ScheduleOutlined,
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
} from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pagination/pagination";
import { toMomentDateTimeData } from "../helpers/format";
import { useGetData } from "../hooks/useProject";
import "../styles/ManageProject.css";

const { Content } = Layout;
const { Search } = Input;

const settings = [
  {
    label: "View",
    key: "view",
  },
  {
    label: "Delete",
    key: "delete",
  },
];

const ManageProject = () => {
  const navigate = useNavigate();

  const [table, setTable] = useState({
    page: 1,
    take: 4,
  });
  const [filters, setFilters] = useState("");
  const [status, setStatus] = useState("");

  const paginateOptions = {
    search: filters.name,
    status: status,
    page: table.page,
    take: table.take,
  };
  const { data: projects, isLoading, isError } = useGetData(paginateOptions);
  console.log(projects);
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleSearch = (value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      name: value,
    }));
  };

  return (
    <Content className="content-project">
      <Space direction="horizontal" className="status-filter">
        <div className="status">
          <Button type="secondary" onClick={() => setStatus("")}>
            All Status
          </Button>
          <Button type="secondary" onClick={() => setStatus("pending")}>
            Pending
          </Button>
          <Button type="secondary" onClick={() => setStatus("on_progress")}>
            On Progress
          </Button>
          <Button type="secondary" onClick={() => setStatus("done")}>
            Done
          </Button>
        </div>
        <Search
          placeholder="Search Project"
          allowClear
          style={{
            width: 300,
          }}
          onSearch={handleSearch}
        />

        <Button type="primary">
          <PlusOutlined /> New Project
        </Button>
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
              <Card>
                <Space direction="horizontal">
                  <small style={{ color: "grey" }}>
                    #{project.id.slice(0, 8)}
                  </small>
                </Space>
                <div className="project-items">
                  <Col span={5}>
                    <h4 style={{ lineHeight: "45px" }}>{project.name}</h4>
                  </Col>

                  <Col span={5}>
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
                          Person in charge
                        </Typography.Paragraph>
                        <Typography.Text strong style={{ margin: 0 }}>
                          {project.managerProject.name}
                        </Typography.Text>
                      </div>
                    </div>
                  </Col>

                  <Col span={5}>
                    <div className="project-owner">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          width: 50,
                          height: 50,
                          background: "#1640D6",
                        }}
                      >
                        <ScheduleOutlined style={{ color: "white" }} />
                      </div>
                      <div className="project-title">
                        <Typography.Paragraph
                          type="secondary"
                          strong
                          style={{ margin: 0 }}
                        >
                          Start Date
                        </Typography.Paragraph>
                        <Typography.Text strong style={{ margin: 0 }}>
                          {toMomentDateTimeData(project.startDate)}
                        </Typography.Text>
                      </div>
                    </div>
                  </Col>

                  <Col span={5}>
                    <div className="project-owner">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "50%",
                          width: 50,
                          height: 50,
                          background: "#1640D6",
                        }}
                      >
                        <ScheduleOutlined style={{ color: "white" }} />
                      </div>
                      <div className="project-title">
                        <Typography.Paragraph
                          type="secondary"
                          strong
                          style={{ margin: 0 }}
                        >
                          End Date
                        </Typography.Paragraph>
                        <Typography.Text strong style={{ margin: 0 }}>
                          {toMomentDateTimeData(project.endDate)}
                        </Typography.Text>
                      </div>
                    </div>
                  </Col>

                  <Col span={3}>
                    <Space wrap>
                      <Select
                        defaultValue={project.status}
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                          {
                            value: "pending",
                            label: "Pending",
                          },
                          {
                            value: "on_progress",
                            label: "On Progress",
                          },
                          {
                            value: "done",
                            label: "Done",
                          },
                          {
                            value: "closed",
                            label: "Closed",
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
                            {settings.map((item) => {
                              return (
                                <Menu.Item key={item.key}>
                                  {item.key === "delete" ? (
                                    <Popconfirm
                                      title="Delete the task"
                                      description="Are you sure to delete this task?"
                                      onConfirm={() => {
                                        // Gọi hàm để xử lý delete ở đây
                                      }}
                                      onCancel={() => {
                                        // Thực hiện xử lý khi người dùng nhấp vào nút "No" trong Popconfirm
                                      }}
                                      okText="Yes"
                                      cancelText="No"
                                    >
                                      <a onClick={(e) => e.preventDefault()}>
                                        {item.label}
                                      </a>
                                    </Popconfirm>
                                  ) : (
                                    <a
                                      onClick={() => {
                                        if (item.key === "view") {
                                          console.log(
                                            "Navigating to projectDetail:",
                                            `/manageProjects/projectDetail/${project.id}`,
                                          );
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
                              );
                            })}
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
                  <small>{toMomentDateTimeData(project.createdAt)}</small>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Typography.Title level={5}>
            No matching projects found
          </Typography.Title>
        </div>
      )}

      <Pagination projects={projects} table={table} setTable={setTable} />
    </Content>
  );
};

export default ManageProject;
