import React, { useCallback } from "react";
import { Button, Form, Input, Layout, Typography } from "antd";
import { UnlockOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { Link, useHistory } from "react-router-dom";
import { Rule } from "antd/lib/form";
import gql from "graphql-tag";

const LOGIN_MUTATION = gql`
  mutation LOGIN($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const validationRules: { [k: string]: Rule[] } = {
  email: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Enter a valid email" },
  ],
  password: [{ required: true, message: "Password is required" }],
};

type LoginData = { login: { token: string } };
type LoginVars = { email: string; password: string };

export const Login = () => {
  const router = useHistory();
  const [login, { loading, error, data }] = useMutation<LoginData, LoginVars>(
    LOGIN_MUTATION,
  );

  if (data && data.login) {
    localStorage.setItem("token", data.login.token);
    router.push("/");
  }

  const onFinish = useCallback(
    values => login({ variables: values as LoginVars }).catch(e => e),
    [],
  );

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
        <Form onFinish={onFinish}>
          <Typography.Title level={4}>Login</Typography.Title>

          <Form.Item name="email" rules={validationRules.email}>
            <Input
              disabled={loading}
              prefix={<UserOutlined />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>

          <Form.Item name="password" rules={validationRules.password}>
            <Input.Password
              disabled={loading}
              prefix={<UnlockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          {error && (
            <Typography.Text type="danger">
              {error.graphQLErrors[0].message}
            </Typography.Text>
          )}

          <Form.Item noStyle>
            <Button type="primary" block htmlType="submit" loading={loading}>
              LOGIN
            </Button>
          </Form.Item>

          <Button type="link" block>
            <Link to="/register"> Don't have an account? Register</Link>
          </Button>
        </Form>
      </Layout.Content>
    </Layout>
  );
};
