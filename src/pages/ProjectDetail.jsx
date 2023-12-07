import { Steps } from "antd";
import { useState } from "react";
import { Input, Form, DatePicker, Button, Avatar, Tooltip } from "antd";
import "../styles/ProjectDetail.css";

const { RangePicker } = DatePicker;

const employeeData = [
  {
    id: "1",
    name: "Nguyen Tien Hung",
    avatar:
      "https://inkythuatso.com/uploads/thumbnails/800/2023/02/hinh-anh-cho-con-de-thuong-chay-tung-tang-1-24-11-43-28.jpg",
  },
  {
    id: "2",
    name: "Nguyen",
    avatar:
      "https://images.kienthuc.net.vn/zoom/800/uploaded/tuyetmai/2015_06_23/cng%20dong/cho/bo-anh-ngo-nghinh-50-sac-thai-cua-nhung-chu-cho.jpg",
  },
  {
    id: "3",
    name: "Vu",
    avatar:
      "https://kenh14cdn.com/2020/6/26/photo-9-1593159743404493183448.jpg",
  },
  {
    id: "4",
    name: "Ha",
    avatar:
      "https://kenh14cdn.com/2020/6/26/photo-9-1593159743404493183448.jpg",
  },
  {
    id: "5",
    name: "Le",
    avatar:
      "https://kenh14cdn.com/2020/6/26/photo-9-1593159743404493183448.jpg",
  },
  { id: "6", name: "Tuon" },
];

const getInitials = (name) => {
  const names = name.split(" ");
  return names
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const ProjectDetail = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "Start",
      description: "Ngày: 1/12/2023",
    },
    {
      title: "",
      description: (
        <div style={{ border: "1px solid black", padding: "10px" }}></div>
      ),
    },
    {
      title: "",
      description: (
        <div style={{ border: "1px solid black", padding: "10px" }}></div>
      ),
    },
    {
      title: "",
      description: (
        <div style={{ border: "1px solid black", padding: "10px" }}></div>
      ),
    },
    {
      title: "",
      description: (
        <div style={{ border: "1px solid black", padding: "10px" }}></div>
      ),
    },
    {
      title: "",
      description: (
        <div style={{ border: "1px solid black", padding: "10px" }}></div>
      ),
    },
    {
      title: "",
      description: (
        <div style={{ border: "1px solid black", padding: "10px" }}></div>
      ),
    },
    {
      title: "",
      description: (
        <div style={{ border: "1px solid black", padding: "10px" }}></div>
      ),
    },
    {
      title: "",
      description: (
        <div style={{ border: "1px solid black", padding: "10px" }}></div>
      ),
    },
    {
      title: "Done",
      description: "Ngày: 10/12/2023",
    },
  ];

  const hideDescription = (index) => {
    if (index === 0 || index === steps.length - 1) {
      return false;
    }
    return current !== index && current !== index + 1;
  };

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  const handleButtonClick = () => {
    // Xử lý sự kiện khi button được nhấp
  };

  return (
    <Form
      onFinish={onFinish}
      initialValues={{
        projectId: "YourProjectIDHere",
        projectName: "Redesign Owlio Landing Page Web",
        description: "abc123",
        dateRange: [null, null],
      }}
    >
      <Form.Item
        label="ID"
        name="projectId"
        rules={[
          {
            required: true,
            message: "Please enter the project ID!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Project Name"
        name="projectName"
        rules={[
          {
            required: true,
            message: "Please enter the project name!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please enter the project description!",
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>
      <Form.Item
        label="Date Range"
        name="dateRange"
        rules={[
          {
            required: true,
            message: "Please select the date range!",
          },
        ]}
      >
        <RangePicker />
      </Form.Item>

      <Form.Item label="Team Member" name="employee">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar.Group maxCount={2}>
            {employeeData.map((employee) => (
              <Tooltip key={employee.id} title={employee.name}>
                <Avatar
                  src={employee.avatar}
                  style={{ backgroundColor: "#87D068" }}
                >
                  {employee.avatar ? null : getInitials(employee.name)}
                </Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
          <Button type="primary" onClick={handleButtonClick}>
            Thêm
          </Button>
        </div>
      </Form.Item>

      <Steps progressDot current={current} onChange={onChange}>
        {steps.map((step, index) => (
          <Steps.Step
            key={index}
            title={step.title}
            description={hideDescription(index) ? "" : step.description}
          />
        ))}
      </Steps>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectDetail;
