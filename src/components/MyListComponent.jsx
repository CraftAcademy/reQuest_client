import React, { useEffect, useState } from "react";
import { Grid, Card } from "semantic-ui-react";
import RequestCard from "./RequestCard";
import { getMyQuestsOrRequests } from "../modules/getRequests";

const MyListComponent = ({ type }) => {
  const [list, setList] = useState([]);
  const [activeCard, setActiveCard] = useState(0);

  const getList = async () => {
    const theList = await getMyQuestsOrRequests(type);
    setList(theList);
  };

  useEffect(() => {
    getList();
  }, []);

  const cards = list.map((request) => (
    <RequestCard
      key={request.id}
      request={request}
      activeCard={request.id === activeCard ? true : false}
      setActiveCard={setActiveCard}
    />
  ));

  return (
    <Card.Group id="my-list" itemsPerRow={1}>
      {cards}
    </Card.Group>
  );
};

export default MyListComponent;
