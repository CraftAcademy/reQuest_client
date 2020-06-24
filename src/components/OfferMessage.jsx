import React, { useState } from "react";
import { List, Button, Card, Popup } from "semantic-ui-react";
import axios from "axios";
import { useSelector } from "react-redux";

const OfferMessage = (props) => {
  const [completedMessage, setCompletedMessage] = useState("");
  const [error, setError] = useState(false);
  const mySelectedRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );

  const completeRequest = async () => {
    try {
      const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
      const response = await axios.put(
        `/my_request/requests/${mySelectedRequest.id}`,
        { activity: "completed" },
        { headers: headers },
      );
      setCompletedMessage(response.data.message);
      setError(false)
    } catch (error) {
      setCompletedMessage(error.response.data.message);
      setError(true)
    }
  };

  const helperMessage = (
    <Card.Content>
      <Card.Header></Card.Header>
      <Card.Meta>{props.helperOffer.email}</Card.Meta>
      <Card.Description>
        <div style={{ height: "35vh" }}></div>
        <Popup
          content={props.helperOffer.message}
          open
          position="top left"
          id="offer-message"
          trigger={<div></div>}
        />
      </Card.Description>
    </Card.Content>
  );

  const showActivityButton = (
    <Card.Content extra>
      <>
        {props.selectedStatus === "pending" && (
          <div className="ui two buttons">
            <Button
              basic
              color="green"
              onClick={(e) => props.onClickActivity(e)}
              id="accepted"
              value={props.id}
            >
              Accept
            </Button>
            <Button
              basic
              color="red"
              onClick={(e) => props.onClickActivity(e)}
              id="declined"
              value={props.id}
            >
              Decline
            </Button>
          </div>
        )}
        {props.selectedStatus === "active" && (!completedMessage || error) && (
          <div className="ui two buttons">
            <Button id="quest-completed" onClick={completeRequest}>
              Quest Completed
            </Button>
          </div>
        )}
      </>
    </Card.Content>
  );

  return (
    <>
      <List divided relaxed id="offers">
        <Card.Group>
          <Card>
            {helperMessage}
            {showActivityButton}
          </Card>
        </Card.Group>
        <p style={{ color: "black" }} id="completed-message">
          {completedMessage}
        </p>
      </List>
    </>
  );
};

export default OfferMessage;
