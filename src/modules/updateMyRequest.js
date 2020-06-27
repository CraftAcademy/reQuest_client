import { getSingleRequest, getSingleQuest } from "./getRequests";

const updateMyRequest = async (request, dispatch) => {
  try {
    const response = await getSingleRequest(request.id);
    response &&
      dispatch({
        type: "SET_MY_SELECTED_REQUEST",
        payload: { request: response.data.request },
      });
  } catch (error) {
    console.log(error);
  }
};

const updateMyQuest = async (quest, dispatch) => {
  try {
    const response = await getSingleQuest(quest.id);
    response &&
      dispatch({
        type: "SET_MY_SELECTED_REQUEST",
        payload: { request: response.data.quest },
      });
  } catch (error) {
    console.log(error);
  }
};



export { updateMyRequest, updateMyQuest }
