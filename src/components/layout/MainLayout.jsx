import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Spin, theme, Dropdown, Menu } from "antd";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { LayoutSider } from "./LayoutSider";
import "../layout/MainLayout.css";

const { Content, Header } = Layout;

export const PrivateLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = (
    <Menu>
      <Menu.SubMenu key="1" title="Change Theme">
        <Menu.Item key="dark">Dark Theme</Menu.Item>
        <Menu.Item key="night">Night Mode</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu key="2" title="Change Language">
        <Menu.Item key="us">US English</Menu.Item>
        <Menu.Item key="vni">Vietnamese (VNI)</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

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
          <Dropdown overlay={menu} placement="bottomRight">
            <Button
              type="text"
              icon={<SettingOutlined />}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Dropdown>
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
