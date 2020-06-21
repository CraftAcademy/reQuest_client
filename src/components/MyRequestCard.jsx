import React from "react";
import { Card } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import updateRequest from "../modules/updateMyRequest";

const MyRequestCard = ({ request }) => {
  const activeRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );
  const myActiveRequest = activeRequest && activeRequest.id === request.id;
  const req = myActiveRequest ? activeRequest : request;
  const dispatch = useDispatch();

  const toggleActiveRequest = async () => {
    if (myActiveRequest) {
      dispatch({ type: "RESET_MY_SELECTED_REQUEST" });
    } else {
      updateRequest(request, dispatch);
    }
  };

  return (
    <Card
      id={"request-" + req.id}
      onClick={() => {
        toggleActiveRequest();
      }}
    >
      <Card.Content>
        <Card.Header>{req.title}</Card.Header>
        <Card.Meta>{req.reward} KP</Card.Meta>
        {myActiveRequest && (
          <Card.Description id={"request-description-" + req.id}>
            {req.description}
          </Card.Description>
        )}
      </Card.Content>
    </Card>
  );
};

export default MyRequestCard;
