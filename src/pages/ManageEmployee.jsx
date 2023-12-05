import React, { useState } from "react";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Space,
  Table,
  Tag,
  Dropdown,
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Spin,
  Radio,
  Upload,
  Col,
  Row,
  Popconfirm,
  Modal,
  message,
} from "antd";
import { CloudinaryContext, Image, Transformation } from "cloudinary-react";
import { Cloudinary } from "@cloudinary/url-gen";
import moment from "moment";
import "../styles/ManageEmployee.css";

const { useForm } = Form;
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Phone Number",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Roles",
    key: "roles",
    dataIndex: "roles",
    render: (_, { roles }) => (
      <>
        {roles.map((role) => {
          let color = "geekblue";
          if (role === "Intern") {
            color = "green";
          }
          if (role === "BA") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={role}>
              {role.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Hire Date",
    dataIndex: "hireDate",
    key: "hireDate",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <>
        <Dropdown
          menu={{
            items,
          }}
          trigger={["click"]}
          placement="bottomLeft"
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <MoreOutlined />
            </Space>
          </a>
        </Dropdown>
      </>
    ),
  },
];
const { Search } = Input;
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    phone: "0987654321",
    roles: ["Intern", "Developer"],
    hireDate: "23/10/2023",
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    phone: "0987654321",
    roles: ["Tester"],
    hireDate: "23/10/2023",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    phone: "0987654321",
    roles: ["Middle", "BA"],
    hireDate: "23/10/2023",
  },
  {
    key: "4",
    name: "John Brown",
    age: 32,
    phone: "0987654321",
    roles: ["Intern", "Developer"],
    hireDate: "23/10/2023",
  },
  {
    key: "5",
    name: "Jim Green",
    age: 42,
    phone: "0987654321",
    roles: ["Tester"],
    hireDate: "23/10/2023",
  },
  {
    key: "6",
    name: "Joe Black",
    age: 32,
    phone: "0987654321",
    roles: ["Middle", "BA"],
    hireDate: "23/10/2023",
  },
  {
    key: "7",
    name: "John Brown",
    age: 32,
    phone: "0987654321",
    roles: ["Intern", "Developer"],
    hireDate: "23/10/2023",
  },
  {
    key: "8",
    name: "Jim Green",
    age: 42,
    phone: "0987654321",
    roles: ["Tester"],
    hireDate: "23/10/2023",
  },
  {
    key: "9",
    name: "Joe Black",
    age: 32,
    phone: "0987654321",
    roles: ["Middle", "BA"],
    hireDate: "23/10/2023",
  },
  {
    key: "10",
    name: "John Brown",
    age: 32,
    phone: "0987654321",
    roles: ["Intern", "Developer"],
    hireDate: "23/10/2023",
  },
  {
    key: "11",
    name: "Jim Green",
    age: 42,
    phone: "0987654321",
    roles: ["Tester"],
    hireDate: "23/10/2023",
  },
  {
    key: "12",
    name: "Joe Black",
    age: 32,
    phone: "0987654321",
    roles: ["Middle", "BA"],
    hireDate: "23/10/2023",
  },
];
const EmployeeList = ({ data = [] }) => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={{ defaultPageSize: 5 }}
  />
);
const items = [
  {
    key: "1",
    label: (
      <p>
        <EditOutlined />
        Edit
      </p>
    ),
  },
  {
    key: "2",
    label: (
      <Popconfirm
        title="Delete the user"
        description="Are you sure to delete this user?"
        okText="Yes"
        cancelText="No"
      >
        <p>
          <DeleteOutlined />
          Delete
        </p>
      </Popconfirm>
    ),
    danger: true,
  },
];

function ManageEmployee() {
  const [formCreate] = useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { RangePicker } = DatePicker;

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newDob, setNewDob] = useState("");
  const [newCid, setNewCid] = useState("");
  const [newGender, setNewGender] = useState("");
  const [newPosition, setNewPosition] = useState("");
  const [newLineManager, setNewLineManager] = useState("");
  const [newIsManager, setNewIsManager] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLang, setNewLang] = useState("");
  const [newTechnology, setNewTechnology] = useState("");
  const [newJoinDate, setNewJoinDate] = useState("");
  const [newFireDate, setNewFireDate] = useState("");
  const [newAvatar, setNewAvatar] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
  const [viewModalOpen, setViewModalOpen] = useState(false);

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      setImageUrl(info.file.response.secure_url);
      setNewAvatar(info.file.response.secure_url);
      setLoading(false);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const dataInput = [
    newName,
    newPhone,
    newDob,
    newCid,
    newGender,
    newPosition,
    newLineManager,
    newIsManager,
    newDescription,
    newLang,
    newTechnology,
    newJoinDate,
    newFireDate,
    newAvatar,
  ];

  const handleOpenOk = () => {
    console.log("data:", dataInput);
    console.log("Create OK");
    setConfirmLoading(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Create Cancel");
    setIsModalOpen(false);
  };
  const handleViewOk = () => {
    console.log("View OK");
    setConfirmLoading(true);

    setTimeout(() => {
      setViewModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleViewCancel = () => {
    console.log("View Cancel");
    setViewModalOpen(false);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const [formView] = Form.useForm();

  const [searchText, setSearchText] = useState("");

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const filteredData = data.filter((employee) =>
    employee.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <Space className="status-filter" direction="horizontal">
        <div>
          <Search
            placeholder="input search text"
            allowClear
            onSearch={handleSearch}
            style={{
              width: 304,
            }}
          />
        </div>
        <Button type="primary" onClick={showModal}>
          <PlusOutlined />
          Add Employee
        </Button>
      </Space>
      <EmployeeList data={filteredData} />
      <Modal
        title="Add Employee"
        visible={isModalOpen}
        onOk={handleOpenOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        height={1000}
      >
        <Form
          form={formCreate}
          name="createEmployee"
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={16}>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="Name" label="Name" style={{ width: "100%" }}>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="Phone" label="Phone" style={{ width: "100%" }}>
                <Input
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="Dob" label="Dob" style={{ width: "100%" }}>
                <DatePicker
                  style={{ width: "100%" }}
                  value={moment(newDob)}
                  onChange={(date) => setNewDob(date)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="Cid" label="CID" style={{ width: "100%" }}>
                <Input
                  value={newCid}
                  onChange={(e) => setNewCid(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item name="Gender" label="Gender" style={{ width: "100%" }}>
                <Select
                  value={newGender}
                  onChange={(value) => setNewGender(value)}
                >
                  <Select.Option value="male">Male</Select.Option>
                  <Select.Option value="female">Female</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="Position"
                label="Position"
                style={{ width: "100%" }}
              >
                <Select
                  value={newPosition}
                  onChange={(value) => setNewPosition(value)}
                >
                  <Select.Option value="developer">Developer</Select.Option>
                  <Select.Option value="manager">Manager</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="LineManager"
                label="LineManager"
                style={{ width: "100%" }}
              >
                <Select
                  value={newLineManager}
                  onChange={(value) => setNewLineManager(value)}
                >
                  <Select.Option value="listname">listname</Select.Option>
                  <Select.Option value="test">test</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="IsManager"
                label="IsManager"
                style={{ width: "100%" }}
              >
                <Radio.Group
                  value={newIsManager}
                  onChange={(e) => setNewIsManager(e.target.value)}
                >
                  <Radio value={true}>True</Radio>
                  <Radio value={false}>False</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="Description"
                label="Description"
                style={{ width: "100%" }}
              >
                <Input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="LangFrame"
                label="Lang And Frame"
                style={{ width: "100%" }}
              >
                <Input
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                name="Technology"
                label="Technology"
                style={{ width: "100%" }}
              >
                <Input
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item
                name="JoinDate"
                label="JoinDate"
                style={{ width: "50%" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={moment(newJoinDate)}
                  onChange={(date) => setNewJoinDate(date)}
                />
              </Form.Item>

              <Form.Item
                name="FireDate"
                label="FireDate"
                style={{ width: "50%" }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  value={moment(newFireDate)}
                  onChange={(date) => setNewFireDate(date)}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={12} md={12} lg={6} xl={6}>
              <Form.Item
                label="Avatar"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                value={newAvatar}
                onChange={(e) => setNewAvatar(e.target.value)}
              >
                <CloudinaryContext cloudName="dvm8fnczy" cld={cld}>
                  <Upload
                    listType="picture-card"
                    maxCount={1}
                    action={`https://api.cloudinary.com/v1_1/dvm8fnczy/image/upload`}
                    data={{ upload_preset: "ackgbz0m" }}
                    showUploadList={false}
                    onChange={handleChange}
                  >
                    <Spin spinning={loading} tip="Uploading...">
                      {imageUrl ? (
                        <Image publicId={imageUrl} width="95" height="93">
                          <Transformation crop="fill" />
                        </Image>
                      ) : (
                        <div>
                          <PlusOutlined />
                          <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                      )}
                    </Spin>
                  </Upload>
                </CloudinaryContext>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Modal
        title="New"
        visible={viewModalOpen}
        onOk={handleViewOk}
        confirmLoading={confirmLoading}
        onCancel={handleViewCancel}
      >
        <Form
          form={formView}
          name="viewProject"
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item name="timeLine" label="Timeline">
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageEmployee;
