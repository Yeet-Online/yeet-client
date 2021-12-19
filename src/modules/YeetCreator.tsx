import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useCallback } from "react";
import styled from "styled-components";
import { SERVER_URL } from "../types";

const StyledForm = styled(Form)`
  text-align: right;
`;

const StyledInput = styled(Input)`
  font-size: 20px;
`;

export interface YeetCreatorProps {
  token: string | null | undefined;
  refreshData: () => void;
}

export function YeetCreator({
  token,
  refreshData,
}: YeetCreatorProps): JSX.Element {
  const [form] = useForm();

  const yeet = useCallback(
    (values: any) => {
      const headers = new Headers();
      const formData = new FormData();
      headers.append("Authorization", `${token}`);
      formData.append("content", values.content);

      fetch(`${SERVER_URL}/post-yeet`, {
        method: "POST",
        body: formData,
        headers,
      })
        .then((resp) => resp.json())
        .then(() => {
          refreshData();
          form.resetFields();
        });
    },
    [form, refreshData, token]
  );

  return (
    <StyledForm name="yeet" form={form} onFinish={yeet}>
      <Form.Item
        name="content"
        rules={[
          { required: true, message: "Add some text first!" },
          {
            max: 250,
            message: "Yeets can have a max of 250 characters",
          },
        ]}
      >
        <StyledInput placeholder="What's on your mind?" bordered={false} />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        YEET
      </Button>
    </StyledForm>
  );
}
