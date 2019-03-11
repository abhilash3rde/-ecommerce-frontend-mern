import { ADD_ITEM, REMOVE_ITEM, MODIFY_ITEM, CLEAR_CART } from "./type";

export const addToCart = item => ({
  type: ADD_ITEM,
  payload: item
});

export const removeFromCart = id => ({
  type: REMOVE_ITEM,
  payload: id
});

export const modifyItem = oldItem => ({
  type: MODIFY_ITEM,
  payload: oldItem
});
export const clearCart = () => ({
  type: CLEAR_CART
});
