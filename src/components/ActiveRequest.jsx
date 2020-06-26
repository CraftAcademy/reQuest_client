import React from "react";
import { Divider } from "semantic-ui-react";

const ActiveRequest = ({ request }) => {
  return (
    <div id="selected-request">
      <h2 id="selected-title">{request.title}</h2>
      <span id="selected-requester">{request.requester}</span>
      <Divider />
      <div className="description-wrapper">
        <p id="selected-description">{request.description}</p>
      </div>
      <div className="reward">{request.reward}p</div>
    </div>
  );
};

export default ActiveRequest;
