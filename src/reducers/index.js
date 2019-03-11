import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import cart from "./cart";
export default combineReducers({
  cart: cart,
  form: formReducer
});
