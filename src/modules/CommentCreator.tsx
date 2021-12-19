import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useCallback } from "react";
import styled from "styled-components";
import { SERVER_URL } from "../types";

const StyledForm = styled(Form)`
  text-align: right;
`;

export interface CommentCreatorProps {
  token: string | null | undefined;
  refreshData: () => void;
  yeetId: string;
}

export function CommentCreator({
  token,
  refreshData,
  yeetId,
}: CommentCreatorProps): JSX.Element {
  const [form] = useForm();

  const comment = useCallback(
    (values: any) => {
      const headers = new Headers();
      const formData = new FormData();
      headers.append("Authorization", `${token}`);
      formData.append("yeetId", `${yeetId}`);
      formData.append("content", `${values.content}`);

      fetch(`${SERVER_URL}/post-comment`, {
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
    [form, refreshData, token, yeetId]
  );

  return (
    <StyledForm name="comment" form={form} onFinish={comment}>
      <Form.Item
        name="content"
        rules={[
          { required: true, message: "Add some text first!" },
          {
            max: 250,
            message: "Comments can have a max of 250 characters",
          },
        ]}
      >
        <Input placeholder="Add a new comment..." bordered={false} />
      </Form.Item>
      <Button htmlType="submit" type="primary">
        Comment
      </Button>
    </StyledForm>
  );
}
