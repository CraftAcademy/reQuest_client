import React from "react";
import MyListComponent from "./MyListComponent";
import { Menu } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Offers from "./Offers";
import { Redirect } from "react-router-dom";

const MyQuestsPage = () => {
  const mySelectedQuest = useSelector(
    (state) => state.requests.mySelectedQuest
  );
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  let activeMenuItem = "active";

  const menuClickHandler = (e, {name}) => {
    activeMenuItem = name;
  };

  return (
    <div id="page-container">
      {!authenticated ? (
        <Redirect to="/login" />
      ) : (
        <>
          <div id="leftmost-component">
            <Menu vertical secondary>
              <Menu.Item
                id="active-quests"
                name="active"
                active={activeMenuItem === "active"}
                onClick={menuClickHandler}
              >
                active
              </Menu.Item>
              <Menu.Item
                id="pending-quests"
                name="pending"
                active={activeMenuItem === "pending"}
                onClick={menuClickHandler}
              >
                pending
              </Menu.Item>
              <Menu.Item
                id="completed-quests"
                name="completed"
                active={activeMenuItem === "completed"}
                onClick={menuClickHandler}
              >
                completed
              </Menu.Item>
            </Menu>
          </div>
          <MyListComponent page="quests" status />
          {mySelectedQuest && <Offers request={mySelectedQuest} />}
        </>
      )}
    </div>
  );
};

export default MyQuestsPage;
