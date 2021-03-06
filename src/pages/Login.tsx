import { Alert, Button, Form, Input, Typography } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useCallback, useState } from "react";
import { LoginInput, SERVER_URL } from "../types";
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
  loginErrorMessage?: string;
}

export default function Login({
  login,
  loginErrorMessage,
}: LoginProps): JSX.Element {
  const [createNewAccount, setCreateNewAccount] = useState(false);
  const [error, setError] = useState<string | undefined>(loginErrorMessage);
  const [form] = useForm<LoginInput>();

  const onCreateNewAccountClick = useCallback(() => {
    setCreateNewAccount(true);
  }, []);

  const onLoginClick = useCallback(() => {
    form.resetFields();
    setCreateNewAccount(false);
  }, [form]);

  const createAccount = useCallback((values: any) => {
    const formData = new FormData();
    formData.append("password", values.password);
    formData.append("username", values.username);

    fetch(`${SERVER_URL}/register`, { method: "POST", body: formData })
      .then((resp) => resp.json())
      .then((data) => {
        setCreateNewAccount(false);
        setError(undefined);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
  }, []);

  const github = useCallback(() => {
    window.location.href =
      "https://github.com/login/oauth/authorize" +
      "?client_id=da8e21d4f1dca53d1fa4" +
      "&redirect_uri=http://localhost:3000/github-login" +
      "&allow_signup=true";
  }, []);

  return (
    <LoginPageWrapper>
      <StyledTitle>{createNewAccount ? "Create Account" : "Login"}</StyledTitle>
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      <StyledForm
        name={createNewAccount ? "createNewAccount" : "login"}
        form={form}
        onFinish={createNewAccount ? createAccount : login}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Username is required." }]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={
            createNewAccount
              ? [
                  {
                    required: true,
                    message: "Password is required",
                  },
                  {
                    min: 8,
                    message: "Password must have a minimum of 8 characters",
                  },
                  {
                    max: 128,
                    message: "Password must have a maximum of 128 characters",
                  },
                ]
              : undefined
          }
          hasFeedback
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        {createNewAccount && (
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords do not match"));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm password" />
          </Form.Item>
        )}

        {createNewAccount ? (
          <>
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
          </>
        ) : (
          <>
            <Form.Item>
              <StyledButton type="primary" htmlType="submit">
                Login
              </StyledButton>
            </Form.Item>
            <Form.Item>
              <StyledButton icon={<GithubOutlined />} onClick={github}>
                Sign in with GitHub
              </StyledButton>
            </Form.Item>
            <Form.Item>
              <StyledButton type="link" onClick={onCreateNewAccountClick}>
                Create New Account
              </StyledButton>
            </Form.Item>
          </>
        )}
      </StyledForm>
    </LoginPageWrapper>
  );
}
