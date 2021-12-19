import { Alert, Typography } from "antd";
import { ReactNode } from "react";
import styled from "styled-components";
import { YeetCard } from "../modules/YeetCard";
import { YeetCreator } from "../modules/YeetCreator";
import { User, Yeet } from "../types";

const YeetCreatorWrapper = styled.div`
  margin-bottom: 20px;
`;

interface FeedProps {
  user: User | null | undefined;
  token: string | null | undefined;
  title: string;
  refreshData: () => void;
  feed: Yeet[];
  showYeetCreator?: boolean;
  error?: string;
}

export function Feed({
  user,
  token,
  title,
  refreshData,
  feed,
  showYeetCreator,
  error,
}: FeedProps): JSX.Element {
  return (
    <>
      <Typography.Title level={2}>{title}</Typography.Title>
      {showYeetCreator && token && user && (
        <YeetCreatorWrapper>
          <YeetCreator token={token} refreshData={refreshData} />
        </YeetCreatorWrapper>
      )}
      {error && (
        <Alert message="Error" description={error} type="error" showIcon />
      )}
      {feed.length < 1 ? (
        <Typography.Text>No yeets yet</Typography.Text>
      ) : (
        feed.map((yeet: Yeet): ReactNode => {
          return <YeetCard yeet={yeet} key={yeet.id} />;
        })
      )}
    </>
  );
}
