import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Feed } from "../modules/Feed";
import { SERVER_URL, User, Yeet } from "../types";

interface UserProfileProps {
  currentUser?: User;
  token: string | null | undefined;
}

export default function UserProfile({
  token,
  currentUser,
}: UserProfileProps): JSX.Element {
  const [feed, setFeed] = useState<Yeet[]>([]);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string>();

  const search = useLocation().search;
  const username = new URLSearchParams(search).get("user");

  const refreshData = useCallback(() => {
    if (username) {
      fetch(`${SERVER_URL}/get-users-posts-by-username?username=${username}`, {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then((data) => {
          setFeed(data.results);
          if (user) {
            setError(undefined);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    } else {
      setError("No user found");
    }
  }, [user, username]);

  useEffect(() => {
    refreshData();
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
  }, [refreshData, username]);
  return (
    <>
      <Feed
        token={token}
        error={error}
        currentUser={currentUser}
        user={user}
        feed={feed}
        refreshData={refreshData}
        title={`@${user?.username}'s Profile`}
        showYeetCreator={currentUser?.id === user?.id}
      />
    </>
  );
}
