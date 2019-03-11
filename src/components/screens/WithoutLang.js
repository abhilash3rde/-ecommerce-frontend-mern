import React, { Component } from "react";

export default class WithoutLang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathname: window.location.pathname,
      url: window.location.href,
      origin: window.location.origin
    };
  }
  render() {
    return (
      <div>
        <p>{this.state.pathname}</p>
        <p>{this.state.url}</p>
        <p>{this.state.origin}</p>
      </div>
    );
  }
}
