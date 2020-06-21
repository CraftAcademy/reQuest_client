import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import MyRequestCard from "./MyRequestCard";
import { getMyRequests, getMyQuests } from "../modules/getRequests";

const MyListComponent = ({page, status }) => {
  const [myList, setMyList] = useState([]);

  const getList = async () => {
    if (page === "requests") {
      const requests = await getMyRequests();
      setMyList(requests);
    } else {
      const quests = await getMyQuests();
      setMyList(quests)
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const cards = myList.filter(req => req.status === status).map((request) => (
    <MyRequestCard key={request.id} request={request} />
  ));
    
  const message = cards.length === 0 && <h4 id="no-requests-message">The are no {status} {page} to show!</h4>

  return (
    <>
      <Card.Group id="my-list" itemsPerRow={1}>
        {message}
        {cards}
      </Card.Group>
    </>
  );
};

export default MyListComponent;
