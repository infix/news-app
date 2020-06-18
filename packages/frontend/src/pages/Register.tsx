import { Button, DatePicker, Form, Input, Layout, Typography } from "antd";
import { MailOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { Link } from "react-router-dom";
import { Rule } from "antd/lib/form";

const validationRules: { [k: string]: Rule[] } = {
  email: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Enter a valid email" },
  ],
  name: [{ required: true, message: "Name is required" }],
  dateOfBirth: [{ required: true, message: "Date of birth is required" }],
};

export const Register = () => {
  return (
    <Layout style={{ minHeight: "100vh", alignItems: "center" }}>
      <Layout.Content
        style={{
          maxWidth: "30rem",
          width: "30rem",
          marginTop: "5rem",
          padding: "1rem",
        }}
      >
        <Form name="register">
          <Typography.Title level={4}>Register</Typography.Title>

          <Form.Item name="email" rules={validationRules.email}>
            <Input prefix={<MailOutlined />} placeholder="Email" type="email" />
          </Form.Item>

          <Form.Item name="name" rules={validationRules.name}>
            <Input prefix={<UserOutlined />} placeholder="Name" name="name" />
          </Form.Item>

          <Form.Item name="dateOfBirth" rules={validationRules.dateOfBirth}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Date Of Birth"
              name="dateOfBirth"
            />
          </Form.Item>

          <Form.Item noStyle>
            <Button type="primary" block htmlType="submit">
              REGISTER
            </Button>
          </Form.Item>
          <Button type="link" block>
            <Link to="/login"> Already got an account? Login </Link>
          </Button>
        </Form>
      </Layout.Content>
    </Layout>
  );
};
