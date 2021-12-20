import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Yeet, SERVER_URL } from "../types";
import { Feed, FeedProps } from "./Feed";
import { LoadMoreButton } from "./LoadMoreButton";

interface UserPostsSectionProps
  extends Omit<FeedProps, "title" | "feed" | "refreshData" | "isYeetFeed"> {
  setError: (value?: string) => void;
  username?: string;
}

export function UserPostsSection({
  setError,
  username,
  ...props
}: UserPostsSectionProps): JSX.Element {
  const [feed, setFeed] = useState<Yeet[]>([]);

  // for pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const getYeets = useCallback(() => {
    fetch(
      `${SERVER_URL}/get-users-posts-by-username?username=${username}&page=${pageNumber}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        const newPosts: Yeet[] = data.results;
        setFeed(feed.concat(newPosts));
        console.log(newPosts);
        if (newPosts.length < 1) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        setError(undefined);
      })
      .catch((err) => {
        setError(err.message);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, setError, username]);

  const handleLoadMore = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  useEffect(() => {
    getYeets();
  }, [getYeets]);

  return (
    <>
      <Feed
        {...props}
        title={<Typography.Title level={4}>Yeets</Typography.Title>}
        feed={feed}
        refreshData={getYeets}
      />
      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore} type="link">
          Load more
        </LoadMoreButton>
      )}
    </>
  );
}
