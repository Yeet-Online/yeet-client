import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Feed } from "../modules/Feed";
import { LoadMoreButton } from "../modules/LoadMoreButton";
import { SERVER_URL, User, Yeet } from "../types";

interface HomeProps {
  token: string | null | undefined;
  user: User | null | undefined;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
}

export default function Home({
  token,
  user,
  setToken,
  setUser,
}: HomeProps): JSX.Element {
  const [feed, setFeed] = useState<Yeet[]>([]);
  const [error, setError] = useState<string>();
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const search = useLocation().search;
  const gitHubCode = new URLSearchParams(search).get("code");

  const refreshData = useCallback(() => {
    fetch(`${SERVER_URL}/explore-feed?page=${pageNumber}`)
      .then((resp) => resp.json())
      .then((data) => {
        const newPosts: Yeet[] = data.results;
        setFeed(feed.concat(newPosts));
        setError(undefined);
        if (newPosts.length < 1) {
          setHasMore(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (!gitHubCode) {
      return;
    }
    const formData = new FormData();
    formData.append("code", gitHubCode);
    fetch(`${SERVER_URL}/github-login`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setToken(data.accessToken);
        setUser(data.user);
      });
  }, [gitHubCode, setToken, setUser]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const handleLoadMore = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  return (
    <>
      <Feed
        token={token}
        currentUser={user}
        feed={feed}
        error={error}
        refreshData={refreshData}
        title={<Typography.Title level={2}>Explore</Typography.Title>}
        showYeetCreator
      />
      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore} type="link">
          Load more
        </LoadMoreButton>
      )}
    </>
  );
}
