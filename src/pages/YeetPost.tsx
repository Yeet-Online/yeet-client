import { Alert, Divider } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CommentSection } from "../modules/CommentSection";
import { YeetAndCommentCard } from "../modules/YeetAndCommentCard";
import { SERVER_URL, User, Yeet } from "../types";

interface YeetPostProps {
  currentUser?: User;
  token: string | null | undefined;
}

export function YeetPost({ currentUser, token }: YeetPostProps): JSX.Element {
  const [yeet, setYeet] = useState<Yeet>();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();

  const search = useLocation().search;
  const yeetId = new URLSearchParams(search).get("yeet") || undefined;

  const refreshData = useCallback(() => {
    fetch(`${SERVER_URL}/get-yeet?id=${yeetId}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setYeet(data);
        setUser(data.user);
        if (user) {
          setError(undefined);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [yeetId]);

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
      <CommentSection
        token={token}
        currentUser={currentUser}
        showYeetCreator
        user={currentUser}
        error={error}
        yeetId={yeetId}
        setError={setError}
      />
    </>
  );
}
