import { Menu, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled(Typography.Title)`
  text-align: center;
  margin: 20px 0;
  &.ant-typography {
    font-size: 30px;
  }
`;

const StyledSider = styled(Sider)`
  overflow: auto;
  height: 100vh;
  position: fixed;
`;

export function Sidebar(): JSX.Element {
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  return (
    <StyledSider theme="light">
      <Logo level={1}>yeet-online</Logo>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        <Menu.Item key="/">
          <Link to="/">Explore</Link>
        </Menu.Item>
        <Menu.Item key="/user" onClick={() => history.push("/user")}>
          <Link to="/user">User Profile</Link>
        </Menu.Item>
      </Menu>
    </StyledSider>
  );
}
