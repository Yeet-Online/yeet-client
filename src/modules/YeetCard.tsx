import { Typography } from "antd";
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
  return (
    <Container>
      <CardHeader>
        <Typography.Text strong>@{yeet.user.username}</Typography.Text>
      </CardHeader>
      <Typography.Text>{yeet.content}</Typography.Text>
    </Container>
  );
}
