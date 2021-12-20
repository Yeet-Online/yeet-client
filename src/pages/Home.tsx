import { useCallback, useEffect, useState } from "react";
import { Feed } from "../modules/Feed";
import { SERVER_URL, User, Yeet } from "../types";

interface HomeProps {
  token: string | null | undefined;
  user: User | null | undefined;
}

export default function Home({ token, user }: HomeProps): JSX.Element {
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
      <Feed
        token={token}
        currentUser={user}
        feed={feed}
        refreshData={refreshData}
        title="Explore"
        showYeetCreator
      />
    </>
  );
}
