import { Typography } from "antd";
import { ReactNode, useCallback, useEffect, useState } from "react";
import { YeetCard } from "../modules/YeetCard";
import { Yeet } from "../types";

export default function Home(): JSX.Element {
  const [feed, setFeed] = useState<Yeet[]>([]);
  const refreshData = useCallback(() => {
    fetch("http://localhost:8080/explore-feed")
      .then((resp) => resp.json())
      .then((data) => setFeed(data.results));
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <>
      <Typography.Title level={2}>Explore</Typography.Title>
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
