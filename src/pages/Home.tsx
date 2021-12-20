import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { Feed } from "../modules/Feed";
import { LoadMoreButton } from "../modules/LoadMoreButton";
import { SERVER_URL, User, Yeet } from "../types";

interface HomeProps {
  token: string | null | undefined;
  user: User | null | undefined;
}

export default function Home({ token, user }: HomeProps): JSX.Element {
  const [feed, setFeed] = useState<Yeet[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const refreshData = useCallback(() => {
    fetch(`${SERVER_URL}/explore-feed?page=${pageNumber}`)
      .then((resp) => resp.json())
      .then((data) => {
        const newPosts: Yeet[] = data.results;
        console.log(pageNumber);
        setFeed(feed.concat(newPosts));
        if (newPosts.length < 1) {
          setHasMore(false);
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

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
