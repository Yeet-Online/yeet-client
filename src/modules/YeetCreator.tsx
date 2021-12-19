import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useCallback } from "react";
import { SERVER_URL } from "../types";

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
      console.log(values);

      fetch(`${SERVER_URL}/post-yeet`, {
        method: "POST",
        body: formData,
        headers,
      })
        .then((resp) => resp.json())
        .then(() => {
          refreshData();
        });
    },
    [refreshData, token]
  );

  return (
    <Form name="yeet" form={form} onFinish={yeet}>
      <Form.Item
        name="content"
        rules={[{ required: true, message: "Add some text first!" }]}
        noStyle
      >
        <Input placeholder="What's on your mind?" />
      </Form.Item>
      <Button htmlType="submit">YEET</Button>
    </Form>
  );
}
