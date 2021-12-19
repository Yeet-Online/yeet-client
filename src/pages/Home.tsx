import { Typography } from "antd";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { YeetCard } from "../modules/YeetCard";
import { YeetCreator, YeetCreatorProps } from "../modules/YeetCreator";
import { SERVER_URL, Yeet } from "../types";

interface HomeProps {
  token: string | null | undefined;
}

export default function Home({ token }: HomeProps): JSX.Element {
  const [feed, setFeed] = useState<Yeet[]>([]);
  const refreshData = useCallback(() => {
    fetch(`${SERVER_URL}/explore-feed`)
      .then((resp) => resp.json())
      .then((data) => setFeed(data.results));
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <>
      <Typography.Title level={2}>Explore</Typography.Title>
      {token && <YeetCreator token={token} refreshData={refreshData} />}
      {feed.length < 1 ? (
        <Typography.Text>No yeets yet</Typography.Text>
      ) : (
        feed.map((yeet: Yeet): ReactNode => {
          return <YeetCard yeet={yeet} />;
        })
      )}
    </>
  );
}
