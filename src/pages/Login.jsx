import React, { useState, useEffect } from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import { Button, Form, Input, Alert } from "antd";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../components/notification/notification";

const Login = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = () => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";

    if (isAuthenticated) {
      navigate("/");
    }
  };

  const handleSuccessfulLogin = (username) => {
    setShowAlert(true);

    const updatedCredentials = { username };
    localStorage.setItem("credentials", JSON.stringify(updatedCredentials));
    localStorage.setItem("authenticated", "true");

    openNotificationWithIcon("success", "Login Successfully");
    navigate("/");
  };

  const handleFailedLogin = () => {
    setShowError(true);
    openNotificationWithIcon("error", "Login Failed, Check Email or Password");
  };

  const onFinish = (values) => {
    const storedCredentials =
      JSON.parse(localStorage.getItem("credentials")) || {};
    const hardcodedCredentials = {
      username: "admin@admin.com",
      password: "admin",
    };

    const isLoginSuccessful =
      (values.username === hardcodedCredentials.username &&
        values.password === hardcodedCredentials.password) ||
      (values.username === storedCredentials.username &&
        values.password === storedCredentials.password);

    isLoginSuccessful
      ? handleSuccessfulLogin(values.username)
      : handleFailedLogin();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    if (errorInfo.errorFields && errorInfo.errorFields.length > 0) {
      const errorMessage = errorInfo.errorFields[0].errors[0];
      openNotificationWithIcon("error", errorMessage);
    }
  };

  return (
    <div className="login__container">
      <div className="login">
        <Form
          name="login-form"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {showAlert && (
            <Alert
              message="Login Successfully"
              type="success"
              showIcon
              onClose={() => setShowAlert(false)}
            />
          )}

          <p className="PPP">
            {" "}
            Enter your email and password to login to our dashboard.
          </p>

          <Form.Item
            label={<p className="bold-label">Email</p>}
            name="username"
            rules={[
              { required: true, message: "Please input your email!" },
              {
                type: "email",
                message: "Please enter correct email format!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Enter your Email"
            />
          </Form.Item>

          <Form.Item
            label={<p className="bold-label">Password</p>}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Enter your Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
