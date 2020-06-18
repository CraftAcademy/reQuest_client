import React from "react";
import MyListComponent from "./MyListComponent";
import { Menu, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Offers from "./Offers";
import { Link, Redirect } from "react-router-dom";

const MyRequestsPage = () => {
  const activeRequest = useSelector((state) => state.requests.activeRequest);
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );

  return (
    <div id="page-container">
      {!authenticated ? (
        <Redirect to="/login" />
      ) : (
        <>
          <div id="leftmost-component">
            <Menu vertical secondary>
              <Menu.Item active="true">pending</Menu.Item>
              <Menu.Item>active</Menu.Item>
              <Menu.Item>completed</Menu.Item>
            </Menu>
            <Link to="/myrequest/newrequest" id="create-request-link">
              <Button>Create new reQuest</Button>
            </Link>
          </div>
          <MyListComponent />
          {activeRequest && <Offers request={activeRequest} />}
        </>
      )}
    </div>
  );
};

export default MyRequestsPage;
