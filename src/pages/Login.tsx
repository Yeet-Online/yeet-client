import { Button, Form, Input, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { LoginInput } from "../types";
import { useForm } from "antd/lib/form/Form";

const LoginPageWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledForm = styled(Form)`
  margin: 0 auto;
  max-width: 350px;
`;

const StyledButton = styled(Button)`
  width: 350px;
`;

const StyledTitle = styled(Typography.Title)`
  margin-top: 50px;
  text-align: center;
`;

interface LoginProps {
  login: (values: any) => void;
}

export default function Login({ login }: LoginProps): JSX.Element {
  const [createNewAccount, setCreateNewAccount] = useState(false);
  const [form] = useForm<LoginInput>();

  const onGithubClick = useCallback(() => {}, []);

  const onCreateNewAccountClick = useCallback(() => {
    setCreateNewAccount(true);
  }, []);

  const onLoginClick = useCallback(() => {
    setCreateNewAccount(false);
  }, []);

  if (createNewAccount) {
    return (
      <LoginPageWrapper>
        <StyledTitle>yeet-online</StyledTitle>
        <StyledForm
          name="createAccount"
          onFinish={login}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Username is required." }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Password is required." }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <StyledButton type="primary" htmlType="submit">
              Create Account
            </StyledButton>
          </Form.Item>
          <Form.Item>
            <StyledButton type="link" onClick={onLoginClick}>
              Login
            </StyledButton>
          </Form.Item>
        </StyledForm>
      </LoginPageWrapper>
    );
  }

  return (
    <LoginPageWrapper>
      <StyledTitle>yeet-online</StyledTitle>
      <StyledForm
        name="login"
        form={form}
        onFinish={login}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username is required." }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required." }]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <StyledButton type="primary" htmlType="submit">
            Login
          </StyledButton>
        </Form.Item>
        <Form.Item>
          <StyledButton icon={<GithubOutlined />} onClick={onGithubClick}>
            Sign in with GitHub
          </StyledButton>
        </Form.Item>
        <Form.Item>
          <StyledButton type="link" onClick={onCreateNewAccountClick}>
            Create New Account
          </StyledButton>
        </Form.Item>
      </StyledForm>
    </LoginPageWrapper>
  );
}
