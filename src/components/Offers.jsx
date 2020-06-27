import React, { useState, useEffect } from "react";
import { List } from "semantic-ui-react";
import OfferMessage from "./OfferMessage";
import OfferList from "./OfferList";
import { ActionCableProvider } from "actioncable-client-react";


import { updateMyRequest } from "../modules/updateMyRequest";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOffer,
  markRequestCompleted,
  replyToConversation,
} from "../modules/messaging";

const Offers = ({ request, selectedStatus, page }) => {
  const dispatch = useDispatch();
  const [statusMessage, setStatusMessage] = useState("");
  const [messagesUpdate, triggerMessagesUpdate] = useState({});
  const [completedMessage, setCompletedMessage] = useState("");
  const [error, setError] = useState("");
  const [showActiveOffer, setShowActiveOffer] = useState(false);
  const [activeOffer, setActiveOffer] = useState();
  const uid = useSelector(state => state.authentication.uid)

  useEffect(() => {
    getAcceptedOffer(request);
  }, [request]);


  const showOffer = (offer) => {
    setActiveOffer(offer);
    setShowActiveOffer(true);
    setCompletedMessage("");
    setError("");
  }

  const getAcceptedOffer = (request) => {
    if ((selectedStatus === "active" || selectedStatus === "completed") && page === "requests") {
      const offer = request.offers.filter(
        (offer) => offer.status === "accepted"
      )[0];
      showOffer(offer)
    } else if (page === "quests") {
      request.offer.email = request.email
      showOffer(request.offer)
    }
  };


  const onHelperClick = (e) => {
    e.preventDefault();
    setActiveOffer(request.offers[parseInt(e.target.id)]);
    setShowActiveOffer(true);
    setCompletedMessage("");
  };

  const updateOfferStatus = async (e) => {
    const response = await updateOffer(e.target.id, activeOffer.id);
    setStatusMessage(response.data.message);
    await updateMyRequest(request, dispatch);
    setShowActiveOffer(false);
    dispatch({ type: "FETCH_MY_REQUESTS", payload: { getMyRequests: true } });
  };

  const completeRequest = async () => {
    const response = await markRequestCompleted(request.id);
    if (response.status === 200) {
      setCompletedMessage(response.data.message);
      dispatch({
        type: "FETCH_MY_REQUESTS",
        payload: { getMyRequests: true },
      });
      setError("");
      setShowActiveOffer(false);
    } else {
      setCompletedMessage("");
      setError(response.response.data.message);
    }
  };

  const replyOfferMessage = async (e) => {
    const message = e.target.replyMessage.value;
    const resp = await replyToConversation(activeOffer.id, message);
    resp &&
      activeOffer.conversation.messages.push({
        me: true,
        content: message,
      }) && updateConversation()
  };

  const updateConversation = () => {
    triggerMessagesUpdate(!messagesUpdate);

  }

  const myOffers =
    request.offers &&
      request.offers.filter((offer) => offer.status === "pending").length !== 0 ? (
        request.offers.map((offer, index) => (
          <OfferList
            offer={offer}
            requestStatus={request.status}
            index={index}
            onHelperClick={onHelperClick}
          />

        ))
      ) : (
        <p style={{ position: "absolute", marginTop: "50px" }}>You have no pending offers on this reQuest</p>
      );


  return (
    <ActionCableProvider url={`ws://localhost:3000/cable?uid=${uid}`}>

      <div style={{ display: "flex", flexDirection: "row" }}>
        {selectedStatus === "pending" && page === "requests" && (
          <>
            <List divided relaxed id="offers">
              <h3>Offers</h3>
              {myOffers}
            </List>
            <div
              style={{
                marginLeft: "4vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <p id="status-message">{statusMessage}</p>
            </div>
          </>
        )}
        {showActiveOffer && (
          <OfferMessage
            helperOffer={activeOffer}
            onClickActivity={updateOfferStatus}
            completeRequest={completeRequest}
            replyOfferMessage={replyOfferMessage}
            completedMessage={completedMessage}
            error={error}
            selectedStatus={selectedStatus}
            updateConversation = {updateConversation}
            page={page}
          />
        )}
        <p style={{ color: "black" }} id="completed-message">
          {completedMessage}
        </p>
      </div>
    </ActionCableProvider>
  );
};

export default Offers;
