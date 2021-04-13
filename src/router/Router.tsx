import { VFC } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { Page404 } from "../components/pages/Page404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { homeRoutes } from "./HomeRoutes";
import { Register } from "../components/pages/Register";
import { UserProvider } from "../providers/UserProvider";

export const Router: VFC = () => {
  return(
    <Switch>
      <UserProvider>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/home" render={({ match: { url } }) => (
          <Switch>
            {homeRoutes.map((route) => (
              <Route key={route.path} exact={route.exact} path={`${url}${route.path}`}>
                <HeaderLayout>{route.children}</HeaderLayout>
              </Route>
            ))}
          </Switch>
        )} />
      </UserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  )
}