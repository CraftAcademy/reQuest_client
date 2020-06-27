import React, { useState } from "react";
import { Button, Card, Form, TextArea, Icon } from "semantic-ui-react";
import ChatBubbles from "./ChatBubbles";
import { ActionCable } from 'actioncable-client-react'
import {useSelector} from 'react-redux'


const OfferMessage = (props) => {
  const [replyStatus, setReplyStatus] = useState(false);
  const uid = useSelector(state => state.authentication.uid)
  const toggleInputField = (
    <>
      {replyStatus ? (
        <Button
          id="send-chat-message"
          form="send-message-form"
          type="submit"
          color="yellow"
        >
          Send
        </Button>
      ) : (
          <Button id="quest-reply" onClick={() => setReplyStatus(true)}>
            Reply
          </Button>
        )}
    </>
  );

  const toggleActivityButtons = (
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
        {props.selectedStatus === "active" && (
          <div className="ui two buttons">
            {(!props.completedMessage || props.error !== "") && (
              <Button id="quest-completed" onClick={props.completeRequest}>
                Quest Completed
              </Button>
            )}
            {toggleInputField}
          </div>
        )}
      </>
    </Card.Content>
  );

  const incomingMessage = data => {
    let isMe = data.message.sender_id === uid ? true : false
    props.helperOffer.conversation.messages.push({content: data.message.content, me: isMe})
    props.updateConversation()
  }

  return (
    <>
      <ActionCable
        channel={'OfferConversationChannel'}
        room={{ offer_id: props.helperOffer.id }}
        onReceived={incomingMessage}>

        <Card id="conversation" style={{ height: "60vh", width: "400px" }}>
          <Card.Content style={{ maxHeight: "92%" }}>
            <Card.Meta>Conversation with: {props.helperOffer.email}</Card.Meta>
            <Card.Content
              style={{
                height: replyStatus ? "32vh" : "100%",
                color: "#444",
                padding: "10px 0px",
              }}
            >
              <ChatBubbles messages={props.helperOffer.conversation.messages} />
            </Card.Content>
            {replyStatus && (
              <Card.Content style={{ paddingBottom: 0, marginTop: "10px" }}>
                <Card.Meta
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  your message:
                <Icon
                    id="close-messages"
                    name="close"
                    onClick={() => setReplyStatus(false)}
                    style={{ margin: "3px 17px", cursor: "pointer" }}
                  />
                </Card.Meta>
                <Form
                  id="send-message-form"
                  onSubmit={(e) => {
                    e.target.replyMessage.value !== "" &&
                      props.replyOfferMessage(e) &&
                      e.target.reset();
                  }}
                  style={{ padding: 0 }}
                >
                  <TextArea
                    id="message-text"
                    name="replyMessage"
                    placeholder="Write..."
                  />
                </Form>
              </Card.Content>
            )}
          </Card.Content>
          {props.page === "requests" ? toggleActivityButtons : toggleInputField}
        </Card>
      </ActionCable>
      <p style={{ color: "black" }} id="completed-message">
        {props.completedMessage}
        {props.error}
      </p>
    </>
  );
};

export default OfferMessage;
