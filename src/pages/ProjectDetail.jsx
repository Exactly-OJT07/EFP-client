import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProjectData } from "../hooks/useProject";
import { useGetAssignedAndUnassignedEmployees } from "../hooks/useUnassigned";
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
  Select,
} from "antd";
import { MailOutlined, UserAddOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "../styles/ProjectDetail.css";
import { useassignMemberToProject } from "../hooks/useAssignMember";
import AssignMemberModal from "./AssignMemberModal";

const { RangePicker } = DatePicker;

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError } = useGetProjectData(id);
  const [selectedMember, setSelectedMember] = useState();
  const { data: unassignedMembers } = useGetAssignedAndUnassignedEmployees(id);
  const [assignedMembers, setAssignedMembers] = useState([]);
  const [assignMemberModal, setAssignMemberModal] = useState(false);

  const handleOpenAssignMemberModal = () => setAssignMemberModal(true);
  const handleCloseAssignMemberModal = () => setAssignMemberModal(false);

  const {} = useassignMemberToProject();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !project) {
    return <div>Project not found</div>;
  }
  const handleAssignMember = async () => {
    try {
      if (Array.isArray(selectedMember) && selectedMember.length > 0) {
        const membersToAdd = unassignedMembers.filter((member) =>
          selectedMember.includes(member.id),
        );

        if (membersToAdd.length > 0) {
          setAssignedMembers([...assignedMembers, ...membersToAdd]);
          const updatedUnassignedMembers = unassignedMembers.filter(
            (member) => !selectedMember.includes(member.id),
          );
        }
      }
    } catch (error) {
      console.error("Error assigning member:", error);

      // Log more details about the error
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const {
    name,
    description,
    managerProject,
    employee_project,
    startDate,
    endDate,
  } = project;
  console.log(selectedMember);
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
                    <Tooltip key={member.id} title={member.employee.name}>
                      <Avatar
                        src={member.employee.avatar}
                        style={{ backgroundColor: "#87D068" }}
                      ></Avatar>
                    </Tooltip>
                  ))}
                </Avatar.Group>
                <Row>
                  <Select
                    mode="multiple"
                    showSearch
                    placeholder="Select a member"
                    optionFilterProp="children"
                    value={selectedMember}
                    style={{ width: "100%", marginTop: "10px" }}
                    onChange={(values) => setSelectedMember(values)}
                  >
                    {unassignedMembers?.map((member) => (
                      <Select.Option key={member.id} value={member.id}>
                        {member.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Row>
                <Button
                  type="primary"
                  style={{ marginTop: "10px" }}
                  // onClick={handleAssignMember}
                  onClick={handleOpenAssignMemberModal}
                >
                  Assign
                </Button>
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

      {assignMemberModal && (
        <AssignMemberModal
          onClose={handleCloseAssignMemberModal}
          onAdd={(values) => console.log(values)}
          isOpen={assignMemberModal}
          unassignedMembers={unassignedMembers || []}
        />
      )}
    </div>
  );
};

export default ProjectDetail;
