import React, { useState } from "react";
import { auth } from "../modules/auth";
import { Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [activePage, setActivePage] = useState("home");
  const uid = useSelector((state) => state.authentication.uid);
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const date = new Date();
  const currentTime = date.getHours();

  const logout = async () => {
    try {
      await auth.signOut();
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      setMessage(error);
    }
  };

  let time =
    currentTime < 12 ? "Morning" : currentTime < 18 ? "Afternoon" : "Evening";

  const greeting = authenticated && (
    <div>
      <p className="input-labels" style={{ fontSize: "110%" }}>
        Good {time} &nbsp;
        {uid}
      </p>
    </div>
  );

  return (
    <div id="header">
      <div id="logo">
        <span id="hfirst">re</span>
        <span id="hsecond">Quest</span>
        <div id="yellow_divider"></div>
        <div id="green_divider"></div>
      </div>
      <div id="links">
        {activePage === "home" && (
          <NavLink
            id="myrequest-home-link"
            to="/myrequest"
            onClick={() => setActivePage("myrequest")}
          >
            my reQuest
          </NavLink>
        )}
        {activePage === "myrequest" && (
          <>
            <NavLink
              id="myrequest-home-link"
              to="/"
              onClick={() => setActivePage("home")}
            >
              home
            </NavLink>
            <div id="small_links">
              <NavLink id="profile-link" to="/myrequest/profile">profile</NavLink>
              <NavLink id="quests-link" to="/myrequest/quests">Quests</NavLink>
              <NavLink id="requests-link" to="/myrequest/requests">reQuests</NavLink>
            </div>
          </>
        )}
      </div>
      <div id="welcome-and-logout">
        <p id="loginmessage">{message}</p>
        {greeting}
        <Button
          basic
          inverted
          size="small"
          id="logout"
          onClick={() => logout()}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
