import { Typography } from "antd";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Yeet } from "../types";

const Container = styled.div`
  border: 1px solid #f0f0f0;
  padding: 20px;
  width: 100%;
`;

const CardHeader = styled.div``;

interface YeetProps {
  yeet: Yeet;
}

export function YeetCard({ yeet }: YeetProps): JSX.Element {
  const history = useHistory();

  const handleOnClick = useCallback(() => {
    history.push({
      pathname: "/user/",
      search: `?user=${yeet.user.username}`,
    });
  }, [history, yeet.user.username]);

  return (
    <Container>
      <CardHeader>
        <Typography.Link onClick={handleOnClick} strong>
          @{yeet.user.username}
        </Typography.Link>
      </CardHeader>
      <Typography.Text>{yeet.content}</Typography.Text>
    </Container>
  );
}
