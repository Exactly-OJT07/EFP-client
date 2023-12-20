import {
  DashboardOutlined,
  UserOutlined,
  ThunderboltOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Modal } from "antd";
import "./LayoutSider.css";
import { useLocation, useNavigate } from "react-router-dom";
import logoIcon from "../../assets/logo.jpg";
import { Translation, useTranslation } from "react-i18next";

const { Sider } = Layout;

export const LayoutSider = ({ collapsed = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const showConfirmationModal = (onOkCallback) => {
    Modal.confirm({
      title: <Translation>{(t) => t("SIDEBAR.LOGOUT")}</Translation>,
      content: <Translation>{(t) => t("SIDEBAR.LOGOUTCONTENT")}</Translation>,
      onOk: onOkCallback,
      onCancel: () => {},
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("credentials");
    localStorage.removeItem("authenticated");
    navigate("/login", { replace: true });
  };

  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  if (!isAuthenticated) {
    window.location.href = "/login";
    return null;
  }

  const menu = [
    {
      key: "",
      icon: <DashboardOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.DASHBOARD")}</Translation>,
    },
    {
      key: "manageEmployees",
      icon: <UserOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.EMPLOYEES")}</Translation>,
    },
    {
      key: "manageProjects",
      icon: <ThunderboltOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.PROJECTS")}</Translation>,
    },
    {
      key: ".",
      icon: <LogoutOutlined />,
      label: <Translation>{(t) => t("SIDEBAR.LOGOUT")}</Translation>,
      onClick: () => showConfirmationModal(handleLogout),
    },
  ];

  const { pathname } = location;

  return (
    <Sider
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ borderRight: "1px solid #dcdcdc" }}
    >
      <div className="demo-logo-vertical" collapsible>
        <img
          src={
            "https://res.cloudinary.com/dvm8fnczy/image/upload/v1702886027/zlsfcfdkmebldaw1htls.jpg"
          }
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
        theme="light"
        mode="inline"
        items={menu}
        selectedKeys={[pathname.substring(1)]}
        onClick={({ key }) => {
          if (key !== ".") {
            navigate(key);
          }
        }}
        className="custom-menu"
      />
    </Sider>
  );
};
