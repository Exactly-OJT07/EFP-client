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
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        borderRight: "1px solid #dcdcdc",
        background: "#060606",
        padding: "0 10px 0px 10px",
      }}
      width={"14%"}
    >
      <div className="demo-logo-vertical" collapsible>
        <img
          src={
            "https://res.cloudinary.com/dtrwgtzzd/image/upload/v1703055739/cibenh2yfuzblszmcnq6.png"
          }
          alt=""
          style={{
            width: 70,
            margin: "18px 10px 10px 10px",
          }}
        />
      </div>
      <Menu
        theme="dark"
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
