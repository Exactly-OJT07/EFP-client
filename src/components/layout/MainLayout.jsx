import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Dropdown, Layout, Spin, theme } from "antd";
import { Suspense, useState } from "react";
import { Translation, useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";
import en from "../../assets/united-states.png";
import vn from "../../assets/vietnam.png";
import { LOCALES, LOCALE_STORAGE } from "../../constants/constants";
import "../layout/MainLayout.css";
import { LayoutSider } from "./LayoutSider";

const { Content, Header } = Layout;

const items = [
  {
    key: "1",
    label: "Việt Nam",
    icon: <img src={vn} alt="" />,
  },
  {
    key: "2",
    label: "English",
    icon: <img src={en} alt="" />,
  },
];

export const PrivateLayout = () => {
  const { i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  const { t } = useTranslation();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleClick = (e) => {
    if (e.key === "1") {
      i18n.changeLanguage(LOCALES.VI);
      localStorage.setItem(LOCALE_STORAGE, LOCALES.VI);
    } else {
      i18n.changeLanguage(LOCALES.EN);
      localStorage.setItem(LOCALE_STORAGE, LOCALES.EN);
    }
  };

  return (
    <Layout
      style={{
        overflow: "hidden",
        height: "100vh",
        padding: 0,
        margin: 0,
      }}
    >
      <LayoutSider collapsed={collapsed} />
      <Layout>
        <Header
          style={{
            height: 60,
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div
            style={{
              marginRight: "20px",
            }}
          >
            <Dropdown
              menu={{ items: items, onClick: handleClick }}
              placement="bottomLeft"
              arrow
            >
              <Button>
                <Translation>{(t) => t("LANGUAGE")}</Translation>
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            overflowY: "auto",
            margin: "24px 16px",
            padding: 24,
            height: "100%",
            background: colorBgContainer,
            borderRadius: 5,
          }}
        >
          <Suspense fallback={<Spin />}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};
