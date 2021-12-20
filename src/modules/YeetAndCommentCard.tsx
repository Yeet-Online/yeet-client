import {
  CommentOutlined,
  DeleteOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  Popconfirm,
  Typography,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Comment, SERVER_URL, User, Yeet } from "../types";

const Container = styled.div`
  border: 1px solid #f0f0f0;
  padding: 20px;
  width: 100%;
`;

const CardHeader = styled.div`
  display: flex;
  flex: row;
  justify-content: space-between;
`;

const CardFooter = styled.div`
  text-align: right;
`;

interface YeetAndCommentProps {
  post: Yeet | Comment;
  currentUser?: User;
  isComment?: boolean;
  token: string | null | undefined;
  refreshData: () => void;
}

export function YeetAndCommentCard({
  post,
  currentUser,
  isComment,
  token,
  refreshData,
}: YeetAndCommentProps): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [form] = useForm();
  const history = useHistory();

  const handleUserOnClick = useCallback(() => {
    history.push({
      pathname: "/user/",
      search: `?user=${post.user.username}`,
    });
  }, [history, post.user.username]);

  const handlePostOnClick = useCallback(() => {
    const commentPost = post as Comment;
    history.push({
      pathname: "/yeet/",
      search: `?yeet=${commentPost.yeetId || post.id}`,
    });
  }, [history, post]);

  const handleEditClick = useCallback(() => {
    setIsEdit(true);
  }, []);

  const onEdit = useCallback(
    (values: any) => {
      const headers = new Headers();
      const formData = new FormData();
      headers.append("Authorization", `${token}`);
      formData.append("content", values.content);
      formData.append("id", `${post.id}`);

      fetch(`${SERVER_URL}/edit-${isComment ? "comment" : "yeet"}`, {
        method: "PUT",
        body: formData,
        headers,
      })
        .then((resp) => resp.json())
        .then(() => {
          if (refreshData) {
            refreshData();
          }
          form.resetFields();
          setIsEdit(false);
        });
    },
    [form, isComment, post.id, refreshData, token]
  );

  const handleDeleteClick = useCallback(
    (values: any) => {
      const headers = new Headers();
      const formData = new FormData();
      headers.append("Authorization", `${token}`);
      formData.append("id", `${post.id}`);

      fetch(`${SERVER_URL}/delete-${isComment ? "comment" : "yeet"}`, {
        method: "DELETE",
        body: formData,
        headers,
      })
        .then((resp) => resp.json())
        .then(() => {
          refreshData();
          console.log("poop");
        });
    },
    [isComment, post.id, refreshData, token]
  );

  return (
    <Container>
      <CardHeader>
        <Typography.Link onClick={handleUserOnClick} strong>
          @{post.user.username}
        </Typography.Link>
        {(!isComment || (currentUser && currentUser.id === post?.user.id)) && (
          <Dropdown
            overlay={
              <Menu>
                {!isComment && (
                  <Menu.Item onClick={handlePostOnClick}>View</Menu.Item>
                )}
                {currentUser && currentUser.id === post?.user.id && (
                  <>
                    <Menu.Item onClick={handleEditClick}>Edit</Menu.Item>
                    <Popconfirm
                      title={`Are you sure you want to delete this ${
                        isComment ? "comment" : "yeet"
                      }？`}
                      okText="Delete"
                      cancelText="Cancel"
                      onConfirm={handleDeleteClick}
                      placement="topRight"
                      okType="danger"
                      icon={<DeleteOutlined />}
                    >
                      <Menu.Item danger>Delete</Menu.Item>
                    </Popconfirm>
                  </>
                )}
              </Menu>
            }
            placement="bottomRight"
          >
            <Button icon={<EllipsisOutlined />} shape="round" type="text" />
          </Dropdown>
        )}
      </CardHeader>
      {!isEdit ? (
        <Typography.Text>{post.content}</Typography.Text>
      ) : (
        <Form
          name={isComment ? "comment" : "yeet"}
          form={form}
          onFinish={onEdit}
          initialValues={{ content: post.content }}
        >
          <Form.Item
            name="content"
            rules={[
              { required: true, message: "Add some text first!" },
              {
                max: 250,
                message: `${
                  isComment ? "Comments" : "Yeets"
                } can have a max of 250 characters`,
              },
            ]}
          >
            <Input placeholder="Add some content..." bordered={false} />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            YEET
          </Button>
        </Form>
      )}
      {!isComment && (
        <CardFooter>
          <Button
            icon={<CommentOutlined />}
            shape="round"
            type="text"
            onClick={handlePostOnClick}
          />
        </CardFooter>
      )}
    </Container>
  );
}
