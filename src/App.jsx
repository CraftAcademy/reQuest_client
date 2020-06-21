import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import BrowseRequests from "./components/BrowseRequests";
import Header from "./components/Header";
import NewRequest from "./components/NewRequest";
import LoginForm from "./components/LoginForm";
import "./App.css";
import MyRequestsPage from "./components/MyRequestsPage";
import { persistLogin } from "./modules/auth";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    persistLogin(dispatch);
  }, []);

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/" component={BrowseRequests}></Route>
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/myrequest/newrequest" component={NewRequest} />
        <Route exact path="/myrequest/:prop" component={MyRequestsPage} />
      </Switch>
    </>
  );
}

export default App;
