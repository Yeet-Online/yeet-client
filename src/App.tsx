import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SiteLayout } from "./modules/siteLayout/SiteLayout";

import "antd/dist/antd.css";
import UserProfile from "./pages/UserProfile";
import Home from "./pages/Home";
import { useCallback, useState } from "react";
import Login from "./pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  if (!isLoggedIn) {
    return <Login login={login} />;
  }

  return (
    <Router>
      <SiteLayout>
        <Switch>
          <Route path="/user">
            <UserProfile />
          </Route>
          <Route path="/">
            <Home />
          </Route>
          {/* <Route default component={Create} /> */}
        </Switch>
      </SiteLayout>
    </Router>
  );
}

export default App;
