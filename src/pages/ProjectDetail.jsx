import { useState, useEffect } from 'react';
import { Input, Form, DatePicker, Button } from 'antd';

const ProjectDetail = () => {
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm(); // Sử dụng Form hooks để quản lý form state
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    const api = 'http://localhost:3000/project'; // Đường dẫn thực tế của bạn

    const fetchData = async () => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setProjectData(data);
        console.log('Received data from API:', data); // Thêm console log này để kiểm tra
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Dùng mảng rỗng để đảm bảo useEffect chỉ chạy một lần sau khi component được render

  const onFinish = (values) => {
    console.log('Received values:', values);
  };

  if (!projectData) {
    return <p>Loading...</p>;
  }

  return (
    <Form form={form} onFinish={onFinish}>
      {/* ... Rest of the form components ... */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProjectDetail;
