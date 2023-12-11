import { useParams } from "react-router-dom";
import { useGetProjectData } from '../hooks/useProject';
import { Button, DatePicker, Form, Input, Avatar, Tooltip } from 'antd';
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const ProjectDetail = () => {
  const { id } = useParams();
  const { data: project, isLoading, isError } = useGetProjectData(id);
  console.log(project)

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
  console.log(project)


  return (
    <div className='projectDetail-Content'>
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
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
        <Form.Item label="Manager">
          <img src={managerProject.avatar} alt={managerProject.name} style={{ width: 50, height: 50, borderRadius: 100 }}/>
        </Form.Item>
        <Form.Item label="Members Assigned">
          <Avatar.Group maxCount={2}>
            {employee_project.map((member) => (
              <Tooltip key={member.id}>
                <Avatar
                src={member.employee.avatar}
                style={{ backgroundColor: '#87D068' }}>
                </Avatar>
              </Tooltip>
              ))}
          </Avatar.Group>
          
        </Form.Item>
        <Form.Item label="Deadline">
          <RangePicker
            defaultValue={[dayjs(startDate), dayjs(endDate)]}
            format="YYYY-MM-DD"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProjectDetail;
