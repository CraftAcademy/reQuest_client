import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import OfferList from "./OfferList";
import axios from "axios";
import { getSingleRequest } from "../modules/getRequests";
import { useSelector, useDispatch } from "react-redux";

const Offers = () => {
  const dispatch = useDispatch();
  const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [helperOffer, setHelperOffer] = useState({});
  const [helperOfferStatus, setHelperOfferStatus] = useState({});
  const headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  const mySelectedRequest = useSelector(
    (state) => state.requests.mySelectedRequest
  );

  const onHelperClick = (e) => {
    setShowHelperMessage(true);
    setHelperOffer({ ...mySelectedRequest.offers[parseInt(e.target.id)] });
    setHelperOfferStatus(
      mySelectedRequest.offers[parseInt(e.target.id)].status
    );
  };

  const onClickActivity = async (e) => {
    const resp = await axios.put("/offers", {
      headers: headers,
      activity: e.target.id,
    });
    setStatusMessage(resp.data.message);
    debugger;
    getSingleRequest(dispatch, mySelectedRequest.id);
  };
  const myOffers = mySelectedRequest.offers.map((offer, index) => (
    <OfferList offer={offer} index={index} onHelperClick={onHelperClick} />
  ));

  return (
    <List divided relaxed id="offers">
      <h3>Offers</h3>
      {myOffers}
      {showHelperMessage && (
        <OfferMessage
          helperOffer={helperOffer}
          onClickActivity={onClickActivity}
          helperOfferStatus={helperOfferStatus}
        />
      )}
      <p id="status-message">{statusMessage}</p>
    </List>
  );
};

export default Offers;
