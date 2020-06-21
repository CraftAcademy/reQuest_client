import React, { useEffect, useState } from "react";
import { Card } from "semantic-ui-react";
import MyRequestCard from "./MyRequestCard";
import { getMyRequests } from "../modules/getRequests";
import MyQuestsPage from "./MyQuestsPage";

const MyListComponent = ({page}) => {
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

  const cards = myList.map((request) => (
    page === "request" ? <MyRequestCard key={request.id} request={request} /> : <MyQuestCard>
  ));

  return (
    <Card.Group id="my-list" itemsPerRow={1}>
      {cards}
    </Card.Group>
  );
};

export default MyListComponent;
