import { useParams } from "react-router-dom";
import { useGetProjectData } from "../hooks/useProject";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Avatar,
  Tooltip,
  Row,
  Col,
  Typography,
} from "antd";
import { MailOutlined, UserAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "../styles/ProjectDetail.css";

const { RangePicker } = DatePicker;

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError } = useGetProjectData(id);
  console.log(project);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !project) {
    return <div>Project not found</div>;
  }

  const {
    name,
    description,
    managerProject,
    employee_project,
    startDate,
    endDate,
  } = project;
  console.log(project);

  const handleAssignClick = () => {
    // Xử lý sự kiện khi người dùng nhấn vào nút assign
    console.log("Assign button clicked");
  };

  return (
    <div className="projectDetail-Content">
      <Row gutter={16}>
        <Col span={7} className="manager-infor">
          <div className="manager-detail">
            <img src={managerProject.avatar} alt={managerProject.name} />
            <Typography.Title level={5}>{managerProject.name}</Typography.Title>
            <p>
              <MailOutlined /> {managerProject.email}
            </p>
          </div>
        </Col>
        <Col span={15} className="project-infor">
          <div className="project-detail">
            <Form
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 16,
              }}
              layout="horizontal"
              style={{
                maxWidth: 600,
              }}
            >
              <Form.Item label="Project Name">
                <Input value={name} readOnly />
              </Form.Item>
              <Form.Item label="Description">
                <Input value={description} readOnly />
              </Form.Item>
              <Form.Item label="Members Assigned">
                <Avatar.Group maxCount={2}>
                  {employee_project.map((member) => (
                    <Tooltip key={member.id}>
                      <Avatar
                        src={member.employee.avatar}
                        style={{ backgroundColor: "#87D068" }}
                      ></Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>

                <Avatar.Group>
                  <Avatar
                    onClick={handleAssignClick}
                    style={{ backgroundColor: "#87D068" }}
                  >
                    <UserAddOutlined />
                  </Avatar>
                </Avatar.Group>
              </Form.Item>
              <Form.Item label="Deadline">
                <RangePicker
                  defaultValue={[dayjs(startDate), dayjs(endDate)]}
                  format="YYYY-MM-DD"
                />
              </Form.Item>
            </Form>
            <div className="button-container">
              <Button type="primary">Submit</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProjectDetail;
