import { Alert, Divider, Typography } from "antd";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CommentCreator } from "../modules/CommentCreator";
import { Feed } from "../modules/Feed";
import { YeetAndCommentCard } from "../modules/YeetAndCommentCard";
import { Comment, SERVER_URL, User, Yeet } from "../types";

const StyledUsername = styled(Typography.Title)`
  cursor: pointer;
`;

interface YeetPostProps {
  currentUser?: User;
  token: string | null | undefined;
}

export function YeetPost({ currentUser, token }: YeetPostProps): JSX.Element {
  const [yeet, setYeet] = useState<Yeet>();
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();

  const history = useHistory();

  const search = useLocation().search;
  const yeetId = new URLSearchParams(search).get("yeet") || undefined;

  const getComments = useCallback(() => {
    fetch(`${SERVER_URL}/get-comments-by-yeet-id?id=${yeetId}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setComments(data.results);
        if (user) {
          setError(undefined);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [user, yeetId]);

  const refreshData = useCallback(() => {
    fetch(`${SERVER_URL}/get-yeet?id=${yeetId}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setYeet(data);
        getComments();
        if (user) {
          setError(undefined);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [getComments, user, yeetId]);

  const handleUsernameOnClick = useCallback(() => {
    history.push({
      pathname: "/user/",
      search: `?user=${yeet?.user.username}`,
    });
  }, [history, yeet?.user.username]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);
  return (
    <>
      <StyledUsername level={3} onClick={handleUsernameOnClick}>
        @{yeet?.user.username}
      </StyledUsername>
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      <Typography.Text>{yeet?.content}</Typography.Text>
      <Divider />
      <Feed
        feed={comments}
        token={token}
        currentUser={currentUser}
        refreshData={refreshData}
        showYeetCreator
        title="Comments"
        user={currentUser}
        error={error}
        isCommentFeed
        yeetId={yeetId}
      />
    </>
  );
}
