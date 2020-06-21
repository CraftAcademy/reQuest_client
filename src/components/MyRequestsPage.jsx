import React, { useState } from "react";
import MyListComponent from "./MyListComponent";
import { Menu, Button } from "semantic-ui-react";
import { useSelector } from "react-redux";
import Offers from "./Offers";
import { Link, Redirect } from "react-router-dom";

const MyRequestsPage = (props) => {
  const mySelectedRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const [activeMenu, setActiveMenu] = useState("active")
  const page = props.match.params.prop;

  return (
    <div id="page-container">
      {!authenticated ? (
        <Redirect to="/login" />
      ) : (
        <>
          <div id="leftmost-component">
            <Menu vertical secondary>
              <Menu.Item
                id="active"
                name="active"
                active={activeMenu === "active"}
                onClick={() => setActiveMenu("active")}
              >
                active
              </Menu.Item>
              <Menu.Item
                id="pending"
                name="pending"
                active={activeMenu === "pending"}
                onClick={() => setActiveMenu("pending")}
              >
                pending
              </Menu.Item>

              <Menu.Item
                id="completed"
                name="completed"
                active={activeMenu === "completed"}
                onClick={() => setActiveMenu("completed")}
              >
                completed
              </Menu.Item>
            </Menu>
            <Link to="/myrequest/newrequest" id="create-request-link">
              <Button>Create new reQuest</Button>
            </Link>
          </div>
          <MyListComponent page={page} status={activeMenu} />
          {mySelectedRequest && <Offers request={mySelectedRequest} />}
        </>
      )}
    </div>
  );
};

export default MyRequestsPage;
