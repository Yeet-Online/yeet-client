import { Alert, Divider, Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Feed } from "../modules/Feed";
import { YeetAndCommentCard } from "../modules/YeetAndCommentCard";
import { Comment, SERVER_URL, User, Yeet } from "../types";

interface YeetPostProps {
  currentUser?: User;
  token: string | null | undefined;
}

export function YeetPost({ currentUser, token }: YeetPostProps): JSX.Element {
  const [yeet, setYeet] = useState<Yeet>();
  const [comments, setComments] = useState<Comment[] | []>([]);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();

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
        setUser(data.user);
        if (user) {
          setError(undefined);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [getComments, user, yeetId]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);
  return (
    <>
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {yeet && (
        <YeetAndCommentCard
          post={yeet}
          refreshData={refreshData}
          token={token}
          currentUser={currentUser}
        />
      )}
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
