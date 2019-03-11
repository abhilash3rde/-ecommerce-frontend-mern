import {
  ADD_ITEM,
  REMOVE_ITEM,
  MODIFY_ITEM,
  CLEAR_CART
} from "../actions/type";
import {
  variablePriceSet,
  returnSubTotal
} from "../services/extra/cartHealpers";
const initialState = {
  cart: {
    items: [],
    subTotal: 0,
    shippingCharge: 0
  }
};
export default (state = initialState, action) => {
  const { cart } = state;
  const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      console.log({ state }, "sst");
      const { producttype, size, extract_flavor, _id } = action.payload;
      if (producttype === "variable") {
        if (size && extract_flavor) {
          if (
            state.cart.items.some(
              el =>
                el._id === _id &&
                el.size === size &&
                el.extract_flavor === extract_flavor
            )
          ) {
          } else {
            return {
              ...state,
              cart: {
                items: [...cart.items, action.payload]
              },
              subTotal: returnSubTotal([...cart.items, action.payload]) || 0,
              shippingCharge: 0
            };
          }
        } else if (size) {
          if (state.cart.items.some(el => el._id === _id && el.size === size)) {
          } else {
            return {
              ...state,
              cart: {
                items: [...cart.items, action.payload]
              },
              subTotal: returnSubTotal([...cart.items, action.payload]) || 0,
              shippingCharge: 0
            };
          }
        } else if (extract_flavor) {
          if (
            state.cart.items.some(
              el => el._id === _id && el.extract_flavor === extract_flavor
            )
          ) {
          } else {
            return {
              ...state,
              cart: {
                items: [...cart.items, action.payload]
              },
              subTotal: returnSubTotal([...cart.items, action.payload]) || 0,
              shippingCharge: 0
            };
          }
        }
      } else {
        console.log({ state }, "else");
        if (state.cart.items.some(el => el._id === _id)) {
        } else {
          return {
            ...state,
            cart: {
              items: [...cart.items, action.payload]
            },
            subTotal: returnSubTotal([...cart.items, action.payload]) || 0,
            shippingCharge: 0
          };
        }
      }
      return state;
      break;

    case REMOVE_ITEM:
      // const { cart } = state;

      return {
        ...state,
        cart: {
          items: [...cart.items.filter(el => el !== action.payload)]
        },
        subTotal:
          returnSubTotal([...cart.items.filter(el => el !== action.payload)]) ||
          0,
        shippingCharge: 0
      };
      break;

    case MODIFY_ITEM:
      console.log({ payload });
      if (payload.newItem && payload.oldItem) {
        const { newItem, oldItem } = payload;
        const NewItems = cart.items.map(el => {
          if (el._id === newItem._id) {
            if (el === oldItem) {
              return variablePriceSet(newItem);
            }
          }
          return el;
        });
        if (oldItem !== newItem) {
          return {
            ...state,
            cart: {
              items: cart.items.map(el => {
                if (el._id === newItem._id) {
                  if (el === oldItem) {
                    return variablePriceSet(newItem);
                  }
                }
                return el;
              })
            },
            subTotal: returnSubTotal(NewItems) || 0,
            shippingCharge: 0
          };
        }
      }
      return state;
      break;
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
};
