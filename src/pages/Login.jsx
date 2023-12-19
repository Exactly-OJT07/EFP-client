import React, { useState, useEffect } from "react";
import { Button, Form, Input, Alert } from "antd";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import { openNotificationWithIcon } from "../components/notification/notification";
import styled from "styled-components";

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
    openNotificationWithIcon("error", "Login Failed");
  };

  const validateEmailFormat = (rule, value) => {
    if (value && !value.includes("@gmail.com")) {
      return Promise.reject("Please enter correct EMAIL format!");
    }
    return Promise.resolve();
  };

  const onFinish = (values) => {
    const storedCredentials =
      JSON.parse(localStorage.getItem("credentials")) || {};
    const hardcodedCredentials = {
      username: "linh@gmail.com",
      password: "123",
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
  };

  const StyledPassword = styled(Input.Password)`
    input::placeholder {
      color: black;
    }
  `;

  return (
    <div className="login__container">
      <div className="login">
        <Form
          name="login-form"
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
          <p className="form-title">Log In</p>
          <p className="PPP">
            {" "}
            Enter your email and password to login to our dashboard.
          </p>
          <p className="title">Email</p>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                validator: validateEmailFormat,
              },
            ]}
          >
            <Input className="login-email" placeholder="Enter your Email" />
          </Form.Item>
          <p className="title">Password</p>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <StyledPassword placeholder="Enter your Password" />
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
