import { MailOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Transfer,
  Typography,
} from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import Timeline, {
  DateHeader,
  SidebarHeader,
  TimelineHeaders,
} from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import { useParams, useNavigate } from "react-router-dom";
import { useGetEmpNoPaginate } from "../hooks/useEmployee";
import {
  useAssignEmp,
  useGetProjectData,
  useUnAssignEmp,
  useUpdateProject,
} from "../hooks/useProject";
import "../styles/ProjectDetail.css";
import { Translation, useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

const ProjectDetail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const { data: project, isLoading, isError } = useGetProjectData(id);
  const { mutate: assignEmp } = useAssignEmp();
  const { mutate: unassign } = useUnAssignEmp();
  const { mutate: updateProject } = useUpdateProject(id);
  console.log(project);

  const initialValues = {
    name: project?.project.name,
    description: project?.project.description,
    managerProject: project?.project.managerProject,
    langFrame: project?.project.langFrame,
    technology: project?.project.technology,
    startDate: dayjs(project?.project.startDate),
    endDate: dayjs(project?.project.endDate),
    employee_project: project?.project.employee_project,
    tracking: project?.project.tracking,
    employeeRoles: project?.project.employee_project.reduce((acc, item) => {
      acc[item.employee.id] = item.roles;
      return acc;
    }, {}),
    ...project?.project.employee_project.reduce((acc, item) => {
      acc[item.employee.id] = item.roles;
      return acc;
    }, {}),
  };

  const groups = initialValues.tracking?.member.map((item) => {
    return { id: item.id, title: item.employeeName };
  });

  const items = initialValues.tracking?.member.map((item) => {
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

  const { data: empNoPagi } = useGetEmpNoPaginate();

  const [dataSource, setDataSource] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    if (initialValues.employee_project) {
      const newData = initialValues?.employee_project
        .map((item) => {
          return item;
        })
        .map((emp) => emp.employeeId);
      setTargetKeys(newData);
    }
    if (empNoPagi) {
      const newData = empNoPagi
        .filter((item) => item.id !== project?.project.managerId)
        .map((item) => {
          return {
            ...item,
            key: item.id,
          };
        });
      setDataSource(newData);
    }
  }, [initialValues.employee_project]);

  useEffect(() => {
    if (empNoPagi) {
      const newData = empNoPagi
        .filter((item) => item.id !== project?.project.managerId)
        .map((item) => ({
          ...item,
          key: item.id,
        }));
      setDataSource(newData);
    }
  }, [empNoPagi, project?.project.managerId]);

  const onChange = (nextTargetKeys, direction, moveKeys) => {
    const dataAssign = moveKeys.map((item) => {
      return {
        employeeId: item,
        projectId: id,
        roles: [],
        joinDate: new Date(),
      };
    });
    if (direction === "right") {
      assignEmp(dataAssign);
    }

    if (direction === "left") {
      unassign({ employeeIds: moveKeys, projectId: id });
    }
    setTargetKeys(nextTargetKeys);
  };

  const onSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  const onFinish = (value) => {
    const {
      name,
      description,
      langFrame,
      technology,
      startDate,
      endDate,
      ...rest
    } = value;
    const newData = {
      name,
      description,
      langFrame,
      technology,
      startDate,
      endDate,
      employeeRoles: rest,
    };

    console.log(newData);
    updateProject(newData);
  };

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
                <img src={initialValues.managerProject.avatar} alt="" />
                <Typography.Title level={5}>
                  {initialValues.managerProject.name}
                </Typography.Title>
                <p>
                  <MailOutlined /> {initialValues.managerProject.email}
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
                  onFinish={onFinish}
                  initialValues={initialValues}
                  labelCol={{
                    span: 5,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  layout="horizontal"
                  style={{
                    maxWidth: 700,
                  }}
                >
                  <Form.Item name="name" label={t("PROJECT.NAME")}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="description" label={t("PROJECT.DES")}>
                    <Input />
                  </Form.Item>

                  <Form.Item name="langFrame" label={t("PROJECT.LANGFRAM")}>
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      style={{ width: "100%" }}
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

                  <Form.Item name="technology" label={t("PROJECT.TECH")}>
                    <Select
                      mode="multiple"
                      placeholder="Please select"
                      style={{ width: "100%" }}
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

                  <Form.Item label={t("PROJECT.ASSIGN")}>
                    <Transfer
                      dataSource={dataSource ?? dataSource}
                      titles={[t("PROJECT.SOURCE"), t("PROJECT.TARGET")]}
                      targetKeys={targetKeys}
                      selectedKeys={selectedKeys}
                      onChange={onChange}
                      onSelectChange={onSelectChange}
                      render={(item) => item.name}
                    />
                  </Form.Item>

                  {project.project.employee_project?.map((item) => (
                    <Form.Item
                      name={item.employee.id}
                      label={item.employee.name}
                    >
                      <Select
                        mode="multiple"
                        placeholder="Roles"
                        style={{ width: "100%" }}
                      >
                        {[
                          "fe",
                          "be",
                          "ba",
                          "qa",
                          "ux_ui",
                          "devops",
                          "fullstack",
                        ].map((option) => (
                          <Select.Option key={option} value={option}>
                            {option}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  ))}

                  <Form.Item name="startDate" label={t("PROJECT.STARTDATE")}>
                    <DatePicker format="DD/MM/YYYY" />
                  </Form.Item>

                  <Form.Item name="endDate" label={t("PROJECT.ENDDATE")}>
                    <DatePicker
                      format="DD/MM/YYYY"
                      disabledDate={(currentDate) =>
                        currentDate &&
                        currentDate.isBefore(
                          dayjs(initialValues.startDate),
                          "day",
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <div className="button-container">
                      <Button htmlType="submit" type="primary">
                        {t("OK")}
                      </Button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
          <Row>
            <Timeline
              groups={groups}
              items={items}
              defaultTimeStart={dayjs(initialValues?.tracking.joinDate)}
              defaultTimeEnd={dayjs(initialValues?.tracking.fireDate)}
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
