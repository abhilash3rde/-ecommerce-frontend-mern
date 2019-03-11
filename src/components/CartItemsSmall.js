import React, { Component } from "react";
import { connect } from "react-redux";
import { removeFromCart, modifyItem } from "../actions";
import { ic_clear } from "react-icons-kit/md/ic_clear";
import Icon from "react-icons-kit";
import { getItemTotal } from "../services/extra/cartHealpers";
class CartItemsSmall extends Component {
  cartItems(items) {
    return items.map((el, index) => {
      const {
        productid: { producttitle, featurefilepath },
        qty
      } = el;
      return (
        <div className="pb-2 border-bottom" key={index}>
          <div className="row">
            <div className="col-4">
              <img
                className="img-fluid"
                src={featurefilepath}
                alt={producttitle}
              />
            </div>
            <div className="col-8">
              <div>{producttitle}</div>
              <div className="row">
                <div className="col-6">{qty.label} Qty</div>
                <div className="col-6 justify-content-between d-flex">
                  <p className="price">{getItemTotal(el)}</p>
                  <Icon
                    onClick={() => {
                      this.props.removeFromCart(el);
                    }}
                    icon={ic_clear}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
  render() {
    console.log(this.props, "small cart");
    const {
      cart: { cart, subTotal }
    } = this.props;
    return (
      <div className="">
        {this.cartItems(cart.items)}
        <div className=" pt-2 pb-2 container">
          <div className="row">
            <div className="col-7">
              <h4>Total :</h4>
            </div>
            <div className="col-5 text-right">
              <h4>$ {subTotal}</h4>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state, "from che")
  return state;
};
export default connect(
  mapStateToProps,
  { removeFromCart, modifyItem }
)(CartItemsSmall);
