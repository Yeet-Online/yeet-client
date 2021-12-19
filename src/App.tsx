import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SiteLayout } from "./modules/siteLayout/SiteLayout";

import "antd/dist/antd.css";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import { useCallback, useState } from "react";
import Login from "./pages/Login";
import useToken from "./hooks/useToken";
import { Modal } from "antd";
import { LoginInput, SERVER_URL } from "./types";
import useUser from "./hooks/useUser";

function App() {
  const { token, setToken } = useToken();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { user, setUser } = useUser();

  const login = useCallback(
    (values: LoginInput) => {
      const formData = new FormData();
      formData.append("password", values.password);
      formData.append("username", values.username);

      fetch(`${SERVER_URL}/login`, { method: "POST", body: formData })
        .then((resp) => resp.json())
        .then((data) => {
          // console.log(data);
          setToken(data.accessToken);
          setUser(data.user);
          setIsLoginModalOpen(false);
        });
    },
    [setToken, setUser]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, [setToken, setUser]);

  const handleModalClose = useCallback(() => {
    setIsLoginModalOpen(false);
  }, []);

  return (
    <Router>
      <SiteLayout
        user={user}
        openLoginModal={setIsLoginModalOpen}
        handleLogoutClick={logout}
      >
        <Switch>
          <Route path="/user">
            <UserProfile user={user} token={token} />
          </Route>
          <Route path="/">
            <Home token={token} />
          </Route>
          {/* TODO: make a 404 page not found page */}
          {/* <Route default component={Create} /> */}
        </Switch>
        {
          <Modal
            onCancel={handleModalClose}
            visible={isLoginModalOpen}
            footer={null}
          >
            <Login login={login} />
          </Modal>
        }
      </SiteLayout>
    </Router>
  );
}

export default App;
