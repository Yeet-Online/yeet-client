import { CommentOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Typography } from "antd";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Comment, User, Yeet } from "../types";

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
}

export function YeetAndCommentCard({
  post,
  currentUser,
  isComment,
}: YeetAndCommentProps): JSX.Element {
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
                  <Menu.Item>Edit</Menu.Item>
                )}
              </Menu>
            }
            placement="bottomRight"
          >
            <Button icon={<EllipsisOutlined />} shape="round" type="text" />
          </Dropdown>
        )}
      </CardHeader>
      <Typography.Text>{post.content}</Typography.Text>
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
