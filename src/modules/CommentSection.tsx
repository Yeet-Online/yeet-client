import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Comment, SERVER_URL } from "../types";
import { Feed, FeedProps } from "./Feed";
import { LoadMoreButton } from "./LoadMoreButton";

interface CommentSectionProps
  extends Omit<FeedProps, "title" | "feed" | "refreshData" | "isCommentFeed"> {
  setError: (value?: string) => void;
}

export function CommentSection({
  setError,
  ...props
}: CommentSectionProps): JSX.Element {
  const [comments, setComments] = useState<Comment[]>([]);

  // for pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const search = useLocation().search;
  const yeetId = new URLSearchParams(search).get("yeet") || undefined;

  const getComments = useCallback(() => {
    fetch(
      `${SERVER_URL}/get-comments-by-yeet-id?id=${yeetId}&page=${pageNumber}`,
      {
        method: "GET",
      }
    )
      .then((resp) => resp.json())
      .then((data) => {
        const newPosts: Comment[] = data.results;
        setComments(comments.concat(newPosts));
        if (newPosts.length < 1) {
          setHasMore(false);
        }

        setError(undefined);
      })
      .catch((err) => {
        setError(err.message);
        console.error(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, setError, yeetId]);

  const handleLoadMore = useCallback(() => {
    setPageNumber(pageNumber + 1);
  }, [pageNumber]);

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <>
      <Feed
        {...props}
        title={<Typography.Title level={4}>Comments</Typography.Title>}
        feed={comments}
        refreshData={getComments}
        isCommentFeed
      />
      {hasMore && (
        <LoadMoreButton onClick={handleLoadMore} type="link">
          Load more
        </LoadMoreButton>
      )}
    </>
  );
}
