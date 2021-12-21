import { CommentOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Typography } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Comment, SERVER_URL } from "../types";
import { PostHeader, PostHeaderProps } from "./PostHeader";

const Container = styled.div<{ $isCard?: boolean }>`
  ${(props) => props.$isCard && "border: 1px solid #f0f0f0; padding: 20px;"}
  width: 100%;
`;

const StyledUsername = styled(Typography.Title)`
  cursor: pointer;
`;

const CardFooter = styled.div`
  text-align: right;
`;

interface YeetAndCommentProps
  extends Pick<PostHeaderProps, "currentUser" | "isComment" | "post"> {
  token: string | null | undefined;
  refreshData: () => void;
  isCard?: boolean;
}

export function YeetAndCommentCard({
  post,
  currentUser,
  isComment,
  token,
  refreshData,
  isCard,
}: YeetAndCommentProps): JSX.Element {
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<string>();
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
          setError(undefined);
        })
        .catch((err) => {
          setError(err.message);
          console.error(err);
        });
    },
    [form, isComment, post.id, refreshData, token]
  );

  const handleDeleteClick = useCallback(() => {
    const headers = new Headers();
    const formData = new FormData();
    headers.append("Authorization", `${token}`);
    formData.append("id", `${post.id}`);

    console.log(token);

    fetch(`${SERVER_URL}/delete-${isComment ? "comment" : "yeet"}`, {
      method: "DELETE",
      body: formData,
      headers,
    }).then((resp) => {
      refreshData();
      setError(undefined);
      history.push({
        pathname: "/",
      });
      return resp
        .json()
        .then(() => {})
        .catch((err) => {
          setError(err.message);
          console.error(err);
        });
    });
  }, [history, isComment, post.id, refreshData, token]);

  return (
    <Container $isCard={isCard}>
      <PostHeader
        title={
          isCard ? (
            <Typography.Link onClick={handleUserOnClick} strong>
              @{post.user.username}
            </Typography.Link>
          ) : (
            <StyledUsername level={3} onClick={handleUserOnClick}>
              @{post.user.username}
            </StyledUsername>
          )
        }
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        handlePostOnClick={handlePostOnClick}
        isComment={isComment}
        currentUser={currentUser}
        post={post}
        isCard={isCard}
      />
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
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
          <CardFooter>
            <Button htmlType="submit" type="primary">
              {isEdit ? "Update" : "YEET"}
            </Button>
          </CardFooter>
        </Form>
      )}
      {!isComment && isCard && !isEdit && (
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
