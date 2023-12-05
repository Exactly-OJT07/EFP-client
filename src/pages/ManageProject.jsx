import { useState } from "react";
import {
  MoreOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Typography,
  Card,
  Space,
  Divider,
  Row,
  Col,
  Dropdown,
  Modal,
  Form,
  Input,
  DatePicker,
  Layout,
  Menu,
  Popconfirm,
  Pagination,
  Select,
} from "antd";
import { useNavigate } from "react-router-dom";
import "../styles/ManageProject.css";
import logoIcon from "../assets/image5.png";

const { Content } = Layout;
const { Search } = Input;

const { RangePicker } = DatePicker;

const projects = [
  {
    id: 1,
    projectNumber: "#P-000441425",
    projectName: "Redesign Owlio Landing Page Web",
    personInCharge: "Thành Phản Diện",
    startDate: "Tuesday, Nov 29th 2023",
    endDate: "Sunday, Dec 16th 2023",
    createdOn: "Nov 29th, 2023",
    status: "Pending",
  },
  {
    id: 2,
    projectNumber: "#P-000112233",
    projectName: "Exactly CocoonVietnam Website",
    personInCharge: "Lê Sỹ Thành Đây",
    startDate: "Monday, Nov 22th 2023",
    endDate: "Tuesday, Dev 17th 2024",
    createdOn: "Dec 1st, 2023",
    status: "Pending",
  },
  {
    id: 3,
    projectNumber: "#P-000112233",
    projectName: "Human Computer Interaction App",
    personInCharge: "Không Phải Thành",
    startDate: "Monday, Nov 22th 2023",
    endDate: "Tuesday, Dev 17th 2024",
    createdOn: "Dec 1st, 2023",
    status: "Pending",
  },
  {
    id: 4,
    projectNumber: "#P-000112233",
    projectName: "Requirements Management",
    personInCharge: "Thành Xỉn Bia",
    startDate: "Monday, Nov 22th 2023",
    endDate: "Tuesday, Dev 17th 2024",
    createdOn: "Dec 1st, 2023",
    status: "Pending",
  },
  {
    id: 5,
    projectNumber: "#P-000112233",
    projectName: "DevPlus Final Project Exercise",
    personInCharge: "Thành Thỏ Hồng",
    startDate: "Monday, Nov 22th 2023",
    endDate: "Tuesday, Dev 17th 2024",
    createdOn: "Dec 1st, 2023",
    status: "Pending",
  },
  // {
  //     id: 6,
  //     projectNumber: "#P-000112233",
  //     projectName: "Exactly CocoonVietnam Website",
  //     personInCharge: "Thành Hitler",
  //     startDate: "Monday, Nov 22th 2023",
  //     endDate: "Tuesday, Dev 17th 2024",
  //     createdOn: "Dec 1st, 2023",
  //     status: "Pending",
  // },
  // Add more projects as needed
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const [createModalOpen, setCreateModalOpen] = useState(false);

  const [confirmLoading, setConfirmLoading] = useState(false);

  const showCreateModal = () => {
    setCreateModalOpen(true);
  };

  const handleCreateOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setCreateModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCreateCancel = () => {
    console.log("Create Cancel");
    setCreateModalOpen(false);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const filteredProjects = projects.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const [formCreate] = Form.useForm();

  //   const handleStatusChange = (newStatus, projectId) => {
  //     const updatedProjects = projects.map((project) =>
  //       project.id === projectId ? { ...project, status: newStatus } : project
  //     );

  //     console.log("Updated Projects:", updatedProjects);
  //   };

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * 3;
  const indexOfFirstItem = indexOfLastItem - 3;
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <Content className="content">
      <Space direction="horizontal" className="status-filter">
        <div className="status">
          <Button type="secondary">All Status</Button>
          <Button type="secondary">Pending</Button>
          <Button type="secondary">On Progress</Button>

          <Button type="secondary">Done</Button>
        </div>
        <Search
          placeholder="Search Project"
          allowClear
          style={{
            width: 300,
          }}
          onSearch={handleSearch}
        />
        <Button type="primary" onClick={showCreateModal}>
          <PlusOutlined /> New Project
        </Button>
      </Space>
      {currentProjects.length > 0 ? (
        <Row gutter={10} style={{ marginTop: 10 }}>
          {currentProjects.map((project) => (
            <Col key={project.id} span={24}>
              <Card>
                <Space direction="horizontal">
                  <small>{project.projectNumber}</small>
                </Space>
                <div className="project-items">
                  <h4>{project.projectName}</h4>
                  <div className="project-owner">
                    <img
                      src={logoIcon}
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
                        {project.personInCharge}
                      </Typography.Text>
                    </div>
                  </div>

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
                        {project.startDate}
                      </Typography.Text>
                    </div>
                  </div>

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
                        {project.endDate}
                      </Typography.Text>
                    </div>
                  </div>
                  <Space wrap>
                    <Select
                      defaultValue="Pending"
                      style={{
                        width: 120,
                      }}
                      onChange={handleChange}
                      options={[
                        {
                          value: "inprogress",
                          label: "In Progress",
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
                                      // Thực hiện xử lý khi người dùng nhấp vào nút "Yes" trong Popconfirm
                                      console.log("Deleting task...");
                                      // Gọi hàm để xử lý delete ở đây
                                    }}
                                    onCancel={() => {
                                      // Thực hiện xử lý khi người dùng nhấp vào nút "No" trong Popconfirm
                                      console.log("Cancelled deleting task.");
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
                </div>
                <Space direction="horizontal">
                  <CalendarOutlined />
                  <small>{project.createdOn}</small>
                </Space>
              </Card>
              <Divider />
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

      {/* Create Modal */}
      <Modal
        title="Create Project"
        visible={createModalOpen}
        onOk={handleCreateOk}
        confirmLoading={confirmLoading}
        onCancel={handleCreateCancel}
      >
        <Form
          form={formCreate}
          name="createProject"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="projectName" label="Project Name">
            <Input />
          </Form.Item>
          <Form.Item name="personInCharge" label="Person In Charge">
            <Input />
          </Form.Item>
          <Form.Item name="timeLine" label="Timeline">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      <Pagination
        current={currentPage}
        pageSize={3}
        total={projects.length}
        onChange={handlePageChange}
        style={{
          marginTop: 10,
          textAlign: "center",
          display: "flex",
          justifyContent: "flex-end",
        }}
      />
    </Content>
  );
};

export default ManageProject;
