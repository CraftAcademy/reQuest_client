import React, { useState, useEffect } from "react";
import { Form, Input } from "semantic-ui-react";
import axios from "axios";
import createHeaders from "../modules/headers";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import getKarma from "../modules/getKarma";

const NewRequest = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const authenticated = useSelector(
    (state) => state.authentication.authenticated
  );
  const karmaPoints = useSelector((state) => state.karma.karma);

  useEffect(() => {
    getKarma(dispatch);
  }, [dispatch]);

  const submitRequest = async (e) => {
    e.persist();
    try {
      const response = await axios.post(
        "/api/requests",
        {
          title: e.target.title.value,
          description: e.target.description.value,
          reward: e.target.reward.value,
        },
        { headers: createHeaders() }
      );
      getKarma(dispatch);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <>
      {!authenticated ? (
        <Redirect to={{ pathname: "/login" }} />
      ) : (
        <div className="newQuest-container">
          <h1 className="input-labels">{"New reQuest"}</h1>
          <Form onSubmit={(e) => submitRequest(e)}>
            <Form.Input
              id="title"
              name="Title"
              type="text"
              placeholder="reQuest Title"
              required
            />
            <Form.TextArea
              id="description"
              name="Description"
              placeholder="reQuest Description"
              type="textarea"
              required
            />
            <Form.Input
              id="reward"
              name="Reward"
              type="number"
              placeholder="Karma Points"
              max={karmaPoints}
              min="0"
              step="1"
              required
            />
            <Input
              id="submit"
              type="submit"
              value="Submit"
              rows="5"
              cols="40"
              required
            />
          </Form>
          <p className="input-labels" id="message">
            {message}
          </p>
        </div>
      )}
    </>
  );
};

export default NewRequest;
