import { combineReducers } from "redux";
import requestReducer from "./requestReducer";
import authenticationReducer from "./authenticationReducer";
import karmaReducer from "./karmaReducer"
import activePageReducer from './activePageReducer'
import locationReducer from './locationReducer'
import messageReducer from './messageReducer'
import offerReducer from "./offerReducer";

const rootReducer = combineReducers({
  karma: karmaReducer,
  requests: requestReducer,
  messages: messageReducer,
  authentication: authenticationReducer,
  pages: activePageReducer,
  coords: locationReducer,
  offers: offerReducer,
});

export default rootReducer;
