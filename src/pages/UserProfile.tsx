import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { CommentSection } from "../modules/CommentSection";
import { Feed } from "../modules/Feed";
import { LoadMoreButton } from "../modules/LoadMoreButton";
import { UserPostsSection } from "../modules/UserPostsSection";
import { SERVER_URL, User } from "../types";

interface UserProfileProps {
  currentUser?: User;
  token: string | null | undefined;
}

export default function UserProfile({
  token,
  currentUser,
}: UserProfileProps): JSX.Element {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();

  const search = useLocation().search;
  const username = new URLSearchParams(search).get("user");

  useEffect(() => {
    if (username) {
      fetch(`${SERVER_URL}/get-user-by-username?username=${username}`, {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          setUser(data);
          setError(undefined);
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("No user found");
    }
  }, [username]);
  return (
    <>
      <Typography.Title level={2}>@{user?.username}'s Profile</Typography.Title>
      <UserPostsSection
        token={token}
        currentUser={currentUser}
        showYeetCreator={currentUser?.id === user?.id}
        error={error}
        username={user?.username}
        setError={setError}
      />
    </>
  );
}
