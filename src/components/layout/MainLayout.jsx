import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Spin, theme } from "antd";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutSider } from "./LayoutSider";
import '../layout/MainLayout.css'

const { Content, Header } = Layout;

export const PrivateLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      <Layout style={{background: "#DCDCDC"}}>
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
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            height: "100%",
            background: colorBgContainer,
            overflowY: "auto",
            borderRadius: "5px",
            boxShadow: "5px 10px 18px #D3D3D3",
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
