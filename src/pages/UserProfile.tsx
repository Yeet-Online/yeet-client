import { Typography } from "antd";
import { User } from "../types";

interface UserProfileProps {
  user: User | null | undefined;
  token: string | null | undefined;
}

export default function UserProfile({
  user,
  token,
}: UserProfileProps): JSX.Element {
  return (
    <>
      <Typography.Title level={3}>@{user?.username}'s Yeets</Typography.Title>
    </>
  );
}
