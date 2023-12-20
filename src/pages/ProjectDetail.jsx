import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetProjectData,
  useEditProjectDetailData,
} from "../hooks/useProject";
import "../styles/ProjectDetail.css";
import { Translation, useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

const ProjectDetail = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data: project, isLoading, isError } = useGetProjectData(id);
  const navigate = useNavigate();
  const projectUpdate = useEditProjectDetailData(id);
  const initialValues = {
    name: project?.project.name,
    description: project?.project.description,
    managerProject: project?.project.managerProject,
    langFrame: project?.project.langFrame,
    technology: project?.project.technology,
    employee_project: project?.project.employee_project,
    tracking: project?.project.tracking,
    Picker: {
      startDate: dayjs(project?.project.startDate),
      endDate: dayjs(project?.project.endDate),
    },
  };

  useEffect(() => {
    form.setFieldsValue({
      Picker: {
        startDate: dayjs(initialValues.Picker.startDate),
        endDate: dayjs(initialValues.Picker.endDate),
      },
    });
  }, [form, initialValues.Picker.startDate, initialValues.Picker.endDate]);

  const onFinish = async (values) => {
    try {
      const { startDate, endDate, ...otherValues } = values.Picker;
      await projectUpdate.mutateAsync({
        projectId: id,
        updatedData: { ...otherValues },
        startDate: startDate?.format("YYYY-MM-DD"),
        endDate: endDate?.format("YYYY-MM-DD"),
      });
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const handleAssignClick = () => {
    console.log("Assign button clicked");
  };

  const groups = project?.project.tracking?.member.map((item) => {
    return { id: item.id, title: item.employeeName };
  });

  const items = project?.project.tracking?.member.map((item) => {
    const id = item.id;
    const group = item.id;
    console.log(item.joinDate);
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
      {project && (
        <>
          <Row gutter={16}>
            <Col span={7} className="manager-infor">
              <div className="manager-detail">
                <Typography.Title level={3}>
                  {t("PROJECT.MANAGERINFO")}
                </Typography.Title>
                <img
                  src={project.project.managerProject.avatar}
                  alt={project.project.managerProject.name}
                />
                <Typography.Title level={5}>
                  {project.project.managerProject.name}
                </Typography.Title>
                <p>
                  <MailOutlined /> {project.project.managerProject.email}
                </p>
              </div>
            </Col>
            <Col span={15} className="project-infor">
              <div className="project-detail">
                <Typography.Title level={3} style={{ marginBottom: "15px" }}>
                  {t("PROJECT.DETAIL")}
                </Typography.Title>
                <Form
                  form={form}
                  initialValues={initialValues}
                  onFinish={onFinish}
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
                  <Form.Item name="name" label={t("PROJECT.NAMEPROJECT")}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="description" label={t("PROJECT.DES")}>
                    <Input />
                  </Form.Item>

                  <Form.Item label={t("PROJECT.LANGFRAME")}>
                    <div className="langFrame-container">
                      {project.project.langFrame.map((frame) => (
                        <span key={frame} className="lang-frame-item">
                          {frame}
                        </span>
                      ))}
                    </div>
                  </Form.Item>

                  <Form.Item label={t("PROJECT.TECH")}>
                    <div className="technology-container">
                      {project.project.technology.map((tech) => (
                        <span key={tech} className="technology-item">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Form.Item>

                  <Form.Item label={t("PROJECT.ASSIGN")}>
                    <Avatar.Group maxCount={2}>
                      {project.project.employee_project.map((member) => (
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

                  <Form.Item
                    name={["Picker", "startDate"]}
                    label={t("PROJECT.STARTDATE")}
                  >
                    <DatePicker
                      defaultValue={dayjs(initialValues.Picker.startDate)}
                    />
                  </Form.Item>

                  <Form.Item
                    name={["Picker", "endDate"]}
                    label={t("PROJECT.ENDDATE")}
                  >
                    <DatePicker
                      defaultValue={dayjs(initialValues.Picker.endDate)}
                    />
                  </Form.Item>

                  <Form.Item
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button htmlType="submit" type="primary">
                      {t("SUBMIT")}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
          <Row>
            <Timeline
              groups={groups}
              items={items}
              defaultTimeStart={moment(project?.project.tracking.joinDate)}
              defaultTimeEnd={moment(project?.project.tracking.doneDate)}
              canMove={false}
              canResize={false}
              canChangeGroup={false}
              onItemClick={(e) =>
                navigate(`/manageEmployees/employeeDetail/${e}`)
              }
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
                        {project?.project.name}
                      </div>
                    );
                  }}
                </SidebarHeader>
                <DateHeader unit="primaryHeader" />
                <DateHeader />
              </TimelineHeaders>
            </Timeline>
          </Row>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
