import { Alert, Typography } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";
import { YeetAndCommentCard } from "../modules/YeetAndCommentCard";
import { YeetCreator } from "../modules/YeetCreator";
import { Comment, User, Yeet } from "../types";
import { CommentCreator } from "./CommentCreator";

const YeetCreatorWrapper = styled.div`
  margin-bottom: 20px;
`;

interface FeedProps {
  user?: User | null | undefined;
  currentUser: User | null | undefined;
  token: string | null | undefined;
  title: string;
  refreshData: () => void;
  feed: Yeet[];
  showYeetCreator?: boolean;
  error?: string;
  isCommentFeed?: boolean;
  yeetId?: string;
}

export function Feed({
  user,
  currentUser,
  token,
  title,
  refreshData,
  feed,
  showYeetCreator,
  isCommentFeed,
  error,
  yeetId,
}: FeedProps): JSX.Element {
  return (
    <>
      <Typography.Title level={isCommentFeed ? 4 : 2}>{title}</Typography.Title>
      {showYeetCreator && token && user && (
        <YeetCreatorWrapper>
          {isCommentFeed && yeetId ? (
            <CommentCreator
              refreshData={refreshData}
              token={token}
              yeetId={yeetId}
            />
          ) : (
            <YeetCreator token={token} refreshData={refreshData} />
          )}
        </YeetCreatorWrapper>
      )}
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {feed.length < 1 ? (
        <Typography.Text>
          No {isCommentFeed ? "comments" : "yeets"} yet
        </Typography.Text>
      ) : (
        feed.map((post: Yeet | Comment): ReactNode => {
          return (
            <YeetAndCommentCard
              post={post}
              key={post.id}
              currentUser={currentUser || undefined}
              isComment={isCommentFeed}
              token={token}
              refreshData={refreshData}
              isCard
            />
          );
        })
      )}
    </>
  );
}
