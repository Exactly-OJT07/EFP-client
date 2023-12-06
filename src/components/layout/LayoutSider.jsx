// Import các icon và component cần thiết
import {
    DashboardOutlined,
    UserOutlined,
    ThunderboltOutlined,
    LogoutOutlined,
  } from "@ant-design/icons";
  import { Layout, Menu, Modal } from "antd";
  import './LayoutSider.css'
  import { useLocation, useNavigate } from "react-router-dom";
  import logoIcon from '../../assets/logo.jpg'
  
  const { Sider } = Layout;
  
  export const LayoutSider = ({ collapsed = true }) => {
    const navigate = useNavigate();
    const location = useLocation();
  
    const showConfirmationModal = (onOkCallback) => {
      Modal.confirm({
        title: "LOG OUT",
        content: "Are you sure Log Out?",
        onOk: onOkCallback,
        onCancel: () => {}, 
      });
    };
  
    const handleLogout = () => {
      // Thực hiện các hành động khi đăng xuất
      localStorage.removeItem("credentials");
      localStorage.removeItem("authenticated");
      navigate("/Login", { replace: true });
    };
  
    // Kiểm tra trạng thái đăng nhập
    const isAuthenticated = localStorage.getItem("authenticated") === "true";

    if (!isAuthenticated) {
      window.location.href = "/Login";
      return null;
    }
    
  
    const menu = [
      {
        key: "dashboard",
        icon: <DashboardOutlined />,
        label: 'Dashboard',
      },
      {
        key: "manageUsers",
        icon: <UserOutlined />,
        label: 'Manage Users',
      },
      {
        key: "manageProjects",
        icon: <ThunderboltOutlined />,
        label: 'Manage Projects',
      },
      {
        key: ".", 
        icon: <LogoutOutlined />,
        label: 'Log Out',
        onClick: () => showConfirmationModal(handleLogout), 
      },
    ];
  
    const { pathname } = location;
  
    return (
      <Sider theme="dark" trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <img
            src={logoIcon}
            alt=""
            style={{
              width: 65,
              height: 65,
              margin: 10,
              borderRadius: 10,
            }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menu}
          selectedKeys={[pathname.substring(1)]}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
    );
  };
  