import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Popconfirm } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";
import { Comment, User, Yeet } from "../types";

const CardHeader = styled.div`
  display: flex;
  flex: row;
  justify-content: space-between;
`;

export interface PostHeaderProps {
  title: ReactNode;
  isComment?: boolean;
  currentUser?: User;
  post: Yeet | Comment;
  handlePostOnClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  isCard?: boolean;
}

export function PostHeader({
  title,
  isComment,
  currentUser,
  post,
  handlePostOnClick,
  handleEditClick,
  handleDeleteClick,
  isCard,
}: PostHeaderProps): JSX.Element {
  return (
    <CardHeader>
      {title}
      {(!isComment || (currentUser && currentUser.id === post?.user.id)) && (
        <Dropdown
          overlay={
            <Menu>
              {!isComment && isCard && (
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
  );
}
