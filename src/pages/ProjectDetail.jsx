import { MailOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { useParams } from "react-router-dom";
import { useGetProjectData } from "../hooks/useProject";
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
    langFrame,
    technology,
    employee_project,
    startDate,
    endDate,
    tracking,
  } = project?.project;

  const handleAssignClick = () => {
    console.log("Assign button clicked");
  };

  const groups = tracking?.member.map((item) => {
    return { id: item.id, title: item.employeeName };
  });

  const items = tracking?.member.map((item) => {
    const id = item.id;
    const group = item.id;
    const start_time = moment(item.joinDate);
    const end_time = moment(item.doneDate ?? moment());
    const title = item.employeeName;

    return {
      id,
      group,
      start_time,
      end_time,
      title,
    };
  });

  return (
    <div className="projectDetail-Content">
      <Row gutter={16}>
        <Col span={7} className="manager-infor">
          <div className="manager-detail">
            <Typography.Title level={3}>Manager Information</Typography.Title>
            <img src={managerProject.avatar} alt={managerProject.name} />
            <Typography.Title level={5}>{managerProject.name}</Typography.Title>
            <p>
              <MailOutlined /> {managerProject.email}
            </p>
          </div>
        </Col>
        <Col span={15} className="project-infor">
          <div className="project-detail">
            <Typography.Title level={3} style={{ marginBottom: "15px" }}>
              Project Details
            </Typography.Title>
            <Form
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 16,
              }}
              layout="horizontal"
              style={{
                maxWidth: 700,
              }}
            >
              <Form.Item label="Project Name">
                <Input value={name} readOnly />
              </Form.Item>

              <Form.Item label="Description">
                <Input value={description} readOnly />
              </Form.Item>

              <Form.Item label="Lang Frame">
                <div className="langFrame-container">
                  {langFrame.map((frame) => (
                    <span key={frame.name} className="lang-frame-item">
                      {frame.name}
                    </span>
                  ))}
                </div>
              </Form.Item>

              <Form.Item label="Technology">
                <div className="technology-container">
                  {technology.map((tech) => (
                    <span key={tech.name} className="technology-item">
                      {tech.name}
                    </span>
                  ))}
                </div>
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
      <Row>
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment(tracking.joinDate)}
          defaultTimeEnd={moment(tracking.fireDate)}
          canMove={false}
          canResize={false}
          canChangeGroup={false}
        >
          <TimelineHeaders className="sticky">
            <SidebarHeader>
              {({ getRootProps }) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "150px",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    {name}
                  </div>
                );
              }}
            </SidebarHeader>
            <DateHeader unit="primaryHeader" />
            <DateHeader />
          </TimelineHeaders>
        </Timeline>
      </Row>
    </div>
  );
};

export default ProjectDetail;
