import { Menu, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { User } from "../../types";

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

const LoginButton = styled(Typography.Link)`
  margin: 10px 16px 0px 24px;
`;

export interface SidebarProps {
  user?: User;
  openLoginModal: (value: boolean) => void;
  handleLogoutClick: () => void;
}

export function Sidebar({
  user,
  openLoginModal,
  handleLogoutClick,
}: SidebarProps): JSX.Element {
  const history = useHistory();
  const location = useLocation();

  const handleLoginClick = useCallback(() => {
    openLoginModal(true);
  }, [openLoginModal]);

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
        {user ? (
          <>
            <Menu.Item key="/user" onClick={() => history.push("/user")}>
              <Link to="/user">User Profile</Link>
            </Menu.Item>
            <LoginButton onClick={handleLogoutClick}>Logout</LoginButton>
          </>
        ) : (
          <LoginButton onClick={handleLoginClick}>Login</LoginButton>
        )}
      </Menu>
    </StyledSider>
  );
}
