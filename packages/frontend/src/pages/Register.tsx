import { Button, Form, Input, Layout, notification, Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Rule } from "antd/lib/form";
import { DatePicker } from "antd";

const REGISTER_MUTATION = gql`
  mutation REGISTER($email: String!, $name: String!, $dateOfBirth: String!) {
    register(email: $email, name: $name, dateOfBirth: $dateOfBirth)
  }
`;

type RegisterData = { register: string };
type RegisterVars = { email: string; name: string; dateOfBirth: string };

const validationRules: { [k: string]: Rule[] } = {
  email: [
    { required: true, message: "Email is required" },
    { type: "email", message: "Enter a valid email" },
  ],
  name: [{ required: true, message: "Name is required" }],
  dateOfBirth: [{ required: true, message: "Date of birth is required" }],
};

export const Register = () => {
  const router = useHistory();
  const [register, { loading, error, data }] = useMutation<
    RegisterData,
    RegisterVars
  >(REGISTER_MUTATION);

  if (data && data.register) {
    notification.success({
      key: "check-your-email",
      message: "Check your email",
      description: "Registered Successfully, We've emailed your password!",
      duration: null,
    });
    router.replace("/login");
  }

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
        <Form
          onFinish={(variables: any) => {
            register({ variables }).catch(e => e);
          }}
          name="register"
        >
          <Typography.Title level={4}>Register</Typography.Title>

          <Form.Item name="email" rules={validationRules.email}>
            <Input
              disabled={loading}
              prefix={<MailOutlined />}
              placeholder="Email"
              type="email"
            />
          </Form.Item>

          <Form.Item name="name" rules={validationRules.name}>
            <Input
              disabled={loading}
              prefix={<UserOutlined />}
              placeholder="Name"
              name="name"
            />
          </Form.Item>

          <Form.Item name="dateOfBirth" rules={validationRules.dateOfBirth}>
            <DatePicker
              style={{ width: "100%" }}
              disabled={loading}
              placeholder="Date Of Birth"
              name="dateOfBirth"
            />
          </Form.Item>

          {error && (
            <Typography.Text type="danger">
              {error.graphQLErrors[0].message}
            </Typography.Text>
          )}

          <Form.Item noStyle>
            <Button loading={loading} type="primary" block htmlType="submit">
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
