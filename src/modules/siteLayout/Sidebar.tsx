import { Menu, Typography } from "antd";
import Sider from "antd/lib/layout/Sider";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Logo = styled(Typography.Title)`
    text-align: center;
    margin: 20px 0;
`;

const StyledSider = styled(Sider)`
    overflow: auto;
    height: 100vh;
    position: fixed;
    left: 0;
`;

export function Sidebar(): JSX.Element {
    const history = useHistory();
    const location = useLocation();
    console.log(location)
    return(
        <StyledSider theme="light">
          <Logo level={1}>yeet-online</Logo>
          <Menu theme="light" mode="inline" defaultSelectedKeys={[location.pathname]}>
            <Menu.Item key="/">
              <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item key="/user" onClick={() => history.push("/user")}>
              <Link to='/user'>User Profile</Link>
            </Menu.Item>
            <Menu.Item key="/login" onClick={() => history.push("/user")}>
              <Link to='/login'>Login</Link>
            </Menu.Item>
          </Menu>
        </StyledSider>
    )
}