import React, { Component } from "react";
import { connect } from "react-redux";
import PreCheckout from "../PreCheckout";
import CheckOutForm from "../CheckOutForm";
import { Redirect } from "react-router-dom";
class Checkout extends Component {
  constructor(props) {
    super(props);
    this.handleShowCheckout = this.handleShowCheckout.bind(this);
    this.state = {
      showCheckout: false
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  handleShowCheckout() {
    this.setState({
      showCheckout: true
    });
  }
  render() {
    const {
      cart: { cart },
      match: { params }
    } = this.props;
    const { showCheckout } = this.state;
    if (cart.items < 1) {
      return <Redirect to={`/${params.lang}/`} />;
    }
    return (
      <div className="">
        {!showCheckout && <PreCheckout onGaust={this.handleShowCheckout} />}
        {showCheckout && <CheckOutForm />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log(state, "from che")
  return state;
};
export default connect(mapStateToProps)(Checkout);
