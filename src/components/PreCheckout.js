import React, { Component } from "react";

export default class PreCheckout extends Component {
  constructor(props) {
    super(props);
    this.handleGaust = this.handleGaust.bind(this);
  }
  handleGaust(e) {
    e.preventDefault();
    this.props.onGaust();
  }
  render() {
    return (
      <div className="container">
        <div className="row align-items-center h80">
          <div className="col-lg-10 offset-md-1">
            <div className="check-wrap shadow p-5 card">
              <div className="center">
                <div className="inside-checkout-sec-one">
                  <h3>Being Secured Checkout</h3>
                </div>
                <div className="inside-checkout-sec-two">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="return-customer">
                        <form>
                          <h2>Returning Customer</h2>
                          <div className="has-input">
                            <label>Email Address:</label>
                            <input type="email" />
                          </div>
                          <div className="has-input">
                            <label>Password:</label>
                            <input type="password" />
                          </div>
                          <button className="btn-main p-3 w-100">
                            Sign In to Check Out
                          </button>
                          <p className="">Forgot Password ?</p>
                        </form>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="new-customer">
                        <h2>New Customer</h2>
                        <div className="inside-new-cus-one">
                          <p>
                            <strong>Save time now</strong>
                          </p>
                          <p>You Don't Need an Account to Check Out</p>
                          <button
                            className="btn-main p-3 w-100"
                            onClick={this.handleGaust}
                            type="button"
                          >
                            Continue as Guest
                          </button>
                        </div>
                        <div className="inside-new-cus-two">
                          <p>
                            <strong>Save time Latter</strong>
                          </p>
                          <p>Create Account for Fast Check Out</p>
                          <button className="btn-main p-3 w-100" type="button">
                            Create Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
